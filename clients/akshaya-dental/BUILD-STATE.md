# Build State — Akshaya Dental

> **This is the living file.** Every session updates it before finishing. If it disagrees with any other doc, trust this one.

**Last updated:** 2026-08-16 — 🚩 S3 Hero + Comparator complete — STOP for human review before S4

---

## ▶ Next session: **S4 — Homepage, part A** (after human review of S3)

This was the review-gate session. **Do not start S4 until a human has looked at `index.html` in a browser and signed off.** When they do, read `SESSION-PLAN.md` → S4 for scope and read list.

`index.html` now exists with the header/nav/mobile-menu/rail/action-bar/WhatsApp-float/footer frame plus the hero + Procedure Comparator. Only one section (`Hero`) exists on the page so far — S4 adds the rating monument, treatments grid, and the first `drape` section, each needing its own `data-rail-label`.

---

## Progress

| Session | Status | Shipped |
| :--- | :--- | :--- |
| S1 — Foundation | ✅ Done | Folder structure, `tokens.css`, `base.css`, self-hosted subset fonts (Fraunces/Karla/IBM Plex Mono, 98.6KB total), `content.js`, `_kitchen-sink.html` |
| S2 — The frame | ✅ Done | `components.css` (buttons/pills/chips/header/rail/action bar/WhatsApp float/footer), `main.js` (first `content.js` consumer), header + mobile overlay menu + rail + progress line + sticky action bar + footer added to kitchen sink for verification |
| 🚩 S3 — Hero + Comparator | ✅ Done — awaiting human review | `index.html` (skeleton + hero), `sections.css` (hero, comparator, load-sequence, scroll-reveal), `comparator.js`, `motion.js`, `.visually-hidden` utility added to `base.css` |
| S4 — Homepage part A | ⬜ Not started | |
| S5 — Homepage part B | ⬜ Not started | |
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

---

## Decision log

*Settled decisions. Check here before changing an earlier session's approach — don't re-litigate. If you do change one, add a row with the reason.*

| Date | Decision | Reason |
| :--- | :--- | :--- |
| 2026-08-16 | Direction is **"Quiet Light"** — laser as warm amber light, not cold clinical blue | The site's job is to lower an anxious visitor's heart rate. Cold precision aesthetics make a scary word scarier. |
| 2026-08-16 | Anchor dark is deep surgical green `#12302A`, not navy or black | From the operatory itself; warmer than black; near-complement of amber |
| 2026-08-16 | No red in the palette | Blood association undercuts a clinic selling bloodless procedures |
| 2026-08-16 | Signature element is the **Procedure Comparator** in the hero, not a photo or headline | Answers "will this hurt?" in five seconds, built from the real differentiator, needs zero patient imagery (sidesteps DCI) |
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
