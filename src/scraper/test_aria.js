const { chromium } = require('playwright');

async function testAriaLabel() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ locale: 'en-IN' });
  const page = await context.newPage();

  await page.goto('https://www.google.com/maps/search/Dental+Clinic+in+Koramangala+Bangalore?hl=en', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('div.Nv2PK').forEach(el => {
      const linkEl = el.querySelector('a.hfpxzc');
      const aria = linkEl ? linkEl.getAttribute('aria-label') : '';
      const text = el.innerText;
      items.push({ aria, textSnippet: text.replace(/\n+/g, ' | ') });
    });
    return items;
  });

  console.log('Aria Labels & Snippets:');
  data.slice(0, 5).forEach((d, i) => {
    console.log(`\n[${i+1}] ARIA: ${d.aria}`);
    console.log(`    TEXT: ${d.textSnippet}`);
  });

  await browser.close();
}

testAriaLabel().catch(console.error);
