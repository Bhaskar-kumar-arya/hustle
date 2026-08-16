# Build State — Akshaya Dental

> **This is the living file.** Every session updates it before finishing. If it disagrees with any other doc, trust this one.

**Last updated:** 2026-08-16 — S4b complete

---

## ▶ Next session: **S5 — Homepage part B**

Read `SESSION-PLAN.md` → S5 for scope. `index.html` now has 5 sections (Hero, Rating monument, Two pillars, Treatments, "How we work — laser"). S5 adds the remaining 6 homepage sections (Meet the dentists, Technology & sterilisation, Patient stories, Visiting the clinic, Questions/FAQ, Closing CTA band) and finishes the homepage. Each new section needs its own `data-rail-label`. The closing CTA band is the **second and final** `drape` section allowed on this page ("How we work — laser" is the first) — don't add a third.

---

## Progress

| Session | Status | Shipped |
| :--- | :--- | :--- |
| S1 — Foundation | ✅ Done | Folder structure, `tokens.css`, `base.css`, self-hosted subset fonts (Fraunces/Karla/IBM Plex Mono, 98.6KB total), `content.js`, `_kitchen-sink.html` |
| S2 — The frame | ✅ Done | `components.css` (buttons/pills/chips/header/rail/action bar/WhatsApp float/footer), `main.js` (first `content.js` consumer), header + mobile overlay menu + rail + progress line + sticky action bar + footer added to kitchen sink for verification |
| 🚩 S3 — Hero + Comparator | ✅ Done — awaiting human review | `index.html` (skeleton + hero), `sections.css` (hero, comparator, load-sequence, scroll-reveal), `comparator.js`, `motion.js`, `.visually-hidden` utility added to `base.css` |
| S4 — Homepage part A | ✅ Done — superseded by S4b | Rating monument, treatments grid (10 cards, laser-first, generated from `content.js`), "Why laser" `drape` section with ambient glow |
| S4b — Rebalance rework | ✅ Done | Hero headline → two pillars; two-pillar section added; `gum-treatment` added + `treatments[]` reordered pillar-then-demand (10→11 cards); "Why laser" → "How we work — laser" |
| **S5 — Homepage part B** | 🔴 **Next** | |
| S6 — Treatment template + confirmed | ⬜ Not started | |
| S7 — Remaining treatments + hub | ⬜ Not started | |
| S8 — About, Team, Technology | ⬜ Not started | |
| S9 — Patient info, Reviews, Contact, Privacy | ⬜ Not started | |
| S10 — Blog | ⬜ Not started | |
| S11 — Technical layer | ⬜ Not started | |
| S12 — QA & polish | ⬜ Not started | |

🚩 = stop for human review before continuing.

---

## Carried forward

*Things the next session must know. Out-of-scope issues spotted mid-session go here rather than into the diff.*

