const emailJsConfig = {
  publicKey: "-GbqVuMJ4x5jl6QGe", // Replace with your own EmailJS key
  serviceId: "service_4tdx2um",  // Replace with your own EmailJS service ID
  templateId: "template_yp3l3cb", // Replace with your own EmailJS template ID
};

// File contents for the About Me tab file viewer
const aboutFiles = {
  "bio.js": `/**
 * @file bio.js
 * @desc Brief profile overview of Anirban Routh
 */
const developer = {
  name: "Anirban Routh",
  roles: [
    "Software Developer",
    "App Automation Expert",
    "Backend Integrator"
  ],
  location: "Maynaguri, West Bengal, India",
  contact: {
    email: "anirban@anirbanrouth.in",
    website: "https://anirbanrouth.in"
  },
  bio: "Driven Computer Application postgraduate (MCA) with a strong foundation in software development, database management, and system automation. Specialized in building practical software solutions and custom automation scripts. Passionate about leveraging tech to build revenue-generating applications and scalable software products."
};
`,

  "education.js": `/**
 * @file education.js
 * @desc Academic achievements and credentials
 */
const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "University of North Bengal (NBU)",
    timeline: "December 2025 - Present",
    status: "Pursuing",
    focus: [
      "Advanced Algorithms",
      "Database Mappings",
      "Web Development",
      "Android Development"
    ]
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Ananda Chandra College",
    timeline: "Completed March 2025",
  }
];
`,

  "skills.js": `/**
 * @file skills.js
 * @desc Technical stack and proficiency
 */
const skills = {
  languages: {
    expert: ["Kotlin", "Bash / Shell Script"],
    advanced: ["Java", "Python"],
    intermediate: ["C", "C++"]
  },
  androidSDK: [
    "Foreground Services & Background processing",
    "BroadcastReceiver & SMS Telephony hooks",
    "SQLite Persistence & Room Database engines",
    "Google Drive API integrations",
    "Material 3 UI/UX Standards"
  ],
  cloudAndBackend: [
    "Linux administration & automated macros",
    "AWS S3 Glacier bulk restore workflows",
    "TCP Sockets multithreaded network programming",
    "REST API endpoints & custom webhooks",
    "Git version control systems"
  ]
};
`,

  "experience.js": `/**
 * @file experience.js
 * @desc Professional history and software ventures
 */
const experience = [
  {
    role: "Founder & Lead Instructor",
    company: "CodeCraft Computer Academy | Maynaguri",
    period: "March 2026 - Present",
    keyDeliverables: [
      "Established independent computer academy training programming basics",
      "Instruct fundamental OOP languages (C, C++, Java, Python)",
      "Designed curriculum mapping compiler fundamentals to terminal tasks"
    ]
  },
  {
    role: "Lead Software Developer / Freelancer",
    company: "Self-Directed SaaS & Automation | Remote",
    period: "2013 - Present",
    keyDeliverables: [
      "Built background automation tools with Room DB persistency",
      "Configured cloud backup services utilizing Drive API and OAuth2",
      "Developed command-line bulk restoring scripts (AWS Glacier REST)",
      "Programmed multithreaded client-server network socket channels"
    ]
  }
];
`
};

// Snippets code text that scrolls by on skip/win
const codeSnippets = `
function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {
  const value: T = parseModel(chunk._response, chunk._value);
  const initializedChunk: InitializedChunk<T> = (chunk: any);
  initializedChunk._status = INITIALIZED;
  initializedChunk._value = value;
  return value;
}

class BroadcastService : Service() {
  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    val notification = createNotification()
    startForeground(NOTIFICATION_ID, notification)
    return START_STICKY
  }
}

import socket
import threading

def handle_client(client_socket):
    while True:
        request = client_socket.recv(1024)
        if not request:
            break
        client_socket.send(b"ACK")

# REST API Call
import urllib.request
req = urllib.request.Request(
    url, 
    headers={'User-Agent': 'Mozilla/5.0'}
)
`;

