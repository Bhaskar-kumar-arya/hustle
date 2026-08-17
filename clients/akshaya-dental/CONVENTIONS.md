# Conventions — Akshaya Dental

Read in full, every session. These are the rules that keep 12 sessions from producing 12 different websites.

---

## 1. Compliance — hard limits, not preferences

These are legal constraints (Dental Council of India Code of Ethics 2014; DPDP Act 2023). They constrain **what components may exist**, not just what copy says. Full detail in `PROJECT-BRIEF.md` §2.

**Never build, never write:**
- ❌ A before/after patient photo gallery — **no such component exists in this system**
- ❌ Outcome claims: "painless", "guaranteed", "heals faster", "permanent results", "100% success"
- ❌ Superlatives: "best dentist in Bangalore", "top clinic", "No. 1", "world-class"
- ❌ Written or scripted testimonials — Google reviews embed only
- ❌ Discount bait, inducements, limited-time offers
- ❌ A medical-history field in any web form
- ❌ **A years-of-experience number.** Public listings give both "23+ years" and "15 years" for Dr. Sampath, and they don't reconcile (`CONTENT-DATA.md` §1a). Render *"in practice since &lt;year&gt;"* once the client confirms the year. An unverifiable experience claim is the misleading-advertising case the DCI code exists for.
- ❌ **Presenting laser as the clinic's identity.** It's the *method*. The clinic is an implants + gum-treatment practice that uses laser. See DESIGN-SYSTEM §1.

**Always:**
- ✅ State **procedure attributes**, never outcomes. "Single-sitting root canal under local anaesthesia" ✓ / "Painless root canal" ✗
- ✅ Every treatment page and the comparator carry: *"Suitability is determined by clinical examination."*
- ✅ Social proof is the factual rating: `4.9★ · 1,465 Google reviews`
- ✅ DPDP consent line + privacy policy link sits directly **above** the form submit button
- ✅ Forms collect four fields only: name, phone, treatment interest, preferred day

**When unsure whether a phrase is an outcome claim:** ask whether it describes what the clinic *does* or what the patient *gets*. Does = fine. Gets = cut it.

---

## 2. Files and structure

```
websites/akshaya/
├── index.html
├── about.html  team.html  technology.html
├── patient-information.html  reviews.html  contact.html  privacy-policy.html
├── treatments/     index.html + 10 treatment pages
├── blog/           index.html + posts
└── assets/
    ├── css/   tokens.css  base.css  components.css  sections.css  pages.css
    ├── js/    content.js  main.js  comparator.js  motion.js  form.js
    ├── fonts/ (self-hosted, subset)
    └── img/   (WebP/AVIF + fallback)
```

- Never edit `public/demo/dental/` — that's the separate sales demo for the leads engine.
- Never touch `server.js`, `src/`, or `public/` for this build. The client site and the leads app are independent.
- No `node_modules`, no build step, no bundler, no framework, no jQuery, no icon library. Icons are inline SVG.
- Lowercase-kebab filenames throughout.

---

## 3. Data

**`assets/js/content.js` is the single source of all client data.** Name, phone, address, hours, doctors, treatments, reviews, flags.

- ❌ Never hardcode a client name, phone number, address, doctor name, or timing into markup.
- ✅ Bind via `data-bind` attributes or template functions, following the pattern in `public/demo/dental/script.js`.
- Every mock value carries a `MOCK` marker **in a comment** so the real-data swap is a single-file edit with nothing missed.
- ❌ Never put the marker inside a rendered value (`tagline: "MOCK: ..."`). It shows up verbatim on the client's phone during the pitch and makes a finished site read as a draft. Which content is placeholder gets said out loud in the pitch, not printed on the page.
- A value the client hasn't supplied yet is `null`, not a placeholder dash — `main.js`'s `data-bind` pass hides the element that binds a `null`/empty value, so no stubbed line renders.
- The success test for the whole build: replacing real data touches `content.js` and nothing else.

See `CONTENT-DATA.md` for the object shape and what's real vs assumed.

---

## 4. CSS discipline

Specificity collisions are the top failure mode on a multi-session, multi-page build. These rules exist because of that.

