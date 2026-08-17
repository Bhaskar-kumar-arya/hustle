# Akshaya Dental — Design System & Build Plan

> **Direction: "Quiet Light"**
> Client: Akshaya Multispeciality Dental Clinic — Dental Implants & LASER, Hulimavu, Bengaluru
> Companion doc: [`CLIENT_01_DENTAL_BUILD_PLAN.md`](./PROJECT-BRIEF.md)

---

## 1. The design thesis

**The subject:** a specialist-led dental clinic in South Bangalore with 1,465 Google reviews at 4.9★, built around **dental implants** and **gum (periodontal) treatment**, both delivered with laser.
**The audience:** Hulimavu / Bannerghatta Road / JP Nagar / BTM residents, 25–55, families and working professionals, arriving from a phone search like *"dental implant cost Bangalore"*, *"gum treatment near me"*, or *"root canal Hulimavu"*.
**The page's single job:** convert an anxious searcher into a WhatsApp message or a phone call.

### Two pillars, one method

The principal is **Dr. Sampath Kumar Rao K, MDS — Oral Implantologist, Periodontist, LASER Specialist**. That's not three things, it's two clinical specialisms and the technique he applies within them:

- **Pillar 1 — Dental Implants.** First in the clinic's own name, first in his qualifications, and the highest-ticket procedure in the practice.
- **Pillar 2 — Gum & periodontal treatment.** His MDS specialism. Laser gingivoplasty *is* a periodontal procedure — the laser and the gum work are the same thing, not separate offerings.
- **Laser is the method, not the identity.** It's *how* the clinic does implants and gum work, and it's a genuine differentiator locally. It is not what the clinic *is*, and the site must not present it as such.

> ⚠️ An earlier version of this document treated laser as the clinic's identity and demoted implants to an assumed, secondary treatment. Online verification (`CONTENT-DATA.md` §1) corrected that. Both pillars carry equal weight in the hero, the treatments grid, and the sitemap.

### The emotional thesis

The emotional truth of this brief is **dental anxiety**, and it's strongest at exactly the two things this clinic specialises in — implants and gum surgery are the procedures patients most fear. Both are surgical, both involve the gum tissue, and the fear is specific and physical: the drill, the needle, the blood, the stitches, the healing.

Laser's value proposition speaks to precisely those fears. So the site's job is not to look clinical and credible — every clinic site does that, and clinical credibility doesn't move a frightened person. The job is to **lower the visitor's heart rate**.

That produces the one non-obvious decision the whole system hangs on:

> **Laser is not the scary technology here. It is the calm one.**

The obvious read of "laser" is cold blue-white precision — steel, grids, lab light. That direction is both a cliché *and* actively wrong for this brief, because it makes an already-frightening word more frightening, attached to the two procedures people already dread most. So we go the other way: laser as **warm light**. Amber, not blue. Glow, not glare. Soft, unhurried, quiet.

**What we are deliberately not doing:** the default dental palette (medical blue, white, mint), stock photos of models mid-laugh, "Your Perfect Smile Starts Here," rounded-corner card grids on a white page. That is what every ₹5,900 clinic template in Bangalore looks like, and it's precisely what this client's budget is buying its way out of.

**The risk we're taking:** the hero is not a photograph and not a headline-over-image. It's an interactive comparator (§6) that answers the visitor's actual question — *will this hurt?* — in the first five seconds. Justification: the visitor is here about a procedure they're frightened of, no competitor in the locality is explaining how theirs differs, and the comparator sidesteps our biggest compliance constraint (§10) by having nothing to show but the procedure itself.

The hero **headline** names the two pillars; the **comparator** demonstrates the method. Headline does the positioning, comparator does the reassurance — neither carries both jobs alone.

---

## 2. Color

Derived from the subject's real materials: tooth enamel, surgical drape, and the warm light of a diode laser.

```css
:root {
  --porcelain:  #FCFBF8;  /* page ground — near-white, barely warm */
  --bisque:     #F1ECE3;  /* alternate surface, cards, section banding */
  --drape:      #12302A;  /* deep surgical green — body text + dark sections */
  --drape-mid:  #2E5A4E;  /* secondary text, rules, muted UI */
  --beam:       #E3A24A;  /* warm amber — glow, large marks, decorative only */
  --beam-deep:  #8F5A15;  /* accent text, links, small marks (AA-safe on light) */
}
```

