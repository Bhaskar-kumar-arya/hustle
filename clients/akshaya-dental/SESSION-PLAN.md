# Session Plan — Akshaya Dental

12 sessions. Each is sized so the **work** finishes comfortably inside one context window with room left for the handoff.

Read the docs freely — see `00-START-HERE.md` §2. The `Key refs:` line on each session below points at the DESIGN-SYSTEM sections that matter most for that work; it's a pointer, not a limit.

Output root for all sessions: `websites/akshaya/`

**Review gates** are marked 🚩 — stop after these and let the human look before the next session runs.

---

## S1 — Foundation

**Key refs:** DESIGN-SYSTEM §2 (color), §3 (type), §4 (layout armature), §11 (technical)

**Scope**
- Create the folder structure from DESIGN-SYSTEM §11
- `assets/css/tokens.css` — every color, type step, space, radius, duration as a custom property. The only file where a raw hex or px literal may appear.
- `assets/css/base.css` — reset, box-sizing, body defaults, heading defaults, focus rings, `prefers-reduced-motion` block, `[data-ground]` inversion
- Self-host and subset the three fonts into `assets/fonts/` with `@font-face` + `font-display: swap`. Fraunces variable subset to `SOFT` + `wght` only.
- `assets/js/content.js` — full data object per CONTENT-DATA.md, mock values flagged
- `_kitchen-sink.html` — a scratch page rendering every type step, every color token, buttons, and both grounds. Not shipped; it's the proof the system works.

**Done when:** kitchen sink renders all tokens correctly in a browser; no literal hex outside `tokens.css`; fonts load locally with no network calls; total font payload under 120KB.

---

## S2 — The frame

**Key refs:** DESIGN-SYSTEM §4, §6 (component inventory: header, sticky action bar, buttons, WhatsApp float, footer)

**Scope**
- `assets/css/components.css` started: buttons (primary / secondary / WhatsApp), pills, chips, hairline rules
- Header — transparent over hero, solid on scroll; desktop nav; mobile hamburger + full-screen overlay
- Sticky mobile action bar (Call · WhatsApp · Book), visible below 768px
- WhatsApp float (desktop), pre-filled message with page context
- Footer — full NAP, treatment links, hours, privacy link, social
- The left rail shell + scroll progress (desktop) / top progress line (mobile)
- All of it reading from `content.js`

**Done when:** header, footer, rail and action bar render on the kitchen sink at 360 / 768 / 1440; nav is keyboard operable; no client data hardcoded.

---

## 🚩 S3 — Hero + Procedure Comparator (the signature)

**Key refs:** DESIGN-SYSTEM §1 (thesis), §6 (signature — read closely), §8 (motion), §10 (compliance)

This is the highest-risk session. Everything else in the build is calmer than this piece, and the whole direction rests on it.

**Scope**
- `index.html` skeleton + hero section
- Hero: clinic name, thesis line, locality, rating chip, CTA pair. Desktop split 45/55; mobile stacked with CTA above the fold at 360×640.
- `assets/js/comparator.js` — the Conventional/Laser toggle: inline SVG both states, morph + crossfade, animated rows, `role="radiogroup"`, `aria-live`, instant swap under reduced motion
- `assets/js/motion.js` — the page-load sequence (5 beats, ~900ms) and the reusable `IntersectionObserver` reveal utility later sessions will call
- Comparator rows state **procedure attributes only** + the suitability disclaimer. Re-read CONVENTIONS → Compliance before writing a single row label.

**Done when:** hero + comparator work at 360 / 768 / 1440; toggle is keyboard operable and screen-reader sane; reduced-motion path verified; no outcome claims anywhere.

**🚩 Stop here for human review before S4.**

---

## S4 — Homepage, part A

**Key refs:** DESIGN-SYSTEM §5 (rows 2–4), §6 (rating monument, treatment card), §8

**Scope**
- Rating monument — `4.9` at `--step-6` in Fraunces, amber arc drawing on scroll-in, `1,465 VERIFIED GOOGLE REVIEWS` in Plex Mono
- Treatments grid — cards from `content.js`, laser-first ordering, amber beam mark on laser treatments, 1/2/3-up responsive
- "Why laser" dark section — `[data-ground="drape"]`, ambient amber glow, four factual procedure attributes
- Scroll reveals wired via `motion.js`

**Done when:** three sections render and reveal correctly at all breakpoints; treatment cards are generated from data, not written by hand; exactly one dark section used so far.

---

## S5 — Homepage, part B

**Key refs:** DESIGN-SYSTEM §5 (rows 5–11), §6 (doctor card, credential block, FAQ, review card, location block, CTA band)

**Scope**
- Meet the dentists (3–4 mock doctors, credential blocks incl. registration number)
- Technology & sterilisation
- Patient stories — Google reviews embed, with a static fallback if the embed can't load
- Visiting the clinic — map, directions CTA, timings table with today highlighted, landmark/parking/languages
- Questions — FAQ accordion (`<details>`/`<summary>`, `grid-template-rows` animation)
- Closing CTA band (second and final dark section)

