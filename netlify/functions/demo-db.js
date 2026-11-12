'use strict';
// Temporary demonstration proxy; the upstream API is publicly accessible and
// expires on 2026-11-14 at 15:43 UTC. Do not use with private data.
const UPSTREAM = 'https://mgzepixmvyixlmaijhhk.supabase.co/functions/v1/newcastle-48h-demo';
const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };

exports.handler = async (event) => {
  if (!['GET', 'PUT'].includes(event.httpMethod)) {
    return { statusCode: 405, headers: { ...headers, Allow: 'GET, PUT' }, body: JSON.stringify({ ok: false, error: 'Metod ruxsat etilmagan' }) };
  }
  try {
    const body = event.body && event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;
    const response = await fetch(UPSTREAM, {
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
