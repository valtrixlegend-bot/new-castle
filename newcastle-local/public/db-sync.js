// Demo consistency only: this does not provide authentication or privacy.
(function (root) {
  let revision = null;
  let queue = Promise.resolve();
  let blocked = false;
  const endpoint = () => root.__NEWCASTLE_API_URL__ || '/api/db';
  function fail(message) {
    if (blocked) return;
    blocked = true;
    root.dispatchEvent(new CustomEvent('ns-save-error'));
    root.alert(message + '\n\nBu oynadagi saqlanmagan o‘zgarishlar yo‘qolishi mumkin. Sahifani yangilang va qayta kiriting.');
  }
  root.NewcastleSync = {
    async load() {
      await queue;
      const response = await fetch(endpoint(), { cache: 'no-store' });
      if (!response.ok) throw Error('Baza javob bermadi (HTTP ' + response.status + ')');
      const data = await response.json();
      if (typeof data.payload !== 'string' || typeof data.revision !== 'string' || !data.revision) throw Error('Baza versiyasi olinmadi');
      const db = JSON.parse(data.payload);
      if (!db || !Array.isArray(db.users)) throw Error('Baza tuzilmasi noto‘g‘ri');
      for (const key of ['mainAttendance', 'messages', 'paymentRequests', 'groups', 'payments']) db[key] ||= [];
      revision = data.revision;
      blocked = false;
      return db;
    },
    save(db) {
      const payload = JSON.stringify(db);
      queue = queue.then(async () => {
        if (blocked) return false;
        if (!revision) { fail('Baza versiyasi noma’lum; saqlash to‘xtatildi.'); return false; }
        try {
          const response = await fetch(endpoint(), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ payload, revision }) });
          if (response.status === 409 || response.status === 428) { fail('Ma’lumot boshqa oynada o‘zgargan. Ustiga yozilmasligi uchun saqlash to‘xtatildi.'); return false; }
          if (!response.ok) throw Error('HTTP ' + response.status);
          const result = await response.json();
          if (typeof result.revision !== 'string' || !result.revision) throw Error('Saqlangan versiya olinmadi');
          revision = result.revision;
          return true;
        } catch (error) {
          console.error('saveDB error', error);
          fail('Saqlash natijasi noma’lum yoki internetda xatolik yuz berdi. Keyingi saqlashlar to‘xtatildi.');
          return false;
        }
      });
      return queue;
    }
  };
})(window);
