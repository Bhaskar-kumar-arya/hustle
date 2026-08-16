/**
 * Pitch & Outreach Generator tailored for Bangalore Local Businesses
 */

const { getDemoSiteConfig } = require('../config/nicheDemoSites');

/**
 * Build the absolute, lead-specific demo site URL (or null if that niche's
 * demo site isn't deployed yet), so the WhatsApp pitch always points at the
 * correct business's own preview on that niche's own domain.
 */
function buildDemoUrl(lead) {
  const site = getDemoSiteConfig(lead.nicheId);
  if (!site) return null;

  const params = new URLSearchParams({
    name: lead.name || '',
    locality: lead.locality || '',
    rating: lead.rating || '4.8',
    reviews: lead.reviewsCount || '0',
    phone: lead.phone || '',
    address: lead.address || ''
  });
  if (lead.googleMapsUrl) params.set('mapsUrl', lead.googleMapsUrl);

  return `${site.baseUrl}${site.path}?${params.toString()}`;
}

function formatWhatsAppUrl(phone, message) {
  if (!phone) return null;
  let digits = phone.replace(/[^0-9]/g, '');
  if (digits.length === 10) digits = '91' + digits;
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(message)}`;
}

/**
 * Generate a single unified WhatsApp sales pitch that targets both lead types —
 * NO_WEBSITE (no site at all) and SOCIAL_ONLY (only Justdial/Instagram/etc.) —
 * through one shared "visibility gap" hook instead of two separate messages.
 */
function generateUnifiedPitch(lead) {
  const { name, rating, reviewsCount, locality, category, phone, website, websiteStatus } = lead;
  const demoUrl = buildDemoUrl(lead);
  const ratingText = rating ? `${rating}★` : 'great';
  const reviewsText = reviewsCount ? ` (${reviewsCount}+ reviews)` : '';
  const areaText = locality ? ` in ${locality}, Bangalore` : ' in Bangalore';

  let directoryName = 'Justdial / third-party listings';
  if (website && website.includes('justdial')) directoryName = 'Justdial';
  else if (website && website.includes('magicpin')) directoryName = 'Magicpin';
  else if (website && website.includes('sulekha')) directoryName = 'Sulekha';
  else if (website && website.includes('indiamart')) directoryName = 'IndiaMART';
  else if (website && website.includes('instagram')) directoryName = 'Instagram';

  const presenceGap = websiteStatus === 'SOCIAL_ONLY'
    ? `your online presence is only through *${directoryName}*, not your own official website`
    : `your business *does not yet have an official website* linked on Google`;

  const previewLine = demoUrl
    ? `Here's a live 1-minute preview, built specifically for ${name}:\n${demoUrl}`
    : `Would you be open to a quick 1-minute preview link on WhatsApp? No obligations at all! :)`;

  const message = `Hello ${name} Team! 👋

I came across your profile on Google Maps with an impressive ${ratingText} rating${reviewsText}${areaText} -- congratulations on the fantastic reputation! 🌟

I noticed ${presenceGap}. Here's why that costs you money: when customers search for ${category || 'your services'} in ${locality || 'Bangalore'}, they either can't find you directly, or find you sandwiched between 5-10 competing businesses on a shared directory listing -- same inquiry, same second, price war guaranteed.

I've already built a modern, mobile-friendly website concept for ${name} that sends 100% of customer inquiries exclusively to you.

${previewLine}

Looking forward to hearing from you.
Best regards!`;

  return {
    text: message,
    encodedText: encodeURIComponent(message),
    demoUrl,
    whatsappUrl: formatWhatsAppUrl(phone, message)
  };
}

/**
 * Generate a 60-Second Cold Calling Script
 */
function generateColdCallScript(lead) {
  const { name, locality, category, reviewsCount, rating, website } = lead;
  const hasDirectory = website && (website.includes('justdial') || website.includes('magicpin') || website.includes('sulekha') || website.includes('instagram'));
  
  return {
    introduction: `Hi, good morning! Am I speaking with the founder or manager of ${name}?`,
    hook: `I was admiring your top-rated Google profile in ${locality || 'Bangalore'} (${rating || '4.5'} stars with ${reviewsCount || 'many'} reviews), and saw you have fantastic customer feedback.`,
    theProblem: hasDirectory 
      ? `I noticed you're mainly listed on third-party directories like Justdial/Magicpin. The problem is when clients search on those platforms, your leads get shared with 5 other nearby competitors at the same time.`
      : `When high-ticket clients search on Google for ${category || 'your services'} in ${locality || 'Bangalore'}, you don't have an official direct website linked. You're losing 20-30 direct bookings every month to competitors.`,
    theOffer: `I build high-converting, modern websites for Bangalore businesses that deliver 100% exclusive customer leads directly to your WhatsApp with zero shared competitors. I've already designed a sample mobile preview for ${name}.`,
    callToAction: `Can I send you a 1-minute preview link on your WhatsApp so you can take a look whenever you're free? What is the best WhatsApp number?`
  };
}

/**
 * Generate an Email Pitch
 */
function generateEmailPitch(lead) {
  const { name, locality, category, rating, reviewsCount } = lead;
  const subject = `Stop losing leads to competitors: Custom website concept for ${name}`;
  const body = `Hi ${name} Team,

I came across ${name} while searching for top-rated ${category || 'businesses'} in ${locality || 'Bangalore'}. Your ${rating || '4.5'} star rating with ${reviewsCount || 'great'} reviews shows you provide fantastic quality.

However, I noticed that you don't currently have an official website linked to your Google listing. 

In Bangalore's competitive market, relying solely on directory listings (like Justdial/Magicpin) means your customer inquiries get shared with 5-10 other competitors, triggering unnecessary price wars.

With your own official website:
- 100% of customer calls and WhatsApp bookings are exclusive to you.
- You build lasting brand equity in Bangalore.
- High-ticket clients trust you immediately over competitors.

I have already put together an interactive mobile-ready website mockup tailored specifically for ${name}.

Would you be open to reviewing a quick 1-minute preview link? If so, reply here or on WhatsApp and I'll send it right over.

Best regards,
Bangalore Web Growth & Design`;

  return { subject, body };
}

/**
 * Calculate Lead Opportunity Score (0 - 100)
 */
function calculateLeadScore(lead) {
  let score = 50; // Base score

  // Missing website is prime opportunity
  if (lead.websiteStatus === 'NO_WEBSITE') {
    score += 25;
  } else if (lead.websiteStatus === 'SOCIAL_ONLY') {
    score += 20; // Directory & Social only are very high converting!
  }

  // Review Count factor (shows established revenue & customer flow)
  const reviews = parseInt(lead.reviewsCount) || 0;
  if (reviews >= 100) score += 15;
  else if (reviews >= 50) score += 10;
  else if (reviews >= 20) score += 5;

  // Rating factor (reputable businesses care about their brand)
  const rating = parseFloat(lead.rating) || 0;
  if (rating >= 4.5) score += 10;
  else if (rating >= 4.0) score += 5;

  // Phone availability for instant outreach
  if (lead.phone && lead.phone.trim().length >= 10) {
    score += 10;
  }

  return Math.min(100, Math.max(10, score));
}

module.exports = {
  generateUnifiedPitch,
  generateColdCallScript,
  generateEmailPitch,
  calculateLeadScore
};
