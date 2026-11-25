# Abdul Ahad — DevOps Engineer & Cloud Architect Portfolio

A modern, production-grade personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Bootstrap 5 via custom SCSS**, **Framer Motion**, **GSAP ScrollTrigger**, and **Lenis Smooth Scroll**.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Bootstrap 5 customized via SCSS (`styles/_bootstrap-custom.scss`, `styles/_variables.scss`), dark default mode with `next-themes`
- **Components**: `react-bootstrap` (Navbar, Offcanvas, Modal)
- **Animations**: `framer-motion` (reveals, micro-interactions, layout transitions), `gsap` + `ScrollTrigger` (experience timeline), `@studio-freight/lenis` (smooth scroll)
- **Forms**: `react-hook-form` + `zod` with graceful mailto fallback
- **Icons**: `react-icons`

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

### 3. Build & Production Start
```bash
npm run build
npm run start
```

### 4. Code Quality & Type Check
```bash
npm run lint
npm run typecheck
```

---

## Environment Variables

All environment variables are optional. The portfolio is preconfigured to function without any required variables.

See `.env.example`:
```env
# Optional Resend credentials for contact form submissions.
# If omitted or if sending fails, the contact form seamlessly falls back to opening prefilled mailto:abdul12101ahad@gmail.com
RESEND_API_KEY=
CONTACT_TO_EMAIL=abdul12101ahad@gmail.com

# Optional custom site canonical URL
NEXT_PUBLIC_SITE_URL=https://abdulahad.dev
```

---

## Managing the CV / Resume

The resume file is served directly from the Next.js `public/` directory:
- Path: `public/Abdul_Ahad_DevOps_Resume.pdf`
- Referenced throughout the site as `/Abdul_Ahad_DevOps_Resume.pdf` via `lib/constants.ts`

### How to update or replace the CV:
To update the CV, simply replace the file at:
```
public/Abdul_Ahad_DevOps_Resume.pdf
```
Ensure the filename matches exactly: `Abdul_Ahad_DevOps_Resume.pdf`.

---

## Deploy to Vercel

This repository is ready to deploy on Vercel with zero manual configuration:
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In the Vercel dashboard, click **Add New** &rarr; **Project** and import this repository.
3. Keep the default Next.js build settings (`npm run build`).
4. (Optional) Add your `RESEND_API_KEY` and `CONTACT_TO_EMAIL` environment variables in Project Settings &rarr; Environment Variables.
5. Click **Deploy**.
