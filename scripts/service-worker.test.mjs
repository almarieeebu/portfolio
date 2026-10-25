import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

function worker(network) {
  const handlers = {};
  vm.runInNewContext(readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8'), {
    self: { location: { origin: 'https://portfolio.test' }, addEventListener: (name, fn) => { handlers[name] = fn; } },
    fetch: network, Response, URL,
  });
  return handlers.fetch;
}
function navigation(url = 'https://portfolio.test/?panel=work') {
  return { request: { url, method: 'GET', mode: 'navigate' } };
}
test('navigation always reads the live response without caching', async () => {
  const response = new Response('fresh portfolio');
  const handler = worker(async () => response);
  let pending;
  handler({ ...navigation(), respondWith(value) { pending = value; } });
  assert.equal(await pending, response);
});
test('offline navigation explains that connection is required', async () => {
  const handler = worker(async () => { throw new Error('offline'); });
  let pending;
  handler({ ...navigation(), respondWith(value) { pending = value; } });
  const response = await pending;
  assert.equal(response.status, 503);
  assert.match(await response.text(), /Reconnect/);
  assert.match(response.headers.get('content-type'), /text\/html/);
});
test('assets, third-party requests and non-GET requests are untouched', () => {
  const handler = worker(() => { throw new Error('must not intercept'); });
  const forbidden = () => assert.fail('must not call respondWith');
  handler({ ...navigation('https://other.test/'), respondWith: forbidden });
  handler({ request: { url: 'https://portfolio.test/image.png', method: 'GET', mode: 'cors' }, respondWith: forbidden });
  handler({ request: { url: 'https://portfolio.test/', method: 'POST', mode: 'navigate' }, respondWith: forbidden });
});
