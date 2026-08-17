/*
  content.js — the single source of all client data. See CONTENT-DATA.md.
  Every value marked MOCK is invented/assumed and must be confirmed or replaced
  before launch. Replacing real data should touch only this file — CONVENTIONS.md §3.

  MOCK markers live in the comments here, never inside a rendered value: a
  "MOCK:" prefix baked into the copy shows up verbatim on the client's phone
  during the pitch and makes a finished site read as a draft. The pitch calls
  out which content is placeholder out loud instead — CONVENTIONS §4.

  A value the client hasn't supplied yet (email, parking, maps link, socials)
  is `null`, not a placeholder dash. main.js hides the element that binds a
  null value, so nothing renders as an empty or stubbed line.
*/

export const clinic = {
  name: "Akshaya Multispeciality Dental Clinic",
  nameFull: "Akshaya Multispeciality Dental Clinic — Dental Implants & LASER",
  tagline: "Dental implants and gum treatment, both delivered with laser.", // MOCK
  // MOCK: domain not yet registered, Open question #12 — every canonical URL,
  // OG/Twitter tag and JSON-LD @id/url on the site is built from this one
  // value (see gen_meta_tags.py, run once during S11) so the eventual real
  // domain swap only needs this string changed here and the static script
  // re-run, per CONVENTIONS §3's single-file-edit rule.
  siteUrl: "https://www.akshayadentalclinic.in",
  locality: "Hulimavu",
  city: "Bengaluru",
  state: "Karnataka",
  address: {
    line1: "Bhagyalakshmi Avenue, Rukmaiah Layout",
    line2: "Hulimavu, Bengaluru, Karnataka 560114",
    pincode: "560114",
    landmark: null, // pending client call
    mapsUrl: null, // pending Google Business Profile listing
    geo: { lat: null, lng: null }, // MOCK: from Google Business Profile listing
  },
  phone: "+919538827905",
  phoneDisplay: "+91 95388 27905",
  whatsapp: "919538827905",
  email: null, // pending client call
  rating: 4.9,
  reviewCount: 1465,
  foundedYear: 2015, // MOCK
  hours: [
    { day: "Monday", open: "09:30", close: "20:00", closed: false }, // MOCK
    { day: "Tuesday", open: "09:30", close: "20:00", closed: false }, // MOCK
    { day: "Wednesday", open: "09:30", close: "20:00", closed: false }, // MOCK
    { day: "Thursday", open: "09:30", close: "20:00", closed: false }, // MOCK
    { day: "Friday", open: "09:30", close: "20:00", closed: false }, // MOCK
    { day: "Saturday", open: "09:30", close: "20:00", closed: false }, // MOCK
    { day: "Sunday", open: "10:00", close: "14:00", closed: false }, // MOCK
  ],
  languages: ["Kannada", "English", "Hindi", "Tamil", "Telugu"], // MOCK
  parking: null, // pending client call
  social: {
    google: null,
    instagram: null,
    facebook: null,
  },
};

export const about = {
  // MOCK ×2 — clinic story and philosophy, pending client call, Open question #5.
  story:
    "Akshaya Multispeciality Dental Clinic opened in Hulimavu in 2015, built around dental implants and periodontal care. Laser technique was adopted early, for gum and implant work where it's the better tool for the job. The practice has grown one referral at a time, treated on the same two specialisms since day one.",
  philosophy:
    "Every visit starts with a full clinical examination before any treatment is planned — nothing is prescribed on the first look. Where laser suits the procedure, it's used; where it doesn't, conventional technique is used instead. The choice is made case by case, not treatment by treatment.",
};

export const facility = [
  // MOCK ×4 — facility photography pending, Open question #11. Labels are a shot list.
  { label: "Reception & waiting area" },
  { label: "Consultation room" },
  { label: "Treatment operatory" },
  { label: "Sterilisation room" },
];

export const patientInfo = {
  // MOCK ×6 — first-visit/payment/emergency specifics pending client call, Open question #14.
  firstVisit: [
    "A short conversation about what's bothering you, before anything else.",
    "A clinical examination, and an X-ray if the dentist needs one to see clearly.",
    "A plan explained in plain language before any treatment starts.",
    "Costs are discussed upfront — nothing is billed as a surprise.",
  ],
  whatToBring: [
    "Any prior X-rays or dental records you have",
    "A list of current medications",
    "Your insurance card, if applicable",
    "A little extra time for your first visit — it usually runs longer than a review",
  ],
  payment: ["Cash", "UPI", "Credit & debit cards", "EMI on select treatments"],
  emiNote: "EMI is available on select treatments through third-party partners — ask at your consultation.",
  insurance: "Direct insurance billing isn't set up yet — ask at the clinic about reimbursement support for your policy.",
  emergency: "Call the clinic directly for a dental emergency. If you can't reach anyone, describe the issue over WhatsApp and the team will advise on next steps.",
};

export const flags = {
  showPricing: false, // cost block is built but hidden until client confirms
  showBlog: true,
  showDoctorPages: true, // individual pages when a doctor has enough content
};

export const analytics = {
  // No GA4 property yet — analytics.js only loads gtag.js when this is a real
  // "G-" ID (see analytics.js), so an empty value fires no network request.
  // Open question — add to the client call (no launch date yet).
  ga4MeasurementId: "",
};

