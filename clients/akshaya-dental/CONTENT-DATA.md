# Content & Data — Akshaya Dental

The build runs on **mock data** until the client discovery call happens (`PROJECT-BRIEF.md` §7). This file is the boundary between what's real and what's invented.

**The rule:** every invented value carries a `MOCK` marker in `content.js` — **in a comment beside the value, never inside the value itself**. When real data arrives, the swap must be a single-file edit. If it isn't, something got hardcoded — that's a bug.

A marker baked into a rendered string (`tagline: "MOCK: ..."`) renders verbatim on the client's phone and makes the site look like a draft, so the site never prints it. Provisional content is called out verbally during the pitch instead (CONVENTIONS §3). A field the client hasn't supplied yet is `null` — `main.js` hides the element bound to it rather than rendering a dash.

---

## 1. Confirmed — real, verified

Verified 2026-08-16 against Justdial, Practo, Click4Appointment, Lybrate and magicpin listings. Sources at the foot of this file.

| Field | Value |
| :--- | :--- |
| Clinic name | Akshaya Multispeciality Dental Clinic — Dental Implants & LASER |
| Address | Bhagyalakshmi Avenue, Rukmaiah Layout, Hulimavu, Bengaluru, Karnataka |
| Pincode | ⚠️ **Disputed** — 560114 (client-stated) vs 560076 (most listings). Confirm. |
| Locality | Hulimavu (South Bangalore — Bannerghatta Road corridor) |
| Phone / WhatsApp | +91 95388 27905 |
| Google rating / reviews | 4.9 · 1,465 |
| Locations | Single *(⚠️ see §2 — a second Bannerghatta Road address appears in one listing)* |

### The doctor — the single most important verified fact

**Dr. Sampath Kumar Rao K, MDS** — *Oral Implantologist · Periodontist · LASER Specialist*

This appears to be a **single-practitioner clinic**, not a 3–4 doctor practice. Every review found names Dr. Sampath. The site's trust story is therefore *one highly credentialed specialist*, not a team.

His clinical identity is **implantology + periodontology**, with laser as the modality he applies within them. Laser gingivoplasty *is* a periodontal procedure — the laser and the gum specialism are the same thing, not two separate offerings.

### Verified service list

Much broader than the five services originally supplied:

Cosmetic/Aesthetic Dentistry · Crowns & Bridges · Complete/Partial Dentures · Tooth Extraction · Dental Fillings · **Dental Implant Fixing** · **Dental Implants** · Scaling & Polishing · Teeth Whitening · Orthodontic Treatment · **Periodontal Surgeries** · Invisible Braces · Minor Surgery · Root Canal Treatment · Wisdom Tooth Extraction · Dental Laminates & Veneers · Pediatric Dentistry

Plus client-stated: Dental Restoration · Laser Gingivoplasty · Laser Dentistry · Laser RCT

---

## 1a. ⚠️ Discrepancies — resolve with the client before launch

| Field | Conflict | Why it matters |
| :--- | :--- | :--- |
| **Years of experience** | **23+ years** (Justdial, Click4Appointment) vs **15 years** (Lybrate; MDS from SDM College 2010 ⇒ ~16 yrs to 2026) | **Do not publish either number until confirmed.** An unverifiable experience claim is exactly the kind of misleading statement the DCI code prohibits. If it's BDS-inclusive, say "in practice since <year>" instead. |
| Pincode | 560114 vs 560076 | Wrong pincode breaks NAP consistency and hurts local SEO |
| Second address | "Avani Sringeri Nagar, near Sai Baba Temple, Bannerghatta Road, Hulimavu" (Lybrate) | Could be an old location, a second clinic, or a stale listing. Changes IA if there are two locations. |
| Phone | magicpin lists 9217002598 | Almost certainly a magicpin lead-tracking number, not the clinic's. Use +91 95388 27905. |
| Ratings across platforms | Google 4.9/1,465 · Justdial 4.9/1,352 · Lybrate 4.3 | Cite **Google only**, and label it "Google reviews". Never blend platforms into one figure. |
| Registration number | Not published anywhere | Must be obtained from the client. See §3. |

