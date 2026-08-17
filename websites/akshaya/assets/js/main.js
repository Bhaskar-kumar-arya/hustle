/*
  main.js — first real consumer of content.js. Binds client data into the
  frame (header, rail, action bar, WhatsApp float, footer) via data-bind /
  data-cta attributes, per CONTENT-DATA.md §4's binding pattern. Nothing
  client-specific is hardcoded into markup — see CONVENTIONS.md §3.
*/
import { clinic, flags, treatments, doctors, equipment, sterilisation, reviews, faqs, alsoOffered, about, facility, patientInfo, blogPosts } from "./content.js";

/* ---------- 1. derived values ---------- */

const telLink = `tel:${clinic.phone}`;

// A fabricated-looking registration number (e.g. "MOCK-KA-00000") is worse
// than no number at all when a real dentist reviews the site — see
// CONTENT-DATA.md §3. Until the client supplies the real one, show a
// truthful placeholder instead of inventing digits.
const formatRegNo = (regNo) => (regNo ? `Reg. no. ${regNo}` : "Reg. no. on file at clinic");

const treatmentSlug = document.body.dataset.treatmentSlug;
const activeTreatment = treatmentSlug ? treatments.find((t) => t.slug === treatmentSlug) : null;

const doctorSlug = document.body.dataset.doctorSlug;
const activeDoctor = doctorSlug ? doctors.find((d) => d.slug === doctorSlug) : null;

const postSlug = document.body.dataset.postSlug;
const activePost = postSlug ? blogPosts.find((p) => p.slug === postSlug) : null;

