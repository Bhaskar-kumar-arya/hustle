# START HERE — Akshaya Dental build

**You are one session in a multi-session build.** Your job is to complete **one numbered session** from the session plan, well, and hand off cleanly. You are not expected to finish the website.

What's split across sessions is the *work*, not the reading. Read the docs freely — they're small, and knowing the whole system is what keeps 12 sessions from producing 12 different websites. What you must not do is build beyond your session's scope.

---

## The four steps of every session

### 1. Find out where the build is

Read [`BUILD-STATE.md`](./BUILD-STATE.md). It names the **next session to run**, what the last session actually did, and any open blockers. It is the only file that is always current — trust it over anything else if they disagree.

### 2. Read the docs

Read these in full, every session — together they're short:
- [`CONVENTIONS.md`](./CONVENTIONS.md) — the rules you must not break
- [`CONTENT-DATA.md`](./CONTENT-DATA.md) — real vs. mock client data, and which is which
- [`SESSION-PLAN.md`](./SESSION-PLAN.md) — your session's scope and done criteria
- [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) — the full design direction

[`PROJECT-BRIEF.md`](./PROJECT-BRIEF.md) is commercial and research context. Worth reading once; rarely needed mid-build.

Each session in `SESSION-PLAN.md` names the DESIGN-SYSTEM sections most relevant to it — that's a pointer to what matters for your work, not a limit on what to read.

### 3. Do the work

Build only what your session's **Scope** lists. If you spot something wrong that belongs to a different session, write it into `BUILD-STATE.md` → *Carried forward* and move on. Do not fix it now — out-of-scope fixes are how sessions overrun and hand off half-done.

Check your work against the session's **Done when** checklist before you call it finished.

### 4. Hand off — do this before you run out of context

Update [`BUILD-STATE.md`](./BUILD-STATE.md):

- Move your session to **Completed**, with a one-line summary of what shipped
- Set **Next session** to the following one
- List every file you created or changed
- Add anything the next session must know to *Carried forward*
- Log any real decision you made to *Decision log*, with the reason
- Add anything needing the client's input to *Open questions for client*

**Start the handoff while you still have room to write it.** A finished session with no handoff is worse than an unfinished one with a good handoff.

---

## Map of the documents

| File | What it is |
| :--- | :--- |
| [`BUILD-STATE.md`](./BUILD-STATE.md) | Living progress tracker. **Read first, edited last, every session.** |
| [`SESSION-PLAN.md`](./SESSION-PLAN.md) | The 12 sessions: scope and done criteria |
| [`CONVENTIONS.md`](./CONVENTIONS.md) | Code rules, CSS discipline, compliance hard limits |
| [`CONTENT-DATA.md`](./CONTENT-DATA.md) | Client facts, what's real vs assumed, `content.js` shape |
| [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) | Full design direction: color, type, layout, components, motion |
| [`PROJECT-BRIEF.md`](./PROJECT-BRIEF.md) | Commercial context, research, DCI/DPDP detail, client questionnaire |

---

## Facts you need in every session

- **Client:** Akshaya Multispeciality Dental Clinic — Dental Implants & LASER
- **Where:** Bhagyalakshmi Avenue, Rukmaiah Layout, Hulimavu, Bengaluru, Karnataka 560114
- **Phone / WhatsApp:** +91 95388 27905
- **Social proof:** 4.9★, 1,465 Google reviews
- **Build output:** `websites/akshaya/` — never edit `public/demo/dental/`, that's the separate sales demo
- **Stack:** static HTML/CSS/JS. No frameworks, no build step, no npm, no icon libraries.
- **Design direction:** "Quiet Light" — laser as *warm* light (amber), not cold clinical blue. The site's job is to lower an anxious visitor's heart rate.
- **Data:** most content is **mock** until the client call happens. `content.js` is the single source; mock values are marked. See `CONTENT-DATA.md`.

## Three rules that override everything

1. **No patient before/after imagery, no outcome claims, no superlatives.** Legally constrained (DCI). See `CONVENTIONS.md` → Compliance.
2. **All client data lives in `assets/js/content.js`.** Never hardcode a name, phone, address, or doctor into markup.
3. **Stay in scope.** One session, one entry from the session plan.
