const fs = require('fs');
const path = require('path');
const scraper = require('./mapsScraper');
const storage = require('../db/storage');
const gitSync = require('../services/gitSync');
const { BANGALORE_AREAS } = require('../config/bangaloreAreas');
const { BUSINESS_NICHES } = require('../config/businessNiches');

const STATE_FILE = path.join(__dirname, '../../data/scraper_state.json');

class QueueManager {
  constructor() {
    this.queue = [];
    this.currentIndex = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.currentJob = null;
    this.options = {
      maxResults: 15,
      filterNoWebsiteOnly: true
    };
    this.lastSyncResult = null;
    this.listeners = new Set();
    this.loadState();
  }

  loadState() {
    try {
      if (fs.existsSync(STATE_FILE)) {
        const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        this.queue = data.queue || [];
        this.currentIndex = data.currentIndex || 0;
        this.options = data.options || this.options;
        this.isPaused = data.isPaused || false;
        // Don't auto-run on initial boot, but allow manual/auto-resume
        this.isRunning = false;
      }
    } catch (e) {
      console.error('Error loading scraper state:', e);
      this.resetState();
    }
  }

  saveState() {
    try {
      const data = {
        queue: this.queue,
        currentIndex: this.currentIndex,
        options: this.options,
        isPaused: this.isPaused,
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(STATE_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
      console.error('Error saving scraper state:', e);
    }
  }

  resetState() {
    this.queue = [];
    this.currentIndex = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.currentJob = null;
    this.saveState();
  }

  onProgress(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  broadcast(event) {
    for (const cb of this.listeners) {
      try {
        cb(event);
      } catch (e) {}
    }
  }

  /**
   * Initialize a new Mass Scraper Queue
   */
  startQueue(params = {}) {
    const {
      localities = 'ALL', // 'ALL' or array of locality names
      niches = 'ALL',     // 'ALL' or array of niche IDs
      maxResults = 15,
      filterNoWebsiteOnly = true,
      expandSearchTerms = true,  // search all of a niche's searchTerms, not just the first
      microLocalities = false    // also expand each area into its micro-locality keywords
    } = params;

    const localityNameList = Array.isArray(localities) ? localities : [localities];
    const targetAreas = localities === 'ALL'
      ? BANGALORE_AREAS
      : BANGALORE_AREAS.filter(a => localityNameList.includes(a.name));

    // Fall back to a bare locality string with no zone/keyword data if it isn't a known area
    const unmatchedLocalityNames = localities === 'ALL'
      ? []
      : localityNameList.filter(name => !BANGALORE_AREAS.some(a => a.name === name));
    for (const name of unmatchedLocalityNames) {
      targetAreas.push({ name, zone: 'Bangalore', keywords: [] });
    }

    const targetNiches = niches === 'ALL'
      ? BUSINESS_NICHES
      : BUSINESS_NICHES.filter(n => Array.isArray(niches) ? niches.includes(n.id) : niches === n.id);

    // Generate grid matrix: area (+ optional micro-localities) x niche x (optional all search terms)
    const newQueue = [];
    for (const area of targetAreas) {
      const localityNames = microLocalities && Array.isArray(area.keywords) && area.keywords.length > 0
        ? [area.name, ...area.keywords]
        : [area.name];

      for (const locName of localityNames) {
        for (const nic of targetNiches) {
          const terms = expandSearchTerms && Array.isArray(nic.searchTerms) && nic.searchTerms.length > 0
            ? nic.searchTerms
            : [nic.searchTerms ? nic.searchTerms[0] : nic.name];

          for (const term of terms) {
            newQueue.push({
              locality: locName,
              zone: area.zone || 'Bangalore',
              nicheId: nic.id,
              nicheName: nic.name,
              searchTerm: term,
              query: `${term} in ${locName} Bangalore`,
              status: 'PENDING', // PENDING, RUNNING, COMPLETED, FAILED
              leadsFound: 0,
              qualifiedSaved: 0
            });
          }
        }
      }
    }

    this.queue = newQueue;
    this.currentIndex = 0;
    this.isRunning = true;
    this.isPaused = false;
    this.options = {
      maxResults: parseInt(maxResults, 10) || 15,
      filterNoWebsiteOnly,
      expandSearchTerms,
      microLocalities
    };
    this.saveState();

    this.broadcast({
      type: 'QUEUE_STARTED',
      totalItems: this.queue.length,
      options: this.options
    });

    this.processNext();
    return this.getStatus();
  }

  pauseQueue() {
    if (!this.isRunning) return this.getStatus();
    this.isPaused = true;
    this.isRunning = false;
    this.saveState();
    this.broadcast({
      type: 'QUEUE_PAUSED',
      currentIndex: this.currentIndex,
      totalItems: this.queue.length
    });

    // Push the paused state to git so another device can pick it up. Fire-and-forget:
    // pausing must not hang on network/git latency.
    this.syncPush(`sync: harvester paused at ${this.currentIndex}/${this.queue.length}`);

    return this.getStatus();
  }

  /**
   * Resuming always pulls first, so if the queue was paused (or progressed further)
   * on another device, this device picks up that newer state before continuing —
   * that's what makes cross-device resume safe.
   */
  async resumeQueue() {
    const pullResult = await gitSync.pullState();
    this.lastSyncResult = { action: 'pull', ...pullResult, at: new Date().toISOString() };
    this.broadcast({ type: 'SYNC_RESULT', ...this.lastSyncResult });
    if (pullResult.synced) {
      this.loadState();
    }

    if (this.queue.length === 0 || this.currentIndex >= this.queue.length) {
      return { error: 'No incomplete queue found to resume (it may already have been completed/synced from another device).' };
    }

    this.isPaused = false;
    this.isRunning = true;
    this.saveState();
    this.broadcast({
      type: 'QUEUE_RESUMED',
      currentIndex: this.currentIndex,
      totalItems: this.queue.length
    });
    this.processNext();
    return this.getStatus();
  }

  /**
   * Best-effort push of harvester state to the git remote. Never throws —
   * failures (offline, no git identity configured, etc.) are broadcast as a
   * SYNC_RESULT event rather than breaking the harvester itself.
   */
  syncPush(message) {
    gitSync.pushState(message).then(res => {
      this.lastSyncResult = { action: 'push', ...res, at: new Date().toISOString() };
      this.broadcast({ type: 'SYNC_RESULT', ...this.lastSyncResult });
    }).catch(() => {});
  }

  stopQueue() {
    this.isRunning = false;
    this.isPaused = false;
    this.syncPush(`sync: harvester stopped at ${this.currentIndex}/${this.queue.length}, saving leads`);
    this.resetState();
    this.broadcast({ type: 'QUEUE_STOPPED' });
    return this.getStatus();
  }

  async processNext() {
    if (!this.isRunning || this.isPaused) return;

    if (this.currentIndex >= this.queue.length) {
      this.isRunning = false;
      this.isPaused = false;
      this.saveState();
      this.broadcast({
        type: 'QUEUE_COMPLETED',
        totalProcessed: this.queue.length
      });
      this.syncPush(`sync: harvester completed ${this.queue.length} queries`);
      return;
    }

    const item = this.queue[this.currentIndex];
    item.status = 'RUNNING';
    this.currentJob = item;
    this.saveState();

    this.broadcast({
      type: 'ITEM_START',
      index: this.currentIndex + 1,
      total: this.queue.length,
      item
    });

    try {
      const scraped = await scraper.scrape({
        query: item.query,
        locality: item.locality,
        zone: item.zone,
        nicheId: item.nicheId,
        maxResults: this.options.maxResults,
        onProgress: (p) => {
          this.broadcast({
            type: 'SCRAPER_PROGRESS',
            queueIndex: this.currentIndex + 1,
            queueTotal: this.queue.length,
            ...p
          });
        }
      });

      let qualified = scraped;
      if (this.options.filterNoWebsiteOnly) {
        qualified = scraped.filter(l => l.websiteStatus === 'NO_WEBSITE' || l.websiteStatus === 'SOCIAL_ONLY');
      }

      const res = storage.addLeads(qualified);

      item.status = 'COMPLETED';
      item.leadsFound = scraped.length;
      item.qualifiedSaved = res.addedCount;
      this.currentIndex++;
      this.saveState();

      this.broadcast({
        type: 'ITEM_COMPLETED',
        index: this.currentIndex,
        total: this.queue.length,
        item,
        qualifiedSaved: res.addedCount
      });

      if (this.isRunning && !this.isPaused) {
        // Every 15 queries, take a longer cooldown break in addition to the normal
        // jitter, to look less like a scripted crawl over a long "Scrape All" run.
        const isCooldownCheckpoint = this.currentIndex > 0 && this.currentIndex % 15 === 0;
        const delay = isCooldownCheckpoint
          ? Math.floor(Math.random() * 20000 + 20000) // 20-40s cooldown
          : Math.floor(Math.random() * 2500 + 2500);   // 2.5-5s polite jitter

        if (isCooldownCheckpoint) {
          this.broadcast({ type: 'COOLDOWN', message: `Cooling down for ${Math.round(delay / 1000)}s to avoid rate-limiting...` });
          // Piggyback a state checkpoint on the same cadence, so a crash mid-run
          // never loses more than ~15 queries' worth of progress.
          this.syncPush(`sync: harvester checkpoint ${this.currentIndex}/${this.queue.length}`);
        }
        setTimeout(() => this.processNext(), delay);
      }

    } catch (err) {
      console.error(`Error processing queue item ${item.query}:`, err);

      // Google actively blocked this session — pause the whole harvester rather than
      // burning through the remaining queue getting nothing back.
      if (err instanceof scraper.GoogleBlockError || err.name === 'GoogleBlockError') {
        item.status = 'PENDING';
        this.pauseQueue();
        this.broadcast({
          type: 'HARVESTER_BLOCKED',
          message: 'Google flagged this session as automated. Harvester paused — wait a while before resuming.',
          index: this.currentIndex,
          total: this.queue.length
        });
        return;
      }

      item.status = 'FAILED';
      item.error = err.message;
      this.currentIndex++;
      this.saveState();

      this.broadcast({
        type: 'ITEM_FAILED',
        index: this.currentIndex,
        total: this.queue.length,
        item,
        error: err.message
      });

      // Continue to next item after small delay
      if (this.isRunning && !this.isPaused) {
        setTimeout(() => this.processNext(), 2000);
      }
    }
  }

  getStatus() {
    const hasResumableQueue = this.queue.length > 0 && this.currentIndex < this.queue.length;
    return {
      isRunning: this.isRunning,
      isPaused: this.isPaused,
      hasResumableQueue,
      currentIndex: this.currentIndex,
      totalItems: this.queue.length,
      currentJob: this.currentJob,
      progressPercent: this.queue.length > 0 ? Math.round((this.currentIndex / this.queue.length) * 100) : 0,
      options: this.options,
      lastSyncResult: this.lastSyncResult
    };
  }
}

module.exports = new QueueManager();
