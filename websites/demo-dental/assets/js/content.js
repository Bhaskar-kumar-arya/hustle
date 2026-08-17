/*
  content.js — the single source of all client data for Nirvana Dental Care (Sales Demo).
  Fictional demo data configured for general dental clinic showcases.
*/

export const clinic = {
  name: "Nirvana Dental Care",
  nameFull: "Nirvana Multispeciality Dental Clinic",
  tagline: "Comprehensive, gentle dental care — from preventive care and root canals to implants and cosmetic dentistry.",
  siteUrl: "https://www.nirvanadental.com",
  locality: "Koregaon Park",
  city: "Pune",
  state: "Maharashtra",
  address: {
    line1: "North Main Road, Lane 5",
    line2: "Koregaon Park, Pune, Maharashtra 411001",
    pincode: "411001",
    landmark: "Near Bund Garden, Koregaon Park",
    mapsUrl: null,
    geo: { lat: null, lng: null },
  },
  phone: "+919931386969",
  phoneDisplay: "+91 9931386969",
  whatsapp: "919931386969",
  email: "care@nirvanadental.com",
  rating: 4.9,
  reviewCount: 1420,
  foundedYear: 2016,
  hours: [
    { day: "Monday", open: "09:30", close: "20:00", closed: false },
    { day: "Tuesday", open: "09:30", close: "20:00", closed: false },
    { day: "Wednesday", open: "09:30", close: "20:00", closed: false },
    { day: "Thursday", open: "09:30", close: "20:00", closed: false },
    { day: "Friday", open: "09:30", close: "20:00", closed: false },
    { day: "Saturday", open: "09:30", close: "20:00", closed: false },
    { day: "Sunday", open: "10:00", close: "14:00", closed: false },
  ],
  languages: ["English", "Hindi", "Marathi"],
  parking: "Dedicated two-wheeler and visitor car parking available.",
  social: {
    google: "#",
    instagram: "#",
    facebook: "#",
  },
};

export const about = {
  story:
    "Nirvana Multispeciality Dental Clinic was established in Koregaon Park, Pune in 2016 to provide patient-centered, comprehensive dental care. Built on strong clinical foundations in restorative, surgical, and preventive dentistry, the practice focuses on transparent advice, comfortable procedures, and long-term oral health.",
  philosophy:
    "Every visit starts with a thorough clinical examination and open conversation. We believe in conservative, evidence-based dentistry — recommending only what is clinically necessary, explaining all treatment options clearly, and ensuring every patient feels relaxed and in control.",
};

export const facility = [
  { label: "Reception & waiting lounge" },
  { label: "Private consultation room" },
  { label: "Advanced treatment operatory" },
  { label: "Class-B sterilisation suite" },
];

export const patientInfo = {
  firstVisit: [
    "A thorough, unhurried conversation about your dental concerns and medical history.",
    "A comprehensive clinical examination, supported by digital X-rays if needed.",
    "A personalized treatment plan explained in plain language with all options.",
    "Transparent cost estimate provided upfront — no hidden charges or surprises.",
  ],
  whatToBring: [
    "Any prior dental X-rays, scans, or records you may have",
    "A list of current medications and allergies",
    "Your corporate or individual health insurance card, if applicable",
    "A few extra minutes for your first appointment so we can complete your initial charting",
  ],
  payment: ["Cash", "UPI & QR Payments", "Credit & Debit Cards", "No-Cost EMI on select treatments"],
  emiNote: "Flexible 0% EMI payment options are available for eligible implant and orthodontic treatments.",
  insurance: "We provide comprehensive itemized invoices and documentation for insurance reimbursement.",
  emergency: "For severe toothache, broken crowns, or trauma, contact our emergency line directly or send a WhatsApp message for priority scheduling.",
};

export const flags = {
  showPricing: false,
  showBlog: true,
  showDoctorPages: true,
};

export const analytics = {
  ga4MeasurementId: "",
};

