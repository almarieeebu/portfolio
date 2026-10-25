# Almarie Bullo — Web Development · Product Ownership · Quality Assurance

Personal portfolio and CVs: an IT professional with 6+ years of web development experience, open to Web Developer, Product Owner, and Quality Assurance roles. Live at [almariedev.com](https://almariedev.com/).

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vercel

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run test:portfolio` | Navigation, installation worker, and existing demo logic tests (Node 24) |
| `npm run preview` | Serve the production build; accepts preview host/port flags |

## Customize

Edit `src/lib/content.ts` for copy, projects, tools, and contact links.

Panels are shareable via query string, e.g. `/?panel=work` or `/?panel=about`.

The home page uses the monochrome brand palette and responsive editorial layout.
The footer's **Install portfolio** action uses the mariabu.dev logo for home-screen
installation. Chromium shows its native prompt when available; other browsers get
installation instructions. This is a web app, not an APK or app-store download.
Test actual installation on the deployed HTTPS site. The service worker never
caches portfolio content; offline visits show a reconnect message.

## Deploy

Connected to GitHub. Vercel deploys automatically from `main`.
