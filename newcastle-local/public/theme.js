(function () {
  const key = 'newcastle_theme';
  const root = document.documentElement;
  let theme = 'dark';
  try {
    const saved = localStorage.getItem(key);
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (_) { /* Theme switching still works when storage is unavailable. */ }

  function apply(value) {
    theme = value;
    root.dataset.theme = value;
    root.style.colorScheme = value;
    const button = document.getElementById('theme-toggle');
    if (button) {
      const label = value === 'dark' ? 'Yorug‘ rejimga o‘tish' : 'Qora rejimga o‘tish';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(value === 'dark'));
    }
  }
  apply(theme);
  document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    apply(theme);
    button.addEventListener('click', function () {
      apply(theme === 'dark' ? 'light' : 'dark');
      try { localStorage.setItem(key, theme); } catch (_) { /* no storage */ }
    });
  });
})();
