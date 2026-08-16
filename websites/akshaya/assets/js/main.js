/*
  main.js — first real consumer of content.js. Binds client data into the
  frame (header, rail, action bar, WhatsApp float, footer) via data-bind /
  data-cta attributes, per CONTENT-DATA.md §4's binding pattern. Nothing
  client-specific is hardcoded into markup — see CONVENTIONS.md §3.
*/
import { clinic, treatments } from "./content.js";

/* ---------- 1. derived values ---------- */

const telLink = `tel:${clinic.phone}`;

const pageContext = document.body.dataset.pageContext || document.title;
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
};

document.querySelectorAll("[data-bind]").forEach((el) => {
  const key = el.getAttribute("data-bind");
  if (bindings[key] !== undefined) el.textContent = bindings[key];
});

/* ---------- 3. CTA hrefs ---------- */

document.querySelectorAll('[data-cta="call"]').forEach((el) => (el.href = telLink));
document.querySelectorAll('[data-cta="whatsapp"]').forEach((el) => (el.href = waLink));
document.querySelectorAll('[data-cta="directions"]').forEach((el) => {
  if (clinic.address.mapsUrl && !clinic.address.mapsUrl.startsWith("MOCK")) {
    el.href = clinic.address.mapsUrl;
  }
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
   count is data-driven, same reasoning as motion.js's hero word-stagger. */

const treatmentsGrid = document.getElementById("treatmentsGrid");
if (treatmentsGrid) {
  const beamMark =
    '<svg class="treatment-card__mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<line x1="20" y1="2" x2="9" y2="13" /><circle cx="9" cy="13" r="3" /></svg>';

  treatmentsGrid.innerHTML = treatments
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((t, i) => {
      const delay = `${(i % 3) * 60}ms`;
      return `<a class="treatment-card" href="treatments/${t.slug}.html" data-laser="${t.isLaser}" data-reveal style="transition-delay: ${delay};">
        ${t.isLaser ? beamMark : ""}
        <h3 class="treatment-card__title">${t.name}</h3>
        <p class="treatment-card__desc">${t.summary}</p>
        <div class="treatment-card__footer">
          <span class="chip treatment-card__chip">${t.sittings} sittings</span>
          <span class="treatment-card__arrow" aria-hidden="true">&rarr;</span>
        </div>
      </a>`;
    })
    .join("");
}
