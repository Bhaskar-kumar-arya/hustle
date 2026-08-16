# Content & Data — Akshaya Dental

The build runs on **mock data** until the client discovery call happens (`PROJECT-BRIEF.md` §7). This file is the boundary between what's real and what's invented.

**The rule:** every invented value carries a `MOCK:` marker in `content.js`. When real data arrives, the swap must be a single-file edit. If it isn't, something got hardcoded — that's a bug.

---

## 1. Confirmed — real, verified

| Field | Value |
| :--- | :--- |
| Clinic name | Akshaya Multispeciality Dental Clinic — Dental Implants & LASER |
| Address | Bhagyalakshmi Avenue, Rukmaiah Layout, Hulimavu, Bengaluru, Karnataka 560114 |
| Locality | Hulimavu (South Bangalore — Bannerghatta Road corridor) |
| Phone / WhatsApp | +91 95388 27905 |
| Google rating | 4.9 |
| Review count | 1,465 |
| Locations | Single |

**Confirmed treatments** (client-stated): Dental Restoration · Laser Gingivoplasty · RCT (Root Canal) · Laser Dentistry · Laser RCT

Use these exactly. They are the only content on the site that is verified.

---

## 2. Assumed — plausible, flagged, must be confirmed

| Assumption | Basis | Risk if wrong |
| :--- | :--- | :--- |
| 3–4 doctors | Client's rough estimate | Low — doctor component is built for any N |
| Dental Implants offered | It's in the clinic's own name | Very low |
| Crowns & Bridges, Braces & Aligners, Whitening / Smile Design, Kids Dentistry | Standard multispecialty scope | Low — pages are cut or swapped, template unaffected |
| Timings Mon–Sat 9:30–20:00, Sun 10:00–14:00 | Typical Bangalore clinic | Low — one data edit |
| Languages: Kannada, English, Hindi, Tamil, Telugu | Typical South Bangalore staff | Low |
| Founded ~2015 | Guess from review volume | Medium — appears in About copy |
| Pricing not published (`showPricing: false`) | Safer default | None — block is built, just hidden |

**All of these are `MOCK:` flagged.** None may appear in anything shown to the client without being labelled provisional.

---

## 3. Fully invented — replace before launch

Doctor names, credentials, and registration numbers · clinic story and founding details · equipment model names · sterilisation protocol specifics · review excerpt text · blog posts · all photography · cost ranges.

> ⚠️ **Registration numbers must be real before launch.** A fabricated DCI registration number on a live clinic site is a serious problem. Mock ones use the obviously-fake format `MOCK-KA-00000` so they cannot be mistaken for real and cannot survive a search.

---

## 4. `content.js` shape

```js
export const clinic = {
  name:        "Akshaya Multispeciality Dental Clinic",
  nameFull:    "Akshaya Multispeciality Dental Clinic — Dental Implants & LASER",
  tagline:     "MOCK: laser-led dentistry in Hulimavu",
  locality:    "Hulimavu",
  city:        "Bengaluru",
  address: {
    line1: "Bhagyalakshmi Avenue, Rukmaiah Layout",
    line2: "Hulimavu, Bengaluru, Karnataka 560114",
    pincode: "560114",
    landmark: "MOCK: —",
    mapsUrl:  "MOCK: —",
    geo: { lat: null, lng: null },        // MOCK: from GBP listing
  },
  phone:     "+919538827905",
  phoneDisplay: "+91 95388 27905",
  whatsapp:  "919538827905",
  email:     "MOCK: —",
  rating:    4.9,
  reviewCount: 1465,
  foundedYear: 2015,                       // MOCK
  hours: [ /* MOCK: {day, open, close, closed} ×7 */ ],
  languages: ["Kannada","English","Hindi","Tamil","Telugu"],   // MOCK
  parking: "MOCK: —",
  social: { /* MOCK */ },
};

export const flags = {
  showPricing: false,      // cost block built but hidden until client confirms
  showBlog: true,
  showDoctorPages: true,   // individual pages when a doctor has enough content
};

export const doctors = [
  {
    slug: "MOCK-dr-...",
    name: "MOCK: ...",
    degrees: "MOCK: BDS, MDS",
    specialisation: "MOCK: ...",
    registrationNo: "MOCK-KA-00000",       // ⚠️ must be real before launch
    experienceYears: 0,                     // MOCK
    treatments: ["laser-rct", "..."],       // slugs from treatments[]
    bio: "MOCK: ...",
    photo: "assets/img/doctors/placeholder.webp",
  },
  // ×3–4
];

export const treatments = [
  {
    slug: "laser-dentistry",
    name: "Laser Dentistry",
    isLaser: true,
    confirmed: true,                  // client-stated
    isHub: true,
    order: 1,
    summary: "...",
    sittings: "MOCK: 1–2",
    duration: "MOCK: 30–45 min",
    signs: [], steps: [], aftercare: [], faqs: [],
    costRange: null,                  // MOCK — hidden by flags.showPricing
    related: ["laser-rct", "laser-gingivoplasty"],
  },
  // ×10 — see §5
];

export const reviews = [ /* MOCK excerpts until the Google embed is wired */ ];
export const faqs    = [ /* MOCK ×8–10, homepage */ ];
```

