// GitHub Pages is a temporary public demo with its own isolated database.
// Local Node / Vercel continue using their same-origin API.
window.__NEWCASTLE_API_URL__ = window.location.hostname === 'valtrixlegend-bot.github.io'
  ? 'https://mgzepixmvyixlmaijhhk.supabase.co/functions/v1/newcastle-48h-demo'
  : '/api/db';
