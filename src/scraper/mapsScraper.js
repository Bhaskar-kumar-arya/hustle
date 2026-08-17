const { chromium } = require('playwright');
const { calculateLeadScore } = require('../services/pitchGenerator');

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
];

function randomUserAgent() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

class GoogleBlockError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GoogleBlockError';
  }
}

// Social media / Directory domains that do NOT count as official custom websites
const SOCIAL_DOMAINS = [
  'instagram.com',
  'facebook.com',
  'fb.com',
  'justdial.com',
  'sulekha.com',
  'indiamart.com',
  'linktr.ee',
  'wa.me',
  'api.whatsapp.com',
  'twitter.com',
  'x.com',
  'youtube.com',
  'linkedin.com',
  'zoca.com',
  'practo.com',
  'lybrate.com',
  'threebestrated.in'
];

/**
 * Clean and format Indian Phone numbers to +91XXXXXXXXXX
 */
function formatIndianPhone(rawPhone) {
  if (!rawPhone) return null;

  // Pull out just the actual phone number, ignoring any surrounding text
  // (review counts, ratings, labels) that may have been scraped alongside it.
  const match = rawPhone.match(/(\+?91[\s-]?)?[6-9]\d{9}|0?80[\s-]?\d{7,8}/);
  const digits = (match ? match[0] : rawPhone).replace(/\D/g, '');

  if (digits.length === 10) {
    return `+91${digits}`;
  } else if (digits.length === 11 && digits.startsWith('0')) {
    return `+91${digits.slice(1)}`;
  } else if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  return rawPhone.trim();
}

/**
 * Classify website status
 */
function classifyWebsite(websiteUrl) {
  if (!websiteUrl || websiteUrl.trim() === '' || websiteUrl === '#') {
    return 'NO_WEBSITE';
  }
  const lower = websiteUrl.toLowerCase();
  for (const domain of SOCIAL_DOMAINS) {
    if (lower.includes(domain)) {
      return 'SOCIAL_ONLY';
    }
  }
  return 'HAS_WEBSITE';
}

class GoogleMapsScraper {
  constructor() {
    this.browser = null;
  }

