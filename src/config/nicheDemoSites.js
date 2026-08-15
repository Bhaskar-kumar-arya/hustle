/**
 * Each business niche gets its own individually-built demo site, deployed
 * separately on Netlify. As you finish and deploy each one, set its
 * DEMO_BASE_URL_<NICHE> env var (or fill the fallback below) to the live
 * Netlify URL — e.g. DEMO_BASE_URL_DENTAL=https://blr-dental-demo.netlify.app
 *
 * A niche with no baseUrl yet is treated as "not live" — pitches for that
 * niche skip the demo link instead of sending a broken one.
 */

const NICHE_DEMO_SITES = {
  'dental-clinics': {
    baseUrl: process.env.DEMO_BASE_URL_DENTAL || '',
    path: '/'
  }
};

function getDemoSiteConfig(nicheId) {
  const config = NICHE_DEMO_SITES[nicheId];
  if (!config || !config.baseUrl) return null;
  return { baseUrl: config.baseUrl.replace(/\/$/, ''), path: config.path };
}

module.exports = { NICHE_DEMO_SITES, getDemoSiteConfig };
