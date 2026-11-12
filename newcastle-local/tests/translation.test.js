const test = require('node:test');
const assert = require('node:assert/strict');
const { translate } = require('../public/translation');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ok = text => ({ ok: true, json: async () => ({ responseStatus: 200, responseData: { translatedText: text } }) });
test('tarjima ikkala yo‘nalishda va maxsus belgilar bilan ishlaydi', async () => {
  const urls = [];
  const mock = async url => { urls.push(new URL(url)); return ok('salom'); };
  assert.equal(await translate('hello & world', 'en_uz', mock), 'salom');
  assert.equal(urls[0].searchParams.get('q'), 'hello & world');
  assert.equal(urls[0].searchParams.get('langpair'), 'en|uz');
  await translate('salom', 'uz_en', mock);
  assert.equal(urls[1].searchParams.get('langpair'), 'uz|en');
});
test('tarmoq, xizmat va noto‘g‘ri so‘rov xatolari tushunarli', async () => {
  await assert.rejects(translate('hello','en_uz', async () => { throw Error('network'); }), /ulanib/);
  await assert.rejects(translate('hello','en_uz', async () => ({ok:false})), /javob bermadi/);
  await assert.rejects(translate('hello','en_uz', async () => ({ok:true, json:async()=>({responseStatus:429})})), /topilmadi/);
  await assert.rejects(translate('x'.repeat(451),'en_uz', async()=>ok('x')), /uzun/);
  await assert.rejects(translate('hello','bad', async()=>ok('x')), /yo‘nalishi/);
});
test('interfeys lug‘atlarida kalitlar mos', () => {
  const text = fs.readFileSync(path.join(__dirname, '../public/assets/index-DKwGrC2V.js'), 'utf8');
  const start = text.indexOf('var bO=') + 7;
  const end = text.indexOf(',xO=', start);
  const dictionary = vm.runInNewContext('(' + text.slice(start,end) + ')');
  assert.deepEqual(Object.keys(dictionary.uz).sort(), Object.keys(dictionary.en).sort());
});
