// GitHub Pages is a temporary public demo with its own isolated database.
// Local Node / Vercel continue using their same-origin API.
window.__NEWCASTLE_API_URL__ = window.location.hostname === 'valtrixlegend-bot.github.io'
  ? 'https://mgzepixmvyixlmaijhhk.supabase.co/functions/v1/newcastle-48h-demo'
  : '/api/db';
if (window.location.hostname === 'valtrixlegend-bot.github.io') {
  document.addEventListener('DOMContentLoaded', function () {
    const notice = document.createElement('div');
    notice.textContent = 'OCHIQ DEMO: faqat soxta ma’lumot kiriting. Muddati 14-noyabr 2026, 15:43 UTC gacha.';
    notice.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:10000;background:#653d06;color:#fff;padding:5px 12px;text-align:center;font:12px/1.3 sans-serif;pointer-events:none';
    document.body.appendChild(notice);
  });
}