export const doctors = [
  {
    slug: "dr-arvind-rao",
    name: "Dr. Arvind Rao",
    degrees: "BDS, MDS",
    specialisation: "Oral Implantologist & Periodontist",
    isPrincipal: true,
    registrationNo: null,
    practisingSince: null,
    treatments: [
      "dental-implants",
      "root-canal",
      "crowns-and-bridges",
      "gum-treatment",
      "braces-and-aligners",
      "dental-restoration",
      "teeth-whitening",
      "kids-dentistry",
    ],
    bio: "Chief Dental Surgeon with extensive postgraduate training in dental implants and periodontal surgery. Specialises in minimally invasive restorations, full-mouth rehabilitations, and gentle patient care.",
    photo: "/assets/img/doctors/dr-arvind-rao.webp",
  },
];

export const equipment = [
  {
    name: "Digital OPG & Panoramic X-ray",
    benefit: "High-resolution digital imaging provides complete views of jaw and teeth with minimal radiation exposure.",
    photo: "/assets/img/equipment/digital-opg-xray.webp",
  },
  {
    name: "Intraoral 3D Scanner",
    benefit: "Replaces uncomfortable impression trays with rapid, accurate 3D optical scans for crowns and aligners.",
    photo: "/assets/img/equipment/intraoral-3d-scanner.webp",
  },
  {
    name: "Rotary Endodontics & Apex Locator",
    benefit: "Precision motorized instrumentation ensures thorough, accurate, and comfortable root canal cleaning.",
    photo: "/assets/img/equipment/rotary-endodontics.webp",
  },
  {
    name: "Class-B Vacuum Autoclave",
    benefit: "Hospital-grade multi-stage vacuum sterilization ensures absolute sterility for every reusable instrument.",
    photo: "/assets/img/equipment/class-b-autoclave.webp",
  },
];

export const sterilisation = [
  "Hospital-grade Class-B vacuum autoclave sterilization for all reusable instruments",
  "Strict single-use policy for examination gloves, suction tips, and needles",
  "Hospital-standard chemical disinfection of operatories between every patient",
  "Full personal protective equipment (PPE) maintained during all clinical procedures",
];