- **S4b (2026-08-16) resolved the rebalance** flagged after S4 — `treatments[]` is now ordered pillar-then-demand (`dental-implants` 1, `gum-treatment` 2, `laser-gingivoplasty` 3, `laser-dentistry` 4, `root-canal` 5, `laser-rct` 6, then the 5 non-laser treatments 7–11), not laser-first. Any future session reading `order` should treat this as current — the older "already laser-first" framing no longer applies.
- **`dental-implants.isLaser` is now `true`**, changed in S4b per DESIGN-SYSTEM §1 ("both pillars... delivered with laser"). This is itself `MOCK:`-adjacent — the summary text flags "laser-assisted technique" as unconfirmed protocol detail to verify with the client. If the client says implant placement is *not* laser-delivered, flip this back to `false` and update the summary — nothing else references it structurally (the treatments-grid beam mark and pillar panels both read this field live).
- **All 11 treatments now carry `confirmed: true`** (was `false` on 5 of them pre-S4b) — CONTENT-DATA.md §1's verified service list now covers all eleven, so the earlier "assumed" flags were stale. The `confirmed` field itself isn't rendered anywhere yet (no UI reads it) — it's bookkeeping for the eventual real-data swap.
- **Doctor count stays 3–4 by human decision (2026-08-16)**, despite verification pointing to a single practitioner. Dr. Sampath Kumar Rao K is the verified principal and gets the `--principal` card variant; associates are `MOCK:`. A grid that degrades to one card is cheaper than a single-profile layout that has to grow into a grid.
- `doctors[]` treatment-slug arrays were **not** updated in S4b to reference the new `gum-treatment` slug (Dr. Vikram Shetty's entry still only lists `laser-gingivoplasty`, not `gum-treatment`) — out of S4b's scope (doctors are S5's "Meet the dentists"). Worth adding `gum-treatment` to his `treatments` array when S5 builds the doctor cards, since periodontics is his stated MDS specialism.
- **Never render a years-of-experience number** — sources conflict (23+ vs 15). See CONVENTIONS §1.

- Reduced-motion is handled in `base.css` by zeroing the `--duration-*` tokens inside the media query (no `!important`, per CONVENTIONS.md §4 CSS discipline). Component/section CSS should keep reading durations from those tokens rather than hardcoding transition timings, or this override won't reach them.
- Fraunces was instanced down to two variable axes (`SOFT`, `wght` 400–600) with `opsz` pinned at 48 and `WONK` pinned at 0, rather than shipping all four axes — smaller file, and the design system only specifies fixed SOFT/WONK values plus a wght range anyway. `SOFT` is fixed at 60 via `font-variation-settings` in `base.css` h1/h2 rules. Karla was instanced to a single variable file covering wght 400–700 (one file, not three statics).
- **Any component with a `--drape`/`--drape-deep` background must also carry `data-ground="drape"` on the same element**, or `--fg`/`--fg-muted` stay at their light-ground (dark green) values and text renders invisibly dark-on-dark. Hit this bug with the footer and action bar in S2 — both fixed by adding the attribute. `.site-footer` and `.action-bar` set their background directly (not via `--bg`, since the drape ground token block doesn't redefine `--bg`), so the `data-ground` attribute is doing fg-only inversion work — don't skip it when reusing these classes on future pages.
- `main.js` binds via `data-bind`/`data-cta` but the bound elements ship with **empty** text content and `href="#"` in markup, not the real fallback value — CONVENTIONS.md §3 bans hardcoding client data into markup even as a fallback, since it breaks the "swap content.js and nothing else" guarantee. Every future page's header/footer copy-paste should follow this — empty `data-bind` targets, not pre-filled ones.
- `.rail`'s current-section label needs a `data-rail-label="..."` attribute on each major section for the `IntersectionObserver` in `main.js` to track; homepage sections in S3+ must carry one each or the rail label will just freeze at whatever it last saw.
- Header transparency (`body[data-header-mode="transparent"]`) only applies when the `<body>` tag carries that attribute — set it only on pages with a hero the header can float over (homepage). Inner pages should omit the attribute so the header is solid from load.
- `treatments/index.html`, `about.html`, `team.html`, etc. don't exist yet, so all nav/footer links in the frame markup point at paths that 404 until S6–S10 build them. Expected, not a bug.
- Pre-existing, out of S2's scope: the kitchen sink's S1 "type weights" demo row (`Fraunces 400 500 600` in one `ks-type-row`) overflows horizontally at 360px — a scratch-page-only cosmetic issue, not present on any real component. Leave it; the whole file is deleted in S12.
- `index.html` deliberately omits `data-header-mode="transparent"` — see Decision log. Any future page keeps the header solid unless a real dark/image hero is introduced.
- `.hero`'s bottom padding includes `+ var(--action-bar-height)` below 768px so the section's own end clears the fixed action bar — every future section that can end a page (i.e. is the last section before the footer) on a page with the action bar needs the same clearance, or its bottom content sits under the bar. This is currently handled per-section (mobile-first base + `min-width: 768px` override back to normal), not globally — worth revisiting as a shared utility if it gets repetitive across S4+.
- The WhatsApp float (≥768px) and the sticky action bar (<768px) are fixed-position and will overlap whatever content is currently scrolled beneath them — confirmed this is expected/standard floating-button behavior, not a layout bug, after seeing it in the S3 screenshots.
- Comparator row copy ("Drill used / Sutures / Typical sittings / Anaesthesia", values incl. "Often none") is copied directly from DESIGN-SYSTEM.md §6's own worked example — treated as pre-vetted DCI-compliant copy, not `MOCK:`-flagged, since it states generic laser-vs-conventional procedure attributes rather than an Akshaya-specific fact. `CONTENT-DATA.md` doesn't model comparator rows in `content.js`; they're hardcoded in `index.html`/`comparator.js` on the reasoning that "never hardcode client data" (CONVENTIONS §3) covers name/phone/address/doctor/timing facts, not this kind of system copy shared by any laser-dentistry clinic. Flag if a future session disagrees.
- `motion.js` must load after `main.js` in `index.html`'s script order — it reads and re-splits the hero heading's already-bound text into `.load-word` spans for the stagger effect, so it depends on `main.js`'s `data-bind` pass having already run. Module scripts execute in document order, so keep `main.js` → `comparator.js` → `motion.js` on every future page that includes the hero heading pattern.
- **CONVENTIONS.md §5 vs DESIGN-SYSTEM.md §6 conflict, resolved in favour of CONVENTIONS:** the component inventory describes the treatment card as carrying a "Plex Mono index," but CONVENTIONS.md §5 states numbering (01/02/03) is allowed in exactly one component — the treatment step process — nowhere else. S4 built the treatment card **without** an index number, using only the amber beam mark (laser treatments) + title + description + sittings chip + arrow. Follow this in S6/S7 when building the step process and reusing/extending the card — the step process is the only place `01→05` numbering may appear.
- Treatment cards are generated entirely in `main.js` (`#treatmentsGrid`), sorted by `content.js`'s `order` field, which is already laser-first (orders 1–3 are the laser treatments). Per-card scroll-reveal stagger is set as an inline `transition-delay` in the generated markup (same reasoning as `motion.js`'s hero word-stagger: card count is data-driven, so a fixed CSS `:nth-child` chain doesn't fit). Static (non-generated) multi-item reveal groups — like `.why-laser__grid`'s 4 items — use CSS `:nth-child` stagger instead; see the rule pattern in `sections.css` if a future session adds another static grid that needs staggered reveal.
- Added `--duration-ambient: 20s` to `tokens.css` for the "Why laser" section's ambient amber glow drift (DESIGN-SYSTEM §8 specifies 20s). Any future `drape` section that wants the same ambient glow effect should reuse this token, not introduce a new duration literal.
- The rating monument's arc fill uses a hardcoded `stroke-dashoffset: 0.02` for 4.9-of-5 stars (calculated as `1 - 4.9/5`). This is **not** wired to `clinic.rating` dynamically — if the real rating ever changes from 4.9, this value in `sections.css` (`.rating-monument.is-revealed .rating-monument__arc-fill`) needs a manual update, or a future session should make it computed (e.g. a CSS custom property set inline from `main.js` reading `clinic.rating`). Flagged here since `content.js`-only edits are supposed to be sufficient for data changes (CONVENTIONS §3) and this is a small exception.
- Confirmed via Playwright: `fullPage: true` screenshots can visually corrupt/duplicate `position: fixed` elements (saw the mobile-menu's logo/hamburger bleed into the middle of a full-page capture at 360px even though it's `hidden` + `opacity: 0`). This is a Chromium/Playwright full-page-screenshot stitching artifact, not a real rendering bug — a normal single-viewport screenshot at the same scroll position renders correctly. Don't chase this if it recurs in future sessions' QA; verify with a viewport-clipped screenshot instead of `fullPage` when a fixed-position element looks wrong.

---

## Decision log

*Settled decisions. Check here before changing an earlier session's approach — don't re-litigate. If you do change one, add a row with the reason.*

| Date | Decision | Reason |
| :--- | :--- | :--- |
| 2026-08-16 | Direction is **"Quiet Light"** — laser as warm amber light, not cold clinical blue | The site's job is to lower an anxious visitor's heart rate. Cold precision aesthetics make a scary word scarier. |
| 2026-08-16 | Anchor dark is deep surgical green `#12302A`, not navy or black | From the operatory itself; warmer than black; near-complement of amber |
| 2026-08-16 | No red in the palette | Blood association undercuts a clinic selling bloodless procedures |
| 2026-08-16 | Signature element is the **Procedure Comparator** in the hero, not a photo or headline | Answers "will this hurt?" in five seconds, built from the real differentiator, needs zero patient imagery (sidesteps DCI) |
| 2026-08-16 | ⚠️ **Rebalanced to two pillars — Dental Implants + Gum/Periodontal Treatment — with laser as the *method*, not the identity** | Online verification: Dr. Sampath is MDS Oral Implantologist + Periodontist + LASER Specialist. Implants is first in the clinic's name and his qualifications; laser gingivoplasty is itself a periodontal procedure. The earlier laser-as-identity framing weighted a technique over two clinical specialisms. Supersedes any earlier laser-first guidance. |
| 2026-08-16 | Added `gum-treatment` as a treatment page; removed laser-first ordering | Periodontics is the principal's actual MDS specialism and had no page at all. Grid now orders by pillar, then search demand. |
| 2026-08-16 | Homepage gains a **two-pillar section** above the treatments grid | Positioning needs to happen before the full 11-card scope, or the two things that matter get lost among nine that don't |
| 2026-08-16 | Keep 3–4 doctors despite evidence of one | Human decision. Component handles any N; degrading a grid is cheaper than growing a single profile into one. |
| 2026-08-16 | Never publish a years-of-experience figure | Sources conflict (23+ vs 15; MDS 2010). Unverifiable experience claims are prohibited under the DCI code. Use "in practice since &lt;year&gt;" once confirmed. |
| 2026-08-16 | Type is Fraunces + Karla + IBM Plex Mono | Deliberately avoids the Playfair/Inter default pairing; Karla holds up at 15px on mid-range Android |
| 2026-08-16 | Static HTML/CSS/JS, no framework, no build step | Matches the repo's existing per-niche pattern; fast, cheap to host, nothing to patch |
| 2026-08-16 | Build output at `websites/akshaya/`, separate from `public/demo/dental/` | The demo is the sales asset for all dental leads; the client site is its own thing |
| 2026-08-16 | Build proceeds on **mock data** before the client call | Unblocks the build; content swaps are cheap, architecture changes are not. All mock values `MOCK:`-flagged in `content.js`. |
| 2026-08-16 | `showPricing` ships **false** | Client hasn't confirmed publishing cost ranges; block is built, just hidden |
| 2026-08-16 | Assumed 5 extra treatments beyond the client's stated 5 | Implants is in the clinic's own name; the rest are standard multispecialty scope. Flagged unconfirmed; cutting one costs nothing. |
| 2026-08-16 | No before/after gallery component exists in the system at all | DCI prohibits before/after of identifiable patients — this is a component-inventory constraint, not a copy constraint |
| 2026-08-16 | S1: mock doctor count fixed at 3, not 3–4 | CONTENT-DATA.md left it a range; a concrete number was needed to build `content.js`. Trivial to add a fourth object later — no template impact. |
| 2026-08-16 | S1: Fraunces variable font instanced to only `SOFT` + `wght` (400–600) axes; `opsz` pinned 48, `WONK` pinned 0. Karla shipped as one variable file (wght 400–700) instead of 3 statics | Matches the fixed SOFT/WONK values + wght range actually used in DESIGN-SYSTEM §3; smallest file for the axes CSS actually varies. Total font payload 98.6KB, under the 120KB budget. |
| 2026-08-16 | S1: reduced-motion handled by zeroing `--duration-*` tokens in `base.css`'s media query, not blanket `!important` overrides | CONVENTIONS.md §4 bans `!important` outright; token-driven durations let later sections' CSS honour reduced-motion automatically as long as they read `var(--duration-*)` instead of hardcoding timings. |
| 2026-08-16 | `.gitignore`'s blanket `websites/*` ignore now has an exception for `websites/akshaya/` | That rule was written for dynamically-generated demo output; this build is hand-authored client work and should be version-controlled. Committed in `a0d0cf8`. |
| 2026-08-16 | S2: added `--drape-deep` and `--whatsapp` tokens to `tokens.css` (footer band, WhatsApp brand green) | Both needed a raw hex not already covered by the S1 palette; CONVENTIONS.md §4 requires all raw hex to live in `tokens.css`, and DESIGN-SYSTEM §6 explicitly calls WhatsApp green "the one palette exception." |
| 2026-08-16 | S2: added `--header-height` and `--action-bar-height` tokens | Needed by multiple components (rail sticky offset, mobile menu close-button centering, section scroll-padding) — better as a shared token than repeated magic numbers. |
| 2026-08-16 | S2: header transparency is opt-in via `body[data-header-mode="transparent"]`, not the default | Only the homepage hero needs a transparent-over-image header; every inner page wants it solid from load. Keeps the transparent CSS scoped instead of fighting it back to solid everywhere else. |
| 2026-08-16 | S2: `data-bind`/`data-cta` elements ship with empty text/`href="#"` in markup, not a real-value fallback | CONVENTIONS.md §3's hardcoding ban applies even to fallback text — a duplicated real value in 13 pages' markup breaks the single-file content swap the whole system is built around. |
| 2026-08-16 | S3: `index.html`'s `<body>` does **not** carry `data-header-mode="transparent"`, despite S2's note that the homepage is the intended user of it | S3's hero ground is `porcelain` (light) per DESIGN-SYSTEM §5 row 1 — the transparent-header CSS swaps header text to `--porcelain` (white) for a dark/image hero to sit under, which on a light hero would render near-invisible white-on-near-white nav text. No dark or image passage exists at the top of this hero, so solid-from-load is the only contrast-safe option here. The transparent mode itself is untouched in `components.css` and stays available for a future page with an actual dark/image hero. |
| 2026-08-16 | S3: comparator hero split is 45/55 only at ≥1024px; 768–1023px stays stacked (single column) rather than also splitting | DESIGN-SYSTEM §9's 768–1023 row explicitly allows "stays stacked" as a fallback "if the comparator has room, else—"; the comparator card plus its illustration needs more than half of a 768px viewport to read cleanly, so stacking was chosen over a cramped split. |
| 2026-08-16 | S3: comparator toggle state, illustration, and row copy are driven by the component's own markup/JS, not `content.js` | Per CONTENT-DATA.md §4, `content.js`'s shape has no comparator model — the rows are generic laser-vs-conventional procedure facts (see Carried forward), not client-specific data, so CONVENTIONS §3's hardcoding ban doesn't apply to them the way it does to name/phone/address/doctor data. |
| 2026-08-16 | S3: page-load motion sequence hides its initial (pre-animation) state only inside `@media (prefers-reduced-motion: no-preference)` in `sections.css`, rather than hiding unconditionally and un-hiding via a JS-added class for reduced-motion users | Guarantees reduced-motion users never see a hidden/opacity-0 state at all — no dependency on JS timing or a fallback class to avoid a flash of invisible content, satisfying CONVENTIONS §6's "the page must lose nothing but movement" more robustly than a JS-toggled override. |
| 2026-08-16 | S4: treatment card has **no** numeric index, despite DESIGN-SYSTEM §6 describing one | CONVENTIONS.md §5 explicitly restricts 01/02/03-style numbering to the treatment step process alone. Treated CONVENTIONS as authoritative over the component-inventory description per its own framing ("the rules you must not break"). |
| 2026-08-16 | S4: "Why laser" section's four items are written as short attribute headline + one factual sentence each ("Light, not a blade," "Seals as it works," "Anaesthesia, often none," "Single-sitting disinfection") rather than outcome-flavoured headlines like "Reduced bleeding" | First draft used outcome-adjacent headline language; rewritten to name what the laser *does*, per CONVENTIONS §1's does-vs-gets test, before shipping. |
| 2026-08-16 | S4: rating monument arc fill is a static computed value (`stroke-dashoffset: 0.02`), not derived from `clinic.rating` at runtime | Simplest correct implementation for a single fixed rating; see Carried forward for the manual-update caveat if the real rating changes. |
| 2026-08-16 | S4b: two-pillar panels are generated in `main.js` from `treatments.find()` on the `dental-implants`/`gum-treatment` slugs, not a separate `content.js` data shape | CONTENT-DATA.md §4 has no pillars model; reusing the treatments entries as the single source keeps the pillar panel copy and the treatments-grid card copy for the same two treatments from drifting apart. |
| 2026-08-16 | S4b: pillar panels carry a plain-text category label ("Implants" / "Gum & periodontal"), not a 01/02 index | CONVENTIONS.md §5 restricts 01/02/03 numbering to the treatment step process alone; a numbered pillar panel would violate that. |
| 2026-08-16 | S4b: `dental-implants.isLaser` flipped `false` → `true` | DESIGN-SYSTEM.md §1 states both pillars are laser-delivered. Flagged in Carried forward as unconfirmed protocol detail — revert if the client says otherwise. |
| 2026-08-16 | S4b: kept the `.why-laser` CSS class name in `sections.css`/`index.html` despite the section's visible heading/label changing to "How we work — laser" | Renaming the CSS class would touch every rule in that block for a purely internal identifier with no user-facing effect; the visible copy (eyebrow, h2, rail label) is what BUILD-STATE's rename instruction was actually about. Flag if a future session wants the class renamed for consistency. |

---

## Open questions for client

*Raised during the build, to be resolved on the discovery call. Full questionnaire in `PROJECT-BRIEF.md` §7.*

| # | Question | Blocks |
| :-- | :--- | :--- |
| 1 | Exact number of doctors, with names, degrees, specialisations, and **real DCI registration numbers** | S8, launch |
| 2 | Which of the 5 assumed treatments do they actually offer? Any we've missed? | S7 |
| 3 | Publish indicative cost ranges? EMI partners? | `showPricing` flag |
| 4 | Exact clinic timings per day + emergency/after-hours policy | S5 |
| 5 | Founding year, clinic story, what they want to be known for | S8 |
| 6 | Equipment list with model names | S8 |
| 7 | Sterilisation protocol specifics (autoclave class, single-use policy) | S8 |
| 8 | Official email for form submissions | S11 |
| 9 | Google Business Profile access + exact Maps listing URL and geo coordinates | S5, S11 |
| 10 | Logo source file (SVG/AI preferred) | S1 |
| 11 | Photography — who shoots it, when | Launch |
| 12 | Domain choice | Launch |

---

## Session log

*One entry per session. Append, never overwrite.*

### 2026-08-16 — Planning
Research, commercial brief, and design system completed. Repo restructured: client docs moved into `clients/akshaya-dental/`, output folder `websites/akshaya/` created, root `CLAUDE.md` added to auto-route future sessions here. No code written.

### 2026-08-16 — S1 Foundation
Built the system all later sessions render on top of. Folder structure per DESIGN-SYSTEM §11; `tokens.css` with every color/type-step/space/radius/duration as a custom property (no raw literals elsewhere); `base.css` with reset, self-hosted `@font-face` declarations, heading defaults, focus rings, and a token-driven `prefers-reduced-motion` block. Downloaded, instanced, and glyph-subset the three fonts to Latin with `fontTools` (98.6KB total, under the 120KB budget) — see Decision log for the axis choices. Wrote the full `content.js` data object per CONTENT-DATA.md §4 with all mock values `MOCK:`-flagged, including all 10 treatments, 3 mock doctors, 8 FAQs, 3 mock reviews. Built `_kitchen-sink.html` and verified it in a real headless-browser render at 1440 and 375 widths — all three fonts report `loaded` via the Font Loading API, zero console errors, zero failed network requests, both grounds and full type scale render correctly.

**Files created:** `assets/css/tokens.css`, `assets/css/base.css`, `assets/js/content.js`, `_kitchen-sink.html`, `assets/fonts/{fraunces-variable,karla-variable,ibm-plex-mono-400,ibm-plex-mono-500}.woff2`, empty `treatments/` and `blog/` dirs, `assets/img/{doctors,facility,equipment,blog}/` dirs.

**Done-when check:** kitchen sink renders all tokens correctly ✅ (screenshotted at desktop + mobile) · no literal hex outside `tokens.css` ✅ (grepped) · fonts load locally with no network calls ✅ (requestfailed listener empty, all font URLs relative) · total font payload under 120KB ✅ (98.6KB).

**Files created/changed:** `CLAUDE.md`, `clients/akshaya-dental/{00-START-HERE,SESSION-PLAN,CONVENTIONS,CONTENT-DATA,BUILD-STATE}.md`, moved `PROJECT-BRIEF.md` + `DESIGN-SYSTEM.md` into `clients/akshaya-dental/`.

### 2026-08-16 — S2 The frame
Built the site-wide chrome every later page assembles into: `components.css` (buttons incl. the WhatsApp brand-green exception, pills, chips, hairline, header, mobile overlay menu, sticky left rail + scroll fill, mobile progress line, sticky action bar, WhatsApp float, footer) and `main.js` — the first real `content.js` consumer, binding via `data-bind`/`data-cta`, driving header solid-on-scroll, the hamburger/overlay menu (focus management, Escape-to-close, keyboard operable), rail label tracking via `IntersectionObserver`, scroll-progress fill, and generating the footer's treatment links and hours list straight from `content.js`. Added the header/rail/menu/action-bar/WhatsApp-float/footer markup to `_kitchen-sink.html` so the done-criteria could be verified against a real page. Added two tokens to `tokens.css` (`--drape-deep`, `--whatsapp`) and two layout tokens (`--header-height`, `--action-bar-height`).

Verified with a real headless-browser render (Puppeteer) at 360 / 768 / 1440px: nav/rail/WhatsApp-float appear only ≥1024px and ≥768px respectively per spec, action bar only <768px, footer treatment list (10) and hours (7, today highlighted) generate correctly from `content.js`, all `tel:`/`wa.me` links resolve with the right numbers, hamburger menu opens/closes with correct `aria-expanded`/focus movement and Escape support, desktop tab order reaches every nav link, and `prefers-reduced-motion` correctly zeroes all duration tokens. Caught and fixed a real bug in the process: `.action-bar` and `.site-footer` set dark backgrounds directly but were missing `data-ground="drape"`, so `--fg`/`--fg-muted` stayed at light-ground values and text rendered dark-on-dark (invisible except for the one hardcoded-color WhatsApp item). Also caught that my own markup was hardcoding real confirmed client values (phone, name, address) as `data-bind` fallback text — removed per CONVENTIONS.md §3, elements now ship empty and are populated by `main.js`.

**Done-when check:** header, footer, rail, action bar render on kitchen sink at 360/768/1440 ✅ · nav keyboard operable ✅ (tab order + hamburger focus verified) · no client data hardcoded ✅ (grepped, and the fallback-text bug above was caught and fixed).

**Files created/changed:** `assets/css/components.css`, `assets/js/main.js`, `assets/css/tokens.css` (added `--drape-deep`, `--whatsapp`, `--header-height`, `--action-bar-height`), `_kitchen-sink.html` (header/rail/menu/action-bar/WhatsApp-float/footer markup added).

### 2026-08-16 — 🚩 S3 Hero + Procedure Comparator

Built `index.html` — the first real page, assembling the S2 frame around the hero and the signature Procedure Comparator. Hero: eyebrow (locality), `h1` (clinic name), lead paragraph (tagline), rating pill, and a CTA pair (Book / WhatsApp), all bound from `content.js` via the existing `main.js` pattern. Desktop splits 45/55 at ≥1024px; stays stacked at 768–1023px (see Decision log); mobile stacks with the primary CTA visible above the fold at 360×640.

Comparator (`comparator.js` + markup in `index.html`): a real `role="radiogroup"` segmented Conventional/Laser toggle, keyboard-operable (arrow keys move focus and selection), `aria-live="polite"` region announcing state changes, four rows (Drill used, Sutures, Typical sittings, Anaesthesia) crossfading their values, an inline SVG tooth illustration with two crossfaded overlay layers (drill+sutures vs. amber beam+glow), and the required suitability disclaimer. Row copy is DESIGN-SYSTEM §6's own vetted example, not `content.js`-modeled (see Carried forward). Instant swap under `prefers-reduced-motion`.

`motion.js`: the 5-beat page-load sequence (ground fade → heading word-stagger → meta/CTA fade-up → comparator fade-up + SVG trace via `pathLength="1"` + `stroke-dashoffset` → rail hairline draw), gated entirely inside `@media (prefers-reduced-motion: no-preference)` in `sections.css` so reduced-motion users never see a hidden initial state. Also exports and calls the reusable `initScrollReveal()` IntersectionObserver utility (`[data-reveal]`/`.is-revealed`, once-only) that S4+ will use for section reveals — unused this session since only one section exists.

New `sections.css` (hero, comparator, load-sequence, scroll-reveal) and a `.visually-hidden` utility added to `base.css` for the comparator's live region. `index.html`'s `<body>` omits `data-header-mode="transparent"` (see Decision log — this hero's ground is light, transparent mode assumes a dark/image hero).

Verified with Playwright at 360×640 / 768×1024 / 1440×900: zero console errors, zero failed requests, no horizontal overflow, primary CTA visible without scrolling at 360×640, comparator toggles correctly by click and by arrow-key with correct `aria-checked`/`aria-live` updates, and reduced-motion context shows full opacity with no hidden state. Screenshotted both comparator states at all three widths.

**Done-when check:** hero + comparator work at 360/768/1440 ✅ · toggle keyboard operable and screen-reader sane ✅ (`role="radiogroup"`, arrow-key navigation, `aria-live`) · reduced-motion path verified ✅ · no outcome claims anywhere ✅ (rows are procedure attributes only, disclaimer present).

**Files created/changed:** `index.html`, `assets/css/sections.css`, `assets/js/comparator.js`, `assets/js/motion.js`, `assets/css/base.css` (added `.visually-hidden`).

**🚩 Stop here for human review before S4.**

### 2026-08-16 — S4 Homepage part A

Added the next three homepage sections to `index.html`, each with its own `data-rail-label`: the rating monument, the treatments grid, and "Why laser" (the first `drape` section on the page).

**Rating monument** (bisque ground): `4.9` in Fraunces at `--step-6`, centered over an SVG ring — a static track circle plus an amber `stroke-dashoffset`-animated fill circle that draws to ~98% (4.9-of-5) on scroll-in, gated by the existing `[data-reveal]`/`initScrollReveal()` system from S3. `1,465 verified Google reviews` beneath in Plex Mono, both values bound from `content.js` via the existing `data-bind` pattern.

**Treatments grid** (porcelain ground): all 10 treatments generated in `main.js` from `content.js`, sorted by the `order` field (already laser-first per CONTENT-DATA.md). Each card: amber beam-mark SVG (laser treatments only), title, one-line (2-line-clamp) summary, sittings chip, arrow. 1/2/3-up responsive at 360/480/1024. No numeric index — see Decision log, this conflicts with DESIGN-SYSTEM §6's stated component but CONVENTIONS §5 is authoritative.

**"Why laser"** (drape ground, first of the page's max-two dark sections): eyebrow + heading + a 4-item grid of procedure-attribute cards (rewritten once during the session to strip outcome-flavoured phrasing — see Decision log) + the suitability disclaimer, all revealing via `[data-reveal]`. A radial-gradient glow div drifts slowly (`--duration-ambient: 20s`, new token) behind the content, entirely inside `@media (prefers-reduced-motion: no-preference)` per the established motion-gating pattern.

Verified with Playwright at 360×640 / 768×1024 / 1440×900: zero console errors, zero failed requests, no horizontal overflow, all 10 cards render from data, rating figure shows "4.9" correctly, reveal system fires correctly on scroll (confirmed directly with `scrollIntoView` after a `fullPage` screenshot showed a scroll-simulation-timing artifact — see Carried forward on `fullPage` + fixed-position elements). Screenshotted all three widths.

**Done-when check:** three sections render and reveal correctly at all breakpoints ✅ · treatment cards generated from data, not hand-written ✅ (grepped `index.html`, confirmed no hardcoded treatment markup) · exactly one dark section used so far ✅ ("Why laser" is the first; hero and the other two S4 sections are light).

**Files created/changed:** `index.html` (3 sections added), `assets/css/sections.css` (rating monument, treatments grid/card, why-laser section, reveal-stagger rules), `assets/js/main.js` (treatments-grid generator), `assets/css/tokens.css` (added `--duration-ambient`).

### 2026-08-16 — S4b Rebalance rework

Corrected S3/S4's laser-as-identity framing to the two-pillar positioning established in the docs after online verification (`CONTENT-DATA.md` §1). No teardown — palette, type, layout, motion, and the comparator itself are untouched.

**Hero:** `clinic.tagline` in `content.js` rewritten to name both pillars ("Dental implants and gum treatment, both delivered with laser") — the hero markup itself didn't change, since the lead paragraph under the h1 was always the right slot for this copy, only its content was laser-only before.

**New "Two pillars" section** (`index.html`, between rating monument and treatments grid, porcelain ground, `data-rail-label="The two pillars"`): two panels generated in `main.js` from the `treatments[]` entries for `dental-implants`/`gum-treatment` (name + summary reused directly, so the panel and the treatments-grid card for the same treatment can't drift apart). New `.pillar-panel` styles in `sections.css` — bisque card, amber left-edge accent revealed on hover, category label instead of numeric index (CONVENTIONS §5 restricts 01/02 numbering to the step process only).

**`content.js`:** added `gum-treatment` (order 2, isLaser true, confirmed true); reordered all 11 treatments pillar-then-demand per CONTENT-DATA.md §5's table (was laser-first); flipped `dental-implants.isLaser` to `true` and `confirmed` to `true`; flipped `confirmed` to `true` on the 4 other treatments CONTENT-DATA now lists as verified (crowns-and-bridges, braces-and-aligners, teeth-whitening, kids-dentistry). Grid went 10 → 11 cards with no markup change — `main.js` regenerates it from `content.js.order`, confirming the "content.js-only" claim in the handoff.

**"Why laser" → "How we work — laser":** visible copy changed (eyebrow "How we work", h2 "How laser fits into your implant and gum treatment", `data-rail-label`) to frame laser as method, not identity. The four attribute items and disclaimer were already factual/procedure-only and needed no rewrite. CSS class name `.why-laser` kept as-is — internal identifier, not visible; see Decision log.

Verified with Playwright at 360×640 / 768×1024 / 1440×900: zero console errors, zero failed requests, no horizontal overflow, 11 treatment cards and 2 pillar panels render from data, both pillar panels reach `.is-revealed` on scroll, rail label correctly reads "How we work — laser" over that section, hero h1/lead text confirmed correct. Screenshotted hero, pillars section, and "how we work" section at 1440 and 360.

**Done-when check (from the handoff, not a formal session-plan entry):** hero names both pillars ✅ · two-pillar section present between rating monument and treatments grid ✅ · `gum-treatment` added and grid reorders pillar-then-demand, content.js-only change ✅ · "Why laser" reframed as method ✅ · re-screenshotted ✅.

**Files created/changed:** `assets/js/content.js` (tagline rewrite; `gum-treatment` added; treatments reordered; `isLaser`/`confirmed` flags updated), `index.html` (two-pillar section added; why-laser section copy + rail label changed; `<title>` updated), `assets/js/main.js` (pillars generator added), `assets/css/sections.css` (`.pillars`/`.pillar-panel` styles added).

**🚩 This was a correction session, not a review gate — flag to the human before S5 if they want to see it, but it doesn't block starting S5.**
