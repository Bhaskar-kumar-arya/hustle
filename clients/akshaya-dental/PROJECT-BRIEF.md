# Client 01 — Dental Clinic Website: Plan & Research Report

> **Status:** Phase 1 (research) complete. Phase 2 (client discovery) is blocked on your call with the client.
> **Budget:** ₹50,000 – ₹1,00,000 | **Niche:** `dental-clinics` | **First paying client.**
> Related: [`PROJECT_CONTEXT.md`](../../PROJECT_CONTEXT.md), [`SHOWCASE_TEMPLATES_STRATEGY.md`](../../SHOWCASE_TEMPLATES_STRATEGY.md)

---

## 0. The Plan (phases)

| Phase | What happens | Owner | Gate to next phase |
| :--- | :--- | :--- | :--- |
| **1. Research** ✅ | Benchmark what a ₹50k–1L Indian dental site must contain; nail legal constraints; define sitemap, tech spec, design direction | Me | This document |
| **2. Client discovery** ⬅️ *next* | You run §7 questionnaire with the client; collect assets per §8 | You | Filled questionnaire + asset folder |
| **3. Scope lock & proposal** | Convert answers into a fixed scope + price + timeline + payment schedule; client signs off | Me → you | Signed scope, 50% advance |
| **4. Content & IA** | Final sitemap, page-by-page copy deck, DCI-compliance pass on all claims | Me | Client approves copy |
| **5. Design & build** | Homepage design first (approval gate), then remaining templates, then all pages | Me | Client approves homepage |
| **6. Technical layer** | Booking, WhatsApp, schema, SEO, analytics, performance, accessibility | Me | Lighthouse + checklist pass |
| **7. Launch** | Domain, hosting, SSL, GBP wiring, Search Console, review flow | You + me | Live site |
| **8. Handover & AMC** | Training video, credentials handover, 60-day support, pitch AMC | You | Balance payment |

**Do not skip Phase 3.** The single biggest risk on a first ₹50k–1L client is unbounded scope creep — "can you also add..." — eating your margin. A written, signed scope is the defence.

---

## 1. What ₹50,000–₹1,00,000 actually buys (Indian market benchmark)

The Indian market for dentist websites tiers roughly as ₹20K (basic brochure) → ₹50K–1L (standard, lead-generating) → ₹2.5L+ (custom/multi-location/enterprise). Your client sits squarely in the **standard tier**, whose market-expected deliverables are:

- **10–15 pages**, of which **8–10 are treatment-specific landing pages** (not one lumped "Services" page)
- Online appointment booking with calendar + time-slot selection
- WhatsApp Business integration
- Google Reviews embed
- Before/after gallery *(⚠️ see §2 — heavily constrained in India)*
- SEO-optimised blog
- Basic SEO: titles, meta descriptions, schema markup
- Google Business Profile optimisation
- Mobile-responsive
- **3 rounds of revisions**, **60-day post-launch support**
- **Delivery: 14–21 days**

**Implication for your pricing:** at ₹50k you deliver this list. To justify ₹1L you must add genuinely more — richer custom design (no template feel), a full copywriting deck, professional photo direction, multi-doctor profiles, a treatment-cost/EMI section, video, or a 6–12 month AMC bundled in. Decide which side you're on *before* quoting (§9).

> **Positioning note:** ₹5,900 dental website shops exist in India. You are not competing with them on price — you compete on the fact that their output is a template with the clinic's logo dropped in. Your pitch is a *custom-designed, compliant, conversion-instrumented* site. Say that explicitly.

---

## 2. ⚠️ Legal & compliance — the thing every cheap competitor gets wrong

This is your strongest differentiator and your biggest liability. Two regimes apply.

### A. Dental Council of India — Dentists (Code of Ethics) Regulations, 2014

**Prohibited on the website:**
- Superlative/comparative claims — "best dentist in Bangalore", "top dental clinic", "No. 1", "world's finest" — without a verifiable credential basis
- **Before-and-after photos of identifiable patients**
- **Paid testimonials** (any testimonial given for material compensation)
- Guarantees or promises of treatment outcomes ("painless guaranteed", "100% success")
- Inducements, rebates, discount-bait advertising
- Paying agents/canvassers to bring in patients
- Publishing procedure claims without evidence

**Explicitly allowed:**
- A factual clinic website with contact details, address, phone
- Doctor qualifications, credentials, registration numbers, specialisations
- Service availability and formal announcements of new equipment/services (stated factually, without "first and best" boasting)
- Educational content on procedures and oral health
- Indicative pricing, without outcome guarantees
- Procedure illustrations, animations, doctor-led educational video (no patient imagery)
- Professional, factual responses to reviews

