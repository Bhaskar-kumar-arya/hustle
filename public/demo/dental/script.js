(() => {
  "use strict";

  /* ---------- 1. read lead data from URL params ---------- */
  const params = new URLSearchParams(window.location.search);

  const digitsOnly = (s) => (s || "").replace(/[^\d]/g, "");
  const toIndianDialed = (raw) => {
    let d = digitsOnly(raw);
    if (!d) return "919876543210";
    if (d.length === 10) d = "91" + d;
    return d;
  };

  const data = {
    name: params.get("name") || "Smile Studio Dental Care",
    locality: params.get("locality") || "Koramangala",
    rating: params.get("rating") || "4.8",
    reviews: params.get("reviews") || "214",
    phone: toIndianDialed(params.get("phone")),
    address: params.get("address") || `${params.get("locality") || "Koramangala"}, Bengaluru`,
    mapsUrl: params.get("mapsUrl") || "",
  };

  const waMessage = `Hi ${data.name}, I found you on Google and would like to book an appointment.`;
  const waLink = `https://wa.me/${data.phone}?text=${encodeURIComponent(waMessage)}`;
  const telLink = `tel:+${data.phone}`;
  const mapsQuery = encodeURIComponent(`${data.name}, ${data.address}`);
  // Real scraped Google Maps place link (if we have one) is more precise than a text search.
  const directionsLink = data.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  // No API key needed — the classic "q=...&output=embed" form works for any business name + address.
  const mapEmbedSrc = `https://www.google.com/maps?q=${mapsQuery}&z=15&output=embed`;

  const phoneDisplay = (() => {
    const d = data.phone.startsWith("91") ? data.phone.slice(2) : data.phone;
    return d.length === 10 ? `+91 ${d.slice(0, 5)} ${d.slice(5)}` : `+${data.phone}`;
  })();

  /* ---------- 2. bind data into the DOM ---------- */
  const bindings = {
    name: data.name,
    localityLine: `Serving ${data.locality}, Bengaluru`,
    localityLine2: `Serving ${data.locality}, Bengaluru`,
    rating: data.rating,
    reviews: Number(digitsOnly(data.reviews)).toLocaleString("en-IN"),
    phoneDisplay,
    trustLine: `Gentle, modern dentistry in ${data.locality} — the kind of care your smile actually looks forward to.`,
    addressLine: data.address,
  };

  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (bindings[key] !== undefined) el.textContent = bindings[key];
  });

  document.title = `${data.name} — ${data.locality}, Bengaluru`;

  document.querySelectorAll('[data-cta="whatsapp"]').forEach((el) => (el.href = waLink));
  document.querySelectorAll('[data-cta="call"]').forEach((el) => (el.href = telLink));
  document.querySelectorAll('[data-cta="directions"]').forEach((el) => (el.href = directionsLink));

  const mapFrame = document.getElementById("locationMapFrame");
  if (mapFrame) mapFrame.src = mapEmbedSrc;

  document
    .querySelector('.stamp')
    ?.setAttribute("aria-label", `${data.rating} out of 5 stars, ${bindings.reviews} Google reviews`);

  /* ---------- 3. hero headline character stagger (word-safe) ---------- */
  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle) {
    const words = heroTitle.textContent.split(" ");
    heroTitle.textContent = "";
    heroTitle.classList.add("reveal-chars");
    let i = 0;
    words.forEach((word, wIdx) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word";
      [...word].forEach((ch) => {
        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.textContent = ch;
        charSpan.style.animationDelay = `${0.25 + i * 0.018}s`;
        wordSpan.appendChild(charSpan);
        i++;
      });
      heroTitle.appendChild(wordSpan);
      if (wIdx < words.length - 1) heroTitle.appendChild(document.createTextNode(" "));
    });
  }

  /* ---------- 4. scroll-reveal ---------- */
  const revealTargets = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-word");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 5. count-up stats ---------- */
  const countEls = document.querySelectorAll("[data-count], [data-count-bind]");
  countEls.forEach((el) => {
    const bindKey = el.getAttribute("data-count-bind");
    const target = bindKey
      ? Number(digitsOnly(bindings[bindKey] || "0"))
      : Number(el.getAttribute("data-count") || "0");
    const suffix = el.getAttribute("data-suffix") || "";
    el.dataset.target = target;
    el.dataset.suffix = suffix;
  });

  const runCount = (el) => {
    const target = Number(el.dataset.target || "0");
    const suffix = el.dataset.suffix || "";
    if (prefersReducedMotion || !target) {
      el.textContent = target.toLocaleString("en-IN") + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target).toLocaleString("en-IN") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCount(entry.target);
            countIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px 80px 0px" }
    );
    countEls.forEach((el) => countIo.observe(el));
  } else {
    countEls.forEach(runCount);
  }

  /* ---------- 6. before/after comparison slider ---------- */
  const baSlider = document.getElementById("baSlider");
  if (baSlider) {
    const setPos = (pct) => {
      const clamped = Math.min(100, Math.max(0, pct));
      baSlider.style.setProperty("--pos", `${clamped}%`);
      baSlider.setAttribute("aria-valuenow", Math.round(clamped));
    };

    const posFromClientX = (clientX) => {
      const rect = baSlider.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    };

    let dragging = false;

    const onPointerMove = (e) => {
      if (!dragging) return;
      setPos(posFromClientX(e.clientX));
    };
    const stopDrag = () => {
      dragging = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDrag);
    };

    baSlider.addEventListener("pointerdown", (e) => {
      dragging = true;
      setPos(posFromClientX(e.clientX));
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", stopDrag);
    });

    baSlider.addEventListener("keydown", (e) => {
      const current = Number(baSlider.getAttribute("aria-valuenow") || 50);
      if (e.key === "ArrowLeft") { setPos(current - 5); e.preventDefault(); }
      if (e.key === "ArrowRight") { setPos(current + 5); e.preventDefault(); }
      if (e.key === "Home") { setPos(0); e.preventDefault(); }
      if (e.key === "End") { setPos(100); e.preventDefault(); }
    });
  }

  /* ---------- 7. sticky mobile CTA reveal after hero ---------- */
  const stickyCta = document.getElementById("stickyCta");
  const hero = document.querySelector(".hero");
  if (stickyCta && hero && "IntersectionObserver" in window) {
    const heroIo = new IntersectionObserver(
      ([entry]) => {
        stickyCta.classList.toggle("visible", !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    heroIo.observe(hero);
  }
})();
