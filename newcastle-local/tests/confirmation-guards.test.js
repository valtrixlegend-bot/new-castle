const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// The application currently ships as a bundle; guard against accidentally
// dropping the explicit confirmation at these mutation entry points.
const bundle = fs.readFileSync(path.join(__dirname, '../public/assets/index-DKwGrC2V.js'), 'utf8');
for (const [name, pattern] of [
  ['group deletion', /function d\(e\)\{if\(!window\.confirm\(`Guruhni o'chirish/],
  ['product deletion', /function c\(e\)\{if\(!window\.confirm\(`Mahsulotni o'chirish/],
  ['message deletion', /function S\(e\)\{c&&window\.confirm\(`Xabarni o'chirish/],
  ['group editing', /if\(t&&!window\.confirm\(__uiTranslate\(`Guruhdagi o'zgarishlarni/],
  ['product editing', /e&&!window\.confirm\(`Mahsulotdagi o'zgarishlarni/],
  ['account editing', /if\(!window\.confirm\(`Hisobdagi o'zgarishlarni/],
  ['attendance saving', /if\(!window\.confirm\(`Davomatni saqlash/],
  ['payment status', /if\(!window\.confirm\(`To'lov holatini o'zgartirish/],
  ['support cancellation', /if\(!window\.confirm\(`Support so'rovini bekor/],
  ['coin balance', /window\.confirm\(`Coin balansini o'zgartirish/],
]) {
  test(`confirmation guard: ${name}`, () => assert.match(bundle, pattern));
}