document.addEventListener("DOMContentLoaded", () => {
  // Page Loader Fade
  const loader = document.getElementById("pageLoader");
  if (loader) {
    loader.classList.add("is-hidden");
    setTimeout(() => loader.remove(), 450);
  }

  let activeTabSidebarId = "sidebarHello";

  // Active navigation tabs
  const tabs = document.querySelectorAll(".ide-tab, .ide-header-contact");
  const views = document.querySelectorAll(".tab-view");
  const sidebars = document.querySelectorAll(".ide-sidebar .sidebar-section");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetTab = tab.dataset.tab;
      activeTabSidebarId = `sidebar${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)}`;
      
      // Reset Activity Bar back to Explorer
      activityIcons.forEach(i => i.classList.remove("active"));
      if (activityIcons[0]) activityIcons[0].classList.add("active");

      // Active states
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Header contact tab mirroring
      if (tab.classList.contains("ide-header-contact")) {
        document.querySelector('.ide-tab[data-tab="contact"]')?.classList.add("active");
      }

      // Switch main pane views
      views.forEach(view => {
        view.classList.remove("active");
        if (view.id === `view${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)}`) {
          view.classList.add("active");
        }
      });

      // Switch sidebar sections
      showSidebarSection(activeTabSidebarId);

      // Update URL hash fragment to preserve tab on refresh
      if (window.location.hash.substring(1) !== targetTab) {
        window.location.hash = targetTab;
      }

      // Close mobile navigation overlay menu if open
      const navWrapper = document.getElementById("navWrapper");
      if (navWrapper) {
        navWrapper.classList.remove("open");
      }
    });
  });

  // Toggle mobile navigation overlay menu
  const menuToggle = document.getElementById("menuToggle");
  const navWrapper = document.getElementById("navWrapper");
  if (menuToggle && navWrapper) {
    menuToggle.addEventListener("click", () => {
      navWrapper.classList.toggle("open");
    });
  }

  function showSidebarSection(sidebarId) {
    sidebars.forEach(section => {
      section.classList.remove("active-sidebar-section");
      section.style.display = "none";
      if (section.id === sidebarId) {
        section.classList.add("active-sidebar-section");
        section.style.display = "block";
      }
    });
  }

  // Activity Bar Interaction
  const activityIcons = document.querySelectorAll(".activity-icon");
  activityIcons.forEach((icon, idx) => {
    icon.addEventListener("click", () => {
      activityIcons.forEach(i => i.classList.remove("active"));
      icon.classList.add("active");

      if (idx === 0) {
        showSidebarSection(activeTabSidebarId);
      } else if (idx === 1) {
        showSidebarSection("sidebarSearch");
      } else if (idx === 2) {
        showSidebarSection("sidebarGit");
      }
    });
  });


  // Collapse / Expand Sidebars
  const sidebarTitles = document.querySelectorAll(".sidebar-title");
  sidebarTitles.forEach(title => {
    title.addEventListener("click", () => {
      title.classList.toggle("collapsed");
      const tree = title.nextElementSibling;
      if (tree && tree.classList.contains("sidebar-tree")) {
        tree.style.display = title.classList.contains("collapsed") ? "none" : "block";
      }
    });
  });

  // About tab file explorer (sync desktop and mobile file nodes)
  const fileNodes = document.querySelectorAll("#sidebarAbout .sidebar-tree li[data-file], .mobile-about-filter .sidebar-tree li[data-file]");
  fileNodes.forEach(node => {
    node.addEventListener("click", () => {
      // Clear active from all
      fileNodes.forEach(n => n.classList.remove("active"));
      
      const file = node.dataset.file;
      // Sync active state to both desktop and mobile lists
      document.querySelectorAll(`[data-file="${file}"]`).forEach(n => n.classList.add("active"));
      
      loadAboutFile(file);
    });
  });

  // Collapsible mobile folder titles helper
  function setupMobileCollapse(titleId) {
    const titleEl = document.getElementById(titleId);
    if (titleEl) {
      titleEl.addEventListener("click", () => {
        titleEl.classList.toggle("collapsed");
        const tree = titleEl.nextElementSibling;
        if (tree) {
          const collapsed = titleEl.classList.contains("collapsed");
          tree.style.display = collapsed ? "none" : "block";
        }
      });
    }
  }

  // Setup mobile collapses for About and Contact views
  setupMobileCollapse("mobileAboutTitlePersonal");
  setupMobileCollapse("mobileAboutTitleProfessional");
  setupMobileCollapse("mobileContactTitleInfo");
  setupMobileCollapse("mobileContactTitleFindMe");

  // Initialize About File
  loadAboutFile("bio.js");

  // Project filtering checkboxes & Active filters bar
  const filterAndroid = document.getElementById("filterAndroid");
  const filterWeb = document.getElementById("filterWeb");
  const mobileFilterAndroid = document.getElementById("mobileFilterAndroid");
  const mobileFilterWeb = document.getElementById("mobileFilterWeb");
  const projectCards = document.querySelectorAll(".project-card-ide");
  const activeFilterTags = document.getElementById("activeFilterTags");
  const filterBarClearAll = document.getElementById("filterBarClearAll");

  function filterProjects() {
    const showAndroid = (filterAndroid && filterAndroid.checked) || (mobileFilterAndroid && mobileFilterAndroid.checked);
    const showWeb = (filterWeb && filterWeb.checked) || (mobileFilterWeb && mobileFilterWeb.checked);

    // If no filters are selected, default to showing everything!
    const showAll = !showAndroid && !showWeb;

    projectCards.forEach(card => {
      const category = card.dataset.category;
      if (showAll) {
        card.style.display = "flex";
      } else if (category === "app" && !showAndroid) {
        card.style.display = "none";
      } else if (category === "web" && !showWeb) {
        card.style.display = "none";
      } else {
        card.style.display = "flex";
      }
    });

    updateActiveFilterTags();
  }

  function syncFilters(source, target) {
    if (source && target) {
      target.checked = source.checked;
    }
  }

  function updateActiveFilterTags() {
    if (!activeFilterTags) return;

    let html = `<span>// projects / </span>`;
    let activeCount = 0;

    const androidChecked = (filterAndroid && filterAndroid.checked) || (mobileFilterAndroid && mobileFilterAndroid.checked);
    const webChecked = (filterWeb && filterWeb.checked) || (mobileFilterWeb && mobileFilterWeb.checked);

    if (androidChecked) {
      html += `<span class="active-tag-item">Android <i class="bi bi-x active-tag-close" data-target="android"></i></span>`;
      activeCount++;
    }
    if (webChecked) {
      if (activeCount > 0) html += `<span style="margin: 0 4px; color: var(--text-muted); font-size: 11px;">;</span>`;
      html += `<span class="active-tag-item">Web <i class="bi bi-x active-tag-close" data-target="web"></i></span>`;
      activeCount++;
    }

    activeFilterTags.innerHTML = html;

    // Attach click events to close buttons on tags
    document.querySelectorAll(".active-tag-close").forEach(closeBtn => {
      closeBtn.addEventListener("click", () => {
        const target = closeBtn.dataset.target;
        if (target === "android") {
          if (filterAndroid) filterAndroid.checked = false;
          if (mobileFilterAndroid) mobileFilterAndroid.checked = false;
        } else if (target === "web") {
          if (filterWeb) filterWeb.checked = false;
          if (mobileFilterWeb) mobileFilterWeb.checked = false;
        }
        filterProjects();
      });
    });

    // Show/hide clear-all button
    if (filterBarClearAll) {
      filterBarClearAll.style.display = (activeCount > 0) ? "inline-flex" : "none";
    }
  }

  // Bind change listeners to both desktop and mobile filters
  if (filterAndroid) {
    filterAndroid.addEventListener("change", () => {
      syncFilters(filterAndroid, mobileFilterAndroid);
      filterProjects();
    });
  }
  if (filterWeb) {
    filterWeb.addEventListener("change", () => {
      syncFilters(filterWeb, mobileFilterWeb);
      filterProjects();
    });
  }
  if (mobileFilterAndroid) {
    mobileFilterAndroid.addEventListener("change", () => {
      syncFilters(mobileFilterAndroid, filterAndroid);
      filterProjects();
    });
  }
  if (mobileFilterWeb) {
    mobileFilterWeb.addEventListener("change", () => {
      syncFilters(mobileFilterWeb, filterWeb);
      filterProjects();
    });
  }

  if (filterBarClearAll) {
    filterBarClearAll.addEventListener("click", () => {
      if (filterAndroid) filterAndroid.checked = false;
      if (filterWeb) filterWeb.checked = false;
      if (mobileFilterAndroid) mobileFilterAndroid.checked = false;
      if (mobileFilterWeb) mobileFilterWeb.checked = false;
      filterProjects();
    });
  }

  // Collapsible mobile projects filter title
  const mobileFilterTitle = document.getElementById("mobileFilterTitle");
  if (mobileFilterTitle) {
    mobileFilterTitle.addEventListener("click", () => {
      mobileFilterTitle.classList.toggle("collapsed");
      const tree = mobileFilterTitle.nextElementSibling;
      if (tree) {
        const collapsed = mobileFilterTitle.classList.contains("collapsed");
        tree.style.display = collapsed ? "none" : "block";
      }
    });
  }

  // Initial run
  filterProjects();


  // Real-time contact form code preview
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const messageInput = document.getElementById("messageInput");

  const previewName = document.getElementById("previewName");
  const previewEmail = document.getElementById("previewEmail");
  const previewMessage = document.getElementById("previewMessage");
  const previewDate = document.getElementById("previewDate");

  function updateFormPreview() {
    if (previewName) previewName.textContent = nameInput.value ? `"${nameInput.value}"` : '""';
    if (previewEmail) previewEmail.textContent = emailInput.value ? `"${emailInput.value}"` : '""';
    if (previewMessage) previewMessage.textContent = messageInput.value ? `"${messageInput.value.substring(0, 40)}${messageInput.value.length > 40 ? '...' : ''}"` : '""';
    
    if (previewDate) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const now = new Date();
      const dStr = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}`;
      previewDate.textContent = `"${dStr}"`;
    }
  }

  if (nameInput && emailInput && messageInput) {
    nameInput.addEventListener("input", updateFormPreview);
    emailInput.addEventListener("input", updateFormPreview);
    messageInput.addEventListener("input", updateFormPreview);
  }

  // Form submit handler & Validation / Success views
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const submitButton = document.getElementById("sendBtn");
  const contactFormContainer = document.getElementById("contactFormContainer");
  const contactSuccessContainer = document.getElementById("contactSuccessContainer");
  const btnSendNewMessage = document.getElementById("btnSendNewMessage");
  const emailGroup = document.getElementById("emailGroup");

  // Initial preview sync
  updateFormPreview();

  // Remove error outline on input
  if (emailInput && emailGroup) {
    emailInput.addEventListener("input", () => {
      emailGroup.classList.remove("has-error");
    });
  }

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const msgText = messageInput.value.trim();

      // Email Format Check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        if (emailGroup) emailGroup.classList.add("has-error");
        return;
      } else {
        if (emailGroup) emailGroup.classList.remove("has-error");
      }

      if (!name || !email || !msgText) {
        formStatus.textContent = "Please complete all fields.";
        formStatus.style.color = "#e28972";
        return;
      }

      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "sending...";
      formStatus.textContent = "";

      const formData = { name, email, message: msgText };

      try {
        if (canUseEmailJs()) {
          window.emailjs.init({ publicKey: emailJsConfig.publicKey });
          await window.emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, formData);
        } else {
          // Mailto fallback
          const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msgText}`);
          window.location.href = `mailto:developer@anirbanrouth.in?subject=${subject}&body=${body}`;
        }
        
        // Show Success panel
        if (contactFormContainer && contactSuccessContainer) {
          contactFormContainer.style.display = "none";
          contactSuccessContainer.style.display = "flex";
        }
        contactForm.reset();
        updateFormPreview();
      } catch (err) {
        formStatus.textContent = "Submission failed. Please email directly.";
        formStatus.style.color = "#e28972";
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  }

  if (btnSendNewMessage) {
    btnSendNewMessage.addEventListener("click", () => {
      if (contactFormContainer && contactSuccessContainer) {
        contactSuccessContainer.style.display = "none";
        contactFormContainer.style.display = "block";
      }
      if (formStatus) formStatus.textContent = "";
      if (contactForm) contactForm.reset();
      updateFormPreview();
    });
  }

  // Sidebar custom actions
  const githubProfileNode = document.querySelector('[data-action="go-github"]');
  if (githubProfileNode) {
    githubProfileNode.addEventListener("click", () => {
      window.open("https://github.com/anirban1011", "_blank");
    });
  }

  const welcomeNode = document.querySelector('[data-action="go-home"]');
  if (welcomeNode) {
    welcomeNode.addEventListener("click", () => {
      document.querySelector('.ide-tab[data-tab="hello"]')?.click();
    });
  }

  // Simple SPA hash-based router
  function handleHashRoute() {
    const hash = window.location.hash.substring(1);
    const validTabs = ["hello", "about", "projects", "contact"];
    if (hash && validTabs.includes(hash)) {
      const tabElement = document.querySelector(`[data-tab="${hash}"]`);
      if (tabElement) {
        tabElement.click();
      }
    } else {
      // Default fallback
      const tabElement = document.querySelector(`[data-tab="hello"]`);
      if (tabElement) {
        tabElement.click();
      }
    }
  }

  window.addEventListener("hashchange", handleHashRoute);

  // Initialize Game Loops & Controls
  initSnakeGame();

  // Run routing on initial load
  handleHashRoute();
});

