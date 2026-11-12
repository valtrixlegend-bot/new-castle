// UI convenience for the public demo only; this is not authentication.
(function (root) {
  const key = 'newcastle_demo_session_user';
  const enabled = root.location.hostname === 'valtrixlegend-bot.github.io';
  root.NewcastleDemoSession = {
    get() { try { return enabled ? root.sessionStorage.getItem(key) : null; } catch (_) { return null; } },
    set(id) { try { if (enabled) root.sessionStorage.setItem(key, id); } catch (_) {} },
    clear() { try { if (enabled) root.sessionStorage.removeItem(key); } catch (_) {} },
  };
})(window);
