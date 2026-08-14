const fs = require('fs');
const path = require('path');
const scraper = require('./mapsScraper');
const storage = require('../db/storage');
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
      filterNoWebsiteOnly = true
    } = params;

    const targetLocalities = localities === 'ALL' 
      ? BANGALORE_AREAS.map(a => a.name)
      : (Array.isArray(localities) ? localities : [localities]);

    const targetNiches = niches === 'ALL'
      ? BUSINESS_NICHES
      : BUSINESS_NICHES.filter(n => Array.isArray(niches) ? niches.includes(n.id) : niches === n.id);

    // Generate grid matrix
    const newQueue = [];
    for (const loc of targetLocalities) {
      for (const nic of targetNiches) {
        const searchTerm = nic.searchTerms ? nic.searchTerms[0] : nic.name;
        newQueue.push({
          locality: loc,
          nicheId: nic.id,
          nicheName: nic.name,
          query: `${searchTerm} in ${loc} Bangalore`,
          status: 'PENDING', // PENDING, RUNNING, COMPLETED, FAILED
          leadsFound: 0,
          qualifiedSaved: 0
        });
      }
    }

    this.queue = newQueue;
    this.currentIndex = 0;
    this.isRunning = true;
    this.isPaused = false;
    this.options = { maxResults: parseInt(maxResults, 10) || 15, filterNoWebsiteOnly };
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
    return this.getStatus();
  }

  resumeQueue() {
    if (this.queue.length === 0 || this.currentIndex >= this.queue.length) {
      return { error: 'No incomplete queue found to resume.' };
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

  stopQueue() {
    this.isRunning = false;
    this.isPaused = false;
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

      // Polite anti-ban pause between queries (1.5 - 3 seconds)
      if (this.isRunning && !this.isPaused) {
        const delay = Math.floor(Math.random() * 1500 + 1500);
        setTimeout(() => this.processNext(), delay);
      }

    } catch (err) {
      console.error(`Error processing queue item ${item.query}:`, err);
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
      options: this.options
    };
  }
}

module.exports = new QueueManager();
