/*
  content.js — the single source of all client data. See CONTENT-DATA.md.
  Every value marked MOCK is invented/assumed and must be confirmed or replaced
  before launch. Replacing real data should touch only this file — CONVENTIONS.md §3.
*/

export const clinic = {
  name: "Akshaya Multispeciality Dental Clinic",
  nameFull: "Akshaya Multispeciality Dental Clinic — Dental Implants & LASER",
  tagline: "MOCK: laser-led dentistry in Hulimavu",
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

export const flags = {
  showPricing: false, // cost block is built but hidden until client confirms
  showBlog: true,
  showDoctorPages: true, // individual pages when a doctor has enough content
};

export const doctors = [
  {
    slug: "MOCK-dr-anitha-rao",
    name: "MOCK: Dr. Anitha Rao",
    degrees: "MOCK: BDS, MDS (Conservative Dentistry & Endodontics)",
    specialisation: "MOCK: Root canal & laser dentistry",
    registrationNo: "MOCK-KA-00000", // must be real before launch
    experienceYears: 12, // MOCK
    treatments: ["laser-rct", "root-canal", "laser-dentistry"],
    bio: "MOCK: Focuses on single-sitting root canal treatment using laser-assisted disinfection.",
    photo: "assets/img/doctors/placeholder.webp",
  },
  {
    slug: "MOCK-dr-vikram-shetty",
    name: "MOCK: Dr. Vikram Shetty",
    degrees: "MOCK: BDS, MDS (Periodontics & Implantology)",
    specialisation: "MOCK: Implants & laser gum treatment",
    registrationNo: "MOCK-KA-00000",
    experienceYears: 15, // MOCK
    treatments: ["dental-implants", "laser-gingivoplasty", "laser-dentistry"],
    bio: "MOCK: Specialises in dental implants and laser gingivoplasty for gum contouring.",
    photo: "assets/img/doctors/placeholder.webp",
  },
  {
    slug: "MOCK-dr-farah-khan",
    name: "MOCK: Dr. Farah Khan",
    degrees: "MOCK: BDS, MDS (Prosthodontics)",
    specialisation: "MOCK: Restorations, crowns & bridges",
    registrationNo: "MOCK-KA-00000",
    experienceYears: 9, // MOCK
    treatments: ["dental-restoration", "crowns-and-bridges", "teeth-whitening"],
    bio: "MOCK: Works on dental restorations, crowns, bridges and smile design cases.",
    photo: "assets/img/doctors/placeholder.webp",
  },
]; // MOCK ×3 — exact count and identities pending client call

export const treatments = [
  {
    slug: "laser-dentistry",
    name: "Laser Dentistry",
    isLaser: true,
    confirmed: true,
    isHub: true,
    order: 1,
    summary: "MOCK: Diode-laser procedures across cavity treatment, gum contouring and root canal disinfection.",
    sittings: "MOCK: 1–2",
    duration: "MOCK: 30–45 min",
    signs: [],
    steps: [],
    aftercare: [],
    faqs: [],
    costRange: null,
    related: ["laser-rct", "laser-gingivoplasty"],
  },
  {
    slug: "laser-rct",
    name: "Laser Root Canal",
    isLaser: true,
    confirmed: true,
    isHub: false,
    order: 2,
    summary: "MOCK: Root canal treatment with laser-assisted canal disinfection under local anaesthesia.",
    sittings: "MOCK: 1",
    duration: "MOCK: 45–60 min",
    signs: [],
    steps: [],
    aftercare: [],
    faqs: [],
    costRange: null,
    related: ["laser-dentistry", "root-canal"],
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
    signs: [],
    steps: [],
    aftercare: [],
    faqs: [],
    costRange: null,
    related: ["laser-dentistry"],
  },
  {
    slug: "root-canal",
    name: "Root Canal Treatment",
    isLaser: false,
    confirmed: true,
    isHub: false,
    order: 4,
    summary: "MOCK: Conventional root canal treatment under local anaesthesia.",
    sittings: "MOCK: 1–2",
    duration: "MOCK: 45–60 min",
    signs: [],
    steps: [],
    aftercare: [],
    faqs: [],
    costRange: null,
    related: ["laser-rct"],
  },
  {
    slug: "dental-restoration",
    name: "Dental Restoration",
    isLaser: false,
    confirmed: true,
    isHub: false,
    order: 5,
    summary: "MOCK: Tooth-coloured fillings and restorative work for decayed or damaged teeth.",
    sittings: "MOCK: 1",
    duration: "MOCK: 30–45 min",
    signs: [],
    steps: [],
    aftercare: [],
    faqs: [],
    costRange: null,
    related: ["crowns-and-bridges"],
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    isLaser: false,
    confirmed: false, // MOCK: assumed — it's in the clinic's own name
    isHub: false,
    order: 6,
    summary: "MOCK: Titanium implant placement for single or multiple missing teeth.",
    sittings: "MOCK: multiple, across weeks",
    duration: "MOCK: 45–90 min per visit",
    signs: [],
    steps: [],
    aftercare: [],
    faqs: [],
    costRange: null,
    related: ["crowns-and-bridges"],
  },
  {
    slug: "crowns-and-bridges",
    name: "Crowns & Bridges",
    isLaser: false,
    confirmed: false, // MOCK: assumed — standard multispecialty scope
    isHub: false,
    order: 7,
    summary: "MOCK: Fixed prosthetics to cap or replace damaged or missing teeth.",
    sittings: "MOCK: 2",
    duration: "MOCK: 45–60 min per visit",
    signs: [],
    steps: [],
    aftercare: [],
    faqs: [],
    costRange: null,
    related: ["dental-implants", "dental-restoration"],
  },
  {
    slug: "braces-and-aligners",
    name: "Braces & Aligners",
    isLaser: false,
    confirmed: false, // MOCK: assumed
    isHub: false,
    order: 8,
    summary: "MOCK: Fixed braces and clear-aligner options for teeth alignment.",
    sittings: "MOCK: ongoing, monthly review",
    duration: "MOCK: 30 min per visit",
    signs: [],
    steps: [],
    aftercare: [],
    faqs: [],
    costRange: null,
    related: ["teeth-whitening"],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening & Smile Design",
    isLaser: false,
    confirmed: false, // MOCK: assumed
    isHub: false,
    order: 9,
    summary: "MOCK: In-clinic whitening and cosmetic smile design consultation.",
    sittings: "MOCK: 1",
    duration: "MOCK: 45–60 min",
    signs: [],
    steps: [],
    aftercare: [],
    faqs: [],
    costRange: null,
    related: ["braces-and-aligners"],
  },
  {
    slug: "kids-dentistry",
    name: "Kids Dentistry",
    isLaser: false,
    confirmed: false, // MOCK: assumed
    isHub: false,
    order: 10,
    summary: "MOCK: Preventive and restorative dental care for children.",
    sittings: "MOCK: varies",
    duration: "MOCK: 20–30 min",
    signs: [],
    steps: [],
    aftercare: [],
    faqs: [],
    costRange: null,
    related: ["dental-restoration"],
  },
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