**Why this and not the default.** Deep surgical green as the anchor dark instead of near-black or navy: it comes from the operatory itself, it's warmer than black, and it makes the amber sing as its near-complement. Amber instead of the expected clinical blue: it's the honest color of warm laser light, it reads premium in the Indian market where gold carries real weight, and it's the opposite of frightening.

**Discipline rules — this palette only works if held tightly:**
- `--beam` covers **≤5% of any screen**. It is *light*, not fill. Glows, hairlines, small marks, the comparator's active state. Never a button background at full width, never a large solid block.
- Accent **text** uses `--beam-deep` (≈7.1:1 on porcelain). `--beam` is for ≥24px type and non-text marks only.
- On `--drape` sections, `--beam` becomes freely usable for text (≈8.4:1) — the dark sections are where the glow is allowed to actually glow.
- **No red.** Amber does the warm-light job without the blood association, which would be self-defeating for a clinic selling bloodless procedures.

**Section banding.** Alternate `porcelain` → `bisque` → `porcelain`, with exactly **two** full `drape` sections per page maximum (typically the laser explainer and the closing CTA). The dark sections are punctuation, not rhythm.

**Dark sections invert:**
```css
[data-ground="drape"] {
  --fg: #EDE8DE;  --fg-muted: #A9BDB5;  --rule: rgba(237,232,222,.14);
}
```

---

## 3. Typography

Three roles, three families. All Google Fonts, self-hosted and subset (§11).

| Role | Family | Why this one |
| :--- | :--- | :--- |
| **Display** | **Fraunces** (`SOFT` 60, `WONK` 0, wght 400–600) | A soft, low-contrast serif with flared stems and an apothecary warmth. Not the Playfair/Cormorant high-contrast fashion serif that every AI-designed page reaches for. Its softness *is* the anxiety-lowering brief, set in type. |
| **Body** | **Karla** (400/500/700) | Humanist grotesque with genuine character in the lowercase — friendly without being childish, and superb at 15–17px on a mid-range Android, which is where this site actually gets read. Chosen specifically because it is not Inter. |
| **Utility** | **IBM Plex Mono** (400/500) | Carries the precision half of the story. Eyebrows, section labels, stat readouts, timings, the rating figure. Tabular figures matter for the data blocks. Always uppercase, letterspaced, small. |

**Restraint rule:** Fraunces appears **only** at `h1`, `h2`, pull-quotes, and the rating monument. Everything else — including `h3` — is Karla. A characterful display face loses its character the moment it's everywhere.

**Fluid type scale** (single source of truth, no per-breakpoint overrides):

```css
--step--1: clamp(0.83rem, 0.80rem + 0.15vw, 0.92rem);   /* captions, legal */
--step-0:  clamp(1.00rem, 0.96rem + 0.20vw, 1.13rem);   /* body */
--step-1:  clamp(1.20rem, 1.13rem + 0.35vw, 1.42rem);   /* lead paragraph */
--step-2:  clamp(1.44rem, 1.32rem + 0.60vw, 1.78rem);   /* h3 */
--step-3:  clamp(1.73rem, 1.53rem + 1.00vw, 2.23rem);   /* h2 */
--step-4:  clamp(2.07rem, 1.75rem + 1.60vw, 2.79rem);   /* h1 (inner pages) */
--step-5:  clamp(2.49rem, 1.97rem + 2.60vw, 3.48rem);   /* hero h1 */
--step-6:  clamp(3.20rem, 2.10rem + 5.50vw, 6.00rem);   /* rating monument */
```

**Settings that matter:**
- Body: `line-height: 1.65`, `max-width: 68ch`. Anxious readers skim; give them air.
- Fraunces headings: `line-height: 1.08`, `letter-spacing: -0.015em`, `font-optical-sizing: auto`.
- Plex Mono labels: `0.72rem`, `letter-spacing: 0.16em`, `text-transform: uppercase`, color `--drape-mid`.
- `font-variant-numeric: tabular-nums` on every stat, price, and timing.

---

## 4. Layout armature

The structural device is a **sticky left rail** carrying the section label, a beam hairline, and scroll position. It encodes where you are in a long page — real information, not decoration. It replaces the generic centered-container-stack that makes long clinic sites feel endless.

