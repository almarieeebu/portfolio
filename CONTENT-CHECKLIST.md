# Content checklist (private)

All site copy lives in `src/lib/content.ts`. The CV is `public/cv-developer.html` (plus its PDF) and must say the same thing as the site. The Frappe / ERPNext CV was dropped; `/cv.html` redirects to the main CV.

## Confirmed

- Current role: Product Owner, Livro Systems, Inc., January 2026 – Present.
- GitHub profile is `almarieeebu` (the old `almariebu` returns 404).
- Public address: `https://portfolio-almariebu.vercel.app` (loads).
  `almariedev.com` fails DNS. No DNS or hosting change has been made.

## Facts still needed (nothing is invented in the meantime)

- [~] **Dates per contribution.** 2025–26 is now dated from the ERP ticket history
      (enrollment, discounts, migration). Account closing and online payments are still
      undated: check the old Wela ERP (2020 to March 2025).
- [ ] **Team vs you.** For each story: who else worked on it, and what did they own?
- [ ] **Product decisions and tradeoffs.** Pages only list rules from the public demo code.
      Real decisions you made (what was cut, what you weighed, who you consulted) are missing.
- [ ] **Outcomes.** No metrics, adoption, time saved, or user feedback are published. Supply
      numbers or quotes you can stand behind, and where they come from.
- [ ] **Product Owner evidence.** What backlog, prioritisation, stakeholder or release
      decisions have you owned since January 2026? No PO résumé exists, so none is labelled as one.
- [ ] **ERP Livro employee lifecycle.** Only "develop and maintain onboarding, offboarding,
      and access requests" is known. It stays in Experience until there is a real story.
- [ ] **Grading and SMS/email.** Removed from the showcase. Demos remain at `/demo/grading`
      and `/demo/sms-and-email`. Say if they should be linked somewhere.
- [ ] **LinkedIn URL** could not be verified automatically (LinkedIn blocks bots). Please click it.
- [ ] **Domain.** If `almariedev.com` is yours, decide whether to point it at Vercel, then
      update `site.url` and the CV.
- [ ] **Education** is on no résumé or page.

## When something changes

- Role or dates: `experience` in `content.ts`, then the CV HTML file, then regenerate the PDF
  (`Chrome --headless --print-to-pdf`).
- Domain: `site.url` in `content.ts`, the portfolio link in the CV, regenerate the PDF.
- Run `bash scripts/check-cv.sh public/cv-developer.html` after CV edits.

- Positioning follows PR #20: React, TypeScript, Tailwind, Vitest and Playwright are shown as "Currently learning", not production experience.