- **`tokens.css` is the only file where a raw hex, rem literal, or duration may appear.** Everything else uses `var(--token)`.
- **One class, one job.** Layout classes never set color. Component classes never set outer margin.
- **All vertical rhythm between sections comes from the section wrapper only.** A component never sets its own outer margin — that's what causes the cancel-out bugs.
- Single-class selectors. No element-type selectors like `.section p` or `.card h3`.
- **No `!important`. Ever.** If you need it, the structure is wrong.
- `[data-ground="drape"]` handles dark-section inversion by redefining `--fg`/`--fg-muted`/`--rule`. Don't write per-component dark overrides.
- Layer order is fixed: `tokens` → `base` → `components` → `sections` → `pages`. Later files may compose, never fight.
- Mobile-first: base styles are the 360px case; `min-width` media queries add from there. No `max-width` queries.

---

## 5. Design tokens — quick reference

Authoritative definitions in `DESIGN-SYSTEM.md` §2–§4. Reproduced here so routine work needs no lookup.

```css
--porcelain: #FCFBF8;   --bisque:   #F1ECE3;
--drape:     #12302A;   --drape-mid:#2E5A4E;
--beam:      #E3A24A;   --beam-deep:#8F5A15;
```

- **Amber discipline:** `--beam` covers **≤5% of any screen**. It is light — glows, hairlines, small marks. Never a large solid fill.
- **Accent text uses `--beam-deep`.** `--beam` is for ≥24px type and non-text marks only. On drape grounds, `--beam` is text-safe.
- **No red anywhere.** Blood association undercuts a clinic selling bloodless procedures.
- **Max two `drape` sections per page.** They're punctuation, not rhythm.
- **Type:** Fraunces (display — `h1`/`h2`/pull-quotes/rating **only**, never `h3`), Karla (body and everything else), IBM Plex Mono (labels, stats, timings — uppercase, `0.16em` tracking, small).
- **Spacing:** `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`
- **Radii:** 2px inputs/chips · 10px cards · 999px pills. Never large playful rounding.
- **Elevation:** almost none. Separation comes from ground bands and hairlines, not shadows. Only the sticky mobile bar gets a shadow.
- **Numbering (01/02/03) is allowed in exactly one component:** the treatment step process, because a procedure genuinely is a sequence. Nowhere else.

---

## 6. Motion

Motion is doing real work in this direction — keep it substantial and orchestrated, not stripped to defaults and not scattered.

- Reveals go through the shared `motion.js` observer utility. Don't hand-roll per-section observers.
- Standard reveal: 16px rise + fade, 500ms `cubic-bezier(.22,.61,.36,1)`, 60ms child stagger, **fires once and never re-triggers**.
- Ambient amber glow appears on `drape` sections only. It's the one ambient effect in the system.
- Hover transitions 180–220ms. State changes 280–320ms.
- **Every session must verify `prefers-reduced-motion`.** Transforms and ambient effects off, opacity fades capped at 100ms, comparator becomes an instant swap, SVG arcs render complete. The page loses movement and nothing else.

---

## 7. Accessibility floor

Non-negotiable on every page, every session:

- Semantic landmarks (`header`/`nav`/`main`/`footer`), one `h1`, no skipped heading levels
- Visible focus: 2px `--beam-deep` ring with offset. Never `outline: none` without a replacement.
- Tap targets ≥48×48px, ≥8px apart
- Real `<label>` for every input — placeholder is not a label
- Interactive components keyboard operable; comparator is a `role="radiogroup"`
- Alt text on every meaningful image, `alt=""` on decorative ones
- WCAG AA contrast throughout

---

## 8. Responsive

Mobile-first, built up from 360px. Breakpoints: **480 / 768 / 1024 / 1280**.

**The 360×640 budget Android is the primary target** — it's the majority of this clinic's real traffic, not the 1440 laptop.

Verify at every session:
- Primary CTA visible without scrolling at 360×640
- No horizontal overflow at any width — wide tables and the comparator scroll inside their own `overflow-x: auto` container
- Images `max-width: 100%` with explicit `width`/`height` to prevent layout shift
- Sticky action bar present below 768px, gone at 1024px+

---

## 9. Session hygiene

- **Stay in scope.** Build what your session lists. Out-of-scope issues go to `BUILD-STATE.md` → *Carried forward*, not into your diff.
- **Don't re-litigate settled decisions.** Check the *Decision log* in `BUILD-STATE.md` before changing an earlier session's approach. If you do change one, log it with the reason.
- **Update `BUILD-STATE.md` before you run out of context.** A finished session with no handoff is worse than an unfinished one with a good handoff.
- Don't add dependencies. Don't introduce a build step. Don't reach for a framework because a component is fiddly.
