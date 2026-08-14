const scraper = require('./mapsScraper');
const storage = require('../db/storage');

async function scrapeRealBangaloreNiches() {
  console.log('--- FETCHING REAL BANGALORE LEADS WITHOUT WEBSITES ---');

  const targets = [
    { query: 'Ayurvedic clinic in Jayanagar Bangalore', locality: 'Jayanagar', nicheId: 'ayurveda-wellness', maxResults: 10 },
    { query: 'Car Detailing Studio in Kalyan Nagar Bangalore', locality: 'Kalyan Nagar / Kammanahalli', nicheId: 'car-detailing', maxResults: 10 },
    { query: 'Pet Clinic in Whitefield Bangalore', locality: 'Whitefield', nicheId: 'pet-clinics', maxResults: 10 },
    { query: 'Modular Kitchen in JP Nagar Bangalore', locality: 'JP Nagar', nicheId: 'interior-designers', maxResults: 10 },
    { query: 'Catering Services in Malleshwaram Bangalore', locality: 'Malleshwaram', nicheId: 'wedding-caterers', maxResults: 10 },
    { query: 'Physiotherapy clinic in BTM Layout Bangalore', locality: 'BTM Layout', nicheId: 'physiotherapy', maxResults: 10 }
  ];

  for (const t of targets) {
    console.log(`\n🔍 Searching Google Maps: "${t.query}"...`);
    try {
      const leads = await scraper.scrape({
        query: t.query,
        locality: t.locality,
        nicheId: t.nicheId,
        maxResults: t.maxResults,
        onProgress: (p) => {
          if (p.status === 'ITEM_SCRAPED') {
            console.log(`  -> ${p.message}`);
          }
        }
      });

      // Save qualified leads (No Website or Social Only)
      const qualified = leads.filter(l => l.websiteStatus === 'NO_WEBSITE' || l.websiteStatus === 'SOCIAL_ONLY');
      const res = storage.addLeads(qualified);
      console.log(`  ✅ Added ${res.addedCount} verified leads with NO website from ${t.locality}`);
    } catch (err) {
      console.error(`  ❌ Error scraping ${t.locality}:`, err.message);
    }
  }

  const finalStats = storage.getStats();
  console.log('\n================ REAL DATABASE STATS ================');
  console.log('Total Real Leads in DB:', finalStats.totalLeads);
  console.log('Zero Website Leads:', finalStats.noWebsiteCount);
  console.log('Social Only Leads:', finalStats.socialOnlyCount);
  console.log('Est. Pipeline Opportunity:', `INR ${finalStats.potentialPipelineInr.toLocaleString('en-IN')}`);
  console.log('=====================================================');

  await scraper.closeBrowser();
  process.exit(0);
}

scrapeRealBangaloreNiches().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