export const treatments = [
  {
    slug: "dental-implants",
    name: "Dental Implants",
    isLaser: false,
    confirmed: true,
    isHub: false,
    order: 1,
    summary: "Permanent titanium implants for single or multiple missing teeth, designed to restore natural chewing and aesthetics.",
    sittings: "2–3 across healing period",
    duration: "45–60 min per visit",
    signs: [
      "One or more missing teeth",
      "Difficulty chewing comfortably",
      "Loose or uncomfortable removable dentures",
      "Gaps causing adjacent teeth to shift",
    ],
    steps: [
      { title: "Consultation & 3D Imaging", desc: "Comprehensive clinical exam and digital scan to assess bone density and plan exact placement." },
      { title: "Personalised Treatment Plan", desc: "Selection of implant system and step-by-step roadmap tailored to your oral anatomy." },
      { title: "Implant Placement", desc: "Gentle placement of the titanium implant fixture under local anaesthesia with minimal discomfort." },
      { title: "Osseointegration Period", desc: "A healing period allowing the implant to fuse securely with surrounding jaw bone." },
      { title: "Custom Crown Placement", desc: "A precision-matched ceramic or zirconia crown is securely attached to complete your smile." },
    ],
    aftercare: [
      "Consume soft foods for the first 48 hours following placement",
      "Avoid smoking and hot beverages during initial healing",
      "Maintain gentle brushing and warm saline rinses as advised",
      "Attend scheduled reviews to monitor healthy bone integration",
    ],
    faqs: [
      { q: "How long do dental implants last?", a: "With good oral hygiene and routine dental checkups, implants can last decades or a lifetime. Suitability is confirmed during consultation." },
      { q: "Is the implant procedure painful?", a: "The procedure is performed under local anaesthesia, ensuring you feel no pain. Post-procedure soreness is typically mild and easily managed." },
      { q: "Can implants replace multiple missing teeth?", a: "Yes, implants can support single crowns, fixed multi-unit bridges, or full-arch hybrid prostheses." },
      { q: "What are dental implants made of?", a: "Biocompatible medical-grade titanium or zirconia, which naturally bonds with jaw bone tissue." },
    ],
    costRange: { min: 25000, max: 45000, unit: "per implant", emi: true },
    related: ["crowns-and-bridges", "dental-restoration"],
  },
  {
    slug: "root-canal",
    name: "Root Canal Treatment",
    isLaser: false,
    confirmed: true,
    isHub: false,
    order: 2,
    summary: "Gentle, single or multi-visit root canal therapy using rotary instruments to relieve tooth pain and save your natural tooth.",
    sittings: "1–2",
    duration: "40–60 min",
    signs: [
      "Persistent or throbbing toothache, especially while chewing",
      "Lingering sensitivity to hot or cold drinks and food",
      "Darkening or discoloration of a single tooth",
      "Swelling or tender bump on the gum near the tooth",
    ],
    steps: [
      { title: "Digital Diagnosis & X-ray", desc: "High-resolution digital X-rays confirm infection depth and root canal anatomy." },
      { title: "Gentle Local Anaesthesia", desc: "Complete numbing ensures the entire procedure is completely comfortable." },
      { title: "Rotary Cleaning & Disinfection", desc: "Infected pulp is removed and canals are shaped and sterilized with precision instruments." },
      { title: "Bio-Inert Gutta-Percha Sealing", desc: "The cleaned canal space is sealed with biocompatible material to prevent re-infection." },
      { title: "Permanent Crown / Restoration", desc: "A protective crown or ceramic restoration strengthens the tooth for daily chewing." },
    ],
    aftercare: [
      "Avoid chewing hard foods on the treated tooth until the final crown is placed",
      "Take prescribed anti-inflammatory medication as directed",
      "Continue regular brushing and flossing around the restoration",
      "Return for permanent crown fitting as scheduled",
    ],
    faqs: [
      { q: "Can a root canal be done in a single visit?", a: "Many cases are completed in a single 45–60 minute sitting; complex infections may require two visits. Suitability is determined by clinical examination." },
      { q: "Is root canal treatment painful?", a: "Modern local anaesthetics and precision rotary endodontics ensure the procedure is virtually painless — it relieves pain rather than causing it." },
      { q: "Why is a crown recommended after root canal?", a: "Removing infected pulp reduces the tooth's hydration; a custom crown protects against fractures during chewing." },
    ],
    costRange: { min: 4000, max: 9000, unit: "per tooth", emi: false },
    related: ["crowns-and-bridges", "dental-restoration"],
  },
  {
    slug: "crowns-and-bridges",
    name: "Crowns & Bridges",
    isLaser: false,
    confirmed: true,
    isHub: false,
    order: 3,
    summary: "Precision-milled ceramic, zirconia, and porcelain crowns and fixed bridges to restore strength, function, and aesthetics.",
    sittings: "2",
    duration: "45–60 min per visit",
    signs: [
      "A cracked, broken, or heavily filled tooth",
      "A tooth that has undergone root canal therapy",
      "One or more missing teeth with healthy adjacent anchors",
      "Severe enamel wear or aesthetic irregularities",
    ],
    steps: [
      { title: "Tooth Preparation & Assessment", desc: "The tooth is shaped and measured to accommodate the restorative material." },
      { title: "3D Digital Impression", desc: "Optical scan or precision impression captures exact contours and bite alignment." },
      { title: "Custom Shade Matching", desc: "We match the exact shade and translucency of your adjacent natural teeth." },
      { title: "Temporary Protection", desc: "A temporary crown protects your tooth while the lab crafts your permanent restoration." },
      { title: "Final Bonding & Check", desc: "The custom crown is permanently bonded, with bite alignment verified for maximum comfort." },
    ],
    aftercare: [
      "Avoid sticky foods during the temporary crown phase",
      "Brush and floss daily around the crown margins",
      "Schedule routine 6-month dental checkups and cleanings",
    ],
    faqs: [
      { q: "What is the difference between a crown and a bridge?", a: "A crown caps a single damaged tooth, while a bridge spans a gap using crowns on adjacent teeth to support a false tooth." },
      { q: "Which material is best for front vs back teeth?", a: "All-ceramic and translucent zirconia are ideal for front teeth aesthetics, while monolithic zirconia offers maximum strength for back molars." },
    ],
    costRange: { min: 6000, max: 15000, unit: "per unit", emi: true },
    related: ["dental-implants", "dental-restoration"],
  },
  {
    slug: "gum-treatment",
    name: "Gum & Periodontal Care",
    isLaser: false,
    confirmed: true,
    isHub: false,
    order: 4,
    summary: "Preventive scaling, deep root planing, and periodontal therapies to treat gingivitis and restore gum health.",
    sittings: "1–2",
    duration: "30–45 min",
    signs: [
      "Gums that bleed when brushing or flossing",
      "Red, swollen, or tender gum margins",
      "Persistent bad breath (halitosis)",
      "Gum recession or teeth appearing longer",
    ],
    steps: [
      { title: "Periodontal Charting", desc: "Measurement of gum pocket depths to determine inflammation levels." },
      { title: "Ultrasonic Scaling", desc: "Gentle removal of hardened tartar and bacterial plaque from above and below the gumline." },
      { title: "Root Planing", desc: "Smoothing root surfaces to discourage bacterial re-attachment and encourage healthy gum reattachment." },
      { title: "Antiseptic Irrigation", desc: "Targeted antimicrobial rinse to soothe tissue and reduce bacterial load." },
      { title: "Home Care Coaching", desc: "Personalized flossing, interdental brushing, and maintenance recommendations." },
    ],
    aftercare: [
      "Use a soft-bristle toothbrush with gentle circular motions",
      "Rinse with warm saltwater or prescribed mouthwash for 3–5 days",
      "Maintain 6-month preventive scaling appointments",
    ],
    faqs: [
      { q: "Does dental scaling cause tooth sensitivity or gaps?", a: "No, scaling removes tartar that was masking recession or inflammation; healthy gums heal and tighten around the clean teeth." },
      { q: "How often should I get a professional dental cleaning?", a: "Every 6 months is recommended for most patients, or every 3–4 months for patients managing active periodontitis." },
    ],
    costRange: { min: 1500, max: 6000, unit: "per session", emi: false },
    related: ["dental-restoration", "teeth-whitening"],
  },
  {
    slug: "braces-and-aligners",
    name: "Braces & Clear Aligners",
    isLaser: false,
    confirmed: true,
    isHub: false,
    order: 5,
    summary: "Orthodontic solutions including modern ceramic brackets and discreet clear aligners for all age groups.",
    sittings: "Monthly or bi-monthly reviews",
    duration: "20–30 min per review",
    signs: [
      "Crooked, crowded, or overlapping teeth",
      "Gaps between teeth or spacing concerns",
      "Overbite, underbite, or crossbite issues",
      "Difficulty cleaning crowded teeth effectively",
    ],
    steps: [
      { title: "Orthodontic Consultation", desc: "Evaluation of facial profile, dental arches, and bite dynamics." },
      { title: "3D Digital Scanning", desc: "Complete 3D intraoral digital impression to simulate step-by-step tooth alignment." },
      { title: "Appliance Fitting", desc: "Placement of aesthetic ceramic brackets or delivery of initial custom clear aligner trays." },
      { title: "Periodic Progress Checks", desc: "Gentle adjustments or new aligner sets issued every few weeks." },
      { title: "Retainer Phase", desc: "Custom clear retainers provided to maintain your new smile permanently." },
    ],
    aftercare: [
      "Wear clear aligners 20–22 hours daily, removing only for meals and brushing",
      "Brush thoroughly after every meal before replacing aligner trays",
      "Wear retainers consistently following active treatment completion",
    ],
    faqs: [
      { q: "Are clear aligners as effective as traditional braces?", a: "Yes, for the vast majority of mild, moderate, and many complex alignment cases, modern clear aligners achieve excellent results with supreme comfort." },
      { q: "What is the average treatment duration?", a: "Most cases range between 6 to 18 months depending on the degree of correction needed." },
    ],
    costRange: { min: 35000, max: 120000, unit: "full treatment", emi: true },
    related: ["crowns-and-bridges", "teeth-whitening"],
  },
  {
    slug: "dental-restoration",
    name: "Dental Restorations & Fillings",
    isLaser: false,
    confirmed: true,
    isHub: false,
    order: 6,
    summary: "Tooth-coloured composite restorations and ceramic inlays that blend seamlessly with natural enamel.",
    sittings: "1",
    duration: "30–45 min",
    signs: [
      "Visible dark spots or cavities on tooth surfaces",
      "Food catching between specific teeth",
      "Chipped, worn, or fractured enamel",
      "Old, leaking silver amalgam fillings",
    ],
    steps: [
      { title: "Cavity Detection & Cleaning", desc: "Gentle removal of decayed enamel while preserving maximum healthy tooth structure." },
      { title: "Conditioning & Bonding", desc: "Application of dental adhesive that micro-mechanically locks with tooth enamel." },
      { title: "Composite Layering", desc: "Artistic layering of shade-matched composite resin to replicate natural tooth anatomy." },
      { title: "Curing & Polishing", desc: "Light-curing and high-gloss polishing for a smooth, natural finish that resists staining." },
    ],
    aftercare: [
      "You can eat normally as soon as local numbness wears off",
      "Maintain routine brushing and flossing twice daily",
    ],
    faqs: [
      { q: "How long do composite tooth-coloured fillings last?", a: "High-quality composite fillings typically last 7–10+ years with good oral hygiene and regular dental checkups." },
    ],
    costRange: { min: 1200, max: 3500, unit: "per filling", emi: false },
    related: ["root-canal", "gum-treatment"],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    isLaser: false,
    confirmed: true,
    isHub: false,
    order: 7,
    summary: "Safe, in-office and custom take-home professional whitening systems to remove deep stains and brighten your smile.",
    sittings: "1 in-clinic sitting",
    duration: "45–60 min",
    signs: [
      "Yellowing or dull enamel from tea, coffee, or aging",
      "Stains resistant to ordinary brushing",
      "Upcoming wedding, interview, or special event",
    ],
    steps: [
      { title: "Shade Assessment", desc: "Pre-treatment shade recording and oral health check." },
      { title: "Gingival Barrier Protection", desc: "Protective resin applied to gum margins to prevent sensitivity." },
      { title: "Whitening Gel Application", desc: "Application of professional hydrogen/carbamide peroxide whitening formula." },
      { title: "Light Activation & Rinse", desc: "Light-assisted activation in 15-minute cycles followed by fluoride desensitizing gel." },
    ],
    aftercare: [
      "Avoid staining foods and drinks (coffee, tea, turmeric, red wine) for 48 hours",
      "Use sensitive-formula toothpaste if temporary mild sensitivity occurs",
    ],
    faqs: [
      { q: "Does professional teeth whitening damage enamel?", a: "No, professionally supervised whitening safely lifts organic stains from enamel pores without altering tooth structure." },
    ],
    costRange: { min: 5000, max: 12000, unit: "full session", emi: false },
    related: ["dental-restoration", "crowns-and-bridges"],
  },
  {
    slug: "kids-dentistry",
    name: "Kids' Dentistry",
    isLaser: false,
    confirmed: true,
    isHub: false,
    order: 8,
    summary: "Friendly, gentle preventive and restorative dental care for infants, children, and teenagers in a welcoming environment.",
    sittings: "1",
    duration: "20–30 min",
    signs: [
      "First tooth eruption or turning 1 year of age",
      "Visible white or brown spots on milk teeth",
      "Habits like thumb sucking or mouth breathing",
      "Complaints of food packing or sensitivity during meals",
    ],
    steps: [
      { title: "Friendly Welcome & Chair Ride", desc: "Relaxed introduction to the dental chair to build trust and eliminate fear." },
      { title: "Gentle Visual Examination", desc: "Checking milk teeth development, bite alignment, and cavity risk." },
      { title: "Fluoride Treatment & Cleaning", desc: "Protective fluoride varnish application to strengthen enamel against decay." },
      { title: "Parent Guidance", desc: "Tips on dietary habits, age-appropriate brushing, and cavity prevention." },
    ],
    aftercare: [
      "Wait 30 minutes after fluoride treatment before eating or drinking",
      "Supervise daily brushing until age 7–8",
    ],
    faqs: [
      { q: "Why is treating milk teeth important if they fall out anyway?", a: "Milk teeth hold critical space for permanent teeth, enable proper speech and chewing, and prevent painful infections that could harm developing adult teeth." },
    ],
    costRange: { min: 1000, max: 3500, unit: "per visit", emi: false },
    related: ["dental-restoration", "braces-and-aligners"],
  },
];