**Compliant substitutes we will use instead of the risky elements:**

| Risky element | Compliant replacement |
| :--- | :--- |
| "Best dental clinic in Indiranagar" | "Serving Indiranagar since 2011 · 4.8★ from 340 Google reviews" (factual, verifiable) |
| Before/after patient faces | Cropped intra-oral clinical imagery with written patient consent, OR 3D/illustrated procedure animations, OR anonymised case-study framing in text |
| "Painless treatment guaranteed" | "Single-sitting root canal under local anaesthesia" (describes the service, not the outcome) |
| Paid/scripted testimonials | Live-embedded **Google reviews** — organic, verifiable, third-party hosted |

**Action:** every line of copy passes a compliance review before it ships. I'll do this in Phase 4 and hand the client a one-page written note of what we removed and why — that note is itself a trust-builder that justifies your price.

### B. Digital Personal Data Protection Act, 2023

The site will collect names, phone numbers, and possibly symptom/treatment enquiries — health data, treated as highly sensitive.

Required on the site:
- A **privacy policy** page (clear, accessible, prominently linked in footer)
- A **consent notice at the point of collection** — every form and the WhatsApp entry point states what is collected, why, and by whom
- Purpose limitation: collect only what's needed to book an appointment (name, phone, preferred date, treatment interest — **no medical history in a web form**)
- A stated retention period and a contact route for access/correction/deletion requests
- Secure transmission (HTTPS everywhere) and a booking backend that doesn't leak submissions into a shared inbox

**Design decision:** keep the web form deliberately thin. Detailed history is collected in-clinic, not online. This reduces the client's compliance exposure and increases form completion — a win on both axes.

---

## 3. Recommended sitemap (13 pages)

```
/                              Home
/about                         About the Clinic (story, philosophy, facility, sterilisation protocol)
/team                          Our Dentists  → /team/dr-<name> per doctor if 2+ doctors
/treatments                    Treatments hub (overview + grid linking to all below)
  /treatments/root-canal
  /treatments/dental-implants
  /treatments/braces-and-aligners
  /treatments/teeth-whitening-and-smile-design
  /treatments/crowns-and-bridges
  /treatments/kids-dentistry
  /treatments/gum-treatment
  /treatments/dentures            (final 8–10 chosen with client — see Q4 in §7)
/technology                    Equipment & tech (RVG, intraoral scanner, CBCT, rotary endo…)
/patient-information           First visit, what to expect, timings, payment & EMI, insurance
/reviews                       Live Google reviews embed
/blog                          Oral-health articles (SEO engine)
/contact                       Map, directions, hours, form, WhatsApp, phone
/privacy-policy                DPDP notice  (+ /terms if the client wants it)
```

**Why separate treatment pages matter:** patients search *"root canal cost Koramangala"*, not *"dental services"*. One page per profitable treatment is the single highest-ROI SEO decision on the whole build — and it's what separates the ₹50k tier from the ₹20k brochure.

---

## 4. Page architecture

### Homepage — section order

Converging pattern across the highest-performing dental sites:

1. **Hero** — clinic name, locality, one-line promise, primary CTA above the fold. On mobile the CTA must be visible without scrolling.
2. **Trust strip** — Google rating + review count, years in practice, patients treated, doctor count. Factual numbers only.
3. **Treatments grid** — 6–8 cards linking to the treatment pages
4. **Why this clinic** — differentiators: sterilisation protocol, tech, single-sitting procedures, timings, parking
5. **Meet the dentist(s)** — real photography, full credentials, BDS/MDS, registration no., years of experience
6. **Technology / facility** — real in-clinic photos, not stock
7. **Patient stories** — live Google reviews embed (compliant social proof)
8. **Case gallery** — clinical imagery with consent, or illustrated/animated procedure explainers
9. **Location & hours** — embedded map, directions CTA, timings table
10. **FAQ** — 8–10 questions (doubles as FAQ schema for rich results)
11. **Final CTA band** — book / call / WhatsApp
12. **Footer** — NAP, hours, treatment links, privacy policy, social

Plus a **persistent sticky action bar** on mobile: `Call` · `WhatsApp` · `Book`.

### Treatment page — reusable template

Same skeleton for all 8–10 pages, so the build compounds instead of repeating:

