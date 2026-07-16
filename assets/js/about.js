/**
 * about.js — About Me page script
 * Handles: file viewer, sidebar file explorer, mobile collapse
 */

// File contents for the About Me file viewer
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

document.addEventListener("DOMContentLoaded", () => {
  // ── File Viewer ─────────────────────────────────────────────
  function loadAboutFile(filename) {
    const content = aboutFiles[filename] || "";
    const editorText = document.getElementById("editorTextContainer");
    const editorGutter = document.getElementById("editorGutter");
    const editorActiveFileName = document.getElementById("editorActiveFileName");

    if (editorActiveFileName) editorActiveFileName.textContent = filename;

    if (editorText && editorGutter) {
      let html = content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // 1. Comments
      const comments = [];
      html = html.replace(/\/\*\*[\s\S]*?\*\//g, (m) => {
        comments.push(`<span class="token-comment">${m}</span>`); return `__C_${comments.length - 1}__`;
      });
      html = html.replace(/\/.*/g, (m) => {
        comments.push(`<span class="token-comment">${m}</span>`); return `__C_${comments.length - 1}__`;
      });

      // 2. Strings
      const strings = [];
      html = html.replace(/([\"'])(.*?)\1/g, (m) => {
        strings.push(`<span class="token-string">${m}</span>`); return `__S_${strings.length - 1}__`;
      });

      // 3. Keywords
      html = html.replace(/\b(const|let|var|class|constructor|this|return|function|extends|super|import|export|from)\b/g, '<span class="token-keyword">$1</span>');

      // 4. Numbers
      html = html.replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');

      // 5. Braces
      html = html.replace(/([\{\}\[\]\(\)])/g, '<span class="token-accent">$1</span>');

      strings.forEach((s, i) => { html = html.replace(`__S_${i}__`, s); });
      comments.forEach((c, i) => { html = html.replace(`__C_${i}__`, c); });

      editorText.innerHTML = html;

      const lineCount = content.split("\n").length;
      let gutterHTML = "";
      for (let i = 1; i <= lineCount; i++) { gutterHTML += `${i}<br>`; }
      editorGutter.innerHTML = gutterHTML;
    }
  }

  // ── File Node Clicks (desktop + mobile) ─────────────────────
  const fileNodes = document.querySelectorAll(
    "#sidebarAbout .sidebar-tree li[data-file], .mobile-about-filter .sidebar-tree li[data-file]"
  );
  fileNodes.forEach(node => {
    node.addEventListener("click", () => {
      fileNodes.forEach(n => n.classList.remove("active"));
      const file = node.dataset.file;
      document.querySelectorAll(`[data-file="${file}"]`).forEach(n => n.classList.add("active"));
      loadAboutFile(file);
    });
  });

  // ── Mobile Collapse Toggles ──────────────────────────────────
  ["mobileAboutTitlePersonal", "mobileAboutTitleProfessional"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", () => {
        el.classList.toggle("collapsed");
        const tree = el.nextElementSibling;
        if (tree) tree.style.display = el.classList.contains("collapsed") ? "none" : "block";
      });
    }
  });

  // ── Load default file ────────────────────────────────────────
  loadAboutFile("bio.js");
});
