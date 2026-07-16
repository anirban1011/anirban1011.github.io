/**
 * sms-forwarder.js — SMS Forwarder project page interactions
 * Handles: FAQ accordion, smooth scroll, sidebar link highlights
 */

// Global scroll helper called from sidebar onclick attributes
window.scrollToSection = function(id) {
  const el = document.getElementById(id);
  const workspace = document.querySelector(".sms-fw-workspace");
  if (el && workspace) {
    workspace.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  } else if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // ── FAQ Accordion ─────────────────────────────────────────
  const faqToggles = document.querySelectorAll(".faq-toggle");
  faqToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      const answer = toggle.closest(".faq-item").querySelector(".faq-answer");

      // Close all
      faqToggles.forEach(t => {
        t.setAttribute("aria-expanded", "false");
        const a = t.closest(".faq-item").querySelector(".faq-answer");
        if (a) a.classList.remove("open");
      });

      // Open clicked (if it was closed)
      if (!isOpen && answer) {
        toggle.setAttribute("aria-expanded", "true");
        answer.classList.add("open");
      }
    });
  });

  // ── Sidebar scroll tracking (highlight active section) ────
  const sections = document.querySelectorAll(".sms-fw-section");
  const sidebarItems = document.querySelectorAll("#sidebarProject .sidebar-tree li");

  const sectionIds = ["featuresSection", "techSection", "faqSection", "downloadSection"];

  function getActiveSectionIndex() {
    const scrollY = document.querySelector(".sms-fw-workspace")?.scrollTop ?? window.scrollY;
    let activeIdx = 0;
    sectionIds.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop - 100 <= scrollY) {
        activeIdx = idx + 1; // +1 because 0 is overview
      }
    });
    return activeIdx;
  }

  function updateSidebarHighlight() {
    const activeIdx = getActiveSectionIndex();
    sidebarItems.forEach((item, idx) => {
      item.classList.toggle("active", idx === activeIdx);
    });
  }

  const workspace = document.querySelector(".sms-fw-workspace");
  if (workspace) {
    workspace.addEventListener("scroll", updateSidebarHighlight, { passive: true });
  }

  // ── Animate feature cards on scroll into view ─────────────
  const featureCards = document.querySelectorAll(".sms-fw-feature-card");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    featureCards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s`;
      observer.observe(card);
    });
  }
});