```
H1: <Treatment> in <Locality>, Bangalore
→ What it is (plain language, 2 short paras)
→ Signs you may need it (scannable list)
→ How the procedure works (numbered steps + illustration/animation)
→ Sittings required & typical duration
→ Indicative cost range + EMI availability     [factual, no outcome guarantee]
→ Aftercare
→ FAQs (5–7, treatment-specific → FAQ schema)
→ Doctor who performs it (credential block)
→ CTA: Book consultation / WhatsApp
```

---

## 5. Conversion layer — India-specific

The Indian dental patient journey is **WhatsApp-first**. Build for that, not for the US form-fill pattern.

| Element | Spec |
| :--- | :--- |
| **Floating WhatsApp button** | Persistent, thumb-reachable, pre-filled message with the page context (`"Hi, I'd like to book a consultation for dental implants"`). Captures the majority of Indian clinic enquiries. |
| **Click-to-call** | `tel:` link on every phone number; sticky on mobile |
| **Booking form** | Name, phone, treatment interest, preferred day/time. Four fields. Submissions land in the client's inbox **and** trigger a WhatsApp notification. |
| **Calendar slot picker** | Real time-slot selection at the ₹1L tier; a "preferred day + time-of-day" selector at ₹50k. Confirm with client which is required — a live calendar needs someone to actually manage it. |
| **Google Maps directions** | Wired to the clinic's real GBP listing, not a dropped pin |
| **Review request loop** | Post-appointment WhatsApp with the clinic's Google review link, sent within ~2 hours of the visit — the highest-yield review collection method in India. Ship this as a template + short SOP; it's a strong AMC upsell. |

---

## 6. Technical specification

**Stack:** static HTML/CSS/JS, consistent with the existing per-niche demo pattern in [`public/demo/dental/`](../../public/demo/dental/). This is the right call — fast, cheap to host, nothing to patch, no CMS attack surface. Add a lightweight headless CMS or a simple markdown-driven blog only if the client insists on self-editing (see Q9, §7).

**Requirements:**
- **Performance:** LCP < 2.5s on 4G, all images WebP/AVIF + lazy-loaded, fonts self-hosted and subset. Indian mobile networks are the real test environment, not desktop fibre.
- **Mobile-first:** designed at 360px first. Assume ~75–85% of traffic is mobile.
- **Schema markup:** `Dentist` / `DentalClinic` (name, address, geo, hours, phone, priceRange), `Physician` per doctor, `FAQPage`, `BreadcrumbList`, `Article` on blog posts. This is what earns rich results.
- **On-page SEO:** unique title + meta description per page, one H1, semantic heading order, internal links from treatment pages back to the hub and to relevant blog posts, descriptive alt text.
- **NAP consistency:** name/address/phone byte-identical between the site, the Google Business Profile, and every directory listing.
- **Accessibility:** WCAG AA contrast, keyboard-navigable, real `<label>`s, visible focus states, `prefers-reduced-motion` respected.
- **Analytics:** Google Analytics 4 + Search Console, with conversion events on `whatsapp_click`, `call_click`, `form_submit`, `directions_click`. Without these you cannot prove ROI at renewal — and proving ROI is how you sell the AMC.
- **Hosting:** Netlify or Cloudflare Pages, free tier, custom domain, automatic SSL.
- **Domain:** `.in` or `.com` matching the clinic name. Register in the **client's** name with them as registrant — hand over credentials at launch. (Holding a client's domain hostage is how agencies get bad reviews.)

---

## 7. Client discovery questionnaire — take this to the call

Everything below is blocking. Group A blocks scope; Group B blocks build; Group C blocks launch.

### Group A — Scope & commercials
1. Registered clinic name, tagline, and the exact way they want the name written.
2. Single location or multiple? (Multi-location changes IA and price materially.)
3. How many dentists will have profiles on the site?
4. **Which 8–10 treatments are their most profitable / most-wanted?** (This defines the treatment pages. Ask for their actual top revenue procedures, not a full service list.)
5. Do they want indicative pricing published? EMI / no-cost EMI partners? Insurance / corporate tie-ups?
6. Do they have an existing website, domain, or social handles? Any existing brand colours/logo?
7. Who is the single decision-maker and approver? (Get one name. Approval-by-committee kills timelines.)
8. Target launch date, and is there an event driving it (new branch, anniversary, festival campaign)?
9. Does anyone at the clinic need to edit content themselves after launch, or will they route changes through you?
10. Are they interested in ongoing maintenance/SEO after launch? (Plant the AMC now.)

