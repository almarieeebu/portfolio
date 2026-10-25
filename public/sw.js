/* No page or asset cache: every visit sees the current deployed portfolio. */
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || request.mode !== 'navigate' ||
      new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(fetch(request).catch(() => new Response(
    '<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="theme-color" content="#111111"><title>Reconnect | Almarie Bullo</title>' +
    '<body style="margin:0;padding:48px 24px;background:#111111;color:#FFFFFF;font:18px/1.6 system-ui">' +
    '<main style="max-width:36rem;margin:auto"><h1>You’re offline.</h1>' +
    '<p>Reconnect to view the latest portfolio and interactive demos.</p>' +
    '<a href="" style="display:inline-block;padding:12px 24px;background:#FFFFFF;color:#111111;border-radius:28px">Try again</a>' +
    '</main></body></html>',
    { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } },
  )));
});
