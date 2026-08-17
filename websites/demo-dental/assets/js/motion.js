/*
  motion.js — the page-load sequence (DESIGN-SYSTEM.md §8, 5 beats over ~900ms)
  and the reusable IntersectionObserver reveal utility later sessions call for
  scroll-triggered section reveals. Runs after main.js so data-bind text is
  already in place before the heading gets split into words. See CONVENTIONS.md §6.
*/

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- word-stagger split for the hero heading (beat 2) ---------- */

function splitIntoWords(heading) {
  if (!heading || heading.dataset.split === "true") return;
  const words = heading.textContent.trim().split(/\s+/);
  heading.textContent = "";
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.className = "load-word";
    span.style.transitionDelay = `${120 + i * 40}ms`;
    span.textContent = word;
    heading.appendChild(span);
    if (i < words.length - 1) heading.appendChild(document.createTextNode(" "));
  });
  heading.dataset.split = "true";
}

splitIntoWords(document.querySelector("[data-load='heading']"));

/* ---------- trigger the load sequence (beats gated in sections.css) ---------- */

const html = document.documentElement;
requestAnimationFrame(() => requestAnimationFrame(() => html.classList.add("motion-ready")));

/* ---------- reusable scroll-reveal observer ---------- */

export function initScrollReveal(selector = "[data-reveal]") {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  els.forEach((el) => io.observe(el));
}

initScrollReveal();