### Group B — Content & credibility
11. Full credentials for each dentist: degrees (BDS/MDS), specialisation, university, years of experience, **dental council registration number**, memberships, any published work.
12. Clinic story: founding year, patients treated, what they want to be known for.
13. Sterilisation & safety protocol — specifics (autoclave class, single-use instruments, disposal). This is a top patient anxiety and a strong, fully compliant trust section.
14. Equipment list — intraoral scanner, RVG, CBCT, rotary endo, laser, etc. Model names where notable.
15. Clinic timings per day, emergency/after-hours policy, languages spoken by staff (Kannada / English / Hindi / Tamil / Telugu — genuinely matters in Bangalore).
16. Do they have **written patient consent** for any clinical photos they want used? If not, we use illustrations/animations instead — non-negotiable.
17. Any awards, certifications, hospital affiliations, or media coverage (with evidence)?
18. Parking, wheelchair access, nearest metro station/landmark.

### Group C — Access & launch
19. Google Business Profile: do they own/have access to it? (If unclaimed or held by an ex-vendor, claiming it is step one — it outperforms the website for local discovery.)
20. Official phone number(s) for the site, and the WhatsApp Business number.
21. Official email for form submissions.
22. Preferred domain name — give them 2–3 options to choose from.
23. Who pays for domain (~₹800–1,500/yr) — bill-through or bundled?
24. Social profile links to wire into the footer.

### Red-flag questions (ask these, they protect you)
25. "What does success look like 6 months after launch?" — if the answer is "rank #1 on Google", reset expectations now: the website is the conversion asset, ranking is a separate ongoing effort (and an AMC).
26. "Has a previous vendor built you something?" — surfaces baggage, unrealistic comparisons, and hostage credentials.

---

## 8. Manual tasks for you (I can't do these)

These are the actual bottleneck. Start #1 and #2 immediately after the call — photography is what makes a ₹1L site look like ₹1L, and it has the longest lead time.

1. **📸 Photography — highest impact.** Real photos of the clinic, the reception, the operatory, the equipment, and every dentist. Stock photos are the #1 tell of a cheap dental site. Either brief the client to hire a local photographer (₹5,000–15,000 in Bangalore) or shoot it yourself with a decent phone in good daylight. **Budget it explicitly in the quote or explicitly exclude it.** Non-negotiable shot list: exterior/signage, reception, each operatory, sterilisation area, each doctor (portrait + at-work), team group shot, equipment close-ups.
2. **Logo** — get the source file (AI/SVG/PNG with transparency). If they only have a low-res JPG, budget a redraw.
3. **Written photo-consent forms** for any patient clinical imagery — signed, and kept by the clinic.
4. **Verify Google Business Profile ownership** and get admin access transferred to the client (not to you personally).
5. **Domain purchase** in the client's name.
6. **Collect the treatment cost ranges** — clinics are often reluctant to publish these. Push gently; transparent pricing is a documented conversion driver.
7. **Payment terms** — 50% advance before Phase 4, 50% before go-live. First client, no exceptions.
8. **Competitor recon** — send me the websites of 3–5 dental clinics in the client's locality so I can position the design against what's already there.

---

## 9. Proposed scope & pricing split

Take one of these to the client — don't quote a range, quote a number.

| | **₹55,000 — Standard** | **₹95,000 — Premium** |
| :--- | :--- | :--- |
| Pages | 10–12 | 13–15 + per-doctor profiles |
| Design | Custom homepage + 3 templates | Fully custom, every page individually designed |
| Copywriting | Client-supplied, edited by us | Written by us, DCI-compliance reviewed |
| Treatment pages | 6–8 | 10 |
| Booking | Form + WhatsApp + preferred-slot | Live calendar slot booking |
| Media | Client-supplied photos | Photo direction + procedure animations/illustrations |
| SEO | On-page + schema + GBP optimisation | + blog seeded with 5 articles + Search Console setup |
| Analytics | GA4 + conversion events | + a monthly performance dashboard |
| Revisions | 3 rounds | 4 rounds |
| Support | 60 days | 90 days + review-request WhatsApp SOP |
| Timeline | 21 days from content handover | 30 days from content handover |

**AMC upsell (pitch at handover, not before):** ₹3,000–8,000/month — hosting, backups, content updates, GBP posts, review management, monthly analytics report. This is where the recurring revenue lives; the build is the door-opener.

**Clock starts on content handover, not on the advance.** State this in writing. Client-side content delay is the #1 cause of blown timelines, and you must not absorb it.

---

## 10. Gap analysis — existing demo vs. what ships

