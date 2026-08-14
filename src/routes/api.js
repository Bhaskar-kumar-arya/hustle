const express = require('express');
const router = express.Router();
const storage = require('../db/storage');
const scraper = require('../scraper/mapsScraper');
const queueManager = require('../scraper/queueManager');
const { BANGALORE_AREAS } = require('../config/bangaloreAreas');
const { BUSINESS_NICHES } = require('../config/businessNiches');
const {
  generateWhatsAppPitch,
  generateJustdialPitch,
  generateColdCallScript,
  generateEmailPitch
} = require('../services/pitchGenerator');

// Store active SSE clients for live scraper progress
const sseClients = new Set();

function broadcastSse(data) {
  const msg = `data: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(msg);
    } catch (e) {
      sseClients.delete(client);
    }
  }
}

// Hook queueManager events to SSE
queueManager.onProgress((event) => {
  broadcastSse({
    source: 'HARVESTER_QUEUE',
    ...event
  });
});

// 1. Get Configuration (Bangalore Areas & Business Niches)
router.get('/config', (req, res) => {
  res.json({
    areas: BANGALORE_AREAS,
    niches: BUSINESS_NICHES
  });
});

// 2. Get Stats
router.get('/stats', (req, res) => {
  const stats = storage.getStats();
  const queueStatus = queueManager.getStatus();
  res.json({ ...stats, queueStatus });
});

// 3. Get Leads (with filters)
router.get('/leads', (req, res) => {
  const {
    search,
    websiteStatus,
    locality,
    nicheId,
    crmStatus,
    minRating,
    minReviews
  } = req.query;

  const leads = storage.getAllLeads({
    search,
    websiteStatus,
    locality,
    nicheId,
    crmStatus,
    minRating,
    minReviews
  });

  res.json({
    count: leads.length,
    leads
  });
});

// 4. Get Single Lead
router.get('/leads/:id', (req, res) => {
  const lead = storage.getLeadById(req.params.id);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  res.json(lead);
});

// 5. Update Lead (CRM status, notes, details)
router.patch('/leads/:id', (req, res) => {
  const updated = storage.updateLead(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  res.json(updated);
});

// 6. Delete Lead
router.delete('/leads/:id', (req, res) => {
  const success = storage.deleteLead(req.params.id);
  res.json({ success });
});

// 7. Generate Pitch for a Lead
router.get('/leads/:id/pitch', (req, res) => {
  const lead = storage.getLeadById(req.params.id);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  const whatsapp = generateWhatsAppPitch(lead);
  const justdialHook = generateJustdialPitch(lead);
  const coldCall = generateColdCallScript(lead);
  const email = generateEmailPitch(lead);

  res.json({
    lead,
    pitches: {
      whatsapp,
      justdialHook,
      coldCall,
      email
    }
  });
});

// 8. Export CSV
router.get('/export/csv', (req, res) => {
  const csvData = storage.exportCsv(req.query);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="bangalore-business-leads-${Date.now()}.csv"`);
  res.send(csvData);
});

// 9. SSE Stream for Live Scraper Logs & Mass Harvester
router.get('/scrape/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  sseClients.add(res);

  // Send initial queue status immediately
  res.write(`data: ${JSON.stringify({ type: 'STATUS_SYNC', status: queueManager.getStatus() })}\n\n`);

  req.on('close', () => {
    sseClients.delete(res);
  });
});

// 10. Single Job Scrape (Instant Run)
let isSingleScrapingActive = false;

router.post('/scrape', async (req, res) => {
  if (isSingleScrapingActive || queueManager.isRunning) {
    return res.status(429).json({ error: 'A scraping job or mass harvester is already running.' });
  }

  const {
    locality = 'Koramangala',
    nicheId = 'dental-clinics',
    customQuery = null,
    maxResults = 15,
    filterNoWebsiteOnly = true
  } = req.body;

  // If user selected "ALL" in locality or niche, redirect to Queue Harvester
  if (locality === 'ALL' || nicheId === 'ALL') {
    const status = queueManager.startQueue({
      localities: locality,
      niches: nicheId,
      maxResults,
      filterNoWebsiteOnly
    });
    return res.json({ message: 'Mass Harvester started for all selected targets', status });
  }

  const nicheObj = BUSINESS_NICHES.find(n => n.id === nicheId) || { name: 'Businesses', searchTerms: ['Business'] };
  const searchTerm = nicheObj.searchTerms ? nicheObj.searchTerms[0] : nicheObj.name;
  const finalQuery = customQuery || `${searchTerm} in ${locality} Bangalore`;

  isSingleScrapingActive = true;
  res.json({
    message: 'Scraping job started',
    query: finalQuery,
    locality,
    nicheId,
    maxResults
  });

  (async () => {
    try {
      broadcastSse({
        type: 'JOB_START',
        query: finalQuery,
        locality,
        timestamp: new Date().toISOString()
      });

      const scrapedLeads = await scraper.scrape({
        query: finalQuery,
        locality,
        nicheId,
        maxResults: parseInt(maxResults, 10) || 15,
        onProgress: (progress) => {
          broadcastSse({
            type: 'PROGRESS',
            ...progress
          });
        }
      });

      let filteredLeads = scrapedLeads;
      if (filterNoWebsiteOnly) {
        filteredLeads = scrapedLeads.filter(l => l.websiteStatus === 'NO_WEBSITE' || l.websiteStatus === 'SOCIAL_ONLY');
      }

      const result = storage.addLeads(filteredLeads);

      broadcastSse({
        type: 'JOB_COMPLETE',
        totalFound: scrapedLeads.length,
        qualifiedSaved: result.addedCount,
        leads: filteredLeads,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error during scraping job:', err);
      broadcastSse({
        type: 'JOB_ERROR',
        error: err.message,
        timestamp: new Date().toISOString()
      });
    } finally {
      isSingleScrapingActive = false;
    }
  })();
});

// 11. Mass Harvester Controls (Start, Pause, Resume, Stop, Status)
router.get('/harvester/status', (req, res) => {
  res.json(queueManager.getStatus());
});

router.post('/harvester/start', (req, res) => {
  const { localities, niches, maxResults, filterNoWebsiteOnly } = req.body;
  const status = queueManager.startQueue({ localities, niches, maxResults, filterNoWebsiteOnly });
  res.json(status);
});

router.post('/harvester/pause', (req, res) => {
  const status = queueManager.pauseQueue();
  res.json(status);
});

router.post('/harvester/resume', (req, res) => {
  const status = queueManager.resumeQueue();
  res.json(status);
});

router.post('/harvester/stop', (req, res) => {
  const status = queueManager.stopQueue();
  res.json(status);
});

module.exports = router;
