/*
  analytics.js — GA4 loading + the five conversion events named in
  SESSION-PLAN.md §S11 (whatsapp_click, call_click, form_submit,
  directions_click, comparator_toggle). Runs on every page, after main.js so
  the CTA elements it listens on already have their real hrefs bound.

  gtag.js is only loaded when content.js's analytics.ga4MeasurementId is a
  real "G-" property — the MOCK placeholder never triggers a network call,
  so the build stays dependency-free until the client provides a real ID.
*/
import { analytics } from "./content.js";

const isConfigured = /^G-/.test(analytics.ga4MeasurementId);

if (isConfigured) {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.ga4MeasurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", analytics.ga4MeasurementId);
}

export function trackEvent(name, params = {}) {
  if (isConfigured && typeof window.gtag === "function") {
    window.gtag("event", name, { page_path: location.pathname, ...params });
  }
}

document.querySelectorAll('[data-cta="call"]').forEach((el) => el.addEventListener("click", () => trackEvent("call_click")));
document.querySelectorAll('[data-cta="whatsapp"]').forEach((el) => el.addEventListener("click", () => trackEvent("whatsapp_click")));
document.querySelectorAll('[data-cta="directions"]').forEach((el) => el.addEventListener("click", () => trackEvent("directions_click")));

// Dispatched by comparator.js on a real user toggle (not the initial mount) —
// kept as a DOM event rather than a direct import so comparator.js, the
// signature/highest-risk component, doesn't take on an analytics dependency.
document.addEventListener("comparator:toggle", (e) => trackEvent("comparator_toggle", { state: e.detail.state }));
