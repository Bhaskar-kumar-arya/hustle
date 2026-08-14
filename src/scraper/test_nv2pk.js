const { chromium } = require('playwright');

async function testNv2PK() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ locale: 'en-IN' });
  const page = await context.newPage();

  await page.goto('https://www.google.com/maps/search/Dental+Clinic+in+Koramangala+Bangalore?hl=en', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Scroll feed
  await page.evaluate(() => {
    const feed = document.querySelector('div[role="feed"]');
    if (feed) feed.scrollTop = 2000;
  });
  await page.waitForTimeout(2000);

  const data = await page.evaluate(() => {
    const results = [];
    const items = document.querySelectorAll('div.Nv2PK, div[role="article"]');

    items.forEach(el => {
      const linkEl = el.querySelector('a.hfpxzc');
      const name = el.querySelector('div.qBF1Pd')?.textContent?.trim() || linkEl?.getAttribute('aria-label')?.trim();
      if (!name) return;

      const rating = el.querySelector('span.MW4etd')?.textContent?.trim();
      const reviews = el.querySelector('span.UY7F9')?.textContent?.trim();

      const webEl = el.querySelector('a[data-value="Website"], a.lcr4fd');
      const website = webEl ? webEl.getAttribute('href') : null;

      // Lines
      const lines = Array.from(el.querySelectorAll('div.W4Efsd')).map(l => l.textContent.trim());

      const mapsUrl = linkEl ? linkEl.getAttribute('href') : null;

      results.push({ name, rating, reviews, website, lines, mapsUrl });
    });

    return results;
  });

  console.log(`Extracted ${data.length} clean listings:`);
  data.forEach((d, i) => {
    console.log(`\n[${i+1}] ${d.name}`);
    console.log(`    Rating: ${d.rating} | Reviews: ${d.reviews}`);
    console.log(`    Website: ${d.website || '🔴 NO WEBSITE'}`);
    console.log(`    Lines:`, d.lines);
  });

  await browser.close();
}

testNv2PK().catch(console.error);
