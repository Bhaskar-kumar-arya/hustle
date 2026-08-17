# Pitch Plan — closing Dr. Sampath

The budget (₹50k–1L) is already agreed. This is **not a cold pitch — it's a close.** The job of the meeting is a signed scope and a 50% advance, not persuasion from zero.

---

## 1. 🔴 Do this before the meeting — non-negotiable

### Delete the two fabricated doctors

`content.js` contains `MOCK-dr-anitha-rao` and `MOCK-dr-farah-khan`, with pages at `team/MOCK-*.html`. Verification (`CONTENT-DATA.md` §1) indicates this is a **single-practitioner clinic**.

You are about to show Dr. Sampath two colleagues who do not exist. He will notice in under three seconds, and from that moment he is auditing the site for other things you got wrong instead of falling in love with it. Nothing else on this list matters as much.

Rebuild `team.html` around one specialist. It's a better story anyway — a single MDS implantologist/periodontist with two decades in practice beats an anonymous three-person grid.

### Remove the fake registration number

`MOCK-KA-00000` sits next to his real name. Replace with the label and an empty value, or omit the row entirely until he supplies the real one. A fake council registration number beside a real dentist's name is the worst possible detail for him to spot.

### Everything else that's still `MOCK:`

| Fix | Why |
| :--- | :--- |
| Clinic hours | Currently invented. Pull the real ones off his Google listing — it takes two minutes and he'll check this. |
| `mapsUrl` + geo | Grab from his live GBP listing so the map shows his actual clinic |
| Landmark | "Near Sai Baba Temple, Bannerghatta Road" appears in his listings — use it |
| Review excerpts | Copy 3–4 real ones off his Google profile. Real words from real patients hit far harder than invented praise. |
| Placeholder images | **Leave them.** See §3 — they're an asset, not a gap. |

### Then deploy

Netlify drop from `websites/akshaya/`. You need a real URL he can open on his own phone after you leave — that's when the decision actually gets made, not in the room.

---

## 2. The pitch — built from what the research actually found

Don't argue "you need a website." He's heard it. Argue from evidence you personally dug up about *his* business.

### Lead: he is already winning, and paying other people for it

4.9★ from 1,465 reviews is genuinely exceptional — most clinics never get near it. He built that. The pitch is not "you have a problem," it's **"you have an asset and it's currently working for Justdial instead of you."**

### The demonstration — do this live, don't describe it

Open these on your phone in front of him: **Justdial, Practo, Lybrate, Click4Appointment, magicpin.** He's on all five.

Then point at what surrounds his name on each one: competing clinics, "similar doctors nearby," sponsored listings. Every patient who finds him there is shown his competitors in the same breath. He pays for that placement.

**Then the killer detail:** magicpin lists his phone as **9217002598** — not his number. That's a tracking/intercept number. A platform is putting itself between him and his patients, on a listing carrying his name. Show him this on screen. It is the single most persuasive thing you have, and it's true.

### The second argument: his facts are wrong everywhere

Justdial says 23+ years' experience. Lybrate says 15. Two different pincodes across listings. Different ratings on every platform. He has no canonical source of truth about his own practice — and he can't correct any of it, because he doesn't own any of those pages.

A website is the one page where his information is his.

### The third argument: what he actually sells

He's an MDS implantologist and periodontist. Implants and gum surgery are considered, high-value, researched decisions — patients read before they book. A directory tile with a star rating cannot carry that. Eleven treatment pages explaining his procedures can.

---

## 3. Running the meeting

**Show it on a phone first.** Not a laptop. Roughly 80% of his patients will arrive on a phone, the site was designed at 360px first, and handing him a phone makes it feel real in a way a screen share never does. Laptop second, for the wide layout.

**Order of the walkthrough:**

1. **Homepage hero** — his name, his locality, his 4.9/1,465. Let him sit with seeing his own reputation presented properly. Say nothing for a moment.
2. **The comparator** — hand him the phone and let *him* tap it. The thing he explains to every anxious patient, working by itself on his website. This is the moment that sells the site.
3. **Rating monument** — 1,465 at full scale.
4. **A treatment page** — open **Dental Implants** or **Gum Treatment**, his actual specialisms. Show the structure: what it is, the steps, sittings, aftercare, FAQs, his credentials at the bottom.
5. **Sticky Call/WhatsApp bar** — tap WhatsApp, let it open a real pre-filled message to his own number. Direct patient, no platform in between.
6. **Blog** — the SEO engine, in his voice.
7. **Stop.** Don't tour all 28 pages. Leave him wanting to explore it himself.

**On the placeholder images — say it first, before he asks.** Frame it accurately: *"Those grey blocks are labelled with the exact photo each slot needs. That's your shot list. The day your photos land, they drop straight in — nothing moves."* It reads as method, not as unfinished. But only if you raise it before he does.

**On mock content generally:** be straight. *"Names, timings and text are placeholders — that's your information to give me. The structure, the design and the engineering are done."* Trying to pass mock content off as final is how you lose the room.

---

## 4. Objections you should expect

| He says | You say |
| :--- | :--- |
| "I already get patients from Justdial" | "You do — shared with the five competitors on the same page, and you're paying for it. This one is yours alone, and it's a one-time cost, not annual." |
| "₹X is too much" | Don't discount. Reframe against the annual directory spend he's already making, and against one implant case. Then offer scope reduction instead of price reduction — fewer treatment pages, no blog. Never cut the price for the same work. |
| "Can you add [X]?" | "Yes — let's note it. Anything outside the signed scope is a separate line." Write it down in front of him. This is how you protect the margin. |
| "Who will update it?" | The AMC pitch. ₹3–8k/month: hosting, updates, GBP posts, review management, monthly report. Raise it **at handover, not now** — don't complicate the close. |
| "My nephew can build one for ₹10,000" | Don't insult it. "He can. What he won't do is the DCI compliance review." Then show him the compliance note (§5) — no before/after photos, no 'best in Bangalore', no unverifiable experience claims. That's a liability conversation, and it's genuinely yours to win. |
| "Send me the link, I'll think about it" | Fine — but leave with the **content checklist** and a date. The site can't progress without his data; make that the reason to follow up. |

---

## 5. Your differentiator — lead with this if the room goes cold

Hand him a one-page note listing what you deliberately left off the site and why:

- No before/after patient photos — DCI Code of Ethics 2014 prohibits it for identifiable patients
- No "best dentist in Bangalore" — prohibited superlative
- No "painless" or guaranteed outcomes — prohibited outcome claims
- No written testimonials — live Google reviews only
- No years-of-experience figure until he confirms it, because his public listings contradict each other
- DPDP-compliant consent and privacy policy on every form

Every cheap dental site in Bangalore breaks at least three of these. Most agencies don't know the rules exist. This single page is worth more than any design argument you can make, because it says you understand *his profession*, not just websites.

---

## 6. Closing

Leave the meeting with three things:

1. **Signed scope** — fixed deliverables, fixed price, 3 revision rounds, 60-day support, timeline starting **on content handover, not today** (`PROJECT-BRIEF.md` §9)
2. **50% advance**
3. **The content checklist** — `PROJECT-BRIEF.md` §7 questionnaire plus the open questions in `BUILD-STATE.md`, with a date attached

**The three things to chase hardest**, because they block everything:
- Real DCI registration number
- Photography — longest lead time by far, brief him on it in the room
- Confirmation on the years-of-experience figure

State the timeline clearly: *"From the day your content and photos reach me, it's live in two weeks."* True, since the build is done — and it sounds impossibly fast, because for most agencies it would be.
