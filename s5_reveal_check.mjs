import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
await page.goto('http://localhost:8752/index.html', { waitUntil: 'networkidle' });

const sectionSelectors = ['.dentists', '.technology', '.stories', '.visiting', '.questions', '.cta-band'];
const results = {};
for (const sel of sectionSelectors) {
  await page.locator(sel).scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const total = await page.locator(`${sel} [data-reveal]`).count();
  const revealed = await page.locator(`${sel} [data-reveal].is-revealed`).count();
  results[sel] = { total, revealed };
}

// FAQ accordion interaction test
const firstFaq = page.locator('#faqAccordion .faq-item').first();
await firstFaq.locator('.faq-item__summary').click();
await page.waitForTimeout(300);
const isOpen = await firstFaq.evaluate(el => el.open);

console.log(JSON.stringify({ results, errors, faqOpensOnClick: isOpen }, null, 2));
await page.screenshot({ path: '/tmp/s5-reveal-check.png', fullPage: false });
await browser.close();