export const doctors = [
  {
    slug: "dr-sampath-kumar-rao-k",
    name: "Dr. Sampath Kumar Rao K", // verified, CONTENT-DATA §1
    degrees: "MDS", // verified
    specialisation: "Oral Implantologist · Periodontist · LASER Specialist", // verified
    isPrincipal: true, // renders the --principal card variant
    registrationNo: null, // ⚠️ pending — get the real DCI/state council reg. no. before launch; renders as "Reg. no. on file at clinic" until set (see main.js formatRegNo)
    practisingSince: null, // ⚠️ MOCK — never render a years count, see CONVENTIONS §1
    treatments: ["dental-implants", "gum-treatment", "laser-gingivoplasty", "laser-dentistry", "laser-rct", "root-canal", "dental-restoration", "crowns-and-bridges", "braces-and-aligners", "teeth-whitening", "kids-dentistry"],
    bio: "Leads implant and periodontal care at the clinic, applying laser technique across both.", // MOCK
    photo: "assets/img/doctors/placeholder.webp",
  },
  // Verification (CONTENT-DATA §1) indicates this is a single-practitioner
  // clinic — every public listing and review names only Dr. Sampath, with
  // no associates found. The two invented associate doctors previously
  // here (Dr. Anitha Rao, Dr. Farah Khan) were removed for that reason —
  // showing fabricated colleagues to the client is worse than showing one
  // real doctor. If the clinic call confirms associate dentists, re-add
  // real entries here (never MOCK ones) and this array becomes a genuine
  // multi-doctor grid again; the doctor-grid CSS already supports N cards.
];

export const equipment = [
  // MOCK ×4 — equipment list + model names pending client call, Open question #6.
  {
    name: "Diode laser unit",
    benefit: "Used for gum contouring and canal disinfection with a focused light beam in place of a blade.",
    photo: "assets/img/equipment/placeholder.webp",
  },
  {
    name: "Digital OPG X-ray",
    benefit: "A single rotating scan images the full jaw, reducing retakes and radiation compared to individual films.",
    photo: "assets/img/equipment/placeholder.webp",
  },
  {
    name: "Autoclave sterilizer",
    benefit: "Every reusable instrument is steam-sterilised between patients before it's used again.",
    photo: "assets/img/equipment/placeholder.webp",
  },
  {
    name: "Intraoral scanner",
    benefit: "Digital impressions replace the traditional putty tray for crowns, bridges and aligners.",
    photo: "assets/img/equipment/placeholder.webp",
  },
];

export const sterilisation = [
  // MOCK ×4 — protocol specifics pending client call, Open question #7.
  "Reusable instruments autoclave-sterilised between every patient",
  "Single-use needles, gloves and suction tips, disposed of after one use",
  "Treatment surfaces disinfected before each appointment",
  "Personal protective equipment worn throughout every procedure",
];

