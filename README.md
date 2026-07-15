# Responsive Developer Portfolio

This repository contains a responsive, dark/light themed developer portfolio website featuring smooth transitions, scroll animations, glassmorphism, project category filtering, and modal detail views.

## How to Customize

To make this portfolio your own, you should update the text and configurations across these files:

### 1. Update Personal Information
Open `index.html` and modify:
- Meta tags in the `<head>` section (description, author, keywords).
- Heading title, role descriptors, bio copy, and social links (GitHub, LinkedIn, LeetCode) in the `#home` section.
- Profile image by replacing `images/profile.png` with your own image.
- Bio paragraphs, email address, location, and focus areas in the `#about` section.
- Skill meters (update percentages and labels) in the `#skills` section.
- Project cards (titles, descriptions, categories `web`/`app`, live/GitHub links) in the `#projects` section.
- Work experience items in the `#experience` section.
- Contact details (phone, email, WhatsApp link) in the `#contact` section.
- Copyright footer text.

### 2. Replace Resume PDF
Replace `Shayan_Sarkar_Resume.pdf` in the root folder with your own resume PDF, ensuring the file name matches exactly or update the link in `index.html` (line 88).

### 3. Configure Contact Form (EmailJS)
The contact form uses **EmailJS** to send form submissions directly to your email box.
1. Sign up for a free account at [EmailJS](https://www.emailjs.com/).
2. Create an Email Service and an Email Template.
3. Open `assets/js/index.js` and update the config block at the top of the file:
   ```javascript
   const emailJsConfig = {
     publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
     serviceId: "YOUR_EMAILJS_SERVICE_ID",
     templateId: "YOUR_EMAILJS_TEMPLATE_ID",
   };
   ```
4. Update the fallback email address (line 262 & 287) to your own email address.

---

## Hosting on GitHub Pages

Since this website is built with vanilla HTML, CSS, and JavaScript, it does not require any compile/build steps. It can be hosted directly on GitHub Pages for free:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com/) and click **New** to create a new repository.
2. Name your repository (e.g., `portfolio`) and keep it public. Do not initialize it with a README or `.gitignore` since they are already included here.

### Step 2: Push the Code to GitHub
Open a terminal in your project directory and run:
```bash
git init
git add .
git commit -m "Initial commit of portfolio website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```
*(Replace `<your-username>` and `<your-repo-name>` with your actual GitHub username and repository name.)*

### Step 3: Enable GitHub Pages
1. On GitHub, navigate to your repository.
2. Click on the **Settings** tab.
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
5. Under **Branch**, select `main` (or the branch you pushed to) and set the folder to `/ (root)`.
6. Click **Save**.

Within a few minutes, GitHub Actions will build and deploy your site. You will see a message at the top of the settings page: *"Your site is live at https://<your-username>.github.io/<your-repo-name>/"*.