// Helper functions for loading about files
function loadAboutFile(filename) {
  const content = aboutFiles[filename] || "";
  const editorText = document.getElementById("editorTextContainer");
  const editorGutter = document.getElementById("editorGutter");
  const editorActiveFileName = document.getElementById("editorActiveFileName");

  if (editorActiveFileName) editorActiveFileName.textContent = filename;

  if (editorText && editorGutter) {
    // Custom JS Syntax Highlighter
    let html = content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 1. Comments (JSDoc multi-line first, then single line)
    const comments = [];
    html = html.replace(/\/\*\*[\s\S]*?\*\//g, (match) => {
      comments.push(`<span class="token-comment">${match}</span>`);
      return `__COMMENT_PLACEHOLDER_${comments.length - 1}__`;
    });
    html = html.replace(/\/\/.*/g, (match) => {
      comments.push(`<span class="token-comment">${match}</span>`);
      return `__COMMENT_PLACEHOLDER_${comments.length - 1}__`;
    });

    // 2. Strings
    const strings = [];
    html = html.replace(/(["'])(.*?)\1/g, (match) => {
      strings.push(`<span class="token-string">${match}</span>`);
      return `__STRING_PLACEHOLDER_${strings.length - 1}__`;
    });

    // 3. Keywords
    html = html.replace(/\b(const|let|var|class|constructor|this|return|function|extends|super|import|export|from)\b/g, '<span class="token-keyword">$1</span>');

    // 4. Numbers
    html = html.replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');

    // 5. Array brackets / braces / parameters
    html = html.replace(/([\{\}\[\]\(\)])/g, '<span class="token-accent">$1</span>');

    // Restore strings
    strings.forEach((strHTML, idx) => {
      html = html.replace(`__STRING_PLACEHOLDER_${idx}__`, strHTML);
    });

    // Restore comments
    comments.forEach((commHTML, idx) => {
      html = html.replace(`__COMMENT_PLACEHOLDER_${idx}__`, commHTML);
    });

    editorText.innerHTML = html;

    // Line numbering
    const lineCount = content.split("\n").length;
    let gutterHTML = "";
    for (let i = 1; i <= lineCount; i++) {
      gutterHTML += `${i}<br>`;
    }
    editorGutter.innerHTML = gutterHTML;
  }
}