**Sources:** [Justdial](https://www.justdial.com/Bangalore/Akshaya-Multispeciality-Dental-Clinic-Hulimavu/080PXX80-XX80-220929211507-P6U3_BZDET) · [Practo](https://www.practo.com/bangalore/clinic/akshaya-multispeciality-dental-clinic-dental-implants-laser-hulimavu) · [Click4Appointment](https://click4appointment.com/clinic-details/akshayamultispecialitydentalclinic-3014) · [Lybrate](https://www.lybrate.com/bangalore/doctor/dr-sampath-rao-dentist) · [magicpin](https://magicpin.in/Bangalore/Hulimavu/Restaurant/Akshaya-Multispeciality-Dental-Clinic,-Dental-Implants-&-Laser/store/8247a5/)

---

## 2. Assumed — plausible, flagged, must be confirmed

| Assumption | Basis | Risk if wrong |
| :--- | :--- | :--- |
| **3–4 doctors — Dr. Sampath as principal + 2–3 mock associates** | Client's estimate. ⚠️ Online listings and every review found name **only** Dr. Sampath, so a single-practitioner clinic is the likelier reality. **Decision: keep building for 3–4** — the doctor component handles any N, and a grid that degrades to one card is far cheaper than a single-profile layout that has to grow into a grid. | Low — if it turns out to be one doctor, delete the associate entries from `content.js` and the principal card stands alone |
| ~~Dental Implants offered~~ | ✅ **Confirmed in §1** | — |
| ~~Crowns & Bridges, Braces & Aligners, Whitening, Kids Dentistry~~ | ✅ **All four confirmed in §1** | — |
| Timings Mon–Sat 9:30–20:00, Sun 10:00–14:00 | Typical Bangalore clinic | Low — one data edit |
| Languages: Kannada, English, Hindi, Tamil, Telugu | Typical South Bangalore staff | Low |
| Founded ~2015 | Guess from review volume | Medium — appears in About copy |
| Pricing not published (`showPricing: false`) | Safer default | None — block is built, just hidden |

**All of these are `MOCK`-flagged in comments.** None may appear in anything shown to the client without being called out as provisional — verbally, during the pitch.

---

## 3. Fully invented — replace before launch

Doctor names, credentials, and registration numbers · clinic story and founding details · equipment model names · sterilisation protocol specifics · review excerpt text · blog posts · all photography · cost ranges.

> ⚠️ **Registration numbers must be real before launch.** A fabricated DCI registration number on a live clinic site is a serious problem — and a visibly fake one beside a real dentist's name is the worst detail for him to spot in the pitch. `registrationNo` is therefore `null` until the real number arrives; `main.js`'s `formatRegNo()` renders "Reg. no. on file at clinic" in the meantime. Never invent digits, and never render a placeholder that looks like a number.

---

## 4. `content.js` shape

```js
export const clinic = {
  name:        "Akshaya Multispeciality Dental Clinic",
  nameFull:    "Akshaya Multispeciality Dental Clinic — Dental Implants & LASER",
  tagline:     "laser-led dentistry in Hulimavu",   // MOCK
  locality:    "Hulimavu",
  city:        "Bengaluru",
  address: {
    line1: "Bhagyalakshmi Avenue, Rukmaiah Layout",
    line2: "Hulimavu, Bengaluru, Karnataka 560114",
    pincode: "560114",
    landmark: null,                       // pending client call
    mapsUrl:  null,                       // pending GBP listing
    geo: { lat: null, lng: null },        // MOCK: from GBP listing
  },
  phone:     "+919538827905",
  phoneDisplay: "+91 95388 27905",
  whatsapp:  "919538827905",
  email:     null,                         // pending client call
  rating:    4.9,
  reviewCount: 1465,
  foundedYear: 2015,                       // MOCK
  hours: [ /* MOCK — {day, open, close, closed} ×7 */ ],
  languages: ["Kannada","English","Hindi","Tamil","Telugu"],   // MOCK
  parking: null,                           // pending client call
  social: { /* MOCK */ },
};

export const flags = {
  showPricing: false,      // cost block built but hidden until client confirms
  showBlog: true,
  showDoctorPages: true,   // individual pages when a doctor has enough content
};

export const doctors = [
  {
    slug: "dr-sampath-kumar-rao-k",
    name: "Dr. Sampath Kumar Rao K",          // verified
    degrees: "MDS",                            // verified
    specialisation: "Oral Implantologist · Periodontist · LASER Specialist",  // verified
    isPrincipal: true,                         // renders the --principal card variant
    registrationNo: null,                      // ⚠️ must be real before launch; renders "Reg. no. on file at clinic" until then
    practisingSince: null,                     // ⚠️ MOCK — never render a years count, see §1a
    treatments: ["dental-implants", "gum-treatment",
                 "laser-gingivoplasty", "laser-dentistry"],
    bio: "...",                                // MOCK
    photo: "assets/img/doctors/placeholder.webp",
  },
  // + any real associates, standard card variant — see §2
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
    sittings: "1–2",                  // MOCK, as is every prose field below
    duration: "30–45 min",
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

Ordered by **pillar first**, then search demand. Not laser-first — laser is the method, not the identity.

| # | Slug | Name | Pillar | Laser | Status | Session |
| :-- | :--- | :--- | :--- | :-- | :--- | :-- |
| 1 | `dental-implants` | Dental Implants | ⭐ Implants | ✅ | **Verified** | S6 |
| 2 | `gum-treatment` | Gum & Periodontal Treatment | ⭐ Gums | ✅ | **Verified** | S6 |
| 3 | `laser-gingivoplasty` | Laser Gingivoplasty | Gums | ✅ | **Verified** | S6 |
| 4 | `laser-dentistry` | Laser Dentistry *(method hub)* | — | ✅ | **Verified** | S6 |
| 5 | `root-canal` | Root Canal Treatment | — | — | **Verified** | S6 |
| 6 | `laser-rct` | Laser Root Canal | — | ✅ | **Verified** | S6 |
| 7 | `crowns-and-bridges` | Crowns & Bridges | — | — | **Verified** | S7 |
| 8 | `dental-restoration` | Dental Restoration & Fillings | — | — | **Verified** | S7 |
| 9 | `braces-and-aligners` | Braces & Invisible Aligners | — | — | **Verified** | S7 |
| 10 | `teeth-whitening` | Teeth Whitening & Smile Design | — | — | **Verified** | S7 |
| 11 | `kids-dentistry` | Kids Dentistry | — | — | **Verified** | S7 |

All eleven are now verified as offered (`§1`), so nothing here is guesswork — but the **priority order** is still our judgment and should be sanity-checked with the client.

**Comparator reuse:** pages 1, 2, 3, 4 and 6 embed the S3 comparator with rows adapted to that procedure. Pages 5, 7–11 don't.

**Also offered, not getting their own page** (folded into related pages or the treatments hub): dentures, veneers/laminates, wisdom tooth extraction, scaling & polishing, tooth extraction, minor oral surgery. Promote any of these to a full page if the client says it's a revenue driver.

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