**Binding pattern:** follow `public/demo/dental/script.js` — `data-bind` attributes resolved on load. Read it before writing new binding code.

---

## 5. Treatment pages — all 10

Laser-first ordering. Built in S6 (confirmed) and S7 (assumed).

| # | Slug | Name | Laser | Status | Session |
| :-- | :--- | :--- | :-- | :--- | :-- |
| 1 | `laser-dentistry` | Laser Dentistry *(hub)* | ✅ | Confirmed | S6 |
| 2 | `laser-rct` | Laser Root Canal | ✅ | Confirmed | S6 |
| 3 | `laser-gingivoplasty` | Laser Gingivoplasty | ✅ | Confirmed | S6 |
| 4 | `root-canal` | Root Canal Treatment | — | Confirmed | S6 |
| 5 | `dental-restoration` | Dental Restoration | — | Confirmed | S6 |
| 6 | `dental-implants` | Dental Implants | — | Assumed | S7 |
| 7 | `crowns-and-bridges` | Crowns & Bridges | — | Assumed | S7 |
| 8 | `braces-and-aligners` | Braces & Aligners | — | Assumed | S7 |
| 9 | `teeth-whitening` | Teeth Whitening & Smile Design | — | Assumed | S7 |
| 10 | `kids-dentistry` | Kids Dentistry | — | Assumed | S7 |

Laser treatments (1–3) embed the S3 comparator. Non-laser pages don't.

---

## 6. Writing mock copy

Mock copy is not filler. Bad placeholder copy warps the design around it, and lorem ipsum makes it impossible to judge line lengths and rhythm. Write it as if it ships.

- **Write it DCI-compliant from the start.** Never mock in "Best Dental Clinic in Bangalore" — designing around that headline means fighting it later. See `CONVENTIONS.md` §1.
- Plain verbs, sentence case, no filler. Write from the patient's side of the screen.
- Name things by what the patient recognises, not what the clinic calls them internally.
- An action keeps the same name through a flow: a button that says "Book a consultation" leads to a confirmation that says "Consultation requested."
- Match real length. Real Indian clinic copy is short — a two-line hero, not a paragraph.
- The audience is an anxious person on a phone who searched "root canal near me." Write for them.

## 7. Images

Real photography is the human's task and the longest-lead item (`PROJECT-BRIEF.md` §8). Until it lands:

- Placeholders at the **exact final aspect ratio** so real photos drop in with no layout change
- Doctor portraits 4:5 · facility 3:2 · equipment 1:1 · blog cards 16:9
- Always explicit `width`/`height` to prevent layout shift
- Placeholders are flat `--bisque` blocks with a Plex Mono label naming the required shot — never stock photos, never AI-generated faces. A labelled placeholder is a shot list the client can act on; a stock photo is a decision nobody made.
