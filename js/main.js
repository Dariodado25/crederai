// Crederai — script principale
// Nav mobile, cookie banner con consenso GA4, honeypot form

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // ---------- Nav mobile ----------
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  function closeNav() {
    if (links && links.classList.contains("open")) {
      links.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
  }
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  // ---------- Scroll reveal ----------
  // Applica l'animazione di ingresso a card e step senza toccare l'HTML.
  if ("IntersectionObserver" in window) {
    var revealTargets = document.querySelectorAll(".card, .project-card, .step, .stats > div");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min(i % 3 * 80, 240) + "ms";
      observer.observe(el);
    });
  }

  // ---------- Cookie banner + GA4 consent mode ----------
  // GA4 viene caricato SOLO dopo consenso esplicito (GDPR).
  // Sostituire G-XXXXXXXXXX con il Measurement ID reale.
  var GA_ID = "G-XXXXXXXXXX";
  var CONSENT_KEY = "crederai-consent";

  function loadGA() {
    if (GA_ID === "G-XXXXXXXXXX") return; // ID non ancora configurato
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("config", GA_ID, { anonymize_ip: true });
  }

  var banner = document.getElementById("cookie-banner");
  var consent = null;
  try { consent = localStorage.getItem(CONSENT_KEY); } catch (e) {}

  if (consent === "accepted") {
    loadGA();
    if (banner) banner.hidden = true;
  } else if (consent === "rejected") {
    if (banner) banner.hidden = true;
  } else if (banner) {
    banner.hidden = false;
    var btnAccept = document.getElementById("cookie-accept");
    var btnReject = document.getElementById("cookie-reject");
    if (btnAccept) {
      btnAccept.addEventListener("click", function () {
        try { localStorage.setItem(CONSENT_KEY, "accepted"); } catch (e) {}
        banner.hidden = true;
        loadGA();
      });
    }
    if (btnReject) {
      btnReject.addEventListener("click", function () {
        try { localStorage.setItem(CONSENT_KEY, "rejected"); } catch (e) {}
        banner.hidden = true;
      });
    }
  }

  // ---------- Form preventivo ----------
  var form = document.getElementById("form-preventivo");
  if (form) {
    form.addEventListener("submit", function (e) {
      // Honeypot: se il campo nascosto è compilato, è un bot
      var hp = form.querySelector('input[name="website"]');
      if (hp && hp.value !== "") {
        e.preventDefault();
        return;
      }
      // Evento di conversione GA4
      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          form_name: "preventivo",
          method: "web"
        });
      }
    });
  }
})();
