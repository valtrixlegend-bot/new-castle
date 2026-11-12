(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NewcastleTranslation = factory();
})(typeof globalThis === 'undefined' ? this : globalThis, function () {
  'use strict';
  const directions = { en_uz: 'en|uz', uz_en: 'uz|en' };
  async function translate(text, direction, fetchImpl = fetch) {
    const input = String(text || '').trim();
    if (!input) throw new Error('Tarjima uchun matn tanlang');
    if (new TextEncoder().encode(input).length > 450) throw new Error('Matn juda uzun. Qisqaroq matn tanlang.');
    if (!directions[direction]) throw new Error('Tarjima yo‘nalishi noto‘g‘ri');
    let response;
    try {
      response = await fetchImpl('https://api.mymemory.translated.net/get?q=' + encodeURIComponent(input) + '&langpair=' + encodeURIComponent(directions[direction]));
    } catch (_) {
      throw new Error('Tarjima xizmatiga ulanib bo‘lmadi. Internetni tekshiring.');
    }
    if (!response.ok) throw new Error('Tarjima xizmati javob bermadi. Keyinroq urinib ko‘ring.');
    let data;
    try { data = await response.json(); } catch (_) { throw new Error('Tarjima xizmatidan noto‘g‘ri javob olindi.'); }
    if (!data || Number(data.responseStatus) !== 200 || typeof data.responseData?.translatedText !== 'string' || !data.responseData.translatedText.trim()) {
      throw new Error('Tarjima topilmadi yoki xizmat vaqtincha ishlamayapti.');
    }
    return data.responseData.translatedText.trim();
  }
  return { translate };
});