/*
  Ordered by pillar first, then search demand — not laser-first. Laser is the
  method the two pillars (implants, gum treatment) are delivered with, not a
  category of its own. See CONTENT-DATA.md §5 and DESIGN-SYSTEM.md §1.

  MOCK, every entry: `slug`, `name` and `confirmed` are verified against the
  clinic's public listings (CONTENT-DATA §1); every prose field below —
  summary, sittings, duration, signs, steps, aftercare, faqs, costRange — is
  written to the DCI-compliant house style and pending client confirmation,
  Open questions #3 and #6.
*/
export const treatments = [
  {
    slug: "dental-implants",
    name: "Dental Implants",
    isLaser: true, // MOCK: per DESIGN-SYSTEM §1 both pillars are laser-delivered — confirm exact protocol with client
    confirmed: true, // verified offered, CONTENT-DATA §1
    isHub: false,
    order: 1,
    summary: "Titanium implant placement for single or multiple missing teeth, planned and placed using laser-assisted technique.",
    sittings: "multiple, across weeks",
    duration: "45–90 min per visit",
    signs: [
      "One or more missing teeth",
      "Difficulty chewing on one side",
      "A loose or ill-fitting denture",
      "Bone loss visible on an X-ray under a gap in your teeth",
    ],
    steps: [
      { title: "Consultation & scan", desc: "Examination and a 3D scan to assess bone volume and plan implant position." },
      { title: "Treatment planning", desc: "The number of implants, position and stage sequence is set out before any procedure begins." },
      { title: "Implant placement", desc: "The implant post is placed into the jaw using laser-assisted technique under local anaesthesia." },
      { title: "Healing period", desc: "A period of weeks for the implant to integrate with the surrounding bone." },
      { title: "Crown fitting", desc: "A custom crown is fitted onto the healed implant to complete the tooth." },
    ],
    aftercare: [
      "Soft food for the first few days after placement",
      "Avoid smoking during the healing period",
      "Maintain routine brushing and flossing around the site",
      "Attend follow-up visits to monitor integration",
    ],
    faqs: [
      { q: "How many visits does an implant take?", a: "Placement and crown fitting are separate visits, spaced weeks apart to allow healing. Suitability is determined by clinical examination." },
      { q: "Is bone grafting always needed?", a: "Only where the scan shows insufficient bone volume at the implant site. Suitability is determined by clinical examination." },
      { q: "Can one implant replace several missing teeth?", a: "A bridge can be attached across multiple implants depending on the case." },
      { q: "What is the implant made of?", a: "Titanium, a material widely used for its compatibility with bone tissue." },
      { q: "Is the procedure done under laser or local anaesthesia?", a: "Placement is performed under local anaesthesia, with laser-assisted technique used during the procedure." },
    ],
    costRange: { min: 25000, max: 45000, unit: "per implant", emi: true }, // MOCK: pending client pricing confirmation, Open question #3
    related: ["gum-treatment", "crowns-and-bridges"],
  },
  {
    slug: "gum-treatment",
    name: "Gum & Periodontal Treatment",
    isLaser: true,
    confirmed: true, // verified offered ("Periodontal Surgeries"), CONTENT-DATA §1
    isHub: false,
    order: 2,
    summary: "Periodontal treatment for gum disease and gum contouring, delivered with laser gingivoplasty.",
    sittings: "1–2",
    duration: "30–45 min",
    signs: [
      "Bleeding gums when brushing or flossing",
      "Gum recession or tooth sensitivity",
      "Persistent bad breath",
      "Gums that look red, swollen or pull away from the teeth",
    ],
    steps: [
      { title: "Periodontal examination", desc: "Gum pocket depths are measured and charted to assess the extent of the condition." },
      { title: "Scaling & root planing", desc: "Plaque and tartar are removed from below the gumline." },
      { title: "Laser gingivoplasty", desc: "Laser is used to reshape or treat affected gum tissue, in place of a scalpel, where indicated." },
      { title: "Post-procedure review", desc: "Gum healing is checked at a short follow-up visit." },
      { title: "Maintenance plan", desc: "A cleaning schedule is set to keep the treated area healthy." },
    ],
    aftercare: [
      "Gentle brushing around the treated area for the first few days",
      "Avoid hard or crunchy food until advised otherwise",
      "Use any prescribed rinse as directed",
      "Attend the follow-up review visit",
    ],
    faqs: [
      { q: "Is laser gum treatment the same as gum surgery?", a: "Laser gingivoplasty is a periodontal procedure that reshapes gum tissue using a focused beam instead of a blade. Suitability is determined by clinical examination." },
      { q: "Will I need sutures?", a: "The laser seals small blood vessels along its path, so sutures are often not required." },
      { q: "How many sittings does gum treatment take?", a: "Most cases are completed in one to two sittings depending on the extent of treatment needed." },
      { q: "Is anaesthesia used?", a: "Local anaesthesia is used where required; many laser procedures need less than a conventional approach." },
      { q: "How often should I return after treatment?", a: "A maintenance cleaning schedule is set at your review visit." },
    ],
    costRange: { min: 3000, max: 12000, unit: "per session", emi: false }, // MOCK: pending client pricing confirmation, Open question #3
    related: ["laser-gingivoplasty", "dental-implants"],
  },
  {
    slug: "laser-gingivoplasty",
    name: "Laser Gingivoplasty",
    isLaser: true,
    confirmed: true,
    isHub: false,
    order: 3,
    summary: "Laser reshaping of gum contour with minimal bleeding.",
    sittings: "1",
    duration: "20–30 min",
    signs: [
      "Uneven or excess gum tissue",
      "A gum line that shows more tissue than tooth",
      "Gum contour affecting how a crown or veneer fits",
    ],
    steps: [
      { title: "Examination & marking", desc: "The desired gum contour is assessed and marked before treatment." },
      { title: "Local anaesthesia", desc: "Applied where required before the laser is used." },
      { title: "Laser reshaping", desc: "The laser trims and contours gum tissue along the marked line." },
      { title: "Same-visit check", desc: "The contour is reviewed before you leave the chair." },
    ],
    aftercare: [
      "Gentle brushing around the treated area for a few days",
      "Avoid spicy or acidic food until any sensitivity settles",
      "Attend a follow-up visit if one is scheduled",
    ],
    faqs: [
      { q: "Does laser gingivoplasty need sutures?", a: "The laser seals small blood vessels along its path, so sutures are often not required." },
      { q: "How long does recovery take?", a: "Most patients resume normal brushing and eating within a few days. Suitability is determined by clinical examination." },
      { q: "Can this be done alongside a crown or veneer fitting?", a: "Gum contouring is sometimes carried out before a restoration to improve its fit — this is planned case by case." },
      { q: "Is anaesthesia always needed?", a: "Many laser gingivoplasty procedures are performed with little or no anaesthesia; this is confirmed at examination." },
    ],
    costRange: { min: 3000, max: 8000, unit: "per session", emi: false }, // MOCK: pending client pricing confirmation, Open question #3
    related: ["gum-treatment", "laser-dentistry"],
  },
  {
    slug: "laser-dentistry",
    name: "Laser Dentistry",
    isLaser: true,
    confirmed: true,
    isHub: true,
    order: 4,
    summary: "Diode-laser procedures across cavity treatment, gum contouring and root canal disinfection.",
    sittings: "1–2",
    duration: "30–45 min",
    signs: [
      "Considering an implant, gum, or root canal procedure",
      "Wanting to know which of your treatments the laser applies to",
      "Currently on medication that affects bleeding or healing",
    ],
    steps: [
      { title: "Examination", desc: "Your dentist confirms which of your procedures the laser is suitable for." },
      { title: "Anaesthesia, if required", desc: "Applied only where the specific procedure calls for it." },
      { title: "Laser-assisted procedure", desc: "The diode laser is used within the procedure you're having — gum contouring, canal disinfection, or implant placement." },
      { title: "Same-visit review", desc: "The treated area is checked before you leave." },
    ],
    aftercare: [
      "Aftercare follows the specific procedure performed (see that treatment's page)",
      "Routine brushing and flossing once any local sensitivity settles",
    ],
    faqs: [
      { q: "Is laser dentistry a treatment on its own?", a: "No — laser is the method used within implant, gum and root canal procedures, not a separate treatment." },
      { q: "Which procedures use the laser here?", a: "Dental implants, gum & periodontal treatment, laser gingivoplasty and laser root canal all use laser technique at this clinic." },
      { q: "Is laser dentistry suitable for everyone?", a: "Suitability is determined by clinical examination for each procedure." },
      { q: "Does laser mean no anaesthesia at all?", a: "Not always — some laser procedures still use local anaesthesia; others often need less. This is confirmed at examination." },
    ],
    costRange: null, // not applicable — laser-dentistry is a method hub, pricing sits on the individual procedure pages
    related: ["laser-rct", "laser-gingivoplasty"],
  },
  {
    slug: "root-canal",
    name: "Root Canal Treatment",
    isLaser: false,
    confirmed: true,
    isHub: false,
    order: 5,
    summary: "Conventional root canal treatment under local anaesthesia.",
    sittings: "1–2",
    duration: "45–60 min",
    signs: [
      "Persistent tooth pain, especially when chewing",
      "Sensitivity to hot or cold that lingers after the stimulus is gone",
      "A darkening tooth",
      "Swelling or tenderness in the gum near a tooth",
    ],
    steps: [
      { title: "Diagnosis & X-ray", desc: "An X-ray confirms the extent of infection and the canal structure." },
      { title: "Local anaesthesia", desc: "The tooth and surrounding area are numbed before treatment begins." },
      { title: "Cleaning & shaping the canal", desc: "Infected pulp tissue is removed and the canal is cleaned and shaped." },
      { title: "Filling & sealing", desc: "The cleaned canal is filled and sealed to prevent reinfection." },
      { title: "Crown or restoration", desc: "A crown or filling is placed to restore the tooth's shape and strength." },
    ],
    aftercare: [
      "Avoid chewing on the treated tooth until it's fully restored",
      "Mild soreness for a few days is common; over-the-counter pain relief may be advised",
      "Attend the follow-up visit for a permanent crown or filling",
      "Maintain routine brushing and flossing",
    ],
    faqs: [
      { q: "How many visits does a root canal take?", a: "Many cases are completed in a single sitting; some require a follow-up visit depending on the tooth. Suitability is determined by clinical examination." },
      { q: "Is anaesthesia used throughout?", a: "Local anaesthesia is used during the cleaning and shaping stage." },
      { q: "Do I need a crown afterwards?", a: "Most root-canal-treated teeth are capped with a crown or filling to restore strength." },
      { q: "What's the difference from laser root canal?", a: "This is the conventional approach; the laser variant adds laser-assisted canal disinfection. See the laser root canal page." },
    ],
    costRange: { min: 4000, max: 9000, unit: "per tooth", emi: false }, // MOCK: pending client pricing confirmation, Open question #3
    related: ["laser-rct"],
  },
  {
    slug: "laser-rct",
    name: "Laser Root Canal",
    isLaser: true,
    confirmed: true,
    isHub: false,
    order: 6,
    summary: "Root canal treatment with laser-assisted canal disinfection under local anaesthesia.",
    sittings: "1",
    duration: "45–60 min",
    signs: [
      "Persistent tooth pain, especially when chewing",
      "Sensitivity to hot or cold that lingers after the stimulus is gone",
      "A darkening tooth",
      "Swelling or tenderness in the gum near a tooth",
    ],
    steps: [
      { title: "Diagnosis & X-ray", desc: "An X-ray confirms the extent of infection and the canal structure." },
      { title: "Local anaesthesia", desc: "Applied before treatment; laser-assisted cases often need less." },
      { title: "Laser-assisted disinfection", desc: "The laser is used alongside standard instrumentation to disinfect the canal." },
      { title: "Filling & sealing", desc: "The cleaned canal is filled and sealed in the same sitting." },
      { title: "Crown or restoration", desc: "A crown or filling is placed to restore the tooth's shape and strength." },
    ],
    aftercare: [
      "Avoid chewing on the treated tooth until it's fully restored",
      "Mild soreness for a few days is common; over-the-counter pain relief may be advised",
      "Attend the follow-up visit for a permanent crown or filling",
      "Maintain routine brushing and flossing",
    ],
    faqs: [
      { q: "How is laser root canal different from a conventional one?", a: "The laser is used for canal disinfection alongside standard root canal instrumentation. Suitability is determined by clinical examination." },
      { q: "Is it completed in one visit?", a: "Many laser root canal cases are completed in a single sitting; this depends on the tooth." },
      { q: "Is anaesthesia still needed?", a: "Local anaesthesia is used where required; laser-assisted cases often need less than a conventional approach." },
      { q: "Do I need a crown afterwards?", a: "Most root-canal-treated teeth are capped with a crown or filling to restore strength." },
    ],
    costRange: { min: 6000, max: 12000, unit: "per tooth", emi: false }, // MOCK: pending client pricing confirmation, Open question #3
    related: ["laser-dentistry", "root-canal"],
  },
  {
    slug: "crowns-and-bridges",
    name: "Crowns & Bridges",
    isLaser: false,
    confirmed: true, // verified offered, CONTENT-DATA §1
    isHub: false,
    order: 7,
    summary: "Fixed prosthetics to cap or replace damaged or missing teeth.",
    sittings: "2",
    duration: "45–60 min per visit",
    signs: [
      "A tooth that's cracked, chipped, or worn down",
      "One or more missing teeth",
      "A tooth weakened after a root canal",
      "A large filling that no longer supports the tooth",
    ],
    steps: [
      { title: "Consultation & shade matching", desc: "The tooth or gap is assessed and a shade is matched to the surrounding teeth." },
      { title: "Tooth preparation", desc: "The tooth is reshaped, or adjacent teeth prepared to anchor a bridge." },
      { title: "Impression or digital scan", desc: "An impression is taken and sent for the crown or bridge to be fabricated." },
      { title: "Temporary crown fitted", desc: "A temporary crown protects the prepared tooth while the permanent one is made." },
      { title: "Permanent crown or bridge cemented", desc: "The finished piece is checked for fit and bite, then cemented in place." },
    ],
    aftercare: [
      "Avoid hard or sticky foods while wearing a temporary crown",
      "Mild sensitivity for a few days after cementing is common",
      "Maintain routine brushing and flossing around the crown or bridge",
      "Attend the review visit to confirm fit",
    ],
    faqs: [
      { q: "How long does a crown or bridge last?", a: "Longevity depends on care and bite; your dentist will advise on maintenance at review." },
      { q: "Will I be without a tooth between visits?", a: "A temporary crown is fitted at the first visit so the tooth is covered while the permanent piece is made." },
      { q: "Is a crown the same as a bridge?", a: "A crown caps a single tooth; a bridge spans a gap using the neighbouring teeth as anchors." },
      { q: "Does getting a crown hurt?", a: "Local anaesthesia is used during tooth preparation. Suitability is determined by clinical examination." },
      { q: "What materials are available?", a: "Options are discussed at consultation based on the tooth's location and function." },
    ],
    costRange: { min: 8000, max: 15000, unit: "per unit", emi: true }, // MOCK: pending client pricing confirmation, Open question #3
    related: ["dental-implants", "dental-restoration"],
  },
  {
    slug: "dental-restoration",
    name: "Dental Restoration",
    isLaser: false,
    confirmed: true,
    isHub: false,
    order: 8,
    summary: "Tooth-coloured fillings and restorative work for decayed or damaged teeth.",
    sittings: "1",
    duration: "30–45 min",
    signs: [
      "A visible cavity or dark spot on a tooth",
      "Sensitivity to sweet, hot, or cold food",
      "Food repeatedly catching in one spot",
      "A small chip or fracture in a tooth",
    ],
    steps: [
      { title: "Examination & X-ray", desc: "The tooth is examined and an X-ray taken if the extent of decay isn't visible directly." },
      { title: "Local anaesthesia if required", desc: "The area is numbed if the cavity is close to the nerve." },
      { title: "Decay removal", desc: "Decayed tooth structure is removed and the cavity cleaned." },
      { title: "Tooth-coloured filling placed", desc: "The filling material is placed in layers and shaped to match the tooth." },
      { title: "Bite check & polish", desc: "The bite is checked and the filling polished smooth." },
    ],
    aftercare: [
      "Avoid chewing on the filled tooth for a couple of hours",
      "Mild sensitivity for a day or two is common",
      "Maintain routine brushing and flossing",
      "Attend routine check-ups so new decay is caught early",
    ],
    faqs: [
      { q: "Will the filling match my tooth colour?", a: "Tooth-coloured filling material is shade-matched to the surrounding tooth." },
      { q: "Is a filling done in one visit?", a: "Most single-tooth fillings are completed in one sitting." },
      { q: "Does it hurt to get a filling?", a: "Local anaesthesia is used where the cavity is close to the nerve. Suitability is determined by clinical examination." },
      { q: "How long does a filling last?", a: "This depends on the tooth and how it's cared for afterwards; your dentist will advise at review." },
    ],
    costRange: { min: 1500, max: 3500, unit: "per tooth", emi: false }, // MOCK: pending client pricing confirmation, Open question #3
    related: ["crowns-and-bridges"],
  },
  {
    slug: "braces-and-aligners",
    name: "Braces & Aligners",
    isLaser: false,
    confirmed: true, // verified offered ("Invisible Braces", "Orthodontic Treatment"), CONTENT-DATA §1
    isHub: false,
    order: 9,
    summary: "Fixed braces and clear-aligner options for teeth alignment.",
    sittings: "ongoing, monthly review",
    duration: "30 min per visit",
    signs: [
      "Crowded or crooked teeth",
      "A visible gap between teeth",
      "A bite that doesn't line up evenly (over- or under-bite)",
      "Difficulty cleaning between crowded teeth",
    ],
    steps: [
      { title: "Consultation & records", desc: "X-rays, scans, and photographs are taken to plan the treatment." },
      { title: "Treatment plan", desc: "A fixed-braces or clear-aligner plan is worked out based on the case." },
      { title: "Fitting", desc: "Braces are bonded, or the first set of aligners is issued." },
      { title: "Periodic adjustment visits", desc: "Regular visits adjust wires or move to the next aligner set." },
      { title: "Retainer phase", desc: "A retainer is fitted after active treatment to hold the new position." },
    ],
    aftercare: [
      "Attend monthly review appointments",
      "Maintain thorough oral hygiene around brackets or under aligners",
      "Wear the retainer as advised once treatment is complete",
      "Avoid hard or sticky foods with fixed braces",
    ],
    faqs: [
      { q: "How long does orthodontic treatment take?", a: "Duration varies by case and is discussed at the consultation." },
      { q: "Are clear aligners available?", a: "Yes, alongside conventional fixed braces. Suitability is determined by clinical examination." },
      { q: "Do braces hurt?", a: "Some pressure after adjustment visits is common and settles within a few days." },
      { q: "Do I need a retainer afterwards?", a: "Yes — a retainer phase follows active treatment to hold the result." },
      { q: "Can adults get braces?", a: "Yes, orthodontic treatment isn't limited by age; suitability is assessed at examination." },
    ],
    costRange: { min: 25000, max: 55000, unit: "full treatment", emi: true }, // MOCK: pending client pricing confirmation, Open question #3
    related: ["teeth-whitening"],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening & Smile Design",
    isLaser: false,
    confirmed: true, // verified offered ("Teeth Whitening"), CONTENT-DATA §1
    isHub: false,
    order: 10,
    summary: "In-clinic whitening and cosmetic smile design consultation.",
    sittings: "1",
    duration: "45–60 min",
    signs: [
      "Staining from tea, coffee, or tobacco use",
      "Teeth that have yellowed gradually with age",
      "An uneven shade across the front teeth",
      "Wanting a brighter smile ahead of an occasion",
    ],
    steps: [
      { title: "Shade assessment", desc: "The current tooth shade is recorded and suitability for whitening checked." },
      { title: "Scaling & cleaning", desc: "Surface plaque and tartar are cleaned first, if needed, so whitening is even." },
      { title: "Whitening gel application", desc: "A whitening agent is applied to the teeth under controlled conditions." },
      { title: "In-chair activation", desc: "The gel is left to work for the planned duration." },
      { title: "Shade check & aftercare guidance", desc: "The new shade is checked and aftercare advice given." },
    ],
    aftercare: [
      "Avoid staining foods and drinks for about 48 hours",
      "Mild sensitivity for a short period afterwards is common",
      "Avoid tobacco to keep the result longer",
      "A touch-up session may be advised over time",
    ],
    faqs: [
      { q: "Is whitening safe for enamel?", a: "In-clinic whitening is carried out under controlled conditions. Suitability is determined by clinical examination." },
      { q: "How long does whitening take?", a: "A single in-chair session is typical; your dentist will confirm at consultation." },
      { q: "Will sensitivity occur?", a: "Some temporary sensitivity is common and usually settles within a day or two." },
      { q: "How long does the result last?", a: "This varies with diet and habits like tobacco use; touch-ups can extend the result." },
    ],
    costRange: { min: 6000, max: 12000, unit: "per session", emi: false }, // MOCK: pending client pricing confirmation, Open question #3
    related: ["braces-and-aligners"],
  },
  {
    slug: "kids-dentistry",
    name: "Kids Dentistry",
    isLaser: false,
    confirmed: true, // verified offered ("Pediatric Dentistry"), CONTENT-DATA §1
    isHub: false,
    order: 11,
    summary: "Preventive and restorative dental care for children.",
    sittings: "varies",
    duration: "20–30 min",
    signs: [
      "A milk tooth cavity or dark spot",
      "A routine check-up is due",
      "Thumb-sucking or a habit continuing past the usual age",
      "A first visit around the eruption of the first molars",
    ],
    steps: [
      { title: "Gentle introduction", desc: "A first visit familiarises the child with the clinic before any treatment." },
      { title: "Assessment & parent consultation", desc: "The child's teeth are examined and findings discussed with the parent." },
      { title: "Preventive care", desc: "Cleaning, fluoride application, or sealants are carried out where advised." },
      { title: "Restorative treatment if needed", desc: "Any cavities are treated using child-appropriate techniques." },
      { title: "Home-care guidance", desc: "Parents are given brushing and diet guidance for ongoing care at home." },
    ],
    aftercare: [
      "Maintain twice-daily brushing with an age-appropriate toothpaste",
      "Limit sugary snacks and drinks between meals",
      "Keep to routine six-month check-ups",
      "Follow any specific instructions given after treatment",
    ],
    faqs: [
      { q: "At what age should my child first visit the dentist?", a: "Around the eruption of the first molars, or earlier if a concern comes up." },
      { q: "Is treatment different for milk teeth?", a: "Yes, techniques are adapted for a child's age and the tooth involved." },
      { q: "Do milk tooth cavities need treatment?", a: "Yes — an untreated cavity can affect the tooth and the permanent tooth developing beneath it." },
      { q: "How can I prepare my child for their first visit?", a: "Keeping the visit low-key and positive helps; the first appointment is a gentle introduction, not treatment." },
    ],
    costRange: { min: 500, max: 3000, unit: "per visit", emi: false }, // MOCK: pending client pricing confirmation, Open question #3
    related: ["dental-restoration"],
  },
];