**Done when:** homepage is complete top to bottom, responsive at 360 / 480 / 768 / 1024 / 1440, no horizontal overflow at any width.

---

## S6 — Treatment template + confirmed treatments

**Key refs:** DESIGN-SYSTEM §7 (treatment page), §6 (step process, cost block)

**Scope**
- `assets/css/pages.css` + the treatment page template per DESIGN-SYSTEM §7
- Step process component (01→05 — the only place numbering is allowed)
- Cost block behind the `showPricing` flag, shipping **hidden**
- Build the 5 **confirmed** treatments: Laser Dentistry (hub page), Laser RCT, Laser Gingivoplasty, Root Canal, Dental Restoration
- Laser treatments reuse the comparator from S3

**Done when:** 5 treatment pages live and consistent; template is genuinely reusable; every page carries the suitability disclaimer; breadcrumbs work.

---

## S7 — Remaining treatments + hub

**Key refs:** DESIGN-SYSTEM §7, CONTENT-DATA (treatments table)

**Scope**
- 5 **assumed** treatments: Dental Implants, Crowns & Bridges, Braces & Aligners, Teeth Whitening / Smile Design, Kids Dentistry
- `treatments/index.html` hub — intro, full grid, laser cluster first
- Cross-linking: hub ↔ treatment pages, related-treatment links between pages

**Done when:** all 10 treatment pages exist; hub links to every one; each assumed treatment is flagged in `content.js` as unconfirmed.

---

## S8 — About, Team, Technology

**Key refs:** DESIGN-SYSTEM §7 (About / Team / Technology), §6 (doctor card, credential block)

**Scope**
- `about.html` — story, founding year, philosophy, facility, full sterilisation protocol
- `team.html` — doctor grid + individual doctor pages
- `technology.html` — equipment cards with plain-language patient benefit (not spec sheets), sterilisation workflow as a step process

**Done when:** three pages complete and responsive; doctor data comes entirely from `content.js`.

---

## S9 — Patient info, Reviews, Contact, Privacy

**Key refs:** DESIGN-SYSTEM §7, §6 (booking form, location block), CONVENTIONS → Compliance

**Scope**
- `patient-information.html` — first visit, what to bring, timings, payment, EMI, insurance, emergency policy
- `reviews.html` — rating monument at full scale + reviews embed
- `contact.html` — map, four-field booking form, all contact routes, directions, hours
- `privacy-policy.html` — DPDP notice in plain language
- Booking form component: consent line + privacy link **above** the submit button. Four fields. No medical history field, ever.

**Done when:** four pages complete; form validates inline with real `<label>`s; privacy policy is linked from every page footer.

---

## S10 — Blog

**Key refs:** DESIGN-SYSTEM §7 (blog), §4 (rail)

**Scope**
- `blog/index.html` — card grid
- Post template — 68ch measure, sticky table of contents in the rail on desktop
- 5 seed posts, oral-health educational, DCI-compliant, locality-relevant

**Done when:** index + 5 posts render; TOC tracks scroll on desktop and is hidden on mobile.

---

## S11 — Technical layer

**Key refs:** DESIGN-SYSTEM §11, PROJECT-BRIEF §6

**Scope**
- Schema: `Dentist` site-wide, `Physician` per doctor, `MedicalProcedure` per treatment, `FAQPage`, `BreadcrumbList`, `Article`
- Per-page unique `<title>` + meta description + canonical + OG/Twitter tags
- GA4 with conversion events: `whatsapp_click`, `call_click`, `form_submit`, `directions_click`, `comparator_toggle`
- Form handler (Netlify Forms or Formspree) + WhatsApp notification path
- `sitemap.xml`, `robots.txt`, favicon set

**Done when:** every page validates in Google's Rich Results Test; all five events fire; a test form submission arrives.

---

## S12 — QA & polish

**Key refs:** DESIGN-SYSTEM §9 (responsive), §11 (performance, accessibility), CONVENTIONS

**Scope**
- Performance: image conversion to WebP/AVIF, explicit width/height everywhere, lazy loading, LCP < 2.5s on throttled 4G
- Accessibility audit: contrast, heading order, landmarks, focus rings, keyboard paths, alt text
- Responsive sweep at 360 / 390 / 768 / 1024 / 1440 — **360×640 is the primary target**
- Reduced-motion pass across every page
- Dead link check, console error check, cross-browser (Chrome / Safari / Firefox)
- Delete `_kitchen-sink.html`

**Done when:** Lighthouse ≥ 90 on all four categories on mobile; zero console errors; no horizontal overflow at any width; every checklist item in DESIGN-SYSTEM §9 "non-negotiables" verified.

---

## After S12

The site is build-complete on mock data. Remaining work is not session-planned because it depends on the client call:

1. Swap mock data for real data in `content.js` (should be a single-file edit — if it isn't, something was hardcoded and needs fixing)
2. Real photography (see PROJECT-BRIEF §8 — longest lead time, the human's task)
3. Client review round + up to 3 revision rounds
4. Domain, hosting, SSL, GBP wiring, Search Console (PROJECT-BRIEF §8)