  async initBrowser() {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
    }
    return this.browser;
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * Scrape Google Maps for a given query in Bangalore with 100% real live data
   */
  async scrape(options = {}) {
    const {
      query = 'Dental Clinic in Koramangala Bangalore',
      locality = 'Koramangala',
      zone = 'Bangalore',
      nicheId = 'dental-clinics',
      maxResults = 15,
      onProgress = () => {}
    } = options;

    const leads = [];
    let page = null;
    let context = null;

    try {
      onProgress({ status: 'STARTING', message: `Launching Google Maps scraper for: "${query}"...` });
      const browser = await this.initBrowser();
      context = await browser.newContext({
        userAgent: randomUserAgent(),
        viewport: { width: 1280, height: 900 },
        locale: 'en-IN'
      });

      page = await context.newPage();
      const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}?hl=en`;

      onProgress({ status: 'NAVIGATING', message: `Opening Google Maps query: ${query}...` });
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 35000 });

      // Handle any consent overlay
      try {
        const consentBtn = await page.$('button[aria-label*="Accept all"], form[action*="consent"] button');
        if (consentBtn) {
          await consentBtn.click();
          await page.waitForTimeout(1000);
        }
      } catch (e) {}

      onProgress({ status: 'SEARCHING', message: `Scanning Google Maps listings for ${locality}...` });
      await page.waitForTimeout(3000);

      // Detect Google's rate-limit / CAPTCHA "sorry" interstitial before wasting the rest of the run on it
      const blocked = await page.evaluate(() => {
        const text = document.body ? document.body.innerText || '' : '';
        return /unusual traffic|automated queries|solve this puzzle|recaptcha/i.test(text);
      }).catch(() => false);
      if (blocked || page.url().includes('/sorry/')) {
        throw new GoogleBlockError(`Google flagged this session as automated while scraping "${query}"`);
      }

      // Scroll the feed dynamically: keep going until enough cards are loaded, the
      // list explicitly ends, or the feed stops growing for two consecutive scrolls.
      const feedSelector = 'div[role="feed"]';
      let previousCardCount = 0;
      let stableRounds = 0;
      for (let i = 0; i < 20; i++) {
        const { count, reachedEnd } = await page.evaluate((sel) => {
          const feed = document.querySelector(sel);
          if (feed) feed.scrollTop += 1800;
          else window.scrollBy(0, 1800);
          const cardCount = document.querySelectorAll('div.Nv2PK, div[role="article"]').length;
          const bodyText = document.body ? document.body.innerText || '' : '';
          return { count: cardCount, reachedEnd: /reached the end of the list/i.test(bodyText) };
        }, feedSelector);

        await page.waitForTimeout(1200);

        if (reachedEnd || count >= maxResults * 3) break;
        if (count === previousCardCount) {
          stableRounds++;
          if (stableRounds >= 2) break;
        } else {
          stableRounds = 0;
        }
        previousCardCount = count;
      }

      // Collect place links from search feed
      const rawCards = await page.evaluate((max) => {
        const items = [];
        const elements = document.querySelectorAll('div.Nv2PK, div[role="article"]');

        elements.forEach(el => {
          if (items.length >= max * 2) return;

          const cardText = el.textContent || '';
          if (/permanently closed|temporarily closed/i.test(cardText)) return;

          const linkEl = el.querySelector('a.hfpxzc');
          const title = el.querySelector('div.qBF1Pd')?.textContent?.trim() || linkEl?.getAttribute('aria-label')?.trim();
          if (!title || title.length < 2) return;

          const ratingText = el.querySelector('span.MW4etd')?.textContent?.trim();
          const rating = ratingText ? parseFloat(ratingText) : null;

          const reviewsText = el.querySelector('span.UY7F9')?.textContent?.trim();
          let reviewsCount = 0;
          if (reviewsText) {
            const match = reviewsText.match(/([\d,]+)/);
            if (match) reviewsCount = parseInt(match[1].replace(/,/g, ''), 10);
          }

          const webEl = el.querySelector('a[data-value="Website"], a.lcr4fd');
          const website = webEl ? webEl.getAttribute('href') : null;

          // Lines for phone & address
          let address = '';
          let phone = '';
          let category = '';

          const lines = Array.from(el.querySelectorAll('div.W4Efsd')).map(l => l.textContent.trim());
          lines.forEach(line => {
            if (!category && line && !line.includes('·') && !line.includes('+91') && !line.includes('Open') && !line.includes('Closed')) {
              category = line;
            }
            const phoneMatch = line.match(/(\+91[\s-]?[6-9]\d{9}|0?[6-9]\d{9}|080[\s-]?\d{7,8})/);
            if (phoneMatch && !phone) {
              phone = phoneMatch[1];
            }
          });

          const mapsUrl = linkEl ? linkEl.getAttribute('href') : null;
          const placeIdMatch = mapsUrl ? mapsUrl.match(/!1s(0x[0-9a-f]+:0x[0-9a-f]+)/i) : null;
          const placeId = placeIdMatch ? placeIdMatch[1] : null;

          items.push({
            name: title,
            rating,
            reviewsCount,
            category,
            address,
            phone,
            website,
            mapsUrl,
            placeId
          });
        });

        return items;
      }, maxResults);

      onProgress({ status: 'PROCESSING', message: `Found ${rawCards.length} businesses. Fetching verified contact details & phone numbers...` });

      let count = 0;
      for (const card of rawCards) {
        if (leads.length >= maxResults) break;

        let realPhone = card.phone;
        let realAddress = card.address;
        let realWebsite = card.website;
        let realCategory = card.category;
        let realRating = card.rating;
        let realReviews = card.reviewsCount;

        // If phone or address is missing from the search feed snippet, open the Google Maps place link to get 100% real info
        if (card.mapsUrl && (!realPhone || !realAddress || !realWebsite)) {
          try {
            const detailPage = await context.newPage();
            await detailPage.goto(card.mapsUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
            await detailPage.waitForTimeout(2000);

            const details = await detailPage.evaluate(() => {
              const phoneEl = document.querySelector('button[data-tooltip="Copy phone number"] div.Io6YTe, button[data-item-id*="phone"] div.Io6YTe, button[aria-label*="Phone:"] div.Io6YTe');
              const phone = phoneEl ? phoneEl.textContent.trim() : null;

              const addrEl = document.querySelector('button[data-item-id="address"] div.Io6YTe, button[aria-label*="Address:"] div.Io6YTe');
              const address = addrEl ? addrEl.textContent.trim() : null;

              const webEl = document.querySelector('a[data-item-id="authority"], a[aria-label*="Website:"]');
              const website = webEl ? webEl.getAttribute('href') : null;

              const catEl = document.querySelector('button.DkEaL, button[jsaction*="category"]');
              const category = catEl ? catEl.textContent.trim() : null;

              const ratingEl = document.querySelector('div.F7nice span[aria-hidden="true"]');
              const rating = ratingEl ? parseFloat(ratingEl.textContent.trim()) : null;

              const reviewsEl = document.querySelector('div.F7nice span[aria-label*="review"]');
              let reviews = 0;
              if (reviewsEl) {
                const match = (reviewsEl.getAttribute('aria-label') || reviewsEl.textContent).match(/([\d,]+)/);
                if (match) reviews = parseInt(match[1].replace(/,/g, ''), 10);
              }

              const bodyText = document.body ? document.body.innerText || '' : '';
              const closed = /permanently closed|temporarily closed/i.test(bodyText);

              return { phone, address, website, category, rating, reviews, closed };
            });

            if (details.phone) realPhone = details.phone;
            if (details.address) realAddress = details.address;
            if (details.website) realWebsite = details.website;
            if (details.category) realCategory = details.category;
            if (details.rating) realRating = details.rating;
            if (details.reviews) realReviews = details.reviews;
            if (details.closed) card.closed = true;

            await detailPage.close();
          } catch (e) {
            // Proceed with card info if detail page timed out
          }
        }

        if (card.closed) continue;

        const cleanPhone = formatIndianPhone(realPhone);
        const websiteStatus = classifyWebsite(realWebsite);

        // Best-effort second hop: for social/directory-only leads, peek at the linked
        // profile for a lightweight activity signal (follower/description snippet).
        let socialSnippet = null;
        if (websiteStatus === 'SOCIAL_ONLY' && realWebsite) {
          socialSnippet = await this.peekSocialProfile(context, realWebsite);
        }

        const lead = {
          id: `blr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          name: card.name,
          category: realCategory || 'Local Business',
          nicheId: nicheId || 'general',
          locality: locality || 'Bangalore',
          zone: zone || 'Bangalore',
          address: realAddress || `${locality}, Bengaluru, Karnataka`,
          phone: cleanPhone,
          rawPhone: realPhone || null,
          rating: realRating || 4.5,
          reviewsCount: realReviews || 0,
          website: realWebsite || null,
          websiteStatus,
          placeId: card.placeId || null,
          socialSnippet: socialSnippet || null,
          googleMapsUrl: card.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(card.name + ' ' + locality + ' Bangalore')}`,
          crmStatus: 'NEW',
          notes: websiteStatus === 'NO_WEBSITE'
            ? 'Verified Live Lead: Zero website listed on Google Maps.'
            : (websiteStatus === 'SOCIAL_ONLY' ? `Verified Live Lead: Only ${realWebsite} listed.` : 'Has existing website.'),
          createdAt: new Date().toISOString(),
          lastVerifiedAt: new Date().toISOString()
        };

        lead.opportunityScore = calculateLeadScore(lead);
        leads.push(lead);
        count++;

        onProgress({
          status: 'ITEM_SCRAPED',
          message: `[${count}/${maxResults}] ${lead.name} (${lead.websiteStatus === 'NO_WEBSITE' ? '🔴 NO WEBSITE' : (lead.websiteStatus === 'SOCIAL_ONLY' ? '🟡 SOCIAL ONLY' : '🟢 HAS WEBSITE')}) · Phone: ${lead.phone || 'N/A'}`,
          lead
        });
      }

      onProgress({ status: 'COMPLETED', message: `Live scraping finished! Extracted ${leads.length} real Bangalore businesses.` });

    } catch (err) {
      console.error('Scraper error:', err);
      if (err instanceof GoogleBlockError) {
        onProgress({ status: 'BLOCKED', message: err.message });
        if (page) await page.close().catch(() => {});
        if (context) await context.close().catch(() => {});
        throw err;
      }
      onProgress({ status: 'ERROR', message: `Scraper error: ${err.message}` });
    } finally {
      if (page && !page.isClosed()) await page.close().catch(() => {});
      if (context) await context.close().catch(() => {});
    }

    return leads;
  }

  /**
   * Best-effort peek at a linked social/directory profile to pull a lightweight
   * activity signal (e.g. Instagram bio/follower text). Never throws.
   */
  async peekSocialProfile(context, url) {
    let socialPage = null;
    try {
      socialPage = await context.newPage();
      await socialPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 12000 });
      await socialPage.waitForTimeout(1500);

      const snippet = await socialPage.evaluate(() => {
        const meta = document.querySelector('meta[name="description"], meta[property="og:description"]');
        return meta ? meta.getAttribute('content') : null;
      });

      return snippet ? snippet.trim().slice(0, 300) : null;
    } catch (e) {
      return null;
    } finally {
      if (socialPage) await socialPage.close().catch(() => {});
    }
  }

  /**
   * Re-visit a previously scraped lead's own Google Maps place page to refresh its
   * website status / rating / reviews, for stale-lead re-verification.
   */
  async recheckLead(googleMapsUrl) {
    if (!googleMapsUrl) return null;
    let context = null;
    let detailPage = null;
    try {
      const browser = await this.initBrowser();
      context = await browser.newContext({
        userAgent: randomUserAgent(),
        viewport: { width: 1280, height: 900 },
        locale: 'en-IN'
      });
      detailPage = await context.newPage();
      await detailPage.goto(googleMapsUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await detailPage.waitForTimeout(2000);

      const details = await detailPage.evaluate(() => {
        const webEl = document.querySelector('a[data-item-id="authority"], a[aria-label*="Website:"]');
        const website = webEl ? webEl.getAttribute('href') : null;

        const ratingEl = document.querySelector('div.F7nice span[aria-hidden="true"]');
        const rating = ratingEl ? parseFloat(ratingEl.textContent.trim()) : null;

        const reviewsEl = document.querySelector('div.F7nice span[aria-label*="review"]');
        let reviews = 0;
        if (reviewsEl) {
          const match = (reviewsEl.getAttribute('aria-label') || reviewsEl.textContent).match(/([\d,]+)/);
          if (match) reviews = parseInt(match[1].replace(/,/g, ''), 10);
        }

        const bodyText = document.body ? document.body.innerText || '' : '';
        const closed = /permanently closed|temporarily closed/i.test(bodyText);

        return { website, rating, reviews, closed };
      });

      return {
        websiteStatus: classifyWebsite(details.website),
        website: details.website || null,
        rating: details.rating,
        reviewsCount: details.reviews,
        closed: details.closed,
        lastVerifiedAt: new Date().toISOString()
      };
    } catch (e) {
      return null;
    } finally {
      if (detailPage) await detailPage.close().catch(() => {});
      if (context) await context.close().catch(() => {});
    }
  }
}

const scraperInstance = new GoogleMapsScraper();
scraperInstance.GoogleBlockError = GoogleBlockError;
module.exports = scraperInstance;
