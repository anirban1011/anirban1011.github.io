/**
 * contact.js — Contact page script
 * Handles: form validation, EmailJS send, live code preview, mobile collapse
 */

const emailJsConfig = {
  publicKey:  "-GbqVuMJ4x5jl6QGe",
  serviceId:  "service_4tdx2um",
  templateId: "template_yp3l3cb",
};

function canUseEmailJs() {
  return Boolean(
    window.emailjs &&
    emailJsConfig.publicKey &&
    emailJsConfig.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY" &&
    emailJsConfig.serviceId &&
    emailJsConfig.templateId
  );
}

document.addEventListener("DOMContentLoaded", () => {
  // ── Mobile Collapse ──────────────────────────────────────────
  ["mobileContactTitleInfo", "mobileContactTitleFindMe"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", () => {
        el.classList.toggle("collapsed");
        const tree = el.nextElementSibling;
        if (tree) tree.style.display = el.classList.contains("collapsed") ? "none" : "block";
      });
    }
  });

  // ── Live Code Preview ────────────────────────────────────────
  const nameInput    = document.getElementById("nameInput");
  const emailInput   = document.getElementById("emailInput");
  const messageInput = document.getElementById("messageInput");
  const previewName  = document.getElementById("previewName");
  const previewEmail = document.getElementById("previewEmail");
  const previewMsg   = document.getElementById("previewMessage");
  const previewDate  = document.getElementById("previewDate");

  function updatePreview() {
    if (previewName)  previewName.textContent  = nameInput.value    ? `"${nameInput.value}"` : '""';
    if (previewEmail) previewEmail.textContent = emailInput.value   ? `"${emailInput.value}"` : '""';
    if (previewMsg)   previewMsg.textContent   = messageInput.value
      ? `"${messageInput.value.substring(0, 40)}${messageInput.value.length > 40 ? "..." : ""}"` : '""';

    if (previewDate) {
      const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const now = new Date();
      previewDate.textContent = `"${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}"`;
    }
  }

  if (nameInput && emailInput && messageInput) {
    nameInput.addEventListener("input", updatePreview);
    emailInput.addEventListener("input", updatePreview);
    messageInput.addEventListener("input", updatePreview);
    updatePreview();
  }

  // ── Form Validation & Submission ─────────────────────────────
  const contactForm          = document.getElementById("contactForm");
  const formStatus           = document.getElementById("formStatus");
  const submitButton         = document.getElementById("sendBtn");
  const contactFormContainer = document.getElementById("contactFormContainer");
  const contactSuccess       = document.getElementById("contactSuccessContainer");
  const btnSendNew           = document.getElementById("btnSendNewMessage");
  const emailGroup           = document.getElementById("emailGroup");

  if (emailInput && emailGroup) {
    emailInput.addEventListener("input", () => emailGroup.classList.remove("has-error"));
  }

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name    = nameInput.value.trim();
      const email   = emailInput.value.trim();
      const msgText = messageInput.value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        emailGroup?.classList.add("has-error");
        return;
      }
      emailGroup?.classList.remove("has-error");

      if (!name || !email || !msgText) {
        formStatus.textContent = "Please complete all fields.";
        formStatus.style.color = "#e28972";
        return;
      }

      const origText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "sending...";
      formStatus.textContent = "";

      try {
        if (canUseEmailJs()) {
          window.emailjs.init({ publicKey: emailJsConfig.publicKey });
          await window.emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, { name, email, message: msgText });
        } else {
          const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
          const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msgText}`);
          window.location.href = `mailto:developer@anirbanrouth.in?subject=${subject}&body=${body}`;
        }

        if (contactFormContainer && contactSuccess) {
          contactFormContainer.style.display = "none";
          contactSuccess.style.display = "flex";
        }
        contactForm.reset();
        updatePreview();
      } catch (err) {
        formStatus.textContent = "Submission failed. Please email directly.";
        formStatus.style.color = "#e28972";
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = origText;
      }
    });
  }

  if (btnSendNew) {
    btnSendNew.addEventListener("click", () => {
      if (contactFormContainer && contactSuccess) {
        contactSuccess.style.display = "none";
        contactFormContainer.style.display = "block";
      }
      if (formStatus) formStatus.textContent = "";
      if (contactForm) contactForm.reset();
      updatePreview();
    });
  }
});
