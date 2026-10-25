# Portfolio Refresh Implementation Plan

> Execute inline using superpowers:executing-plans. User authorized implementation with "Proceed".

**Goal:** Implement the approved monochrome desktop/mobile portfolio and branded home-screen installation.
**Architecture:** Reuse Next.js, content data and existing panels. Use a scrolling editorial home and query-addressable detail views, with native browser installation.
**Tech Stack:** Next.js 16.3.2, React 19, Tailwind 4, browser APIs.
**Spec:** docs/superpowers/specs/2026-10-26-portfolio-design.md

## Global Constraints
- Charcoal #111111; gray #6B7280; light gray #E5E7EB; white #FFFFFF.
- Keep demos, CV links, contact behavior and stored content intact.
- Use supplied logo for install icons; no pretend app-store downloads.
- Work on feat/monochrome-responsive-portfolio; do not merge main.

## Review Focus
- Query/legacy hash links and Back restore the right section.
- Small screens and enlarged text retain all controls without horizontal overflow.
- Native install prompt unavailable, dismissed, or already installed gives truthful guidance.
- A service worker never caches stale portfolio pages or third-party requests.
- Project images and portrait use real repository assets and correct proportions.

### Task 1: Responsive editorial layout
**Files:** src/components/PortfolioShell.tsx, src/components/panels/HomePanel.tsx, src/app/globals.css, src/app/page.tsx, src/lib/navigation.ts, scripts/navigation.test.mjs
**Interfaces:** preserve initialPanel/initialStudy/initialPart and existing panel data.
- [x] Add navigation regression tests for home default, queries and legacy hashes; run to observe expected missing helper failure.
- [x] Add readPortfolioLocation(search, hash), remove desktop-only redirects, build editorial hero and selected work from actual content, keep detail panels and query history.
- [x] Replace fixed viewport layout with document scroll and responsive header/footer navigation; map legacy semantic tokens to monochrome palette.
- [x] Run navigation tests and lint.

### Task 2: Branded installation
**Files:** src/components/InstallPortfolio.tsx, src/app/manifest.ts, src/app/layout.tsx, public/icons/*.png, public/sw.js, scripts/service-worker.test.mjs
**Interfaces:** InstallPortfolio renders a trigger/dialog and registers the worker. Manifest points to real 192/512 icons and home start URL.
- [x] Test network-only worker navigation fallback, pass-through and lifecycle behavior before implementation.
- [x] Prepare supplied logo icons, metadata/manifest and accessible install dialog with native-prompt and manual browser instructions.
- [x] Implement worker without content caching; run regression tests, lint, production build.

### Task 3: Visual and functional verification / review handoff
**Files:** design-qa.md, docs/superpowers/plans/2026-10-26-portfolio-refresh.md
- [x] Open browser preview, compare approved reference and desktop capture in one visual input, inspect mobile at 390px/320px via temporary iframe fixture.
- [x] Verify navigation, Back, query links, demo, contact validation, install dialog and console; fix substantive problems.
- [x] Record evidence and constraints.
- [ ] Commit and push review branch; open draft PR.