```
DESKTOP  ≥1024px                          MOBILE  <768px
┌──────┬──────────────────────────────┐   ┌────────────────────────┐
│      │                              │   │▓▓▓▓░░░░░░░░ progress   │
│ RAIL │      CONTENT COLUMN          │   ├────────────────────────┤
│      │                              │   │ ── WHY LASER ──        │
│ ──   │  ┌────────────────────────┐  │   │                        │
│ 01   │  │                        │  │   │  content, single col   │
│ WHY  │  │                        │  │   │                        │
│LASER │  │                        │  │   │                        │
│ ──   │  └────────────────────────┘  │   │                        │
│  ▓   │                              │   │                        │
│  ▓   │                              │   ├────────────────────────┤
│  ░   │                              │   │  CALL  WHATSAPP  BOOK  │ ← sticky
│  ░   │                              │   └────────────────────────┘
└──────┴──────────────────────────────┘
 120px          max 1080px
```

- **Rail (≥1024px):** 120px, `position: sticky`, holds the current section's Plex Mono label and a 1px vertical beam hairline whose filled portion tracks scroll.
- **Content column:** `max-width: 1080px`. Text blocks inside cap at `68ch` and sit left-aligned, not centered — centered body copy is a template tell.
- **Tablet (768–1023px):** rail collapses; labels move inline above each section as an eyebrow.
- **Mobile (<768px):** 2px beam progress line pinned under the header; sticky action bar pinned to the bottom.

