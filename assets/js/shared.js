/**
 * shared.js — Common utilities used across all portfolio pages
 * Handles: page loader, mobile hamburger menu, sidebar collapse,
 *           activity bar, and skip-link.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ── Page Loader ────────────────────────────────────────────
  const loader = document.getElementById("pageLoader");
  if (loader) {
    loader.classList.add("is-hidden");
    setTimeout(() => loader.remove(), 450);
  }

  // ── Mobile Hamburger Toggle ────────────────────────────────
  const menuToggle = document.getElementById("menuToggle");
  const navWrapper = document.getElementById("navWrapper");
  if (menuToggle && navWrapper) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navWrapper.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when any nav link is clicked
    navWrapper.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navWrapper.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !navWrapper.contains(e.target)) {
        navWrapper.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ── Sidebar Collapse / Expand ──────────────────────────────
  const sidebarTitles = document.querySelectorAll(".ide-sidebar .sidebar-title");
  sidebarTitles.forEach(title => {
    title.addEventListener("click", () => {
      title.classList.toggle("collapsed");
      const tree = title.nextElementSibling;
      if (tree && tree.classList.contains("sidebar-tree")) {
        tree.style.display = title.classList.contains("collapsed") ? "none" : "block";
      }
    });
  });

  // ── Activity Bar (decorative on sub-pages) ─────────────────
  const activityIcons = document.querySelectorAll(".activity-icon");
  activityIcons.forEach((icon, idx) => {
    icon.addEventListener("click", () => {
      activityIcons.forEach(i => i.classList.remove("active"));
      icon.classList.add("active");
    });
  });
});
