const test = require('node:test');
const assert = require('node:assert/strict');
const { handler } = require('../../netlify/functions/demo-db');

test('Netlify proxy demo GET va PUT so‘rovlarini uzatadi', async t => {
  const requests = [];
  t.mock.method(globalThis, 'fetch', async (url, opts) => { requests.push({ url, opts }); return new Response('{"ok":true}', { status: 200 }); });
  assert.equal((await handler({httpMethod:'GET'})).statusCode, 200);
  assert.equal((await handler({httpMethod:'PUT', body:'{"payload":"{}"}'})).statusCode, 200);
  assert.equal(requests[1].opts.body, '{"payload":"{}"}');
  assert.match(requests[0].url, /newcastle-48h-demo/);
});
test('Netlify proxy xatolarni va demo muddati tugashini qaytaradi', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response('{"error":"expired"}', { status: 410 }));
  assert.equal((await handler({httpMethod:'GET'})).statusCode, 410);
  assert.equal((await handler({httpMethod:'DELETE'})).statusCode, 405);
});
test('classic va pilot saytlar faqat o‘zlariga ajratilgan bazaga ulanadi', async t => {
  const old = process.env.NEWCASTLE_DEMO;
  t.after(() => { if (old === undefined) delete process.env.NEWCASTLE_DEMO; else process.env.NEWCASTLE_DEMO = old; });
  const urls = [];
  t.mock.method(globalThis, 'fetch', async url => { urls.push(url); return new Response('{}', { status: 200 }); });
  delete process.env.NEWCASTLE_DEMO;
  assert.equal((await handler({httpMethod:'GET'})).statusCode, 200);
  process.env.NEWCASTLE_DEMO = 'classic';
  assert.equal((await handler({httpMethod:'GET'})).statusCode, 200);
  process.env.NEWCASTLE_DEMO = 'unknown';
  assert.equal((await handler({httpMethod:'GET'})).statusCode, 503);
  assert.match(urls[0], /newcastle-48h-demo$/);
  assert.match(urls[1], /newcastle-classic-demo$/);
  assert.equal(urls.length, 2);
});