**Spacing scale** (8px base, geometric): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`
**Section padding:** `clamp(4rem, 10vw, 8rem)` block, `clamp(1.25rem, 5vw, 3rem)` inline.
**Radii:** `2px` on inputs and small chips, `10px` on cards, `999px` on pills. Never large playful rounding — it reads consumer-app, not clinic.
**Elevation:** almost none. Separation comes from the ground bands and hairline rules (`1px solid rgba(18,48,42,.10)`), not drop shadows. One exception: the sticky mobile bar gets `0 -8px 32px rgba(18,48,42,.10)` so it lifts off the content.

---

## 5. Homepage — section-by-section

| # | Section | Ground | Contents |
| :-- | :--- | :--- | :--- |
| 1 | **Hero** | porcelain | Clinic name (Fraunces), a headline naming **both pillars** (implants + gum treatment), locality line, rating chip, primary CTA pair — **and the comparator** (§6). Desktop: split 45/55. Mobile: text + CTA above the fold, comparator immediately below. |
| 2 | **Rating monument** | bisque | `4.9` set at `--step-6` in Fraunces with the amber beam-arc behind it; `1,465 verified Google reviews` in Plex Mono beneath; three review excerpts pulled live. See §6. |
| 3 | **The two pillars** | porcelain | Two large paired panels — *Dental Implants* and *Gum & Periodontal Treatment* — each with a one-line description and a link through. This is the positioning section; it sits above the full treatments grid and carries more visual weight than any single card in it. |
| 4 | **Treatments** | porcelain | 11 cards in a 2/3-col grid, the full scope. Laser-delivered treatments carry a small amber beam mark. Ordered by pillar, then by search demand — **not** laser-first. |
| 5 | **How we work — laser** | **drape** | The dark section. Ambient amber glow, four factual procedure attributes, doctor-led explainer. Framed as *method*, not identity: this is how the implants and gum work above are delivered. |
| 6 | **Meet the dentists** | porcelain | Dr. Sampath's card leads at larger scale (principal, MDS, both specialisms); associate cards follow in the standard grid. See §6. |
| 7 | **Technology & sterilisation** | bisque | Equipment cards + the sterilisation protocol. Anxiety-reduction content, ranks as trust content, fully DCI-safe. |
| 8 | **Patient stories** | porcelain | Live Google reviews embed. |
| 9 | **Visiting the clinic** | bisque | Map, directions CTA, timings table, parking, nearest landmark, languages spoken. |
| 10 | **Questions** | porcelain | 8–10 FAQ accordion → FAQPage schema. |
| 11 | **Closing CTA** | **drape** | Second dark section. Call / WhatsApp / Book, timings, phone. |
| 12 | **Footer** | drape (darker) | NAP, treatment links, hours, privacy policy, social. |

---

## 6. Signature & key components

### ⭐ The Procedure Comparator — *the signature element*

The one thing the site is remembered by. A two-state toggle — **Conventional** / **Laser** — sitting in the hero.

```
┌──────────────────────────────────────────────┐
│  ( Conventional )  ( ●  Laser  )             │  ← segmented toggle
│                                              │
│         ╭─────────────────────╮              │
│         │   tooth + tissue    │              │  ← inline SVG, morphs
│         │   illustration      │              │     between states
│         ╰─────────────────────╯              │
│                                              │
│  Drill used              Yes  →  No          │  ← rows crossfade +
│  Sutures                 Often →  Rarely     │     count/slide on toggle
│  Typical sittings        2–3  →  1–2         │
│  Anaesthesia             Local →  Often none │
│                                              │
│  Suitability is determined by clinical exam.  │
└──────────────────────────────────────────────┘
```

**Why it's the right signature:** it answers the visitor's actual first question in the hero instead of making them scroll for it; it's built from the clinic's genuine differentiator; it's useful rather than decorative; and it needs zero patient imagery, which sidesteps the compliance problem entirely (§10).

**Scope of the claim.** The comparator demonstrates *how the clinic works*, not *what the clinic is* — the hero headline does the positioning. It is reused on the treatment pages where laser is genuinely the delivery method (implants, gum treatment, gingivoplasty, laser RCT), with its rows adjusted to that procedure. It does **not** appear on pages where laser isn't involved.

**Compliance-critical:** every row states a **procedure attribute**, never an outcome. "Drill used" is factual. "Painless" or "heals faster" is a prohibited outcome claim. The disclaimer line is not optional. Full detail in §10.

**Mechanics:** inline SVG, both states in the DOM, crossfaded with a shared morph on the tissue path. Amber traces the beam path on the laser state. Toggle is a real `role="radiogroup"` — keyboard operable, `aria-live` on the rows. Under `prefers-reduced-motion` it becomes an instant swap.

### The Rating Monument

`4.9` is not a badge here — 1,465 reviews is genuinely exceptional for a single-location clinic and deserves to be a typographic object. Fraunces at `--step-6`, an amber arc sweeping behind it on scroll-in (drawn with `stroke-dashoffset`), `1,465 VERIFIED GOOGLE REVIEWS` in Plex Mono beneath. Fully compliant social proof: factual, third-party, verifiable.

### Component inventory

| Component | Notes |
| :--- | :--- |
| **Header** | Transparent over hero → solid porcelain with hairline on scroll. Desktop: logo left, nav center, phone + Book right. Mobile: logo + hamburger; full-screen overlay menu. |
| **Sticky action bar** (mobile) | `Call · WhatsApp · Book` — three equal thumb targets, min 48px. Always present below 768px. |
| **Buttons** | *Primary:* drape fill, porcelain text, amber hairline underglow on hover. *Secondary:* transparent, 1px drape border. *WhatsApp:* its own green, the one palette exception — recognition beats consistency here. Focus: 2px `--beam-deep` offset ring. |
| **Treatment card** | Plex Mono index, Karla 500 title, one-line description, sittings chip, arrow. Laser treatments get an amber beam mark. Hover: hairline warms to amber, card lifts 2px. |
| **Doctor card** | Portrait (4:5), name in Fraunces, degrees + specialisation, **DCI registration number** in Plex Mono, treatments performed. Registration number visible is a genuine trust signal and costs nothing. Two variants: `--principal` (larger, spans two columns, adds a short bio — used for Dr. Sampath) and the standard card for associates. Experience is rendered as *"in practice since <year>"*, never a years count — see CONVENTIONS §1. |
| **Credential block** | Reusable strip: degrees · registration · experience · memberships. Appears on doctor cards and treatment pages. |
| **Step process** | Numbered 01→05 — numbering used **only here**, because a treatment genuinely is a sequence. Vertical on mobile, horizontal with a connecting beam line on desktop. |
| **Cost block** | Indicative range + EMI note + "final cost determined after examination." Built behind a `showPricing` flag in `content.js` — ships hidden until the client confirms. |
| **FAQ accordion** | `<details>`/`<summary>`, real semantics, animated with `grid-template-rows`. Feeds FAQPage schema. |
| **Review card** | Google avatar, name, stars, excerpt, date. Bisque ground, hairline border. |
| **Booking form** | Four fields only: name, phone, treatment, preferred day. Consent line + privacy link directly above submit (DPDP). Inline validation, real `<label>`s. |
| **WhatsApp float** | Bottom-right desktop; folded into the action bar on mobile. Pre-fills message with page context. |
| **Location block** | Embedded map, directions CTA to the real GBP listing, timings table with today's row highlighted, landmark + parking + languages. |
| **CTA band** | Drape ground, ambient amber glow, three actions. |
| **Footer** | Full NAP, treatment links, hours, privacy policy, social, credit line. |

---

## 7. Page layouts

**Home** — as §5.

**Treatment page** (×10, one template):
```
Breadcrumb → H1 "<Treatment> in Hulimavu, Bengaluru" → lead paragraph
→ Signs you may need it        (scannable list, bisque)
→ How the procedure works      (step process 01→05, illustrated)
→ Sittings & duration          (data block, Plex Mono)
→ [Laser variant comparator]   (laser treatments only — reuses §6)
→ Indicative cost + EMI        (flag-hidden)
→ Aftercare
→ FAQs                         (5–7, treatment-specific)
→ Performing dentist           (credential block)
→ CTA band                     (drape)
```

**Treatments hub** — intro + full grid, laser cluster first with a short "why we lead with laser" note.

**About** — clinic story, founding year, philosophy, facility photography, sterilisation protocol in full, the numbers.

**Team** — grid of doctor cards → individual doctor pages when a doctor has enough content (`Physician` schema each).

**Technology** — equipment cards with model names, what each one does for the patient (benefit in plain language, not spec-sheet), sterilisation workflow as a step process.

**Patient information** — first visit walkthrough, what to bring, timings, payment methods, EMI, insurance, emergency policy.

**Reviews** — the rating monument at full scale + live Google embed.

**Blog** — index with card grid; post template at `68ch` with a sticky table of contents in the rail on desktop.

**Contact** — map, form, all contact routes, directions, hours.

**Privacy policy** — DPDP notice, plain language, no legalese wall.

---

## 8. Motion

Motion is doing real work here — the direction is "quiet light," and light behaves. Orchestrated, not scattered.

**Page load (once, ~900ms total):**
1. Ground fades in (0ms)
2. Hero heading — words rise 12px with 40ms stagger (120ms)
3. Rating chip and CTAs fade up (320ms)
4. Comparator draws in — SVG paths trace via `stroke-dashoffset` (420ms)
5. Rail hairline draws downward (600ms)

**Scroll:**
- Sections reveal on `IntersectionObserver` — 16px rise + fade, 500ms `cubic-bezier(.22,.61,.36,1)`, 60ms stagger between children. Once only, never re-trigger.
- Rail label crossfades as sections change; beam fill tracks scroll continuously.
- Rating arc draws when the monument enters view.
- Drape sections carry a slow ambient amber radial glow — 20s drift, very low opacity. This is the "light" in Quiet Light, and it's the only ambient effect in the system.

**Micro-interactions:**
- Treatment card hover: hairline warms porcelain→amber (200ms), lift 2px.
- Buttons: amber underglow blooms on hover (180ms).
- Comparator toggle: 320ms crossfade + SVG morph, numbers count between values.
- FAQ: `grid-template-rows` 0fr→1fr, 280ms.
- Sticky bar: slides up on first scroll past the hero.

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` — all transforms and the ambient glow off, opacity fades kept at 100ms, comparator becomes an instant swap, arcs render complete. The page must lose nothing but movement.

