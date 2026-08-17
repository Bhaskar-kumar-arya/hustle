/*
  comparator.js — the Conventional/Laser procedure comparator (DESIGN-SYSTEM.md
  §6, the signature element). Real role="radiogroup", keyboard operable,
  aria-live announces state changes, instant swap under prefers-reduced-motion.
  Rows state procedure attributes only — see CONVENTIONS.md §1 before editing copy.
*/

const root = document.querySelector("[data-comparator]");

if (root) {
  const toggleBtns = Array.from(root.querySelectorAll('[role="radio"]'));
  const rows = Array.from(root.querySelectorAll("[data-row]"));
  const layers = Array.from(root.querySelectorAll("[data-illus]"));
  const live = root.querySelector("[data-comparator-live]");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setState = (state, { announce = true } = {}) => {
    root.dataset.state = state;

    toggleBtns.forEach((btn) => {
      const isActive = btn.dataset.value === state;
      btn.setAttribute("aria-checked", String(isActive));
      btn.tabIndex = isActive ? 0 : -1;
    });

    layers.forEach((layer) => {
      layer.classList.toggle("is-active", layer.dataset.illus === state);
    });

    rows.forEach((row) => {
      const valueEl = row.querySelector("[data-row-value]");
      if (!valueEl) return;
      const next = row.dataset[state];
      if (prefersReduced) {
        valueEl.textContent = next;
        return;
      }
      valueEl.style.transition = "opacity var(--duration-hover) var(--ease-reveal)";
      valueEl.style.opacity = "0";
      window.setTimeout(() => {
        valueEl.textContent = next;
        valueEl.style.opacity = "1";
      }, 160);
    });

    if (announce && live) {
      live.textContent = `Showing ${state === "laser" ? "laser" : "conventional"} procedure attributes.`;
    }

    // Only fires on a real user toggle — the initial setState() call below
    // passes announce: false, so mount doesn't count as a conversion event.
    if (announce) {
      document.dispatchEvent(new CustomEvent("comparator:toggle", { detail: { state } }));
    }
  };

  toggleBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.value !== root.dataset.state) setState(btn.dataset.value);
    });

    btn.addEventListener("keydown", (e) => {
      if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) return;
      e.preventDefault();
      const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
      const next = toggleBtns[(i + dir + toggleBtns.length) % toggleBtns.length];
      next.focus();
      setState(next.dataset.value);
    });
  });

  setState(root.dataset.state || "conventional", { announce: false });
}
