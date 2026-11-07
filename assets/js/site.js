/* Anirban Routh — portfolio script: mobile menu + contact form. */
document.addEventListener("DOMContentLoaded", () => {
  // ── Mobile menu ──
  const btn = document.getElementById("menuBtn");
  const list = document.getElementById("navList");
  if (btn && list) {
    btn.addEventListener("click", () => {
      const open = list.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ── Contact form (only on contact.html) ──
  const form = document.getElementById("contactForm");
  if (!form) return;

  const EMAILJS = {
    publicKey: "-GbqVuMJ4x5jl6QGe",
    serviceId: "service_4tdx2um",
    templateId: "template_yp3l3cb",
  };
  const MAIL_FALLBACK = "anirban@anirbanrouth.in";

  const status = document.getElementById("formStatus");
  const sendBtn = document.getElementById("sendBtn");
  const box = document.getElementById("formBox");
  const done = document.getElementById("formDone");
  const again = document.getElementById("sendAnother");

  const setStatus = (msg, isError) => {
    status.textContent = msg;
    status.classList.toggle("error", !!isError);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) return setStatus("Please fill in all three fields.", true);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus("That email address doesn't look right.", true);

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending…";
    setStatus("");
    try {
      if (!window.emailjs) throw new Error("emailjs unavailable");
      window.emailjs.init({ publicKey: EMAILJS.publicKey });
      await window.emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, { name, email, message });
      box.style.display = "none";
      done.style.display = "block";
      form.reset();
    } catch (err) {
      setStatus("Sorry, that didn't send. Please email me directly at " + MAIL_FALLBACK + ".", true);
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send message";
    }
  });

  if (again) {
    again.addEventListener("click", () => {
      done.style.display = "none";
      box.style.display = "block";
      setStatus("");
    });
  }
});