---

## 9. Responsive specification

Mobile-first. Designed at 360px, built up.

| Breakpoint | Behaviour |
| :--- | :--- |
| **360–479** | Single column. Sticky action bar. Rail → 2px top progress line. Treatment cards 1-up. Hero: heading → rating → CTAs → comparator. Comparator rows stack label-over-values. Section padding 4rem/1.25rem. |
| **480–767** | Treatment cards 2-up. Doctor cards 2-up. Type steps up via clamp. |
| **768–1023** | Two-column content within sections. Rail still collapsed, labels inline as eyebrows. Sticky bar persists (large phones + small tablets both benefit). Hero splits at 768 if the comparator has room, else stays stacked. |
| **1024–1279** | Rail appears at 120px sticky. Hero splits 45/55. Treatment cards 3-up. Sticky bar off; header CTA takes over. Step process goes horizontal. |
| **≥1280** | Content column caps at 1080px, centered in remaining space. Generous section padding (8rem). Ambient glow at full scale. |

**Non-negotiables at every width:**
- Primary CTA visible without scrolling on a 360×640 viewport.
- Tap targets ≥48×48px with ≥8px separation.
- No horizontal overflow — tables and the comparator scroll inside their own `overflow-x: auto` containers.
- Images `max-width: 100%`, explicit `width`/`height` to prevent CLS, `srcset` at 1x/2x.
- Test set: 360×640 (budget Android), 390×844 (iPhone), 768×1024 (iPad), 1440×900 (laptop). **The 360px budget Android is the real target** — it's the majority of this clinic's actual traffic.

