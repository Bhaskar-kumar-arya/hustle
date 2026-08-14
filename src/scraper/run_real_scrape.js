const scraper = require('./mapsScraper');
const storage = require('../db/storage');

async function runRealScrape() {
  console.log('--- STARTING 100% REAL BANGALORE BUSINESS SCRAPING ---');

  const targets = [
    { query: 'Dental Clinic in Koramangala Bangalore', locality: 'Koramangala', nicheId: 'dental-clinics', maxResults: 8 },
    { query: 'Interior Designer in HSR Layout Bangalore', locality: 'HSR Layout', nicheId: 'interior-designers', maxResults: 8 },
    { query: 'Salon in Indiranagar Bangalore', locality: 'Indiranagar', nicheId: 'salons-spas', maxResults: 8 }
  ];

  for (const t of targets) {
    console.log(`\nScraping live: "${t.query}"...`);
    const leads = await scraper.scrape({
      query: t.query,
      locality: t.locality,
      nicheId: t.nicheId,
      maxResults: t.maxResults,
      onProgress: (p) => {
        if (p.status === 'ITEM_SCRAPED') {
          console.log(`  -> ${p.message}`);
        } else {
          console.log(`  [${p.status}] ${p.message}`);
        }
      }
    });

    // Save only No Website and Social Only leads (the money makers!)
    const qualified = leads.filter(l => l.websiteStatus === 'NO_WEBSITE' || l.websiteStatus === 'SOCIAL_ONLY');
    const res = storage.addLeads(qualified);
    console.log(`  ✅ Saved ${res.addedCount} real qualified leads to database!`);
  }

  const finalStats = storage.getStats();
  console.log('\n================ FINAL STATS ================');
  console.log('Total Real Leads in DB:', finalStats.totalLeads);
  console.log('Zero Website Leads:', finalStats.noWebsiteCount);
  console.log('Social Only Leads:', finalStats.socialOnlyCount);
  console.log('Pipeline Value (INR):', finalStats.potentialPipelineInr);
  console.log('==============================================');

  await scraper.closeBrowser();
  process.exit(0);
}

runRealScrape().catch(err => {
  console.error('Scraping error:', err);
  process.exit(1);
});
