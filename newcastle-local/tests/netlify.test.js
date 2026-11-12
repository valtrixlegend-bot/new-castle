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
