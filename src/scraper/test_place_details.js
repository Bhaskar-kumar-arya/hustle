const { chromium } = require('playwright');

async function testFetchFullPlaceDetails() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ locale: 'en-IN' });
  const page = await context.newPage();

  // Test searching and fetching exact place details including phone, website, reviews, address
  await page.goto('https://www.google.com/maps/search/Dental+Clinic+in+Koramangala+Bangalore?hl=en', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const placeLinks = await page.evaluate(() => {
    const links = [];
    document.querySelectorAll('div.Nv2PK a.hfpxzc').forEach(a => {
      links.push({
        name: a.getAttribute('aria-label') || a.parentElement?.querySelector('div.qBF1Pd')?.textContent?.trim(),
        url: a.getAttribute('href')
      });
    });
    return links;
  });

  console.log(`Found ${placeLinks.length} places. Fetching detail page for top 3...`);

  for (let i = 0; i < Math.min(3, placeLinks.length); i++) {
    const p = placeLinks[i];
    const detailPage = await context.newPage();
    await detailPage.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await detailPage.waitForTimeout(2500);

    const details = await detailPage.evaluate(() => {
      // Title
      const name = document.querySelector('h1.DUwDvf')?.textContent?.trim();
      
      // Rating & Reviews
      const rating = document.querySelector('div.F7nice span[aria-hidden="true"]')?.textContent?.trim();
      const reviewsText = document.querySelector('div.F7nice span[aria-label*="review"]')?.getAttribute('aria-label') || document.querySelector('div.F7nice span[aria-label*="reviews"]')?.textContent?.trim();

      // Phone
      const phoneEl = document.querySelector('button[data-tooltip="Copy phone number"] div.Io6YTe, button[data-item-id*="phone"] div.Io6YTe, [aria-label*="Phone:"]');
      const phone = phoneEl ? phoneEl.textContent.trim() : null;

      // Address
      const addrEl = document.querySelector('button[data-item-id="address"] div.Io6YTe, button[aria-label*="Address:"] div.Io6YTe');
      const address = addrEl ? addrEl.textContent.trim() : null;

      // Website
      const webEl = document.querySelector('a[data-item-id="authority"], a[aria-label*="Website:"]');
      const website = webEl ? webEl.getAttribute('href') : null;

      // Category
      const catEl = document.querySelector('button.DkEaL, button[jsaction*="category"]');
      const category = catEl ? catEl.textContent.trim() : null;

      return { name, rating, reviewsText, phone, address, website, category };
    });

    console.log(`\n[Place ${i+1}]`);
    console.log(details);
    await detailPage.close();
  }

  await browser.close();
}

testFetchFullPlaceDetails().catch(console.error);
