'use strict';
// Public demos only. Keep the default pilot database unchanged on the existing
// site; the separate classic site must explicitly select its own database.
const UPSTREAMS = Object.freeze({
  pilot: 'https://mgzepixmvyixlmaijhhk.supabase.co/functions/v1/newcastle-48h-demo',
  classic: 'https://mgzepixmvyixlmaijhhk.supabase.co/functions/v1/newcastle-classic-demo',
});
const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };

exports.handler = async (event) => {
  if (!['GET', 'PUT'].includes(event.httpMethod)) {
    return { statusCode: 405, headers: { ...headers, Allow: 'GET, PUT' }, body: JSON.stringify({ ok: false, error: 'Metod ruxsat etilmagan' }) };
  }
  const mode = process.env.NEWCASTLE_DEMO || 'pilot';
  if (!Object.hasOwn(UPSTREAMS, mode)) {
    return { statusCode: 503, headers, body: JSON.stringify({ ok: false, error: 'Demo turi noto‘g‘ri sozlangan' }) };
  }
  try {
    const body = event.body && event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;
    const response = await fetch(UPSTREAMS[mode], {
      method: event.httpMethod,
      headers: { 'Content-Type': 'application/json' },
      ...(event.httpMethod === 'PUT' ? { body: body || '' } : {}),
      signal: AbortSignal.timeout(15000),
    });
    return { statusCode: response.status, headers, body: await response.text() };
  } catch (_) {
    return { statusCode: 502, headers, body: JSON.stringify({ ok: false, error: 'Demo bazaga ulanib bo‘lmadi' }) };
  }
};
