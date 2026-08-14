const { chromium } = require('playwright');

async function testLiveGoogleMaps() {
  console.log('Launching browser to test live Google Maps for Bangalore...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 },
    locale: 'en-IN'
  });

  const page = await context.newPage();
  const query = 'Dental Clinic in Koramangala Bangalore';
  const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}?hl=en`;

  console.log('Navigating to:', url);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Wait for results
  await page.waitForTimeout(4000);

  // Scroll down feed
  await page.evaluate(() => {
    const feed = document.querySelector('div[role="feed"]');
    if (feed) feed.scrollTop = 1500;
  });
  await page.waitForTimeout(2000);

  const results = await page.evaluate(() => {
    const items = [];
    const articles = document.querySelectorAll('div[role="article"]');
    articles.forEach(art => {
      const nameEl = art.querySelector('div.fontHeadlineSmall, div.qBF1Pd, a[aria-label]');
      const name = nameEl ? (nameEl.textContent || nameEl.getAttribute('aria-label') || '').trim() : '';

      const ratingEl = art.querySelector('span.MW4etd, span.fontBodyMedium > span[aria-hidden="true"]');
      const rating = ratingEl ? ratingEl.textContent.trim() : null;

      const reviewEl = art.querySelector('span.UY7F9');
      const reviews = reviewEl ? reviewEl.textContent.trim() : null;

      const webBtn = art.querySelector('a[data-value="Website"], a[aria-label*="website" i], a[href*="http"]:not([href*="google.com"])');
      const website = webBtn ? webBtn.getAttribute('href') : null;

      // Extract all text inside article to see phone, address, category
      const fullText = art.innerText;

      items.push({
        name,
        rating,
        reviews,
        website,
        fullTextSnippet: fullText.replace(/\n+/g, ' | ')
      });
    });
    return items;
  });

  console.log(`Found ${results.length} live listings on Google Maps:`);
  results.slice(0, 8).forEach((r, i) => {
    console.log(`\n[${i+1}] ${r.name}`);
    console.log(`    Rating: ${r.rating} ${r.reviews} | Website: ${r.website || '🔴 NONE'}`);
    console.log(`    Details: ${r.fullTextSnippet}`);
  });

  await browser.close();
}

testLiveGoogleMaps().catch(console.error);