The current demo at [`public/demo/dental/`](../../public/demo/dental/) (single page: hero → stats → services → why → doctor → results → transform → testimonials → location) is a **sales artefact**, not the deliverable. It is correctly built for its job. To become this client's real site:

| Gap | Action |
| :--- | :--- |
| Single page | Expand to the 13-page sitemap (§3) |
| URL-param data injection | Replace with the client's real hardcoded content |
| Generic testimonials | Replace with a live Google reviews embed |
| `transform` / `results` sections | **DCI compliance risk** — rebuild as consented clinical imagery or illustrated explainers (§2) |
| No booking backend | Add form handler + WhatsApp notification |
| No schema, no analytics | Add per §6 |
| No blog, no privacy policy | Add both |
| Stock/placeholder imagery | Replace with real photography (§8.1) |

**Reusable as-is:** the design system, the section rhythm, the mobile sticky CTA pattern, and the overall visual language. Do keep the motion and animation work — it's part of what makes the site read as premium rather than templated.

**Do this too:** deploy the current demo to Netlify and set `DEMO_BASE_URL_DENTAL` (PROJECT_CONTEXT §6). It's still pending, and every dental pitch you send until then goes out without a live preview link — which is the entire mechanic that won you this client.

---

## 11. Immediate next actions

- [ ] **You:** run §7 questionnaire on the client call; record it if they allow
- [ ] **You:** brief the client on photography (§8.1) — longest lead time, start now
- [ ] **You:** confirm which pricing tier (§9) you're quoting
- [ ] **You:** send me 3–5 competitor sites in their locality
- [ ] **You:** deploy the existing dental demo + set `DEMO_BASE_URL_DENTAL`
- [ ] **Me:** on receipt of the filled questionnaire → produce the locked scope document, final sitemap, and page-by-page copy deck (Phase 3–4)

---

## Sources

- [Dentist Website Design India 2026: ₹20K–₹2.5L — Codingclave](https://codingclave.com/guides/dentist-website-design-india-2026)
- [Dental Clinic Marketing India 2026 — DCI + NMC-Compliant Growth Playbook, Ichelon Consulting](https://ichelonconsulting.com/insights/dental-clinic-marketing-india-dci-nmc-compliant)
- [Advertisement Guidelines For Private Dental Practitioners By DCI — Praxis360](https://praxis360.in/advertisement-guidelines-for-private-dental-practitioners-by-dci/)
- [Dentists (Code of Ethics) Regulations 2014 Gazette Notification — Dental Council of India](https://dciindia.gov.in/Rule_Regulation/Gazette_Notification_reg_DCI_Revised_Dentists_Code_of_Ethics_Regulations_2014_27.06.2014.pdf)
- [Code of Ethics — Indian Dental Association](https://www.ida.org.in/AboutUs/Details/Code-of-Ethics)
- [20 Best Dental Websites of 2026: Design Examples & Data — Delmain](https://delmain.co/blog/best-dental-websites/)
- [26 Dental Website Ideas That Convert — Delmain](https://delmain.co/blog/dental-website-ideas-that-convert/)
- [Top 20 Best Dental Websites of 2026 (Design + SEO) — LassoMD](https://www.lassomd.com/blog/top-10-best-dental-websites)
- [Local SEO for Dentists in India: Complete Guide 2026 — GrowMyBiz](https://www.growmybiz.in/local-seo-for-dentists-in-india/)
- [Dentist SEO Checklist: 35-Point Audit — GrowMyBiz](https://www.growmybiz.in/dentist-seo-checklist/)
- [Dental SEO: How Clinics and Dentists in India Rank on Google — BrightBrain](https://www.brightbraintech.com/blog/dental-seo-india-guide/)
- [Google Business Profile for Dentists — Banisoft](https://www.banisoft.com/local-seo-for-dentists/)
- [DPDP Act 2023: A Guide for Healthcare Providers in India — HealTether](https://blog.healtether.com/dpdp-act-2023/)
- [DPDPA Compliance for Healthcare & Hospitals — DPDPA.com](https://www.dpdpa.com/blogs/dpdpa_compliance_healthcare_hospitals_guide.html)
- [Informed Consent in Indian Hospitals Under the DPDP Act 2023 — LexCuriam](https://www.lexcuriam.com/blog/informed-consent-in-indian-hospitals-how-the-dpdp-act-2023-is-reshaping-healthcare-compliance)
- [28 Best Dentist Websites Design Examples 2026 — Colorlib](https://colorlib.com/wp/dentist-websites/)
