/**
 * CLI: re-visit older NEW leads on Google Maps to catch two signals outreach cares about:
 *   - the business built a real website since we scraped it (deprioritize / drop it)
 *   - the business went permanently/temporarily closed (drop it)
 * Usage: node src/scraper/reverify.js [--days=14] [--limit=50]
 */
const scraper = require('./mapsScraper');
const storage = require('../db/storage');

function parseArg(name, fallback) {
  const arg = process.argv.find(a => a.startsWith(`--${name}=`));
  if (!arg) return fallback;
  const val = parseInt(arg.split('=')[1], 10);
  return Number.isNaN(val) ? fallback : val;
}

async function run() {
  const staleDays = parseArg('days', 14);
  const limit = parseArg('limit', 50);
  const cutoff = Date.now() - staleDays * 24 * 60 * 60 * 1000;

  const leads = storage.getAllLeads({ crmStatus: 'NEW' }).filter(l => {
    const lastChecked = new Date(l.lastVerifiedAt || l.createdAt).getTime();
    return !Number.isNaN(lastChecked) && lastChecked < cutoff;
  }).slice(0, limit);

  console.log(`Re-verifying ${leads.length} leads last checked before ${new Date(cutoff).toISOString()}...`);

  let changed = 0;
  let closed = 0;

  for (const lead of leads) {
    const result = await scraper.recheckLead(lead.googleMapsUrl);
    if (!result) continue;

    if (result.closed) {
      storage.updateLead(lead.id, {
        crmStatus: 'NOT_INTERESTED',
        notes: `${lead.notes || ''} | Auto-flagged CLOSED on re-verify (${new Date().toISOString().slice(0, 10)}).`.trim(),
        lastVerifiedAt: result.lastVerifiedAt
      });
      closed++;
      console.log(`CLOSED: ${lead.name}`);
      continue;
    }

    const updates = { lastVerifiedAt: result.lastVerifiedAt };
    if (result.rating) updates.rating = result.rating;
    if (result.reviewsCount) updates.reviewsCount = result.reviewsCount;

    if (result.websiteStatus === 'HAS_WEBSITE' && lead.websiteStatus !== 'HAS_WEBSITE') {
      updates.websiteStatus = 'HAS_WEBSITE';
      updates.website = result.website;
      updates.notes = `${lead.notes || ''} | Now has a website as of ${new Date().toISOString().slice(0, 10)} — deprioritize.`.trim();
      changed++;
      console.log(`NOW HAS WEBSITE: ${lead.name} -> ${result.website}`);
    }

    storage.updateLead(lead.id, updates);
    await new Promise(r => setTimeout(r, Math.random() * 2000 + 2000));
  }

  await scraper.closeBrowser();
  console.log(`Done. ${changed} leads now have websites, ${closed} leads flagged closed.`);
}

run().catch(err => {
  console.error('Reverify failed:', err);
  process.exit(1);
});
