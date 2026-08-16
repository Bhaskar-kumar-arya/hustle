# Build State — Akshaya Dental

> **This is the living file.** Every session updates it before finishing. If it disagrees with any other doc, trust this one.

**Last updated:** 2026-08-16 — S1 Foundation complete

---

## ▶ Next session: **S2 — The frame**

Read `SESSION-PLAN.md` → S2 for scope and read list. Foundation (tokens, base, fonts, content.js, kitchen sink) is in place; no header/footer/nav/buttons/rail exist yet.

---

## Progress

| Session | Status | Shipped |
| :--- | :--- | :--- |
| S1 — Foundation | ✅ Done | Folder structure, `tokens.css`, `base.css`, self-hosted subset fonts (Fraunces/Karla/IBM Plex Mono, 98.6KB total), `content.js`, `_kitchen-sink.html` |
| S2 — The frame | ⬜ Not started | |
| 🚩 S3 — Hero + Comparator | ⬜ Not started | |
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

- `components.css`, `sections.css`, `pages.css` don't exist yet — S1 only shipped `tokens.css` + `base.css`. The kitchen sink's button preview uses scratch inline `<style>` (token-driven, not shipped) purely to satisfy S1's "render buttons" done-criterion; S2 must build the real `.btn-*` classes in `components.css` and the kitchen sink's scratch styles can be left alone or removed then.
- `main.js` doesn't exist yet — nothing currently imports `content.js`. S2's header/footer will be the first real consumers; follow the `data-bind` pattern in `public/demo/dental/script.js` per CONTENT-DATA.md.
- Reduced-motion is handled in `base.css` by zeroing the `--duration-*` tokens inside the media query (no `!important`, per CONVENTIONS.md §4 CSS discipline). Component/section CSS should keep reading durations from those tokens rather than hardcoding transition timings, or this override won't reach them.
- **`.gitignore` currently ignores everything under `websites/` except `websites/.gitkeep`** (`websites/*` / `!websites/.gitkeep`), so none of S1's output is tracked by git — confirmed via `git status` + `git check-ignore`. Unclear if intentional (e.g. deploy is drag-and-drop to Netlify, not git-based) or a leftover from before the client-build system existed. Not fixed — out of scope for S1, and changing it is a repo-wide call, not a build one. Flag to a human before S2 if the build should actually be version-controlled.
- Fraunces was instanced down to two variable axes (`SOFT`, `wght` 400–600) with `opsz` pinned at 48 and `WONK` pinned at 0, rather than shipping all four axes — smaller file, and the design system only specifies fixed SOFT/WONK values plus a wght range anyway. `SOFT` is fixed at 60 via `font-variation-settings` in `base.css` h1/h2 rules. Karla was instanced to a single variable file covering wght 400–700 (one file, not three statics).

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