// Treatments verified as offered (CONTENT-DATA §1) but not given their own page —
// folded into the treatments hub instead. See CONTENT-DATA §5.
export const alsoOffered = [
  "Dentures — complete & partial",
  "Veneers & laminates",
  "Wisdom tooth extraction",
  "Scaling & polishing",
  "Tooth extraction",
  "Minor oral surgery",
];

export const reviews = [
  // MOCK excerpts until the Google reviews embed is wired in (S5/S9).
  {
    author: "Priya S.",
    rating: 5,
    text: "Root canal was over in one sitting, far less discomfort than I expected.",
    date: null, // real review dates arrive with the Google reviews embed
  },
  {
    author: "Rohit K.",
    rating: 5,
    text: "Explained every step before starting the laser gum treatment. Clean, modern setup.",
    date: null, // real review dates arrive with the Google reviews embed
  },
  {
    author: "Divya M.",
    rating: 5,
    text: "Booked over WhatsApp, got a same-week appointment for my son's checkup.",
    date: null, // real review dates arrive with the Google reviews embed
  },
];

export const blogPosts = [
  // MOCK ×5 — fully invented seed posts pending client review, CONTENT-DATA §3.
  // Oral-health educational, DCI-compliant (procedure attributes only, no
  // outcome claims), locality-relevant. `body` drives both the post page
  // content and its table of contents — see main.js section 25.
  {
    slug: "bleeding-gums-what-it-means",
    title: "Bleeding gums: what it means and when to get it checked",
    category: "Gum care",
    publishedDate: "2026-05-04",
    readTime: "4 min read",
    coverLabel: "Close-up of a dental mirror examining gum tissue",
    excerpt: "Bleeding gums are common, but they're not something to ignore. Here's what causes it and when it's worth a clinical check.",
    body: [
      {
        id: "why-gums-bleed",
        heading: "Why gums bleed",
        paragraphs: [
          "Gums that bleed when you brush or floss are usually a sign of plaque and bacteria built up along the gumline, not a sign that you're brushing too hard.",
          "Left alone, that irritation (gingivitis) can progress to a deeper gum condition (periodontitis), which affects the bone and tissue holding the tooth in place.",
        ],
      },
      {
        id: "when-to-see-a-dentist",
        heading: "When to see a dentist",
        paragraphs: [
          "A single bleeding episode after aggressive flossing usually isn't cause for concern. Bleeding that repeats over several days, or comes with swelling, tenderness, or a change in how your teeth fit together, is worth a clinical examination.",
          "Gum recession, persistent bad breath, or gums that look red or pull away from the tooth are also signs worth checking.",
        ],
      },
      {
        id: "what-a-gum-check-involves",
        heading: "What a gum check involves",
        paragraphs: [
          "A periodontal examination measures the depth of the pocket between the tooth and gum at several points around each tooth, and charts the results against a healthy baseline.",
          "An X-ray may be taken to see whether bone level near the root has been affected.",
        ],
      },
      {
        id: "what-treatment-can-look-like",
        heading: "What treatment can look like",
        paragraphs: [
          "Early-stage gum inflammation is often addressed with scaling and root planing — removing plaque and tartar from below the gumline.",
          "Where the condition is more advanced, laser gingivoplasty is one option used to treat or reshape affected tissue, in place of a scalpel, where indicated. Suitability is determined by clinical examination.",
        ],
      },
    ],
  },
  {
    slug: "root-canal-what-actually-happens",
    title: "Root canal treatment: what actually happens, step by step",
    category: "Root canal",
    publishedDate: "2026-05-18",
    readTime: "5 min read",
    coverLabel: "Dental X-ray viewer showing a tooth root",
    excerpt: "Root canal treatment has a reputation that outpaces what actually happens in the chair. Here's the procedure, step by step.",
    body: [
      {
        id: "signs-you-might-need-one",
        heading: "Signs you might need one",
        paragraphs: [
          "Persistent tooth pain, sensitivity to hot or cold that lingers well after the stimulus is removed, and a tooth that's begun to darken can all point to infected or inflamed pulp inside the tooth.",
          "An X-ray is usually how this is confirmed, since the affected tissue sits below what's visible in the mouth.",
        ],
      },
      {
        id: "the-procedure-step-by-step",
        heading: "The procedure, step by step",
        paragraphs: [
          "The procedure starts with local anaesthesia, followed by removing infected pulp tissue and cleaning and shaping the canal inside the tooth.",
          "Once the canal is clean, it's filled and sealed to prevent reinfection, and in most cases a crown or filling is placed afterward to restore the tooth's strength.",
        ],
      },
      {
        id: "what-anaesthesia-is-used",
        heading: "What anaesthesia is used",
        paragraphs: [
          "Local anaesthesia numbs the tooth and surrounding area for the cleaning and shaping stage. Laser-assisted root canal treatment, where used, adds laser disinfection of the canal alongside the same instrumentation, and some cases need less anaesthesia as a result — this is confirmed at examination, not assumed in advance.",
        ],
      },
      {
        id: "after-the-procedure",
        heading: "After the procedure",
        paragraphs: [
          "Mild soreness for a few days after treatment is common and usually manageable with over-the-counter pain relief if advised. Avoiding chewing on the treated tooth until it's fully restored, and attending the follow-up visit for a permanent crown or filling, are the two things that matter most for recovery.",
        ],
      },
    ],
  },
  {
    slug: "dental-implants-vs-bridges",
    title: "Dental implants vs. bridges: how the two options differ",
    category: "Implants",
    publishedDate: "2026-06-01",
    readTime: "4 min read",
    coverLabel: "Diagram-style photo of a dental implant model",
    excerpt: "A bridge and an implant both fill a gap left by a missing tooth, but they work in very different ways. Here's how each one holds up.",
    body: [
      {
        id: "what-each-option-replaces",
        heading: "What each option replaces",
        paragraphs: [
          "Both a bridge and a dental implant are used to replace one or more missing teeth, but they get there in different ways — one relies on the teeth next to the gap, the other stands on its own in the jawbone.",
        ],
      },
      {
        id: "how-a-bridge-works",
        heading: "How a bridge works",
        paragraphs: [
          "A bridge uses the teeth on either side of the gap as anchors. Those teeth are reshaped to hold crowns, and a false tooth is fused between them to span the space.",
          "It usually takes two visits — one to prepare the anchor teeth and take an impression, a second to fit the finished bridge.",
        ],
      },
      {
        id: "how-an-implant-works",
        heading: "How an implant works",
        paragraphs: [
          "An implant is a titanium post placed directly into the jawbone, which acts as an artificial tooth root. A period of weeks is needed for the post to integrate with the surrounding bone before a crown is fitted on top.",
          "Because it doesn't rely on neighbouring teeth, an implant leaves those teeth untouched — a meaningful difference when the teeth on either side of the gap are otherwise healthy.",
        ],
      },
      {
        id: "how-the-decision-gets-made",
        heading: "How the decision gets made",
        paragraphs: [
          "Which option fits depends on things like the condition of the neighbouring teeth, how much bone is present at the site, and what the X-ray and clinical examination show. Neither is a default answer for every gap — suitability is determined case by case.",
        ],
      },
    ],
  },
  {
    slug: "childs-first-dental-visit",
    title: "Your child's first dental visit: what to expect",
    category: "Kids dentistry",
    publishedDate: "2026-06-15",
    readTime: "3 min read",
    coverLabel: "Child-friendly dental chair and waiting area",
    excerpt: "A child's first dental visit sets the tone for every one after it. Here's what it actually involves.",
    body: [
      {
        id: "when-to-book-the-first-visit",
        heading: "When to book the first visit",
        paragraphs: [
          "A common guide is to bring a child in around the time the first molars erupt, or earlier if something specific is bothering them. There's no need to wait for a problem before the first visit.",
        ],
      },
      {
        id: "what-actually-happens",
        heading: "What actually happens",
        paragraphs: [
          "A first appointment for a young child is usually a short, low-key introduction — a look around the chair, a gentle examination, and a conversation with the parent about what to expect going forward — rather than any treatment.",
        ],
      },
      {
        id: "helping-your-child-feel-at-ease",
        heading: "Helping your child feel at ease",
        paragraphs: [
          "Keeping the visit low-pressure at home helps. Describing it plainly, without using it as a threat or over-explaining what might happen, tends to work better than a big build-up.",
        ],
      },
      {
        id: "if-a-cavity-is-found",
        heading: "If a cavity is found",
        paragraphs: [
          "If a cavity in a milk tooth is found, it's still usually treated — an untreated cavity can affect the tooth and the permanent tooth developing beneath it. Techniques are adapted for a child's age and the tooth involved.",
        ],
      },
    ],
  },
  {
    slug: "what-laser-dentistry-actually-does",
    title: "Laser dentistry: what the light actually does",
    category: "Laser dentistry",
    publishedDate: "2026-06-29",
    readTime: "4 min read",
    coverLabel: "Diode laser handpiece on a treatment tray",
    excerpt: "Laser dentistry gets talked about like a single treatment. It's actually a method used inside a few specific procedures — here's what the light is actually doing.",
    body: [
      {
        id: "light-in-place-of-a-blade",
        heading: "Light, in place of a blade",
        paragraphs: [
          "A dental laser is a focused beam of light, used in place of a scalpel or drill for specific parts of certain procedures. It cuts or reshapes soft tissue, or disinfects a root canal, depending on the setting and the procedure.",
        ],
      },
      {
        id: "where-it-gets-used-here",
        heading: "Where it gets used here",
        paragraphs: [
          "At this clinic, laser technique is used within three procedures: gum and periodontal treatment (laser gingivoplasty), implant placement, and root canal disinfection (laser RCT). It isn't a treatment on its own — it's the method used within an existing procedure, where it's suitable.",
        ],
      },
      {
        id: "what-changes-for-the-patient",
        heading: "What changes for the patient",
        paragraphs: [
          "Because the laser seals small blood vessels along its path as it works, sutures are often not required for the gum procedures it's used in. Some laser procedures also need less anaesthesia than the conventional equivalent — this is confirmed at examination, not assumed in advance.",
        ],
      },
      {
        id: "where-it-doesnt-apply",
        heading: "Where it doesn't apply",
        paragraphs: [
          "Laser isn't the right tool for every procedure — a filling, a crown fitting, or an extraction doesn't call for it. Which of your treatments the laser applies to, if any, is confirmed at your consultation.",
        ],
      },
    ],
  },
];

export const faqs = [
  // MOCK ×8–10, homepage — DCI-compliant, procedure-attribute language only.
  {
    q: "Is laser dentistry painful?",
    a: "Laser procedures are performed under local anaesthesia where required. Suitability is determined by clinical examination.",
  },
  {
    q: "How is laser root canal different from a conventional one?",
    a: "The laser is used for canal disinfection alongside standard root canal instrumentation. Suitability is determined by clinical examination.",
  },
  {
    q: "Do I need multiple visits for a root canal?",
    a: "Many cases are completed in a single sitting; some require a follow-up visit depending on the tooth. Suitability is determined by clinical examination.",
  },
  {
    q: "Can I book an appointment the same day?",
    a: "WhatsApp or call the clinic directly — same-day slots are subject to availability.",
  },
  {
    q: "Do you treat children?",
    a: "Yes, the clinic offers preventive and restorative dental care for children.",
  },
  {
    q: "Is laser gum treatment suitable for everyone?",
    a: "Suitability is determined by clinical examination during your visit.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Any prior X-rays or dental records you have, and a list of current medications.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "Walk-ins are seen subject to availability; booking ahead by WhatsApp or phone is recommended.",
  },
];
