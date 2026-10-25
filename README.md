# Almarie Bullo — Software Developer & Product Owner

Personal portfolio. Live at [portfolio-almariebu.vercel.app](https://portfolio-almariebu.vercel.app/).
The custom domain `almariedev.com` did not resolve in DNS when last checked, so no file points at it.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS, Vercel

## Develop

```bash
npm install
npm run dev
```

| Command | Description |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Node tests (demo business rules, legacy-link map) |

## Structure

- `/` — introduction, three selected stories, code samples, experience, résumé and contact.
- `/work/<slug>` — one shareable case-study page per story.
- `/demo/*` — browser simulations of the school-system rules, using sample data.
- Old links (`/?panel=…&study=…`, `/work/<old-slug>`, `/#work/<slug>`) are mapped in `src/lib/redirects.ts`.

All copy lives in `src/lib/content.ts`. Missing facts are tracked in `CONTENT-CHECKLIST.md`, not on the site.