---

## 10. ⚠️ Compliance constraints on the design

These are design constraints, not just copy constraints — they change what components can exist.

| Constraint | Design consequence |
| :--- | :--- |
| No before/after of identifiable patients (DCI) | **No patient photo gallery component exists in this system.** Replaced by the comparator and illustrated procedure explainers. |
| No outcome claims or guarantees | Comparator rows state procedure attributes only. No "painless", "faster healing", "guaranteed". Every treatment page carries the suitability disclaimer. |
| No superlatives without verifiable basis | No "best in Bangalore" anywhere. The rating monument does that job factually and better. |
| No paid testimonials | Written testimonial component omitted; live Google reviews embed only. |
| DPDP consent at collection | Consent line + privacy link sits **above** the submit button in the form component, not in the footer. |
| DPDP purpose limitation | Form is four fields. No medical history field is to be added, whatever the client asks. |

Full legal detail: [`CLIENT_01_DENTAL_BUILD_PLAN.md`](./PROJECT-BRIEF.md) §2.

---

## 11. Technical implementation

**Structure:** static HTML/CSS/JS, consistent with the existing per-niche pattern in [`public/demo/dental/`](../../public/demo/dental/).

```
akshaya/
├── index.html
├── treatments/            <treatment>.html ×10 + index.html
├── about.html  team.html  technology.html
├── patient-information.html  reviews.html  contact.html  privacy-policy.html
├── blog/
├── assets/
│   ├── css/  tokens.css  base.css  components.css  sections.css  pages.css
│   ├── js/   content.js  main.js  comparator.js  motion.js  form.js
│   ├── fonts/  (self-hosted, subset)
│   └── img/    (WebP/AVIF + fallback)
```

**`content.js` is the single source of client data** — name, phone, address, hours, `doctors[]`, `treatments[]`, `reviews`, `showPricing` flag. Nothing client-specific is hardcoded into markup. When real data lands, one file changes.

**CSS discipline** — the skill's warning about specificity collisions is a real risk on a 13-page build:
- One class, one job. Layout classes never set color; component classes never set outer margin.
- **All vertical rhythm between sections comes from the section wrapper only.** Components never set their own outer margins.
- Single-class selectors throughout, `[data-ground]` for banding. No element-type selectors like `.section p`. No `!important`.
- Tokens in `tokens.css` are the only place a raw hex or px value appears.

**Performance budget:** LCP < 2.5s on 4G. Fonts self-hosted, subset to Latin, `font-display: swap`, preloaded — Fraunces variable subset to the two axes used. Total font payload under 120KB. Images WebP with AVIF where supported, lazy below the fold, hero image (if any) preloaded. No frameworks, no jQuery, no icon library — icons are inline SVG.

**Accessibility floor:** WCAG AA contrast throughout, semantic landmarks, one `h1` per page with correct heading order, visible 2px focus rings, keyboard-operable comparator and accordion, real `<label>`s, `prefers-reduced-motion` honoured, alt text on everything meaningful.

**Schema:** `Dentist` (site-wide), `Physician` per doctor, `MedicalProcedure` per treatment page, `FAQPage`, `BreadcrumbList`, `Article` on posts.

**Analytics:** GA4 with conversion events on `whatsapp_click`, `call_click`, `form_submit`, `directions_click`, and `comparator_toggle` — the last one tells us whether the signature element is actually earning its place.

---

## 12. Build order

1. `tokens.css` + `base.css` + fonts — the system before any page
2. Header, footer, buttons, sticky action bar — the frame
3. **Homepage hero + comparator** — the signature, first, because it's the highest-risk piece and everything else is calmer than it
4. Remaining homepage sections in §5 order
5. Treatment page template + the 5 confirmed treatments
6. Remaining 5 assumed treatments + hub
7. About, Team, Technology, Patient information, Reviews, Contact
8. Blog shell + privacy policy
9. Schema, analytics, form handler, WhatsApp wiring
10. Performance pass, accessibility audit, 360px pass, cross-device test

**Gate after step 3.** The hero and comparator carry the entire direction. Review it before the other 12 pages get built on top of it.
