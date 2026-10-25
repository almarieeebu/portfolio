# Portfolio design QA

**final result: passed**

## Comparison target and evidence

- Source: `docs/design/approved-reference.png`, approved monochrome revision of the third displayed option.
- Browser implementation: `docs/design/desktop-verified.png`.
- Source pixels: 1488 × 1056. Browser capture: 1363 × 936, CSS viewport 1363 × 936, device density 1.
- Source is scaled uniformly to the implementation width, then bottom-cropped to the same viewport height, without distorting its aspect ratio.
- Full-view comparison: `docs/design/desktop-comparison.png`.
- Focused typography/hero comparison: `docs/design/hero-comparison.png`.
- State: home, document at top, images loaded, white hero / charcoal selected work.
- Mobile: `docs/design/mobile-390.png` and `docs/design/mobile-320.png`, content viewports 390 × 844 and 320 × 844, tested inside same-origin browser iframes. This checks CSS layout, not physical-device installation or browser chrome.
- Installation dialog: `docs/design/install-dialog.png`.

## Required fidelity surfaces

- **Fonts/typography:** existing self-hosted Sora and Source Sans 3 retained. Desktop headline uses the approved three-line hierarchy; supporting copy is legible. Body text in detailed panels and contact inputs is 16px. Header and CTA labels remain readable on narrow screens.
- **Spacing/layout rhythm:** horizontal header, two-column hero, selected-work image/copy pairing, generous spacing and full document scroll match the chosen direction. Mobile stacks content and has persistent five-link navigation. Buttons have at least 44px target height; below 360px the hero actions stack.
- **Colors/tokens:** the four requested brand values map to light/dark semantic tokens. Existing gold aliases now resolve to monochrome values. Favicon, install icons and sharing-image colors align with the brand. Colors inside existing illustrative project screenshots are intentionally preserved.
- **Image quality/assets:** the original repository portrait and project screenshots are used instead of fictional mock assets. The mock's decorative portrait backdrop is intentionally omitted to preserve the actual photograph. App icons are a clean rendition of the supplied m-dot screenshot, with maskable safe padding. No UI controls or text have been rasterized.
- **Copy/content:** approved hero statement and CTA are used; projects, professional descriptions, external links, CV and demo content remain grounded in repository data. Header adds the requested logo. The install dialog clearly describes a web app, not an APK or app-store listing.

## Comparison and correction history

1. P2: initial desktop headline/container proportions differed and the primary CTA wrapped at 320px. Increased headline size, narrowed the main container, tightened desktop hero spacing, and stacked mobile actions below 360px. Re-captured and compared the final desktop/phone views above.
2. P2: About timeline date overflowed the 320px viewport by 13px. Stacked role/date labels on small screens. Re-tested: document client/scroll width both 305px (320px iframe minus scrollbar), with no horizontal overflow.
3. P2: inline More work disclosure toggles reset page scroll and keyboard focus. Reproduced before fix: closing moved the disclosure from approximately 190px to 3216px below viewport. Separated explicit navigation view resets from inline disclosure updates. After fix: opening/closing stays near 463px/447px and retains the inline control; it no longer jumps to page top.

## Functional checks

- Home reload, Projects CTA, desktop navigation and Back restore the correct sections.
- Query and legacy hash parsing covered by automated tests.
- Project deep links reveal the selected project; inline disclosures open/close without jumping away.
- Mobile navigation exercised at 390px and 320px; Home, About and Contact checked without horizontal document overflow.
- Contact required-field validation blocks an empty submission; project-type selection works. No email was sent.
- Install dialog opens/closes on desktop and mobile; native dialog focus containment and manual installation instructions verified.
- Built manifest parsed and referenced icon pixel dimensions verified: 192px and 512px, plus 180px Apple icon.
- Worker tests cover live response, offline reconnect message and pass-through for assets, third-party traffic and non-GET requests. It stores no content cache.
- Existing college enrollment demo renders its role selector, applicant list, pipeline and business controls. Existing demo logic tests pass.
- Production browser console checked: no application JavaScript errors observed. Browser-extension metadata errors and unavailable local Vercel analytics are environment noise.
- `npm run test:portfolio`: 24/24 passed. `npm run lint`: passed. `npm run build`: passed.

## Verification constraints / follow-up

- Native Add to Home Screen acceptance, Android launcher rendering and Safari standalone mode require a real device on the deployed HTTPS origin. The local HTTP preview cannot prove those OS integrations.
- Development preview was unreliable in the mirrored environment (a compiler reported truncated generated manifests); browser verification used the successful production build. The application continues to use Next.js.
- P3: original photograph crop and real project imagery differ intentionally from the generated reference. No actionable P0/P1/P2 findings remain.
- Temporary responsive test fixture is removed from deliverables.
