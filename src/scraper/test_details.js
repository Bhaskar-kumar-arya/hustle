const { chromium } = require('playwright');

async function testDetailExtraction() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ locale: 'en-IN' });
  const page = await context.newPage();

  console.log('Searching Koramangala Dental Clinics...');
  await page.goto('https://www.google.com/maps/search/Dental+Clinic+in+Koramangala+Bangalore?hl=en', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const links = await page.$$('a[href*="/maps/place/"]');
  console.log(`Found ${links.length} place links. Inspecting top 3 for details...`);

  for (let i = 0; i < Math.min(3, links.length); i++) {
    const link = links[i];
    await link.click();
    await page.waitForTimeout(2000);

    const placeData = await page.evaluate(() => {
      const title = document.querySelector('h1.DUwDvf, h1')?.textContent?.trim();
      const rating = document.querySelector('div.F7nice span[aria-hidden="true"]')?.textContent?.trim();
      const reviews = document.querySelector('div.F7nice span[aria-label*="review"]')?.textContent?.trim();
      
      // Phone button or text
      const phoneBtn = document.querySelector('button[data-item-id*="phone"], button[aria-label*="Phone"], button[data-tooltip="Copy phone number"]');
      const phone = phoneBtn ? phoneBtn.textContent.trim() : null;

      // Address button
      const addrBtn = document.querySelector('button[data-item-id="address"], button[aria-label*="Address"]');
      const address = addrBtn ? addrBtn.textContent.trim() : null;

      // Website button
      const webBtn = document.querySelector('a[data-item-id="authority"], a[aria-label*="Website"]');
      const website = webBtn ? webBtn.getAttribute('href') : null;

      return { title, rating, reviews, phone, address, website };
    });

    console.log(`\nPlace #${i+1}:`, placeData);
  }

  await browser.close();
}

testDetailExtraction().catch(console.error);
