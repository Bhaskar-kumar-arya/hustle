# Demo Site Strategy for Bangalore Leads

## 1. The Core Strategy: One Site Per Niche

Each business niche gets its **own individually-designed demo site** — a dedicated site for dental clinics, a separate one for salons, another for interior designers, and so on. This is more relevant and convincing to each business owner than one generic template stretched across every niche.

Within a niche, the site is still reused across every lead: a single build serves any business in that niche via dynamic parameter injection, so there's no per-lead build step.

```
Incoming Lead Data (Name, Locality, Reviews, Phone, Niche)
                           ↓
        Niche's Deployed Demo Site (looked up by nicheId)
                           ↓
             Dynamic Parameter Injection (URL params)
                           ↓
           That Lead's Business Shown, Live (0s Build Time)
```

Each niche's site lives in its own subfolder under `public/demo/<niche>/` (e.g. `public/demo/dental/index.html`, `style.css`, `script.js`) — self-contained, no server calls, deployable as-is. Each folder deploys as its own **Netlify site** with its own domain, independent of the CRM/scraper app. `src/config/nicheDemoSites.js` maps each `nicheId` to its deployed base URL — that's the single place a niche gets "switched on" for outreach once its site is live.

---

## 2. Niche Build Status

| Niche | `nicheId` | Demo Site | Status |
| :--- | :--- | :--- | :--- |
| Dental Clinics & Orthodontists | `dental-clinics` | `public/demo/dental/` | ✅ Built — Netlify deploy pending (`DEMO_BASE_URL_DENTAL` not yet set) |
| Dermatologists & Cosmetology | `dermatology-skin` | — | Not started |
| Interior Designers & Architects | `interior-designers` | — | Not started |
| Luxury Salons & Bridal Makeup | `salons-spas` | — | Not started |
| Ayurvedic & Panchakarma Centers | `ayurveda-wellness` | — | Not started |
| Pet Clinics & Veterinary Hospitals | `pet-clinics` | — | Not started |
| Car Detailing & Ceramic Coating | `car-detailing` | — | Not started |
| Caterers & Event Planners | `wedding-caterers` | — | Not started |
| CA & Tax / Financial Consultants | `ca-tax-consultants` | — | Not started |
| Coaching Academies & Tuition Centers | `coaching-institutes` | — | Not started |
| Physiotherapy & Rehab Centers | `physiotherapy` | — | Not started |
| Fitness Studios, Yoga & CrossFit Gyms | `boutique-gyms` | — | Not started |

Full niche definitions (ticket value, search terms, pitch angle) live in `src/config/businessNiches.js`.

Leads in a niche with no built site still get scraped and CRM-tracked as usual — the pitch generator just falls back to asking "would you like a preview link?" instead of attaching a dead URL, until that niche's site ships.

---

## 3. Dynamic Data Mapping (How Any Lead Is Rendered)

When a prospect opens their niche's demo link, the site dynamically populates the following from the scraped Google Maps data via URL query params:

| Parameter | Source from Lead Data | Dynamic Presentation Value |
| :--- | :--- | :--- |
| **Business Title** | `lead.name` | Displayed as the primary brand across hero and footer |
| **Locality Anchor** | `lead.locality` | Displayed as *"Serving [Locality], Bengaluru"* |
| **Social Proof Badge** | `lead.rating` + `lead.reviewsCount` | Displayed as *"[Rating]★ Verified Rating on Google ([Reviews] Reviews)"* |
| **Direct Contact Action** | `lead.phone` | Auto-wires all "Book", "Call", and "WhatsApp" buttons to their own phone number |
| **Directions** | `lead.googleMapsUrl` | Wires the "Get Directions" CTA and embedded map to their real listing |

The dental site (`public/demo/dental/script.js`) is the reference implementation of this pattern — read it before building the next niche's site.

---

## 4. Wiring a New Niche's Site Into Outreach

1. Build the niche's static demo site under a new `public/demo/<niche>/` folder as `index.html` + `style.css` + `script.js`, following the dental site's param-binding pattern. Using `index.html` (not `<niche>.html`) means it deploys straight to the site root with no per-niche path config.
2. Deploy that folder to its own Netlify site (drag-and-drop at [app.netlify.com/drop](https://app.netlify.com/drop), or `netlify deploy --prod` from inside the folder).
3. Add an entry to `src/config/nicheDemoSites.js` for that `nicheId`, pointing at a new `DEMO_BASE_URL_<NICHE>` env var, `path: '/'`.
4. Add that same var to `.env` (and `.env.example` as a blank placeholder) with the live URL, then restart the server — it loads `.env` automatically via `dotenv`. The dashboard's preview buttons and every WhatsApp/Justdial pitch for that niche will now carry each lead's own live demo link automatically — see `PROJECT_CONTEXT.md` §6 for the full mechanics.

---

## 5. The Outreach & Closing Workflow

1. **The Teaser Pitch:** Send the lead a WhatsApp message referencing their strong Google reputation, with their live demo link attached directly (no separate ask-and-send step once the niche's site is deployed).
2. **The Dynamic Showcase:** When they click the link, they see their own brand name, area, and customer rating showcased on a functional mobile demo, on a site built specifically for their kind of business.
3. **The Loss Aversion Hook:** They immediately recognize that having this live under their own domain (`.in` / `.com`) will capture direct customers instead of losing them to competitors.
4. **Handoff & Monetization:** Once approved, buy the domain, connect it to the site, collect payment (₹15,000–₹40,000), and transfer ownership.