const pageContext = document.body.dataset.pageContext || activeTreatment?.name || (activeDoctor ? activeDoctor.name : null) || (activePost ? activePost.title : null) || document.title;
const waMessage = `Hi ${clinic.name}, I'm reaching out about "${pageContext}" and would like to book a consultation.`;
const waLink = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(waMessage)}`;

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todayName = dayNames[new Date().getDay()];

/* ---------- 2. text bindings ---------- */

const bindings = {
  name: clinic.name,
  nameFull: clinic.nameFull,
  tagline: clinic.tagline,
  locality: clinic.locality,
  city: clinic.city,
  phoneDisplay: clinic.phoneDisplay,
  addressLine1: clinic.address.line1,
  addressLine2: clinic.address.line2,
  rating: clinic.rating,
  reviewCount: clinic.reviewCount.toLocaleString("en-IN"),
  parking: clinic.parking,
  languages: clinic.languages.join(", "),
  foundedYear: clinic.foundedYear,
  aboutStory: about.story,
  aboutPhilosophy: about.philosophy,
  email: clinic.email,
  // Reads as one sentence with or without an email address on file, so the
  // privacy-policy contact line needs no HTML edit when the client supplies one.
  emailSentence: clinic.email ? `, or write to us at ${clinic.email}` : "",
  emiNote: patientInfo.emiNote,
  insurance: patientInfo.insurance,
  emergency: patientInfo.emergency,
};

// A field the client hasn't supplied yet is null in content.js (email,
// parking, ...). Hide the element that binds it rather than rendering an empty
// line or a stub value — a visible placeholder makes a finished page read as a
// draft, see content.js's header note.
document.querySelectorAll("[data-bind]").forEach((el) => {
  const key = el.getAttribute("data-bind");
  const value = bindings[key];
  if (value === undefined) return;
  if (value === null || value === "") {
    el.hidden = true;
    return;
  }
  el.textContent = value;
});

/* ---------- 3. CTA hrefs ---------- */

document.querySelectorAll('[data-cta="call"]').forEach((el) => (el.href = telLink));
document.querySelectorAll('[data-cta="whatsapp"]').forEach((el) => (el.href = waLink));
document.querySelectorAll('[data-cta="directions"]').forEach((el) => {
  // mapsUrl is null until the Google Business Profile listing is confirmed;
  // until then the address itself is enough for Maps to resolve the clinic.
  el.href = clinic.address.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${clinic.name}, ${clinic.address.line1}, ${clinic.address.line2}`)}`;
});

/* ---------- 4. header: solid-on-scroll ---------- */

const header = document.querySelector(".site-header");

const updateHeaderScrollState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

if (header) {
  updateHeaderScrollState();
  window.addEventListener("scroll", updateHeaderScrollState, { passive: true });
}

/* ---------- 5. mobile overlay menu ---------- */

const hamburger = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("mobileMenuClose");

const setMenuOpen = (open) => {
  if (!hamburger || !mobileMenu) return;
  hamburger.setAttribute("aria-expanded", String(open));
  mobileMenu.classList.toggle("is-open", open);
  mobileMenu.hidden = !open;
  document.body.style.overflow = open ? "hidden" : "";
  if (open) {
    mobileMenu.querySelector("a")?.focus();
  } else {
    hamburger.focus();
  }
};

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => setMenuOpen(hamburger.getAttribute("aria-expanded") !== "true"));
  menuClose?.addEventListener("click", () => setMenuOpen(false));
  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenuOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && hamburger.getAttribute("aria-expanded") === "true") setMenuOpen(false);
  });
}

/* ---------- 6. rail + progress line ---------- */

const railLabel = document.querySelector(".rail__label");
const railFill = document.querySelector(".rail__fill");
const progressFill = document.querySelector(".progress-line__fill");
const railSections = document.querySelectorAll("[data-rail-label]");

const updateScrollProgress = () => {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  const pct = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
  if (railFill) railFill.style.height = `${pct}%`;
  if (progressFill) progressFill.style.width = `${pct}%`;
};

if (railFill || progressFill) {
  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);
}

if (railLabel && railSections.length && "IntersectionObserver" in window) {
  const sectionIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) railLabel.textContent = entry.target.getAttribute("data-rail-label");
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  railSections.forEach((el) => sectionIo.observe(el));
}

/* ---------- 7. footer: treatments + hours from content.js ---------- */

const footerTreatments = document.getElementById("footerTreatments");
if (footerTreatments) {
  footerTreatments.innerHTML = treatments
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((t) => `<li><a href="/treatments/${t.slug}.html">${t.name}</a></li>`)
    .join("");
}

const footerHours = document.getElementById("footerHours");
if (footerHours) {
  footerHours.innerHTML = clinic.hours
    .map((h) => {
      const isToday = h.day === todayName;
      const time = h.closed ? "Closed" : `${h.open}–${h.close}`;
      return `<li data-today="${isToday}"><span>${h.day}</span><span>${time}</span></li>`;
    })
    .join("");
}

/* ---------- 8. sticky action bar ---------- */
/* Per DESIGN-SYSTEM §6 the bar is always present below 768px via CSS media
   query; no scroll-triggered reveal needed here. */

/* ---------- 9. two pillars (homepage) ---------- */
/* Panels pull straight from content.js's treatments entries for
   dental-implants / gum-treatment, so the positioning copy and the grid
   card below it never drift out of sync — single source, CONVENTIONS §3. */

const pillarsGrid = document.getElementById("pillarsGrid");
if (pillarsGrid) {
  const pillarSlugs = ["dental-implants", "gum-treatment"];
  const pillarLabel = { "dental-implants": "Implants", "gum-treatment": "Gum & periodontal" };

  pillarsGrid.innerHTML = pillarSlugs
    .map((slug, i) => {
      const t = treatments.find((tr) => tr.slug === slug);
      if (!t) return "";
      const delay = `${i * 80}ms`;
      return `<a class="pillar-panel" href="treatments/${t.slug}.html" data-reveal style="transition-delay: ${delay};">
        <span class="pillar-panel__eyebrow mono-label">${pillarLabel[slug]}</span>
        <h3 class="pillar-panel__title">${t.name}</h3>
        <p class="pillar-panel__desc">${t.summary}</p>
        <span class="pillar-panel__link">Learn more <span aria-hidden="true">&rarr;</span></span>
      </a>`;
    })
    .join("");
}

/* ---------- 10. treatments grid (homepage) ---------- */
/* Laser-first ordering comes straight from content.js's `order` field —
   laser treatments are already 1-3. Cards carry data-reveal for motion.js's
   scroll-reveal observer; per-card stagger is set inline here since the card
   count is data-driven, same reasoning as motion.js's hero word-stagger.
   treatmentCardHtml() is shared with the treatments hub (section 17) so the
   card markup can't drift between the two places it's generated. */

const beamMark =
  '<svg class="treatment-card__mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<line x1="20" y1="2" x2="9" y2="13" /><circle cx="9" cy="13" r="3" /></svg>';

function treatmentCardHtml(t, hrefPrefix, delay) {
  return `<a class="treatment-card" href="${hrefPrefix}${t.slug}.html" data-laser="${t.isLaser}" data-reveal style="transition-delay: ${delay};">
    ${t.isLaser ? beamMark : ""}
    <h3 class="treatment-card__title">${t.name}</h3>
    <p class="treatment-card__desc">${t.summary}</p>
    <div class="treatment-card__footer">
      <span class="chip treatment-card__chip">${t.sittings} sittings</span>
      <span class="treatment-card__arrow" aria-hidden="true">&rarr;</span>
    </div>
  </a>`;
}

const treatmentsGrid = document.getElementById("treatmentsGrid");
if (treatmentsGrid) {
  treatmentsGrid.innerHTML = treatments
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((t, i) => treatmentCardHtml(t, "treatments/", `${(i % 3) * 60}ms`))
    .join("");
}

/* ---------- 11. meet the dentists (homepage) ---------- */
/* Dr. Sampath (isPrincipal) renders the wider --principal card variant with
   a bio; associates use the standard card. Registration number is shown for
   every doctor — never a years-of-experience figure, see CONVENTIONS §1. */

const doctorsGrid = document.getElementById("doctorsGrid");
if (doctorsGrid) {
  doctorsGrid.innerHTML = doctors
    .map((d, i) => {
      const variant = d.isPrincipal ? " doctor-card--principal" : "";
      const delay = `${i * 60}ms`;
      const bio = d.isPrincipal ? `<p class="doctor-card__bio">${d.bio}</p>` : "";
      return `<article class="doctor-card${variant}" data-reveal style="transition-delay: ${delay};">
        <div class="doctor-card__photo placeholder-block" role="img" aria-label="Portrait of ${d.name}">
          <span class="mono-label">Photo: ${d.name}</span>
        </div>
        <div class="doctor-card__body">
          <h3 class="doctor-card__name">${d.name}</h3>
          <p class="doctor-card__degrees mono-label">${d.degrees} — ${d.specialisation}</p>
          ${bio}
          <p class="doctor-card__reg mono-label">${formatRegNo(d.registrationNo)}</p>
        </div>
      </article>`;
    })
    .join("");
}

/* ---------- 12. technology & sterilisation (homepage) ---------- */

const equipmentGrid = document.getElementById("equipmentGrid");
if (equipmentGrid) {
  equipmentGrid.innerHTML = equipment
    .map((e, i) => {
      const delay = `${(i % 4) * 60}ms`;
      return `<div class="equipment-card" data-reveal style="transition-delay: ${delay};">
        <div class="equipment-card__photo placeholder-block" role="img" aria-label="${e.name}">
          <span class="mono-label">Photo: ${e.name}</span>
        </div>
        <h3 class="equipment-card__name">${e.name}</h3>
        <p class="equipment-card__benefit">${e.benefit}</p>
      </div>`;
    })
    .join("");
}

const sterilisationList = document.getElementById("sterilisationList");
if (sterilisationList) {
  sterilisationList.innerHTML = sterilisation
    .map((s, i) => {
      const delay = `${(i % 4) * 60}ms`;
      return `<li class="sterilisation-list__item" data-reveal style="transition-delay: ${delay};">
        <svg class="sterilisation-list__mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 12.5 9.5 18 20 6" />
        </svg>
        <span>${s}</span>
      </li>`;
    })
    .join("");
}

/* ---------- 13. patient stories (homepage) ---------- */
/* Static review cards from content.js act as the fallback for the live
   Google reviews embed — no embed API is wired into this static build yet. */

const reviewsGrid = document.getElementById("reviewsGrid");
if (reviewsGrid) {
  reviewsGrid.innerHTML = reviews
    .map((r, i) => {
      const delay = `${(i % 3) * 60}ms`;
      const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
      return `<div class="review-card" data-reveal style="transition-delay: ${delay};">
        <p class="review-card__stars" aria-label="${r.rating} out of 5 stars">${stars}</p>
        <p class="review-card__text">${r.text}</p>
        <p class="review-card__author mono-label">${r.author}</p>
      </div>`;
    })
    .join("");
}

/* ---------- 14. visiting the clinic (homepage) ---------- */

const visitingHours = document.getElementById("visitingHours");
if (visitingHours) {
  visitingHours.innerHTML = clinic.hours
    .map((h) => {
      const isToday = h.day === todayName;
      const time = h.closed ? "Closed" : `${h.open}–${h.close}`;
      return `<li data-today="${isToday}"><span>${h.day}</span><span>${time}</span></li>`;
    })
    .join("");
}

/* ---------- 15. questions — FAQ accordion (homepage) ---------- */

const faqAccordion = document.getElementById("faqAccordion");
if (faqAccordion) {
  faqAccordion.innerHTML = faqs
    .map(
      (f) => `<details class="faq-item">
        <summary class="faq-item__summary">
          <span>${f.q}</span>
          <span class="faq-item__icon" aria-hidden="true"></span>
        </summary>
        <div class="faq-item__content"><div class="faq-item__content-inner"><p>${f.a}</p></div></div>
      </details>`
    )
    .join("");
}

/* ---------- 16. treatment page template (S6) ---------- */
/* Runs only on pages carrying data-treatment-slug on <body>. Every treatment
   field comes from content.js via activeTreatment (derived in section 1) —
   section eyebrows/headings are static page copy, same split as the
   homepage's own sections (data-bound entities, hand-written headings). */

if (activeTreatment) {
  const t = activeTreatment;

  document.querySelectorAll("[data-bind-treatment='name']").forEach((el) => (el.textContent = t.name));
  document.querySelectorAll("[data-bind-treatment='h1']").forEach((el) => (el.textContent = `${t.name} in ${clinic.locality}, ${clinic.city}`));
  document.querySelectorAll("[data-bind-treatment='lead']").forEach((el) => (el.textContent = t.summary));
  document.querySelectorAll("[data-bind-treatment='sittings']").forEach((el) => (el.textContent = t.sittings));
  document.querySelectorAll("[data-bind-treatment='duration']").forEach((el) => (el.textContent = t.duration));

  const signsList = document.getElementById("signsList");
  if (signsList && t.signs.length) {
    signsList.innerHTML = t.signs
      .map((s) => `<li class="signs-list__item"><span class="signs-list__mark" aria-hidden="true"></span><span>${s}</span></li>`)
      .join("");
  }

  const stepList = document.getElementById("stepProcessList");
  if (stepList && t.steps.length) {
    stepList.innerHTML = t.steps
      .map((s, i) => {
        const index = String(i + 1).padStart(2, "0");
        const delay = `${i * 60}ms`;
        return `<li class="step-process__item" data-reveal style="transition-delay: ${delay};">
          <span class="step-process__index mono-label">${index}</span>
          <div class="step-process__body">
            <h3 class="step-process__title">${s.title}</h3>
            <p class="step-process__desc">${s.desc}</p>
          </div>
        </li>`;
      })
      .join("");
  }

  const dataBlockSittings = document.getElementById("dataBlockSittings");
  if (dataBlockSittings) dataBlockSittings.textContent = t.sittings;
  const dataBlockDuration = document.getElementById("dataBlockDuration");
  if (dataBlockDuration) dataBlockDuration.textContent = t.duration;

  const costBlockSection = document.getElementById("costBlockSection");
  if (costBlockSection && flags.showPricing && t.costRange) {
    costBlockSection.hidden = false;
    const range = document.getElementById("costBlockRange");
    if (range) {
      const min = t.costRange.min.toLocaleString("en-IN");
      const max = t.costRange.max.toLocaleString("en-IN");
      range.textContent = `₹${min}–₹${max} ${t.costRange.unit}`;
    }
    const emi = document.getElementById("costBlockEmi");
    if (emi) emi.textContent = t.costRange.emi ? "EMI options available." : "";
  }

  const aftercareList = document.getElementById("aftercareList");
  if (aftercareList && t.aftercare.length) {
    aftercareList.innerHTML = t.aftercare
      .map(
        (a) => `<li class="sterilisation-list__item">
          <svg class="sterilisation-list__mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12.5 9.5 18 20 6" /></svg>
          <span>${a}</span>
        </li>`
      )
      .join("");
  }

  const treatmentFaqAccordion = document.getElementById("treatmentFaqAccordion");
  if (treatmentFaqAccordion && t.faqs.length) {
    treatmentFaqAccordion.innerHTML = t.faqs
      .map(
        (f) => `<details class="faq-item">
          <summary class="faq-item__summary">
            <span>${f.q}</span>
            <span class="faq-item__icon" aria-hidden="true"></span>
          </summary>
          <div class="faq-item__content"><div class="faq-item__content-inner"><p>${f.a}</p></div></div>
        </details>`
      )
      .join("");
  }

  const performingDoctor = doctors.find((d) => d.treatments.includes(t.slug)) || doctors.find((d) => d.isPrincipal);
  const credentialName = document.getElementById("credentialName");
  if (credentialName && performingDoctor) {
    credentialName.textContent = performingDoctor.name;
    document.getElementById("credentialDegrees").textContent = `${performingDoctor.degrees} — ${performingDoctor.specialisation}`;
    document.getElementById("credentialReg").textContent = formatRegNo(performingDoctor.registrationNo);
    document.getElementById("credentialPhotoLabel").textContent = `Photo: ${performingDoctor.name}`;
  }

  const relatedList = document.getElementById("relatedTreatmentsList");
  if (relatedList && t.related.length) {
    relatedList.innerHTML = t.related
      .map((slug) => treatments.find((rt) => rt.slug === slug))
      .filter(Boolean)
      .map((rt) => `<a class="related-treatments__link" href="/treatments/${rt.slug}.html">${rt.name} <span aria-hidden="true">&rarr;</span></a>`)
      .join("");
  }
}

/* ---------- 17. treatments hub (S7) ---------- */
/* Groups aren't a content.js field — CONTENT-DATA §4 has no pillar model —
   so the grouping itself is page structure, same reasoning as the homepage
   pillar panels (S4b). Each group's cards are still generated from
   content.js via the shared treatmentCardHtml() helper, so treatment copy
   can't drift from the homepage grid or the pages themselves. */

const treatmentsHubGrid = document.getElementById("treatmentsHubGrid");
if (treatmentsHubGrid) {
  const groups = [
    { label: "Implants", slugs: ["dental-implants"] },
    { label: "Gum & periodontal care", slugs: ["gum-treatment", "laser-gingivoplasty"] },
    { label: "Root canal", slugs: ["root-canal", "laser-rct"] },
    { label: "The laser method", slugs: ["laser-dentistry"] },
    { label: "General & family dentistry", slugs: ["crowns-and-bridges", "dental-restoration", "braces-and-aligners", "teeth-whitening", "kids-dentistry"] },
  ];

  treatmentsHubGrid.innerHTML = groups
    .map((group) => {
      const cards = group.slugs
        .map((slug) => treatments.find((t) => t.slug === slug))
        .filter(Boolean)
        .sort((a, b) => a.order - b.order)
        .map((t, i) => treatmentCardHtml(t, "/treatments/", `${(i % 3) * 60}ms`))
        .join("");
      return `<div class="treatments-hub__group" data-reveal>
        <h3 class="treatments-hub__group-label">${group.label}</h3>
        <div class="treatments__grid">${cards}</div>
      </div>`;
    })
    .join("");
}

const alsoOfferedList = document.getElementById("alsoOfferedList");
if (alsoOfferedList) {
  alsoOfferedList.innerHTML = alsoOffered.map((item) => `<li class="chip">${item}</li>`).join("");
}

/* ---------- 18. about page — facility grid (S8) ---------- */
/* Story/philosophy text bind via the generic [data-bind] pass (section 2);
   only the facility photo grid needs its own generator here. */

const facilityGrid = document.getElementById("facilityGrid");
if (facilityGrid) {
  facilityGrid.innerHTML = facility
    .map((f, i) => {
      const delay = `${(i % 2) * 60}ms`;
      return `<div class="facility-grid__photo placeholder-block" role="img" aria-label="${f.label}" data-reveal style="transition-delay: ${delay};">
        <span class="mono-label">Photo: ${f.label}</span>
      </div>`;
    })
    .join("");
}

/* ---------- 19. team page — full doctor grid (S8) ---------- */
/* Same card markup as the homepage's #doctorsGrid (section 11), plus a
   "View profile" link per doctor when flags.showDoctorPages is true —
   points at the individual doctor page built in section 20. */

const teamGrid = document.getElementById("teamGrid");
if (teamGrid) {
  teamGrid.innerHTML = doctors
    .map((d, i) => {
      const variant = d.isPrincipal ? " doctor-card--principal" : "";
      const delay = `${i * 60}ms`;
      const bio = d.isPrincipal ? `<p class="doctor-card__bio">${d.bio}</p>` : "";
      const profileLink = flags.showDoctorPages ? `<a class="doctor-card__link" href="/team/${d.slug}.html">View profile &rarr;</a>` : "";
      return `<article class="doctor-card${variant}" data-reveal style="transition-delay: ${delay};">
        <div class="doctor-card__photo placeholder-block" role="img" aria-label="Portrait of ${d.name}">
          <span class="mono-label">Photo: ${d.name}</span>
        </div>
        <div class="doctor-card__body">
          <h3 class="doctor-card__name">${d.name}</h3>
          <p class="doctor-card__degrees mono-label">${d.degrees} — ${d.specialisation}</p>
          ${bio}
          <p class="doctor-card__reg mono-label">${formatRegNo(d.registrationNo)}</p>
          ${profileLink}
        </div>
      </article>`;
    })
    .join("");
}

/* ---------- 20. individual doctor page template (S8) ---------- */
/* Runs only on pages carrying data-doctor-slug on <body>, mirroring the
   treatment-page template pattern (section 16) — every field comes from
   content.js via activeDoctor (derived in section 1). */

if (activeDoctor) {
  const d = activeDoctor;

  document.querySelectorAll("[data-bind-doctor='name']").forEach((el) => (el.textContent = d.name));
  document.querySelectorAll("[data-bind-doctor='degrees']").forEach((el) => (el.textContent = `${d.degrees} — ${d.specialisation}`));
  document.querySelectorAll("[data-bind-doctor='reg']").forEach((el) => (el.textContent = formatRegNo(d.registrationNo)));
  document.querySelectorAll("[data-bind-doctor='bio']").forEach((el) => (el.textContent = d.bio));
  document.querySelectorAll("[data-bind-doctor='photo-label']").forEach((el) => (el.textContent = `Photo: ${d.name}`));

  const doctorTreatmentsList = document.getElementById("doctorTreatmentsList");
  if (doctorTreatmentsList && d.treatments.length) {
    doctorTreatmentsList.innerHTML = d.treatments
      .map((slug) => treatments.find((t) => t.slug === slug))
      .filter(Boolean)
      .map((t) => `<a class="related-treatments__link" href="/treatments/${t.slug}.html">${t.name} <span aria-hidden="true">&rarr;</span></a>`)
      .join("");
  }
}

/* ---------- 21. technology page — sterilisation workflow (S8) ---------- */
/* Reuses the generic .step-process component (CONVENTIONS §5 — the only
   other place numbering is allowed on the site) to present the same
   sterilisation[] strings the homepage renders as a checklist, but as an
   ordered workflow. Not a second data shape — same array, different view. */

const sterilisationSteps = document.getElementById("sterilisationSteps");
if (sterilisationSteps) {
  sterilisationSteps.innerHTML = sterilisation
    .map((s, i) => {
      const index = String(i + 1).padStart(2, "0");
      const delay = `${i * 60}ms`;
      return `<li class="step-process__item" data-reveal style="transition-delay: ${delay};">
        <span class="step-process__index mono-label">${index}</span>
        <div class="step-process__body">
          <p class="step-process__title">${s}</p>
        </div>
      </li>`;
    })
    .join("");
}

/* ---------- 22. patient information page (S9) ---------- */
/* Reuses .sterilisation-list__item (the generic checkmark-list component,
   see S6's Carried-forward note on that class name) for firstVisit/
   whatToBring/payment — same pattern as every other "flat list of facts"
   used across the site so far. */

const checkMark =
  '<svg class="sterilisation-list__mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12.5 9.5 18 20 6" /></svg>';

function checklistHtml(items) {
  return items.map((item) => `<li class="sterilisation-list__item" data-reveal>${checkMark}<span>${item}</span></li>`).join("");
}

const firstVisitList = document.getElementById("firstVisitList");
if (firstVisitList) firstVisitList.innerHTML = checklistHtml(patientInfo.firstVisit);

const whatToBringList = document.getElementById("whatToBringList");
if (whatToBringList) whatToBringList.innerHTML = checklistHtml(patientInfo.whatToBring);

const paymentList = document.getElementById("paymentList");
if (paymentList) paymentList.innerHTML = checklistHtml(patientInfo.payment);

/* ---------- 23. booking form — treatment interest options (S9) ---------- */
/* Options are generated from treatments[] rather than hand-written, so the
   dropdown can't drift out of sync with the treatments the clinic actually
   offers. Validation/submit behaviour lives in form.js. */

const bookingTreatmentSelect = document.getElementById("bookingTreatment");
if (bookingTreatmentSelect) {
  const options = treatments
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((t) => `<option value="${t.slug}">${t.name}</option>`)
    .join("");
  bookingTreatmentSelect.insertAdjacentHTML("beforeend", options + '<option value="not-sure">Not sure yet</option>');
}

/* ---------- 24. blog index (S10) ---------- */
/* Cards generated from blogPosts, newest first. Cover photo is a labelled
   16:9 placeholder, per CONTENT-DATA §7. */

function formatPostDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

const blogGrid = document.getElementById("blogGrid");
if (blogGrid) {
  blogGrid.innerHTML = blogPosts
    .slice()
    .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
    .map((p, i) => {
      const delay = `${(i % 3) * 60}ms`;
      return `<a class="blog-card" href="/blog/${p.slug}.html" data-reveal style="transition-delay: ${delay};">
        <div class="blog-card__photo placeholder-block" role="img" aria-label="${p.coverLabel}">
          <span class="mono-label">Photo: ${p.coverLabel}</span>
        </div>
        <span class="chip blog-card__category">${p.category}</span>
        <h3 class="blog-card__title">${p.title}</h3>
        <p class="blog-card__excerpt">${p.excerpt}</p>
        <p class="blog-card__meta mono-label">${formatPostDate(p.publishedDate)} &middot; ${p.readTime}</p>
      </a>`;
    })
    .join("");
}

/* ---------- 25. blog post template (S10) ---------- */
/* Runs only on pages carrying data-post-slug on <body>, mirroring the
   treatment/doctor page template pattern (sections 16/20). Body sections are
   generated from activePost.body (derived in section 1), and the same array
   drives the rail's table of contents on desktop — a second IntersectionObserver
   (distinct from motion.js's scroll-reveal one) tracks which heading is in
   view and toggles .is-active on the matching TOC link. */

if (activePost) {
  const p = activePost;

  document.querySelectorAll("[data-bind-post='title']").forEach((el) => (el.textContent = p.title));
  document.querySelectorAll("[data-bind-post='category']").forEach((el) => (el.textContent = p.category));

  const postDate = document.getElementById("postDate");
  if (postDate) postDate.textContent = formatPostDate(p.publishedDate);

  const postReadTime = document.getElementById("postReadTime");
  if (postReadTime) postReadTime.textContent = p.readTime;

  const postCoverLabel = document.getElementById("postCoverLabel");
  if (postCoverLabel) postCoverLabel.textContent = `Photo: ${p.coverLabel}`;
  const postCover = document.getElementById("postCover");
  if (postCover) postCover.setAttribute("aria-label", p.coverLabel);

  const postBody = document.getElementById("postBody");
  if (postBody && p.body.length) {
    postBody.innerHTML = p.body
      .map(
        (section) => `<section class="post__section" id="${section.id}" data-reveal>
          <h2 class="post__heading" data-reveal>${section.heading}</h2>
          ${section.paragraphs.map((para) => `<p class="post__paragraph" data-reveal>${para}</p>`).join("")}
        </section>`
      )
      .join("");
  }

  const postToc = document.getElementById("postToc");
  if (postToc && p.body.length) {
    postToc.innerHTML = p.body.map((section) => `<a class="rail__toc-link" href="#${section.id}">${section.heading}</a>`).join("");

    if ("IntersectionObserver" in window) {
      const headingIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const link = postToc.querySelector(`.rail__toc-link[href="#${entry.target.id}"]`);
            if (link) link.classList.toggle("is-active", entry.isIntersecting);
          });
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      p.body.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) headingIo.observe(el);
      });
    }
  }
}