export const alsoOffered = [
  "Wisdom tooth extraction",
  "Ultrasonic scaling & polishing",
  "Cosmetic composite bonding",
  "Dental night guards & splints",
  "Full mouth digital rehabilitation",
  "Emergency pain relief",
];

export const reviews = [
  {
    author: "Priya S.",
    rating: 5,
    text: "Had a root canal done here — completed in a single sitting with zero pain. Dr. Arvind explained everything clearly before starting.",
    date: null,
  },
  {
    author: "Rohit K.",
    rating: 5,
    text: "Got two dental implants placed. Highly professional, very clean clinic, and upfront pricing with no hidden costs.",
    date: null,
  },
  {
    author: "Divya M.",
    rating: 5,
    text: "Wonderful experience with my 6-year-old son. The team was gentle and patient, and made his first dental checkup completely stress-free.",
    date: null,
  },
];

export const blogPosts = [
  {
    slug: "bleeding-gums-what-it-means",
    title: "Bleeding gums: what it means and when to get it checked",
    category: "Gum care",
    publishedDate: "2026-05-04",
    readTime: "4 min read",
    coverLabel: "Dental examination of gum health",
    excerpt: "Bleeding gums are common, but they are an early warning sign. Here is what causes it and when to consult a dental specialist.",
    body: [
      {
        id: "why-gums-bleed",
        heading: "Why gums bleed",
        paragraphs: [
          "Gums that bleed during brushing or flossing usually indicate bacterial plaque buildup along the gumline, triggering localized inflammation (gingivitis).",
          "If left untreated, gingivitis can progress to periodontitis, which affects the bone and tissue supporting your teeth.",
        ],
      },
      {
        id: "when-to-see-a-dentist",
        heading: "When to see a dentist",
        paragraphs: [
          "Bleeding that persists for more than a few days, or is accompanied by swelling, redness, bad breath, or receding gums, requires a professional periodontal checkup.",
          "Early intervention with ultrasonic cleaning and targeted care restores gum health quickly and painlessly.",
        ],
      },
    ],
  },
  {
    slug: "root-canal-what-actually-happens",
    title: "Modern root canal treatment: what actually happens step by step",
    category: "Root canal",
    publishedDate: "2026-05-18",
    readTime: "5 min read",
    coverLabel: "Digital X-ray showing tooth root structure",
    excerpt: "Modern root canal therapy is comfortable, efficient, and saves your natural tooth. Here is what happens in the chair.",
    body: [
      {
        id: "signs-you-might-need-one",
        heading: "Signs you might need a root canal",
        paragraphs: [
          "Persistent toothache, deep sensitivity to hot or cold, and swelling near the root often indicate infected dental pulp.",
          "Digital X-rays allow your dentist to accurately identify infection depth and plan gentle treatment.",
        ],
      },
      {
        id: "the-procedure-step-by-step",
        heading: "The procedure, step by step",
        paragraphs: [
          "Under comfortable local anaesthesia, infected tissue is removed using rotary instruments and the root canals are thoroughly disinfected.",
          "The canal is sealed with biocompatible gutta-percha, and a protective crown is placed to restore full chewing function.",
        ],
      },
    ],
  },
  {
    slug: "dental-implants-vs-bridges",
    title: "Dental implants vs. fixed bridges: choosing the right option",
    category: "Implants",
    publishedDate: "2026-06-01",
    readTime: "4 min read",
    coverLabel: "Dental implant model demonstrating jaw integration",
    excerpt: "Both implants and bridges replace missing teeth, but they work differently. Here is how to evaluate which is best for your smile.",
    body: [
      {
        id: "how-they-differ",
        heading: "How dental implants and bridges differ",
        paragraphs: [
          "A dental implant stands independently on a titanium root placed in the jawbone, preserving adjacent teeth completely untouched.",
          "A bridge uses crowns on adjacent natural teeth to span the gap, making it a reliable option when neighboring teeth already require crowns.",
        ],
      },
    ],
  },
  {
    slug: "childs-first-dental-visit",
    title: "Your child's first dental visit: creating a positive experience",
    category: "Kids dentistry",
    publishedDate: "2026-06-15",
    readTime: "3 min read",
    coverLabel: "Welcoming paediatric dental care setup",
    excerpt: "A positive first dental visit builds lifelong healthy oral habits. Here is what parents can expect.",
    body: [
      {
        id: "when-to-visit",
        heading: "When to schedule the first visit",
        paragraphs: [
          "Pediatric dental associations recommend an initial checkup around the child's first birthday or when the first tooth appears.",
          "The visit is friendly, gentle, and focused on helping the child feel completely comfortable in the dental clinic.",
        ],
      },
    ],
  },
];

