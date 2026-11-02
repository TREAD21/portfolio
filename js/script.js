/* =========================================================
   Michael Osei Yeboah — Portfolio
   js/script.js
   ========================================================= */

(function () {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Light / dark theme switch ---------- */
  // The inline script in <head> sets data-theme before paint; this keeps the button in sync and saves the choice.
  const themeButton = document.querySelector(".theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme, save) {
    root.setAttribute("data-theme", theme);
    if (themeButton) themeButton.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#0e0d0d" : "#101010");
    if (save) { try { localStorage.setItem("theme", theme); } catch (e) { /* storage blocked */ } }
  }
  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light", false);
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  /* ---------- Toast notification ---------- */
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
  }

  /* ---------- Header background on scroll ---------- */
  const header = document.querySelector(".site-header");

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  const mobileQuery = window.matchMedia("(max-width: 860px)");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
    header.classList.toggle("menu-is-open", open);
    if (open) {
      const firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  }

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Close after choosing a link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Close with Escape and return focus to the button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Close when clicking outside the navigation
  document.addEventListener("click", (event) => {
    if (menu.classList.contains("is-open") && !event.target.closest(".nav")) setMenu(false);
  });

  // Reset if the screen is resized to desktop width
  mobileQuery.addEventListener("change", (event) => {
    if (!event.matches) setMenu(false);
  });

  /* ---------- Highlight the current section in the nav ---------- */
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  // Observe every section so links clear when a section without a nav link (e.g. Contact) is in view
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const isCurrent = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("is-active", isCurrent);
            if (isCurrent) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- Reveal elements on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    // Small stagger for elements that sit side by side
    revealEls.forEach((el) => {
      const siblings = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
      const index = siblings.indexOf(el);
      el.style.transitionDelay = Math.min(index, 5) * 70 + "ms";
      revealObserver.observe(el);
    });
  }

  /* ---------- "How I work" accordion ---------- */
  // One step open at a time; the image beside the list follows the open step.
  const processItems = Array.from(document.querySelectorAll(".process__item"));
  const processImage = document.getElementById("process-image");

  function openStep(item) {
    processItems.forEach((other) => {
      const isTarget = other === item;
      const button = other.querySelector(".process__btn");
      other.classList.toggle("is-open", isTarget);
      button.setAttribute("aria-expanded", String(isTarget));
      other.querySelector(".process__panel").hidden = !isTarget;
    });

    const src = item.getAttribute("data-image");
    if (!processImage || !src || processImage.getAttribute("src") === src) return;
    if (prefersReducedMotion) {
      processImage.src = src;
      return;
    }
    processImage.classList.add("is-fading");
    setTimeout(() => {
      processImage.src = src;
      processImage.classList.remove("is-fading");
    }, 300);
  }

  processItems.forEach((item) => {
    item.querySelector(".process__btn").addEventListener("click", () => {
      if (!item.classList.contains("is-open")) openStep(item);
    });
  });

  /* ---------- Project video (plays only while visible) ---------- */
  // Reduced-motion visitors see the poster and can start it with the button.
  document.querySelectorAll(".project__media--video").forEach((wrap) => {
    const video = wrap.querySelector("video");
    const button = wrap.querySelector(".video-toggle");
    let pausedByUser = prefersReducedMotion;
    let inView = false;

    function sync() {
      const paused = video.paused;
      button.classList.toggle("is-paused", paused);
      button.setAttribute("aria-label", paused ? "Play video" : "Pause video");
    }

    function update() {
      if (inView && !pausedByUser) video.play().catch(() => {});
      else video.pause();
    }

    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    button.hidden = false;
    sync();

    button.addEventListener("click", () => {
      pausedByUser = !video.paused;
      if (pausedByUser) video.pause();
      else video.play().catch(() => {});
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        inView = entries[0].isIntersecting;
        update();
      }, { threshold: 0.35 }).observe(video);
    }
  });

  /* ---------- Links that are not ready yet ---------- */
  // Any link with data-status="coming-soon" shows a notice instead of navigating.
  // Remove the attribute and set a real href once the destination exists.
  document.querySelectorAll('[data-status="coming-soon"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("This link is coming soon — check back shortly.");
    });
  });

  /* ---------- Copy email address ---------- */
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(text);
        showToast("Email address copied to clipboard.");
      } catch (err) {
        // Clipboard API can be unavailable (e.g. on file:// in some browsers)
        showToast("Copy not available — the address is " + text);
      }
    });
  });

  /* ---------- Contact form (sends through /api/contact) ---------- */
  // Posts to the site's own /api/contact function, which forwards the message to FormSubmit
  // (some networks block formsubmit.co directly). If sending fails, the visitor is offered
  // a pre-filled email in their own app instead.
  const form = document.getElementById("compose-form");
  const formError = document.getElementById("compose-error");
  const formStatus = document.getElementById("compose-status");
  const submitButton = document.getElementById("compose-submit");
  const RECIPIENT = "michaelyeboah735@gmail.com";
  const ENDPOINT = "/api/contact";

  function setStatus(html, kind) {
    formStatus.innerHTML = html;
    formStatus.dataset.kind = kind;
    formStatus.hidden = false;
  }

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      formStatus.hidden = true;

      const fields = ["name", "email", "subject", "message"].map((n) => form.elements[n]);
      let valid = true;
      fields.forEach((field) => {
        const value = field.value.trim();
        const bad = value === "" || (field.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value));
        field.setAttribute("aria-invalid", String(bad));
        if (bad) valid = false;
      });
      formError.hidden = valid;
      if (!valid) {
        fields.find((f) => f.getAttribute("aria-invalid") === "true").focus();
        return;
      }
      if (form.elements._honey.value) return; // spam trap filled in

      const [name, email, subject, message] = fields.map((f) => f.value.trim());
      const label = submitButton.querySelector(".compose__label");
      submitButton.disabled = true;
      label.textContent = "Sending…";

      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, subject, message, _honey: form.elements._honey.value }),
        });
        const data = await res.json().catch(() => ({}));
        if (/activat/i.test(data.message || "")) {
          // FormSubmit holds the very first message until the inbox owner clicks its activation link
          setStatus("Almost there: this form is waiting for activation. Check " + RECIPIENT + " for an email from FormSubmit and click its activation link, then send again.", "error");
          return;
        }
        if (!res.ok || String(data.success) !== "true") throw new Error(data.message || "Send failed");
        form.reset();
        setStatus("Thanks, " + name.split(" ")[0].replace(/[<>&"]/g, "") + "! Your message has been sent. I’ll get back to you soon.", "ok");
      } catch (err) {
        const href = "mailto:" + RECIPIENT + "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
        setStatus("Sorry, the message couldn’t be sent just now. <a href=\"" + href + "\">Send it from your email app instead</a>.", "error");
      } finally {
        submitButton.disabled = false;
        label.textContent = "Send message";
      }
    });

    form.addEventListener("input", (event) => {
      if (event.target.value.trim() !== "") event.target.removeAttribute("aria-invalid");
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
