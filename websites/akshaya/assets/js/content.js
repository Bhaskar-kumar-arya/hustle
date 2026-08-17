/*
  content.js — the single source of all client data. See CONTENT-DATA.md.
  Every value marked MOCK is invented/assumed and must be confirmed or replaced
  before launch. Replacing real data should touch only this file — CONVENTIONS.md §3.
*/

export const clinic = {
  name: "Akshaya Multispeciality Dental Clinic",
  nameFull: "Akshaya Multispeciality Dental Clinic — Dental Implants & LASER",
  tagline: "MOCK: Dental implants and gum treatment, both delivered with laser.",
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
    landmark: "MOCK: —",
    mapsUrl: "MOCK: —",
    geo: { lat: null, lng: null }, // MOCK: from Google Business Profile listing
  },
  phone: "+919538827905",
  phoneDisplay: "+91 95388 27905",
  whatsapp: "919538827905",
  email: "MOCK: —",
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
  parking: "MOCK: —",
  social: {
    google: "MOCK: —",
    instagram: "MOCK: —",
    facebook: "MOCK: —",
  },
};

export const about = {
  // MOCK ×2 — clinic story and philosophy, pending client call, Open question #5.
  story:
    "MOCK: Akshaya Multispeciality Dental Clinic opened in Hulimavu in 2015, built around dental implants and periodontal care. Laser technique was adopted early, for gum and implant work where it's the better tool for the job. The practice has grown one referral at a time, treated on the same two specialisms since day one.",
  philosophy:
    "MOCK: Every visit starts with a full clinical examination before any treatment is planned — nothing is prescribed on the first look. Where laser suits the procedure, it's used; where it doesn't, conventional technique is used instead. The choice is made case by case, not treatment by treatment.",
};

export const facility = [
  // MOCK ×4 — facility photography pending, Open question #11. Labels are a shot list.
  { label: "MOCK: Reception & waiting area" },
  { label: "MOCK: Consultation room" },
  { label: "MOCK: Treatment operatory" },
  { label: "MOCK: Sterilisation room" },
];

export const patientInfo = {
  // MOCK ×6 — first-visit/payment/emergency specifics pending client call, Open question #14.
  firstVisit: [
    "MOCK: A short conversation about what's bothering you, before anything else.",
    "MOCK: A clinical examination, and an X-ray if the dentist needs one to see clearly.",
    "MOCK: A plan explained in plain language before any treatment starts.",
    "MOCK: Costs are discussed upfront — nothing is billed as a surprise.",
  ],
  whatToBring: [
    "MOCK: Any prior X-rays or dental records you have",
    "MOCK: A list of current medications",
    "MOCK: Your insurance card, if applicable",
    "MOCK: A little extra time for your first visit — it usually runs longer than a review",
  ],
  payment: ["MOCK: Cash", "MOCK: UPI", "MOCK: Credit & debit cards", "MOCK: EMI on select treatments"],
  emiNote: "MOCK: EMI is available on select treatments through third-party partners — ask at your consultation.",
  insurance: "MOCK: Direct insurance billing isn't set up yet — ask at the clinic about reimbursement support for your policy.",
  emergency: "MOCK: Call the clinic directly for a dental emergency. If you can't reach anyone, describe the issue over WhatsApp and the team will advise on next steps.",
};

export const flags = {
  showPricing: false, // cost block is built but hidden until client confirms
  showBlog: true,
  showDoctorPages: true, // individual pages when a doctor has enough content
};

export const analytics = {
  // MOCK: placeholder GA4 property — analytics.js only loads gtag.js when this
  // is a real "G-" ID (see analytics.js), so the placeholder never fires a
  // network request. Open question — add to the client call (no launch date yet).
  ga4MeasurementId: "MOCK: G-XXXXXXXXXX",
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
    bio: "MOCK: Leads implant and periodontal care at the clinic, applying laser technique across both.",
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
    name: "MOCK: Diode laser unit",
    benefit: "MOCK: Used for gum contouring and canal disinfection with a focused light beam in place of a blade.",
    photo: "assets/img/equipment/placeholder.webp",
  },
  {
    name: "MOCK: Digital OPG X-ray",
    benefit: "MOCK: A single rotating scan images the full jaw, reducing retakes and radiation compared to individual films.",
    photo: "assets/img/equipment/placeholder.webp",
  },
  {
    name: "MOCK: Autoclave sterilizer",
    benefit: "MOCK: Every reusable instrument is steam-sterilised between patients before it's used again.",
    photo: "assets/img/equipment/placeholder.webp",
  },
  {
    name: "MOCK: Intraoral scanner",
    benefit: "MOCK: Digital impressions replace the traditional putty tray for crowns, bridges and aligners.",
    photo: "assets/img/equipment/placeholder.webp",
  },
];

export const sterilisation = [
  // MOCK ×4 — protocol specifics pending client call, Open question #7.
  "MOCK: Reusable instruments autoclave-sterilised between every patient",
  "MOCK: Single-use needles, gloves and suction tips, disposed of after one use",
  "MOCK: Treatment surfaces disinfected before each appointment",
  "MOCK: Personal protective equipment worn throughout every procedure",
];

