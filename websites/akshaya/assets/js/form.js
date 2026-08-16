/*
  form.js — the four-field booking form (name, phone, treatment interest,
  preferred day). Runs only on pages carrying #bookingForm. Validates inline
  with real <label>s and aria-describedby, per CONVENTIONS.md §7.

  S11 wires the real handler: Netlify Forms (see the hidden form-name/
  netlify-honeypot fields contact.html now carries, per PROJECT-BRIEF §6's
  "Netlify or Cloudflare Pages" hosting call) via a plain fetch POST, so a
  submission works the moment this site is deployed on Netlify with no other
  backend code. Netlify's own notification settings are the way to get an
  email/Slack alert per submission (dashboard config, not something this
  static build can do). The WhatsApp "notification path" SESSION-PLAN.md
  also names is built as a second, always-available route: on a successful
  submit, the confirmation panel offers a WhatsApp button pre-filled with the
  submitted details, so the clinic sees the request immediately even before
  a Netlify email notification arrives.
*/
import { clinic } from "./content.js";
import { trackEvent } from "./analytics.js";

const form = document.getElementById("bookingForm");

if (form) {
  const dayInput = document.getElementById("bookingDay");
  if (dayInput) {
    const today = new Date().toISOString().split("T")[0];
    dayInput.min = today;
  }

  const fields = [
    {
      input: document.getElementById("bookingName"),
      error: document.getElementById("bookingNameError"),
      validate: (v) => v.trim().length >= 2,
      message: "Enter your name.",
    },
    {
      input: document.getElementById("bookingPhone"),
      error: document.getElementById("bookingPhoneError"),
      validate: (v) => /^[6-9]\d{9}$/.test(v.replace(/[^0-9]/g, "").slice(-10)) && v.replace(/[^0-9]/g, "").length >= 10,
      message: "Enter a valid 10-digit phone number.",
    },
    {
      input: document.getElementById("bookingTreatment"),
      error: document.getElementById("bookingTreatmentError"),
      validate: (v) => v !== "",
      message: "Choose a treatment.",
    },
    {
      input: document.getElementById("bookingDay"),
      error: document.getElementById("bookingDayError"),
      validate: (v) => v !== "",
      message: "Choose a preferred day.",
    },
  ];

  const consent = document.getElementById("bookingConsent");
  const consentError = document.getElementById("bookingConsentError");

  function validateField(field) {
    const valid = field.validate(field.input.value);
    field.input.setAttribute("aria-invalid", String(!valid));
    if (field.error) field.error.textContent = valid ? "" : field.message;
    return valid;
  }

  fields.forEach((field) => {
    if (!field.input) return;
    field.input.addEventListener("blur", () => validateField(field));
  });

  const submitBtn = form.querySelector('button[type="submit"]');
  const submitError = document.getElementById("bookingSubmitError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fieldResults = fields.map(validateField);

    const consentValid = !!consent?.checked;
    if (consentError) consentError.textContent = consentValid ? "" : "Consent is required to submit this form.";

    const allValid = fieldResults.every(Boolean) && consentValid;

    if (!allValid) {
      const firstInvalid = fields.find((f) => f.input && f.input.getAttribute("aria-invalid") === "true");
      (firstInvalid ? firstInvalid.input : consent)?.focus();
      return;
    }

    if (submitError) submitError.textContent = "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }

    const data = new FormData(form);
    const treatmentLabel = form.querySelector("#bookingTreatment")?.selectedOptions[0]?.textContent || data.get("treatment");

    try {
      // Netlify Forms: a plain POST of the form's own fields to "/" is all a
      // form with data-netlify="true" in the deployed static HTML needs —
      // no other backend code. See CONTENT-DATA.md Open question #8 (email
      // for notifications) and the file-header note above.
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error(`Form submission failed: ${res.status}`);

      trackEvent("form_submit");

      const waLink = document.getElementById("bookingConfirmationWhatsapp");
      if (waLink) {
        const message = [
          `Hi ${clinic.name}, I just requested a consultation on the site.`,
          `Name: ${data.get("name")}`,
          `Phone: ${data.get("phone")}`,
          `Treatment: ${treatmentLabel}`,
          `Preferred day: ${data.get("day")}`,
        ].join("\n");
        waLink.href = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
      }

      const confirmation = document.getElementById("bookingConfirmation");
      if (confirmation) {
        form.hidden = true;
        confirmation.hidden = false;
        confirmation.focus();
      }
    } catch (err) {
      if (submitError) {
        submitError.textContent = "Something went wrong sending this — call or WhatsApp the clinic directly instead.";
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Request a consultation";
      }
    }
  });
}
