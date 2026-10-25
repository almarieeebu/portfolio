# Approved portfolio design

User selected the third displayed concept, then approved its monochrome revision and supplied the mariabu.dev m-dot logo for mobile installation.

Keep the existing Next.js repository and existing project data, demos, query links, CV and contact form. Replace the fixed sidebar with a horizontal header, spacious white hero, real portrait, primary Projects action and View CV, followed by a charcoal selected-work section. Existing detailed sections remain accessible from navigation. On mobile stack the hero and projects, use readable 16px body type, 44px controls, safe-area spacing and visible section navigation. Restore normal document scrolling.

Palette: charcoal #111111, gray #6B7280, light gray #E5E7EB, white #FFFFFF. Preserve existing fonts. Keep content claims grounded in repository data; do not fabricate statistics or qualifications.

Approaches: retain the current split layout (least change but less reading space); replace it with the selected editorial layout (chosen by user); rebuild in a different framework (unnecessary). Use the approved layout within the existing runtime.

Logo: prepare app icons from the supplied mark. Provide web-app home-screen installation, not a fictitious APK or store listing. A manifest, Apple icon, minimal network-first worker and an accessible installation dialog cover this. Explain browser installation when a native prompt is unavailable. No offline portfolio cache or push notifications.

Validation: lint, production build, navigation regression tests, install worker checks, browser comparison to the approved visual, mobile iframe viewport checks, primary links/contact/install/back navigation and console errors. Deliver changes on a review branch and draft PR; do not merge.
