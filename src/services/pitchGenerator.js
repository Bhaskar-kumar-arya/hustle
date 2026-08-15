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
 * Generate a WhatsApp sales pitch for a business lacking a website
 */
function generateWhatsAppPitch(lead) {
  const { name, rating, reviewsCount, locality, category, phone } = lead;
  const demoUrl = buildDemoUrl(lead);
  const ratingText = rating ? `${rating}★` : 'great';
  const reviewsText = reviewsCount ? ` (${reviewsCount}+ reviews)` : '';
  const areaText = locality ? ` in ${locality}, Bangalore` : ' in Bangalore';

  // Tailored hook based on category
  const cat = (category || '').toLowerCase();
  let specificBenefit = 'showcase your services and accept direct customer bookings/inquiries 24/7';
  if (cat.includes('dental')) {
    specificBenefit = 'allow patients to book dental appointments and view smile transformation results online';
  } else if (cat.includes('interior') || cat.includes('architect')) {
    specificBenefit = 'showcase your stunning 3D design portfolio and get high-ticket interior design inquiries directly';
  } else if (cat.includes('salon')) {
    specificBenefit = 'display your service rate card, bridal packages, and let clients book salon appointments on WhatsApp';
  } else if (cat.includes('pet')) {
    specificBenefit = 'offer online vet appointment booking, emergency contact, and pet care service details';
  } else if (cat.includes('car')) {
    specificBenefit = 'showcase before/after ceramic coating gloss results and let car owners get instant detailing estimates';
  } else if (cat.includes('ayurved')) {
    specificBenefit = 'explain Panchakarma treatment packages and allow patients to book doctor consultations';
  }

  const previewLine = demoUrl
    ? `Here's a live 1-minute preview, built specifically for ${name}:\n${demoUrl}`
    : `Would you be open to a quick 2-minute preview link on WhatsApp? No obligations at all! :)`;

  const message = `Hello ${name} Team! 👋

I came across your profile on Google Maps with an impressive ${ratingText} rating${reviewsText}${areaText} -- congratulations on the fantastic customer reputation! 🌟

While searching for ${category || 'your services'} in ${locality || 'Bangalore'}, I noticed that your business *does not yet have an official website* linked on Google.

Every day, dozens of high-value customers searching on Google end up choosing competitors simply because they have a professional website where they can browse instantly.

I am a Bangalore-based web designer, and I have already put together a *modern, mobile-friendly website demo concept* for ${name} to ${specificBenefit}.

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
 * Generate a Specialized "Justdial / Shared Directory Trap" WhatsApp Pitch
 */
function generateJustdialPitch(lead) {
  const { name, locality, category, phone, rating, reviewsCount, website } = lead;
  const demoUrl = buildDemoUrl(lead);
  const ratingText = rating ? `${rating}★` : '4.8★';
  const reviewsText = reviewsCount ? ` with ${reviewsCount}+ reviews` : '';
  const areaText = locality ? ` in ${locality}, Bangalore` : ' in Bangalore';

  let directoryName = 'Justdial / third-party listings';
  if (website && website.includes('justdial')) directoryName = 'Justdial';
  else if (website && website.includes('magicpin')) directoryName = 'Magicpin';
  else if (website && website.includes('sulekha')) directoryName = 'Sulekha';
  else if (website && website.includes('indiamart')) directoryName = 'IndiaMART';
  else if (website && website.includes('instagram')) directoryName = 'Instagram';

  const message = `Hi ${name} Team! 👋

I was looking at your top-rated profile${areaText} (${ratingText}${reviewsText}) -- your work in ${category || 'your field'} is truly top tier! 🌟

I noticed your online presence currently relies on *${directoryName}* rather than your own official website.

Here is the biggest issue with directory listings:
1) *Shared Leads Trap:* When customers search on directories, they broadcast that same customer inquiry to 5-10 other competitors at the exact same second, causing price wars.
2) *Competitor Ads:* Directory platforms place ads for other nearby businesses right on your listing page!

With your own *official custom website*, 100% of customer inquiries and WhatsApp bookings come exclusively to YOU -- zero competitors, zero shared leads, and total brand authority. 🚀

I've already built a clean, fast 1-page website concept customized for ${name}.

${demoUrl ? `Here's a live 1-minute preview, built specifically for ${name}:\n${demoUrl}` : 'Would you like a 1-minute WhatsApp preview link? No pressure or obligation at all! :)'}`;

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
  generateWhatsAppPitch,
  generateJustdialPitch,
  generateColdCallScript,
  generateEmailPitch,
  calculateLeadScore
};
