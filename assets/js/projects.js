/**
 * projects.js — Projects page script
 * Handles: filter checkboxes, active filter tags, mobile filter collapse
 */

document.addEventListener("DOMContentLoaded", () => {
  const filterAndroid       = document.getElementById("filterAndroid");
  const filterWeb           = document.getElementById("filterWeb");
  const mobileFilterAndroid = document.getElementById("mobileFilterAndroid");
  const mobileFilterWeb     = document.getElementById("mobileFilterWeb");
  const projectCards        = document.querySelectorAll(".project-card-ide");
  const activeFilterTags    = document.getElementById("activeFilterTags");
  const filterBarClearAll   = document.getElementById("filterBarClearAll");
  const mobileFilterTitle   = document.getElementById("mobileFilterTitle");

  // ── Filter Logic ─────────────────────────────────────────────
  function filterProjects() {
    const showAndroid = (filterAndroid?.checked) || (mobileFilterAndroid?.checked);
    const showWeb     = (filterWeb?.checked)     || (mobileFilterWeb?.checked);
    const showAll     = !showAndroid && !showWeb;

    projectCards.forEach(card => {
      const cat = card.dataset.category;
      if (showAll) {
        card.style.display = "flex";
      } else if (cat === "app" && !showAndroid) {
        card.style.display = "none";
      } else if (cat === "web" && !showWeb) {
        card.style.display = "none";
      } else {
        card.style.display = "flex";
      }
    });

    updateFilterTags();
  }

  function syncFilters(src, dst) {
    if (src && dst) dst.checked = src.checked;
  }

  // ── Active Tags Bar ──────────────────────────────────────────
  function updateFilterTags() {
    if (!activeFilterTags) return;
    let html = `<span>// projects / </span>`;
    let count = 0;

    const androidOn = filterAndroid?.checked || mobileFilterAndroid?.checked;
    const webOn     = filterWeb?.checked     || mobileFilterWeb?.checked;

    if (androidOn) {
      html += `<span class="active-tag-item">Android <i class="bi bi-x active-tag-close" data-target="android" aria-label="Remove Android filter"></i></span>`;
      count++;
    }
    if (webOn) {
      if (count > 0) html += `<span style="margin: 0 4px; color: var(--text-muted); font-size: 11px;">;</span>`;
      html += `<span class="active-tag-item">Web <i class="bi bi-x active-tag-close" data-target="web" aria-label="Remove Web filter"></i></span>`;
      count++;
    }

    activeFilterTags.innerHTML = html;

    document.querySelectorAll(".active-tag-close").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.dataset.target === "android") {
          if (filterAndroid) filterAndroid.checked = false;
          if (mobileFilterAndroid) mobileFilterAndroid.checked = false;
        } else {
          if (filterWeb) filterWeb.checked = false;
          if (mobileFilterWeb) mobileFilterWeb.checked = false;
        }
        filterProjects();
      });
    });

    if (filterBarClearAll) {
      filterBarClearAll.style.display = count > 0 ? "inline-flex" : "none";
    }
  }

  // ── Bind Filter Changes ──────────────────────────────────────
  filterAndroid?.addEventListener("change", () => { syncFilters(filterAndroid, mobileFilterAndroid); filterProjects(); });
  filterWeb?.addEventListener("change", () => { syncFilters(filterWeb, mobileFilterWeb); filterProjects(); });
  mobileFilterAndroid?.addEventListener("change", () => { syncFilters(mobileFilterAndroid, filterAndroid); filterProjects(); });
  mobileFilterWeb?.addEventListener("change", () => { syncFilters(mobileFilterWeb, filterWeb); filterProjects(); });

  filterBarClearAll?.addEventListener("click", () => {
    if (filterAndroid) filterAndroid.checked = false;
    if (filterWeb) filterWeb.checked = false;
    if (mobileFilterAndroid) mobileFilterAndroid.checked = false;
    if (mobileFilterWeb) mobileFilterWeb.checked = false;
    filterProjects();
  });

  // ── Mobile Filter Collapse ───────────────────────────────────
  if (mobileFilterTitle) {
    mobileFilterTitle.addEventListener("click", () => {
      mobileFilterTitle.classList.toggle("collapsed");
      const tree = mobileFilterTitle.nextElementSibling;
      if (tree) tree.style.display = mobileFilterTitle.classList.contains("collapsed") ? "none" : "block";
    });
  }

  // ── Initial run ──────────────────────────────────────────────
  filterProjects();
});