/*
  Ordered by pillar first, then search demand — not laser-first. Laser is the
  method the two pillars (implants, gum treatment) are delivered with, not a
  category of its own. See CONTENT-DATA.md §5 and DESIGN-SYSTEM.md §1.
*/
export const treatments = [
  {
    slug: "dental-implants",
    name: "Dental Implants",
    isLaser: true, // MOCK: per DESIGN-SYSTEM §1 both pillars are laser-delivered — confirm exact protocol with client
    confirmed: true, // verified offered, CONTENT-DATA §1
    isHub: false,
    order: 1,
    summary: "MOCK: Titanium implant placement for single or multiple missing teeth, planned and placed using laser-assisted technique.",
    sittings: "MOCK: multiple, across weeks",
    duration: "MOCK: 45–90 min per visit",
    signs: [
      "MOCK: One or more missing teeth",
      "MOCK: Difficulty chewing on one side",
      "MOCK: A loose or ill-fitting denture",
      "MOCK: Bone loss visible on an X-ray under a gap in your teeth",
    ],
    steps: [
      { title: "MOCK: Consultation & scan", desc: "MOCK: Examination and a 3D scan to assess bone volume and plan implant position." },
      { title: "MOCK: Treatment planning", desc: "MOCK: The number of implants, position and stage sequence is set out before any procedure begins." },
      { title: "MOCK: Implant placement", desc: "MOCK: The implant post is placed into the jaw using laser-assisted technique under local anaesthesia." },
      { title: "MOCK: Healing period", desc: "MOCK: A period of weeks for the implant to integrate with the surrounding bone." },
      { title: "MOCK: Crown fitting", desc: "MOCK: A custom crown is fitted onto the healed implant to complete the tooth." },
    ],
    aftercare: [
      "MOCK: Soft food for the first few days after placement",
      "MOCK: Avoid smoking during the healing period",
      "MOCK: Maintain routine brushing and flossing around the site",
      "MOCK: Attend follow-up visits to monitor integration",
    ],
    faqs: [
      { q: "MOCK: How many visits does an implant take?", a: "MOCK: Placement and crown fitting are separate visits, spaced weeks apart to allow healing. Suitability is determined by clinical examination." },
      { q: "MOCK: Is bone grafting always needed?", a: "MOCK: Only where the scan shows insufficient bone volume at the implant site. Suitability is determined by clinical examination." },
      { q: "MOCK: Can one implant replace several missing teeth?", a: "MOCK: A bridge can be attached across multiple implants depending on the case." },
      { q: "MOCK: What is the implant made of?", a: "MOCK: Titanium, a material widely used for its compatibility with bone tissue." },
      { q: "MOCK: Is the procedure done under laser or local anaesthesia?", a: "MOCK: Placement is performed under local anaesthesia, with laser-assisted technique used during the procedure." },
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
    summary: "MOCK: Periodontal treatment for gum disease and gum contouring, delivered with laser gingivoplasty.",
    sittings: "MOCK: 1–2",
    duration: "MOCK: 30–45 min",
    signs: [
      "MOCK: Bleeding gums when brushing or flossing",
      "MOCK: Gum recession or tooth sensitivity",
      "MOCK: Persistent bad breath",
      "MOCK: Gums that look red, swollen or pull away from the teeth",
    ],
    steps: [
      { title: "MOCK: Periodontal examination", desc: "MOCK: Gum pocket depths are measured and charted to assess the extent of the condition." },
      { title: "MOCK: Scaling & root planing", desc: "MOCK: Plaque and tartar are removed from below the gumline." },
      { title: "MOCK: Laser gingivoplasty", desc: "MOCK: Laser is used to reshape or treat affected gum tissue, in place of a scalpel, where indicated." },
      { title: "MOCK: Post-procedure review", desc: "MOCK: Gum healing is checked at a short follow-up visit." },
      { title: "MOCK: Maintenance plan", desc: "MOCK: A cleaning schedule is set to keep the treated area healthy." },
    ],
    aftercare: [
      "MOCK: Gentle brushing around the treated area for the first few days",
      "MOCK: Avoid hard or crunchy food until advised otherwise",
      "MOCK: Use any prescribed rinse as directed",
      "MOCK: Attend the follow-up review visit",
    ],
    faqs: [
      { q: "MOCK: Is laser gum treatment the same as gum surgery?", a: "MOCK: Laser gingivoplasty is a periodontal procedure that reshapes gum tissue using a focused beam instead of a blade. Suitability is determined by clinical examination." },
      { q: "MOCK: Will I need sutures?", a: "MOCK: The laser seals small blood vessels along its path, so sutures are often not required." },
      { q: "MOCK: How many sittings does gum treatment take?", a: "MOCK: Most cases are completed in one to two sittings depending on the extent of treatment needed." },
      { q: "MOCK: Is anaesthesia used?", a: "MOCK: Local anaesthesia is used where required; many laser procedures need less than a conventional approach." },
      { q: "MOCK: How often should I return after treatment?", a: "MOCK: A maintenance cleaning schedule is set at your review visit." },
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
    summary: "MOCK: Laser reshaping of gum contour with minimal bleeding.",
    sittings: "MOCK: 1",
    duration: "MOCK: 20–30 min",
    signs: [
      "MOCK: Uneven or excess gum tissue",
      "MOCK: A gum line that shows more tissue than tooth",
      "MOCK: Gum contour affecting how a crown or veneer fits",
    ],
    steps: [
      { title: "MOCK: Examination & marking", desc: "MOCK: The desired gum contour is assessed and marked before treatment." },
      { title: "MOCK: Local anaesthesia", desc: "MOCK: Applied where required before the laser is used." },
      { title: "MOCK: Laser reshaping", desc: "MOCK: The laser trims and contours gum tissue along the marked line." },
      { title: "MOCK: Same-visit check", desc: "MOCK: The contour is reviewed before you leave the chair." },
    ],
    aftercare: [
      "MOCK: Gentle brushing around the treated area for a few days",
      "MOCK: Avoid spicy or acidic food until any sensitivity settles",
      "MOCK: Attend a follow-up visit if one is scheduled",
    ],
    faqs: [
      { q: "MOCK: Does laser gingivoplasty need sutures?", a: "MOCK: The laser seals small blood vessels along its path, so sutures are often not required." },
      { q: "MOCK: How long does recovery take?", a: "MOCK: Most patients resume normal brushing and eating within a few days. Suitability is determined by clinical examination." },
      { q: "MOCK: Can this be done alongside a crown or veneer fitting?", a: "MOCK: Gum contouring is sometimes carried out before a restoration to improve its fit — this is planned case by case." },
      { q: "MOCK: Is anaesthesia always needed?", a: "MOCK: Many laser gingivoplasty procedures are performed with little or no anaesthesia; this is confirmed at examination." },
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
    summary: "MOCK: Diode-laser procedures across cavity treatment, gum contouring and root canal disinfection.",
    sittings: "MOCK: 1–2",
    duration: "MOCK: 30–45 min",
    signs: [
      "MOCK: Considering an implant, gum, or root canal procedure",
      "MOCK: Wanting to know which of your treatments the laser applies to",
      "MOCK: Currently on medication that affects bleeding or healing",
    ],
    steps: [
      { title: "MOCK: Examination", desc: "MOCK: Your dentist confirms which of your procedures the laser is suitable for." },
      { title: "MOCK: Anaesthesia, if required", desc: "MOCK: Applied only where the specific procedure calls for it." },
      { title: "MOCK: Laser-assisted procedure", desc: "MOCK: The diode laser is used within the procedure you're having — gum contouring, canal disinfection, or implant placement." },
      { title: "MOCK: Same-visit review", desc: "MOCK: The treated area is checked before you leave." },
    ],
    aftercare: [
      "MOCK: Aftercare follows the specific procedure performed (see that treatment's page)",
      "MOCK: Routine brushing and flossing once any local sensitivity settles",
    ],
    faqs: [
      { q: "MOCK: Is laser dentistry a treatment on its own?", a: "MOCK: No — laser is the method used within implant, gum and root canal procedures, not a separate treatment." },
      { q: "MOCK: Which procedures use the laser here?", a: "MOCK: Dental implants, gum & periodontal treatment, laser gingivoplasty and laser root canal all use laser technique at this clinic." },
      { q: "MOCK: Is laser dentistry suitable for everyone?", a: "MOCK: Suitability is determined by clinical examination for each procedure." },
      { q: "MOCK: Does laser mean no anaesthesia at all?", a: "MOCK: Not always — some laser procedures still use local anaesthesia; others often need less. This is confirmed at examination." },
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
    summary: "MOCK: Conventional root canal treatment under local anaesthesia.",
    sittings: "MOCK: 1–2",
    duration: "MOCK: 45–60 min",
    signs: [
      "MOCK: Persistent tooth pain, especially when chewing",
      "MOCK: Sensitivity to hot or cold that lingers after the stimulus is gone",
      "MOCK: A darkening tooth",
      "MOCK: Swelling or tenderness in the gum near a tooth",
    ],
    steps: [
      { title: "MOCK: Diagnosis & X-ray", desc: "MOCK: An X-ray confirms the extent of infection and the canal structure." },
      { title: "MOCK: Local anaesthesia", desc: "MOCK: The tooth and surrounding area are numbed before treatment begins." },
      { title: "MOCK: Cleaning & shaping the canal", desc: "MOCK: Infected pulp tissue is removed and the canal is cleaned and shaped." },
      { title: "MOCK: Filling & sealing", desc: "MOCK: The cleaned canal is filled and sealed to prevent reinfection." },
      { title: "MOCK: Crown or restoration", desc: "MOCK: A crown or filling is placed to restore the tooth's shape and strength." },
    ],
    aftercare: [
      "MOCK: Avoid chewing on the treated tooth until it's fully restored",
      "MOCK: Mild soreness for a few days is common; over-the-counter pain relief may be advised",
      "MOCK: Attend the follow-up visit for a permanent crown or filling",
      "MOCK: Maintain routine brushing and flossing",
    ],
    faqs: [
      { q: "MOCK: How many visits does a root canal take?", a: "MOCK: Many cases are completed in a single sitting; some require a follow-up visit depending on the tooth. Suitability is determined by clinical examination." },
      { q: "MOCK: Is anaesthesia used throughout?", a: "MOCK: Local anaesthesia is used during the cleaning and shaping stage." },
      { q: "MOCK: Do I need a crown afterwards?", a: "MOCK: Most root-canal-treated teeth are capped with a crown or filling to restore strength." },
      { q: "MOCK: What's the difference from laser root canal?", a: "MOCK: This is the conventional approach; the laser variant adds laser-assisted canal disinfection. See the laser root canal page." },
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
    summary: "MOCK: Root canal treatment with laser-assisted canal disinfection under local anaesthesia.",
    sittings: "MOCK: 1",
    duration: "MOCK: 45–60 min",
    signs: [
      "MOCK: Persistent tooth pain, especially when chewing",
      "MOCK: Sensitivity to hot or cold that lingers after the stimulus is gone",
      "MOCK: A darkening tooth",
      "MOCK: Swelling or tenderness in the gum near a tooth",
    ],
    steps: [
      { title: "MOCK: Diagnosis & X-ray", desc: "MOCK: An X-ray confirms the extent of infection and the canal structure." },
      { title: "MOCK: Local anaesthesia", desc: "MOCK: Applied before treatment; laser-assisted cases often need less." },
      { title: "MOCK: Laser-assisted disinfection", desc: "MOCK: The laser is used alongside standard instrumentation to disinfect the canal." },
      { title: "MOCK: Filling & sealing", desc: "MOCK: The cleaned canal is filled and sealed in the same sitting." },
      { title: "MOCK: Crown or restoration", desc: "MOCK: A crown or filling is placed to restore the tooth's shape and strength." },
    ],
    aftercare: [
      "MOCK: Avoid chewing on the treated tooth until it's fully restored",
      "MOCK: Mild soreness for a few days is common; over-the-counter pain relief may be advised",
      "MOCK: Attend the follow-up visit for a permanent crown or filling",
      "MOCK: Maintain routine brushing and flossing",
    ],
    faqs: [
      { q: "MOCK: How is laser root canal different from a conventional one?", a: "MOCK: The laser is used for canal disinfection alongside standard root canal instrumentation. Suitability is determined by clinical examination." },
      { q: "MOCK: Is it completed in one visit?", a: "MOCK: Many laser root canal cases are completed in a single sitting; this depends on the tooth." },
      { q: "MOCK: Is anaesthesia still needed?", a: "MOCK: Local anaesthesia is used where required; laser-assisted cases often need less than a conventional approach." },
      { q: "MOCK: Do I need a crown afterwards?", a: "MOCK: Most root-canal-treated teeth are capped with a crown or filling to restore strength." },
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
    summary: "MOCK: Fixed prosthetics to cap or replace damaged or missing teeth.",
    sittings: "MOCK: 2",
    duration: "MOCK: 45–60 min per visit",
    signs: [
      "MOCK: A tooth that's cracked, chipped, or worn down",
      "MOCK: One or more missing teeth",
      "MOCK: A tooth weakened after a root canal",
      "MOCK: A large filling that no longer supports the tooth",
    ],
    steps: [
      { title: "MOCK: Consultation & shade matching", desc: "MOCK: The tooth or gap is assessed and a shade is matched to the surrounding teeth." },
      { title: "MOCK: Tooth preparation", desc: "MOCK: The tooth is reshaped, or adjacent teeth prepared to anchor a bridge." },
      { title: "MOCK: Impression or digital scan", desc: "MOCK: An impression is taken and sent for the crown or bridge to be fabricated." },
      { title: "MOCK: Temporary crown fitted", desc: "MOCK: A temporary crown protects the prepared tooth while the permanent one is made." },
      { title: "MOCK: Permanent crown or bridge cemented", desc: "MOCK: The finished piece is checked for fit and bite, then cemented in place." },
    ],
    aftercare: [
      "MOCK: Avoid hard or sticky foods while wearing a temporary crown",
      "MOCK: Mild sensitivity for a few days after cementing is common",
      "MOCK: Maintain routine brushing and flossing around the crown or bridge",
      "MOCK: Attend the review visit to confirm fit",
    ],
    faqs: [
      { q: "MOCK: How long does a crown or bridge last?", a: "MOCK: Longevity depends on care and bite; your dentist will advise on maintenance at review." },
      { q: "MOCK: Will I be without a tooth between visits?", a: "MOCK: A temporary crown is fitted at the first visit so the tooth is covered while the permanent piece is made." },
      { q: "MOCK: Is a crown the same as a bridge?", a: "MOCK: A crown caps a single tooth; a bridge spans a gap using the neighbouring teeth as anchors." },
      { q: "MOCK: Does getting a crown hurt?", a: "MOCK: Local anaesthesia is used during tooth preparation. Suitability is determined by clinical examination." },
      { q: "MOCK: What materials are available?", a: "MOCK: Options are discussed at consultation based on the tooth's location and function." },
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
    summary: "MOCK: Tooth-coloured fillings and restorative work for decayed or damaged teeth.",
    sittings: "MOCK: 1",
    duration: "MOCK: 30–45 min",
    signs: [
      "MOCK: A visible cavity or dark spot on a tooth",
      "MOCK: Sensitivity to sweet, hot, or cold food",
      "MOCK: Food repeatedly catching in one spot",
      "MOCK: A small chip or fracture in a tooth",
    ],
    steps: [
      { title: "MOCK: Examination & X-ray", desc: "MOCK: The tooth is examined and an X-ray taken if the extent of decay isn't visible directly." },
      { title: "MOCK: Local anaesthesia if required", desc: "MOCK: The area is numbed if the cavity is close to the nerve." },
      { title: "MOCK: Decay removal", desc: "MOCK: Decayed tooth structure is removed and the cavity cleaned." },
      { title: "MOCK: Tooth-coloured filling placed", desc: "MOCK: The filling material is placed in layers and shaped to match the tooth." },
      { title: "MOCK: Bite check & polish", desc: "MOCK: The bite is checked and the filling polished smooth." },
    ],
    aftercare: [
      "MOCK: Avoid chewing on the filled tooth for a couple of hours",
      "MOCK: Mild sensitivity for a day or two is common",
      "MOCK: Maintain routine brushing and flossing",
      "MOCK: Attend routine check-ups so new decay is caught early",
    ],
    faqs: [
      { q: "MOCK: Will the filling match my tooth colour?", a: "MOCK: Tooth-coloured filling material is shade-matched to the surrounding tooth." },
      { q: "MOCK: Is a filling done in one visit?", a: "MOCK: Most single-tooth fillings are completed in one sitting." },
      { q: "MOCK: Does it hurt to get a filling?", a: "MOCK: Local anaesthesia is used where the cavity is close to the nerve. Suitability is determined by clinical examination." },
      { q: "MOCK: How long does a filling last?", a: "MOCK: This depends on the tooth and how it's cared for afterwards; your dentist will advise at review." },
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
    summary: "MOCK: Fixed braces and clear-aligner options for teeth alignment.",
    sittings: "MOCK: ongoing, monthly review",
    duration: "MOCK: 30 min per visit",
    signs: [
      "MOCK: Crowded or crooked teeth",
      "MOCK: A visible gap between teeth",
      "MOCK: A bite that doesn't line up evenly (over- or under-bite)",
      "MOCK: Difficulty cleaning between crowded teeth",
    ],
    steps: [
      { title: "MOCK: Consultation & records", desc: "MOCK: X-rays, scans, and photographs are taken to plan the treatment." },
      { title: "MOCK: Treatment plan", desc: "MOCK: A fixed-braces or clear-aligner plan is worked out based on the case." },
      { title: "MOCK: Fitting", desc: "MOCK: Braces are bonded, or the first set of aligners is issued." },
      { title: "MOCK: Periodic adjustment visits", desc: "MOCK: Regular visits adjust wires or move to the next aligner set." },
      { title: "MOCK: Retainer phase", desc: "MOCK: A retainer is fitted after active treatment to hold the new position." },
    ],
    aftercare: [
      "MOCK: Attend monthly review appointments",
      "MOCK: Maintain thorough oral hygiene around brackets or under aligners",
      "MOCK: Wear the retainer as advised once treatment is complete",
      "MOCK: Avoid hard or sticky foods with fixed braces",
    ],
    faqs: [
      { q: "MOCK: How long does orthodontic treatment take?", a: "MOCK: Duration varies by case and is discussed at the consultation." },
      { q: "MOCK: Are clear aligners available?", a: "MOCK: Yes, alongside conventional fixed braces. Suitability is determined by clinical examination." },
      { q: "MOCK: Do braces hurt?", a: "MOCK: Some pressure after adjustment visits is common and settles within a few days." },
      { q: "MOCK: Do I need a retainer afterwards?", a: "MOCK: Yes — a retainer phase follows active treatment to hold the result." },
      { q: "MOCK: Can adults get braces?", a: "MOCK: Yes, orthodontic treatment isn't limited by age; suitability is assessed at examination." },
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
    summary: "MOCK: In-clinic whitening and cosmetic smile design consultation.",
    sittings: "MOCK: 1",
    duration: "MOCK: 45–60 min",
    signs: [
      "MOCK: Staining from tea, coffee, or tobacco use",
      "MOCK: Teeth that have yellowed gradually with age",
      "MOCK: An uneven shade across the front teeth",
      "MOCK: Wanting a brighter smile ahead of an occasion",
    ],
    steps: [
      { title: "MOCK: Shade assessment", desc: "MOCK: The current tooth shade is recorded and suitability for whitening checked." },
      { title: "MOCK: Scaling & cleaning", desc: "MOCK: Surface plaque and tartar are cleaned first, if needed, so whitening is even." },
      { title: "MOCK: Whitening gel application", desc: "MOCK: A whitening agent is applied to the teeth under controlled conditions." },
      { title: "MOCK: In-chair activation", desc: "MOCK: The gel is left to work for the planned duration." },
      { title: "MOCK: Shade check & aftercare guidance", desc: "MOCK: The new shade is checked and aftercare advice given." },
    ],
    aftercare: [
      "MOCK: Avoid staining foods and drinks for about 48 hours",
      "MOCK: Mild sensitivity for a short period afterwards is common",
      "MOCK: Avoid tobacco to keep the result longer",
      "MOCK: A touch-up session may be advised over time",
    ],
    faqs: [
      { q: "MOCK: Is whitening safe for enamel?", a: "MOCK: In-clinic whitening is carried out under controlled conditions. Suitability is determined by clinical examination." },
      { q: "MOCK: How long does whitening take?", a: "MOCK: A single in-chair session is typical; your dentist will confirm at consultation." },
      { q: "MOCK: Will sensitivity occur?", a: "MOCK: Some temporary sensitivity is common and usually settles within a day or two." },
      { q: "MOCK: How long does the result last?", a: "MOCK: This varies with diet and habits like tobacco use; touch-ups can extend the result." },
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
    summary: "MOCK: Preventive and restorative dental care for children.",
    sittings: "MOCK: varies",
    duration: "MOCK: 20–30 min",
    signs: [
      "MOCK: A milk tooth cavity or dark spot",
      "MOCK: A routine check-up is due",
      "MOCK: Thumb-sucking or a habit continuing past the usual age",
      "MOCK: A first visit around the eruption of the first molars",
    ],
    steps: [
      { title: "MOCK: Gentle introduction", desc: "MOCK: A first visit familiarises the child with the clinic before any treatment." },
      { title: "MOCK: Assessment & parent consultation", desc: "MOCK: The child's teeth are examined and findings discussed with the parent." },
      { title: "MOCK: Preventive care", desc: "MOCK: Cleaning, fluoride application, or sealants are carried out where advised." },
      { title: "MOCK: Restorative treatment if needed", desc: "MOCK: Any cavities are treated using child-appropriate techniques." },
      { title: "MOCK: Home-care guidance", desc: "MOCK: Parents are given brushing and diet guidance for ongoing care at home." },
    ],
    aftercare: [
      "MOCK: Maintain twice-daily brushing with an age-appropriate toothpaste",
      "MOCK: Limit sugary snacks and drinks between meals",
      "MOCK: Keep to routine six-month check-ups",
      "MOCK: Follow any specific instructions given after treatment",
    ],
    faqs: [
      { q: "MOCK: At what age should my child first visit the dentist?", a: "MOCK: Around the eruption of the first molars, or earlier if a concern comes up." },
      { q: "MOCK: Is treatment different for milk teeth?", a: "MOCK: Yes, techniques are adapted for a child's age and the tooth involved." },
      { q: "MOCK: Do milk tooth cavities need treatment?", a: "MOCK: Yes — an untreated cavity can affect the tooth and the permanent tooth developing beneath it." },
      { q: "MOCK: How can I prepare my child for their first visit?", a: "MOCK: Keeping the visit low-key and positive helps; the first appointment is a gentle introduction, not treatment." },
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
    author: "MOCK: Priya S.",
    rating: 5,
    text: "MOCK: Root canal was over in one sitting, far less discomfort than I expected.",
    date: "MOCK: —",
  },
  {
    author: "MOCK: Rohit K.",
    rating: 5,
    text: "MOCK: Explained every step before starting the laser gum treatment. Clean, modern setup.",
    date: "MOCK: —",
  },
  {
    author: "MOCK: Divya M.",
    rating: 5,
    text: "MOCK: Booked over WhatsApp, got a same-week appointment for my son's checkup.",
    date: "MOCK: —",
  },
];

export const blogPosts = [
  // MOCK ×5 — fully invented seed posts pending client review, CONTENT-DATA §3.
  // Oral-health educational, DCI-compliant (procedure attributes only, no
  // outcome claims), locality-relevant. `body` drives both the post page
  // content and its table of contents — see main.js section 25.
  {
    slug: "bleeding-gums-what-it-means",
    title: "MOCK: Bleeding gums: what it means and when to get it checked",
    category: "Gum care",
    publishedDate: "2026-05-04",
    readTime: "MOCK: 4 min read",
    coverLabel: "MOCK: Close-up of a dental mirror examining gum tissue",
    excerpt: "MOCK: Bleeding gums are common, but they're not something to ignore. Here's what causes it and when it's worth a clinical check.",
    body: [
      {
        id: "why-gums-bleed",
        heading: "Why gums bleed",
        paragraphs: [
          "MOCK: Gums that bleed when you brush or floss are usually a sign of plaque and bacteria built up along the gumline, not a sign that you're brushing too hard.",
          "MOCK: Left alone, that irritation (gingivitis) can progress to a deeper gum condition (periodontitis), which affects the bone and tissue holding the tooth in place.",
        ],
      },
      {
        id: "when-to-see-a-dentist",
        heading: "When to see a dentist",
        paragraphs: [
          "MOCK: A single bleeding episode after aggressive flossing usually isn't cause for concern. Bleeding that repeats over several days, or comes with swelling, tenderness, or a change in how your teeth fit together, is worth a clinical examination.",
          "MOCK: Gum recession, persistent bad breath, or gums that look red or pull away from the tooth are also signs worth checking.",
        ],
      },
      {
        id: "what-a-gum-check-involves",
        heading: "What a gum check involves",
        paragraphs: [
          "MOCK: A periodontal examination measures the depth of the pocket between the tooth and gum at several points around each tooth, and charts the results against a healthy baseline.",
          "MOCK: An X-ray may be taken to see whether bone level near the root has been affected.",
        ],
      },
      {
        id: "what-treatment-can-look-like",
        heading: "What treatment can look like",
        paragraphs: [
          "MOCK: Early-stage gum inflammation is often addressed with scaling and root planing — removing plaque and tartar from below the gumline.",
          "MOCK: Where the condition is more advanced, laser gingivoplasty is one option used to treat or reshape affected tissue, in place of a scalpel, where indicated. Suitability is determined by clinical examination.",
        ],
      },
    ],
  },
  {
    slug: "root-canal-what-actually-happens",
    title: "MOCK: Root canal treatment: what actually happens, step by step",
    category: "Root canal",
    publishedDate: "2026-05-18",
    readTime: "MOCK: 5 min read",
    coverLabel: "MOCK: Dental X-ray viewer showing a tooth root",
    excerpt: "MOCK: Root canal treatment has a reputation that outpaces what actually happens in the chair. Here's the procedure, step by step.",
    body: [
      {
        id: "signs-you-might-need-one",
        heading: "Signs you might need one",
        paragraphs: [
          "MOCK: Persistent tooth pain, sensitivity to hot or cold that lingers well after the stimulus is removed, and a tooth that's begun to darken can all point to infected or inflamed pulp inside the tooth.",
          "MOCK: An X-ray is usually how this is confirmed, since the affected tissue sits below what's visible in the mouth.",
        ],
      },
      {
        id: "the-procedure-step-by-step",
        heading: "The procedure, step by step",
        paragraphs: [
          "MOCK: The procedure starts with local anaesthesia, followed by removing infected pulp tissue and cleaning and shaping the canal inside the tooth.",
          "MOCK: Once the canal is clean, it's filled and sealed to prevent reinfection, and in most cases a crown or filling is placed afterward to restore the tooth's strength.",
        ],
      },
      {
        id: "what-anaesthesia-is-used",
        heading: "What anaesthesia is used",
        paragraphs: [
          "MOCK: Local anaesthesia numbs the tooth and surrounding area for the cleaning and shaping stage. Laser-assisted root canal treatment, where used, adds laser disinfection of the canal alongside the same instrumentation, and some cases need less anaesthesia as a result — this is confirmed at examination, not assumed in advance.",
        ],
      },
      {
        id: "after-the-procedure",
        heading: "After the procedure",
        paragraphs: [
          "MOCK: Mild soreness for a few days after treatment is common and usually manageable with over-the-counter pain relief if advised. Avoiding chewing on the treated tooth until it's fully restored, and attending the follow-up visit for a permanent crown or filling, are the two things that matter most for recovery.",
        ],
      },
    ],
  },
  {
    slug: "dental-implants-vs-bridges",
    title: "MOCK: Dental implants vs. bridges: how the two options differ",
    category: "Implants",
    publishedDate: "2026-06-01",
    readTime: "MOCK: 4 min read",
    coverLabel: "MOCK: Diagram-style photo of a dental implant model",
    excerpt: "MOCK: A bridge and an implant both fill a gap left by a missing tooth, but they work in very different ways. Here's how each one holds up.",
    body: [
      {
        id: "what-each-option-replaces",
        heading: "What each option replaces",
        paragraphs: [
          "MOCK: Both a bridge and a dental implant are used to replace one or more missing teeth, but they get there in different ways — one relies on the teeth next to the gap, the other stands on its own in the jawbone.",
        ],
      },
      {
        id: "how-a-bridge-works",
        heading: "How a bridge works",
        paragraphs: [
          "MOCK: A bridge uses the teeth on either side of the gap as anchors. Those teeth are reshaped to hold crowns, and a false tooth is fused between them to span the space.",
          "MOCK: It usually takes two visits — one to prepare the anchor teeth and take an impression, a second to fit the finished bridge.",
        ],
      },
      {
        id: "how-an-implant-works",
        heading: "How an implant works",
        paragraphs: [
          "MOCK: An implant is a titanium post placed directly into the jawbone, which acts as an artificial tooth root. A period of weeks is needed for the post to integrate with the surrounding bone before a crown is fitted on top.",
          "MOCK: Because it doesn't rely on neighbouring teeth, an implant leaves those teeth untouched — a meaningful difference when the teeth on either side of the gap are otherwise healthy.",
        ],
      },
      {
        id: "how-the-decision-gets-made",
        heading: "How the decision gets made",
        paragraphs: [
          "MOCK: Which option fits depends on things like the condition of the neighbouring teeth, how much bone is present at the site, and what the X-ray and clinical examination show. Neither is a default answer for every gap — suitability is determined case by case.",
        ],
      },
    ],
  },
  {
    slug: "childs-first-dental-visit",
    title: "MOCK: Your child's first dental visit: what to expect",
    category: "Kids dentistry",
    publishedDate: "2026-06-15",
    readTime: "MOCK: 3 min read",
    coverLabel: "MOCK: Child-friendly dental chair and waiting area",
    excerpt: "MOCK: A child's first dental visit sets the tone for every one after it. Here's what it actually involves.",
    body: [
      {
        id: "when-to-book-the-first-visit",
        heading: "When to book the first visit",
        paragraphs: [
          "MOCK: A common guide is to bring a child in around the time the first molars erupt, or earlier if something specific is bothering them. There's no need to wait for a problem before the first visit.",
        ],
      },
      {
        id: "what-actually-happens",
        heading: "What actually happens",
        paragraphs: [
          "MOCK: A first appointment for a young child is usually a short, low-key introduction — a look around the chair, a gentle examination, and a conversation with the parent about what to expect going forward — rather than any treatment.",
        ],
      },
      {
        id: "helping-your-child-feel-at-ease",
        heading: "Helping your child feel at ease",
        paragraphs: [
          "MOCK: Keeping the visit low-pressure at home helps. Describing it plainly, without using it as a threat or over-explaining what might happen, tends to work better than a big build-up.",
        ],
      },
      {
        id: "if-a-cavity-is-found",
        heading: "If a cavity is found",
        paragraphs: [
          "MOCK: If a cavity in a milk tooth is found, it's still usually treated — an untreated cavity can affect the tooth and the permanent tooth developing beneath it. Techniques are adapted for a child's age and the tooth involved.",
        ],
      },
    ],
  },
  {
    slug: "what-laser-dentistry-actually-does",
    title: "MOCK: Laser dentistry: what the light actually does",
    category: "Laser dentistry",
    publishedDate: "2026-06-29",
    readTime: "MOCK: 4 min read",
    coverLabel: "MOCK: Diode laser handpiece on a treatment tray",
    excerpt: "MOCK: Laser dentistry gets talked about like a single treatment. It's actually a method used inside a few specific procedures — here's what the light is actually doing.",
    body: [
      {
        id: "light-in-place-of-a-blade",
        heading: "Light, in place of a blade",
        paragraphs: [
          "MOCK: A dental laser is a focused beam of light, used in place of a scalpel or drill for specific parts of certain procedures. It cuts or reshapes soft tissue, or disinfects a root canal, depending on the setting and the procedure.",
        ],
      },
      {
        id: "where-it-gets-used-here",
        heading: "Where it gets used here",
        paragraphs: [
          "MOCK: At this clinic, laser technique is used within three procedures: gum and periodontal treatment (laser gingivoplasty), implant placement, and root canal disinfection (laser RCT). It isn't a treatment on its own — it's the method used within an existing procedure, where it's suitable.",
        ],
      },
      {
        id: "what-changes-for-the-patient",
        heading: "What changes for the patient",
        paragraphs: [
          "MOCK: Because the laser seals small blood vessels along its path as it works, sutures are often not required for the gum procedures it's used in. Some laser procedures also need less anaesthesia than the conventional equivalent — this is confirmed at examination, not assumed in advance.",
        ],
      },
      {
        id: "where-it-doesnt-apply",
        heading: "Where it doesn't apply",
        paragraphs: [
          "MOCK: Laser isn't the right tool for every procedure — a filling, a crown fitting, or an extraction doesn't call for it. Which of your treatments the laser applies to, if any, is confirmed at your consultation.",
        ],
      },
    ],
  },
];

export const faqs = [
  // MOCK ×8–10, homepage — DCI-compliant, procedure-attribute language only.
  {
    q: "MOCK: Is laser dentistry painful?",
    a: "MOCK: Laser procedures are performed under local anaesthesia where required. Suitability is determined by clinical examination.",
  },
  {
    q: "MOCK: How is laser root canal different from a conventional one?",
    a: "MOCK: The laser is used for canal disinfection alongside standard root canal instrumentation. Suitability is determined by clinical examination.",
  },
  {
    q: "MOCK: Do I need multiple visits for a root canal?",
    a: "MOCK: Many cases are completed in a single sitting; some require a follow-up visit depending on the tooth. Suitability is determined by clinical examination.",
  },
  {
    q: "MOCK: Can I book an appointment the same day?",
    a: "MOCK: WhatsApp or call the clinic directly — same-day slots are subject to availability.",
  },
  {
    q: "MOCK: Do you treat children?",
    a: "MOCK: Yes, the clinic offers preventive and restorative dental care for children.",
  },
  {
    q: "MOCK: Is laser gum treatment suitable for everyone?",
    a: "MOCK: Suitability is determined by clinical examination during your visit.",
  },
  {
    q: "MOCK: What should I bring to my first visit?",
    a: "MOCK: Any prior X-rays or dental records you have, and a list of current medications.",
  },
  {
    q: "MOCK: Do you accept walk-ins?",
    a: "MOCK: Walk-ins are seen subject to availability; booking ahead by WhatsApp or phone is recommended.",
  },
];