export const faqs = [
  {
    q: "Do you offer emergency dental appointments?",
    a: "Yes, we reserve slots daily for dental emergencies such as severe toothache, broken crowns, or trauma. WhatsApp or call our reception for priority scheduling.",
  },
  {
    q: "Is root canal treatment painful?",
    a: "With modern local anaesthetics and precision rotary endodontics, root canal treatment is completely comfortable and relieves acute dental pain.",
  },
  {
    q: "How long do dental implants take from start to finish?",
    a: "Implant placement is completed in a single 45–60 minute sitting. After a healing period of 2–3 months for bone integration, the permanent crown is fitted.",
  },
  {
    q: "Do you treat children?",
    a: "Yes, we provide comprehensive, gentle pediatric dental care including preventive fluoride treatments, pit & fissure sealants, and cavity fillings.",
  },
  {
    q: "What safety and sterilisation standards do you follow?",
    a: "We follow hospital-grade Class-B vacuum autoclave sterilisation protocols for all instruments, alongside strict single-use disposables for every patient.",
  },
  {
    q: "Do you accept digital payments and insurance?",
    a: "We accept all major credit/debit cards, UPI, and net banking, and offer 0% EMI options. We also provide full documentation for insurance reimbursement.",
  },
  {
    q: "What should I bring to my first consultation?",
    a: "Please bring any prior dental X-rays or records you have, and a list of any ongoing medical conditions or medications.",
  },
  {
    q: "Can I book an appointment via WhatsApp?",
    a: "Yes, you can click the WhatsApp button on our website to instantly message our clinic team with your preferred date and time.",
  },
];
