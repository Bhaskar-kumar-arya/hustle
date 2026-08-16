/*
  schema.js — JSON-LD structured data (SESSION-PLAN.md §S11: Dentist,
  Physician, MedicalProcedure, FAQPage, BreadcrumbList, Article).

  Every field is read from content.js or from DOM text main.js has already
  bound, rather than duplicated as hardcoded JSON — CONVENTIONS §3's "single
  content.js edit" guarantee extends to structured data too. Load this after
  main.js on every page so bound text (breadcrumb labels, FAQ accordions,
  treatment/doctor/post templates) is in place before it's read back out.

  Where a field is still MOCK (registrationNo, hours, tagline, ...), the
  schema mirrors whatever's already visibly rendered on the page — never
  cleaner than the visible copy, which would read as cloaking to a crawler.
*/
import { clinic, treatments, doctors, blogPosts } from "./content.js";

function inject(id, data) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

const siteUrl = clinic.siteUrl.replace(/\/$/, "");
const pageUrl = siteUrl + location.pathname;
const dentistId = `${siteUrl}/#dentist`;

const treatmentSlug = document.body.dataset.treatmentSlug;
const activeTreatment = treatmentSlug ? treatments.find((t) => t.slug === treatmentSlug) : null;

const doctorSlug = document.body.dataset.doctorSlug;
const activeDoctor = doctorSlug ? doctors.find((d) => d.slug === doctorSlug) : null;

const postSlug = document.body.dataset.postSlug;
const activePost = postSlug ? blogPosts.find((p) => p.slug === postSlug) : null;

/* ---------- Dentist — every page ---------- */

const realSocial = Object.values(clinic.social).filter((url) => url && !url.startsWith("MOCK"));

inject("schema-dentist", {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": dentistId,
  name: clinic.name,
  url: `${siteUrl}/`,
  telephone: clinic.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address.line1,
    addressLocality: clinic.locality,
    addressRegion: clinic.state,
    postalCode: clinic.address.pincode,
    addressCountry: "IN",
  },
  geo:
    clinic.address.geo.lat && clinic.address.geo.lng
      ? { "@type": "GeoCoordinates", latitude: clinic.address.geo.lat, longitude: clinic.address.geo.lng }
      : undefined,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: clinic.rating,
    reviewCount: clinic.reviewCount,
  },
  openingHoursSpecification: clinic.hours
    .filter((h) => !h.closed)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.open,
      closes: h.close,
    })),
  sameAs: realSocial.length ? realSocial : undefined,
});

/* ---------- BreadcrumbList — every inner page ---------- */
/* Read straight from the .breadcrumb__list markup every inner page already
   carries (see contact.html etc.), rather than a second breadcrumb model. */

const breadcrumbList = document.querySelector(".breadcrumb__list");
if (breadcrumbList) {
  const items = Array.from(breadcrumbList.children)
    .map((li, i) => {
      const a = li.querySelector("a");
      const label = (a ? a.textContent : li.querySelector("span")?.textContent || "").trim();
      if (!label) return null;
      const url = a ? new URL(a.getAttribute("href"), `${siteUrl}/`).href.replace(/index\.html$/, "") : pageUrl;
      return { "@type": "ListItem", position: i + 1, name: label, item: url };
    })
    .filter(Boolean);

  if (items.length) {
    inject("schema-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items,
    });
  }
}

/* ---------- FAQPage — homepage + any treatment page with FAQs ---------- */
/* Homepage and treatment-page FAQ accordions both render the same .faq-item
   markup (main.js sections 14 and 16), so one query covers both. */

const faqItems = Array.from(document.querySelectorAll(".faq-item"));
if (faqItems.length) {
  const questions = faqItems
    .map((item) => {
      const q = item.querySelector(".faq-item__summary span")?.textContent.trim();
      const a = item.querySelector(".faq-item__content p")?.textContent.trim();
      if (!q || !a) return null;
      return { "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } };
    })
    .filter(Boolean);

  if (questions.length) {
    inject("schema-faqpage", { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: questions });
  }
}

/* ---------- MedicalProcedure — treatment pages ---------- */

if (activeTreatment) {
  const t = activeTreatment;
  inject("schema-medicalprocedure", {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: t.name,
    description: t.summary,
    url: pageUrl,
    howPerformed: t.steps.map((s) => s.desc).join(" "),
    followup: t.aftercare.join(" "),
    relevantSpecialty: { "@type": "MedicalSpecialty", name: "Dentistry" },
    performer: { "@id": dentistId },
  });
}

/* ---------- Physician — individual doctor pages ---------- */

if (activeDoctor) {
  const d = activeDoctor;
  inject("schema-physician", {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: d.name,
    url: pageUrl,
    medicalSpecialty: d.specialisation,
    identifier: d.registrationNo,
    worksFor: { "@id": dentistId },
  });
}

/* ---------- Article — blog posts ---------- */

if (activePost) {
  const p = activePost;
  inject("schema-article", {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.publishedDate,
    url: pageUrl,
    articleSection: p.category,
    author: { "@type": "Organization", name: clinic.name, "@id": dentistId },
    publisher: { "@type": "Organization", name: clinic.name, "@id": dentistId },
  });
}