function canUseEmailJs() {
  return Boolean(
    window.emailjs &&
    emailJsConfig.publicKey &&
    emailJsConfig.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY" &&
    !emailJsConfig.publicKey.startsWith("-") && 
    emailJsConfig.serviceId &&
    emailJsConfig.templateId
  );
}

// ----------------- SNAKE GAME IMPLEMENTATION -----------------
function initSnakeGame() {
  const canvas = document.getElementById("gameCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const gridCellSize = 20;
  const cols = 12; // 240 / 20
  const rows = 19; // 380 / 20

  let snake = [];
  let direction = { x: 0, y: -1 };
  let nextDirection = { x: 0, y: -1 };
  let food = { x: 0, y: 0 };
  let score = 0;
  let foodLeft = 10;
  let gameInterval = null;
  let isPlaying = false;

  // Game overlays
  const overlayStart = document.getElementById("gameOverlayStart");
  const overlayOver = document.getElementById("gameOverlayOver");
  const overlayWin = document.getElementById("gameOverlayWin");
  const foodDots = document.querySelectorAll("#foodDots .food-dot");

  // Control Buttons
  const btnStart = document.getElementById("btnStartGame");
  const btnRestart = document.getElementById("btnRestartGame");
  const btnPlayAgain = document.getElementById("btnPlayAgain");
  const btnSkip = document.getElementById("btnSkipGame");

  // Game Actions
  if (btnStart) btnStart.addEventListener("click", startGame);
  if (btnRestart) btnRestart.addEventListener("click", startGame);
  if (btnPlayAgain) btnPlayAgain.addEventListener("click", startGame);
  if (btnSkip) btnSkip.addEventListener("click", skipGame);

  // Mappings for virtual keys D-pad
  document.getElementById("btnUp")?.addEventListener("click", () => changeDirection(0, -1));
  document.getElementById("btnLeft")?.addEventListener("click", () => changeDirection(-1, 0));
  document.getElementById("btnDown")?.addEventListener("click", () => changeDirection(0, 1));
  document.getElementById("btnRight")?.addEventListener("click", () => changeDirection(1, 0));

  // Keyboard hooks
  window.addEventListener("keydown", (e) => {
    if (!isPlaying) return;
    if (["ArrowUp", "KeyW"].includes(e.code)) {
      e.preventDefault();
      changeDirection(0, -1);
    } else if (["ArrowLeft", "KeyA"].includes(e.code)) {
      e.preventDefault();
      changeDirection(-1, 0);
    } else if (["ArrowDown", "KeyS"].includes(e.code)) {
      e.preventDefault();
      changeDirection(0, 1);
    } else if (["ArrowRight", "KeyD"].includes(e.code)) {
      e.preventDefault();
      changeDirection(1, 0);
    }
  });

  function startGame() {
    // Hide overlays
    overlayStart.classList.add("d-none");
    overlayOver.classList.add("d-none");
    overlayWin.classList.add("d-none");

    // Initialize snake in middle
    snake = [
      { x: 5, y: 10 },
      { x: 5, y: 11 },
      { x: 5, y: 12 },
      { x: 5, y: 13 }
    ];
    direction = { x: 0, y: -1 };
    nextDirection = { x: 0, y: -1 };
    score = 0;
    foodLeft = 10;
    isPlaying = true;

    // Reset score dots
    foodDots.forEach(dot => dot.classList.add("active"));

    // Spawn food
    spawnFood();

    // Start tick interval (140ms speed is retro & playable)
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameTick, 140);
  }

  function gameTick() {
    direction = nextDirection;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Wall collision
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
      gameOver();
      return;
    }

    // Body collision
    for (let segment of snake) {
      if (head.x === segment.x && head.y === segment.y) {
        gameOver();
        return;
      }
    }

    // Add new head
    snake.unshift(head);

    // Food collision
    if (head.x === food.x && head.y === food.y) {
      score++;
      foodLeft = Math.max(0, 10 - score);
      
      // Update dots UI
      if (foodDots[10 - foodLeft - 1]) {
        foodDots[10 - foodLeft - 1].classList.remove("active");
      }

      if (foodLeft === 0) {
        gameWin();
        return;
      } else {
        spawnFood();
      }
    } else {
      // Remove tail
      snake.pop();
    }

    drawGame();
  }

  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid background lines
    ctx.strokeStyle = "rgba(30, 45, 61, 0.2)";
    ctx.lineWidth = 1;
    for (let c = 0; c < cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * gridCellSize, 0);
      ctx.lineTo(c * gridCellSize, canvas.height);
      ctx.stroke();
    }
    for (let r = 0; r < rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * gridCellSize);
      ctx.lineTo(canvas.width, r * gridCellSize);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, idx) => {
      // Head has brighter glow
      ctx.fillStyle = idx === 0 ? "#43d9ad" : "#32a584";
      ctx.beginPath();
      ctx.roundRect(segment.x * gridCellSize + 2, segment.y * gridCellSize + 2, gridCellSize - 4, gridCellSize - 4, 4);
      ctx.fill();

      // Glowing dot
      if (idx === 0) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(segment.x * gridCellSize + gridCellSize / 2, segment.y * gridCellSize + gridCellSize / 2 - 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw food (glowing cyan dot)
    ctx.fillStyle = "#fea15f";
    ctx.beginPath();
    ctx.arc(food.x * gridCellSize + gridCellSize / 2, food.y * gridCellSize + gridCellSize / 2, 6, 0, Math.PI * 2);
    ctx.fill();

    // Subtle glow on food
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#fea15f";
    ctx.beginPath();
    ctx.arc(food.x * gridCellSize + gridCellSize / 2, food.y * gridCellSize + gridCellSize / 2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // reset
  }

  function changeDirection(x, y) {
    // Avoid reversing
    if (snake.length > 0) {
      if (x === -direction.x && y === -direction.y) return;
    }
    nextDirection = { x, y };
  }

  function spawnFood() {
    let valid = false;
    while (!valid) {
      food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
      };
      valid = true;
      for (let segment of snake) {
        if (food.x === segment.x && food.y === segment.y) {
          valid = false;
          break;
        }
      }
    }
  }

  function gameOver() {
    isPlaying = false;
    clearInterval(gameInterval);
    overlayOver.classList.remove("d-none");
  }

  function gameWin() {
    isPlaying = false;
    clearInterval(gameInterval);
    overlayWin.classList.remove("d-none");
  }

  function skipGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    
    // Hide game board and controls
    const board = document.querySelector(".game-board");
    const controls = document.querySelector(".game-controls");
    if (board) board.style.display = "none";
    if (controls) controls.style.display = "none";

    // Show scrolling snippets panel
    const snippetsPanel = document.getElementById("codeSnippetsPanel");
    if (snippetsPanel) {
      snippetsPanel.classList.remove("d-none");
      snippetsPanel.style.display = "block";

      const scroller = document.getElementById("snippetScroller");
      if (scroller) {
        // Render snippets multiple times for looping scroll
        let content = "";
        for (let i = 0; i < 5; i++) {
          content += `<pre style="color: var(--text-muted); margin-bottom: 20px;">${codeSnippets}</pre>`;
        }
        scroller.innerHTML = content;
      }
    }
  }

  // Pre-draw initial screen
  startGame();
  isPlaying = false; // pause initially
  clearInterval(gameInterval);
  overlayStart.classList.remove("d-none");
}

// ----------------- GENERIC MODAL TRIGGER -----------------
window.openProjectModal = function(title, desc) {
  const modal = document.getElementById("customProjectModal");
  const modalTitle = document.getElementById("modalProjectTitle");
  const modalDesc = document.getElementById("modalProjectDesc");

  if (modal && modalTitle && modalDesc) {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.classList.remove("d-none");
    modal.style.display = "flex";
  }
}

window.closeProjectModal = function() {
  const modal = document.getElementById("customProjectModal");
  if (modal) {
    modal.classList.add("d-none");
    modal.style.display = "none";
  }
}

// ----------------- CODE SNIPPET CARD DISMISS -----------------
window.dismissSnippet = function(cardId) {
  const card = document.getElementById(cardId);
  if (card) {
    card.style.transition = "opacity 0.25s ease, transform 0.25s ease";
    card.style.opacity = "0";
    card.style.transform = "scale(0.96)";
    setTimeout(() => {
      card.remove();
    }, 250);
  }
}


