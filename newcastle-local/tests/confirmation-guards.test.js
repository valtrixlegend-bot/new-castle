const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// The application currently ships as a bundle; guard against accidentally
// dropping the explicit confirmation at these mutation entry points.
const bundle = fs.readFileSync(path.join(__dirname, '../public/assets/index-DKwGrC2V.js'), 'utf8');
for (const [name, pattern] of [
  ['group deletion', /function d\(e\)\{if\(!window\.confirm\((?:__uiTranslate\()?[`"]Guruhni o'chirish/],
  ['product deletion', /function c\(e\)\{if\(!window\.confirm\((?:__uiTranslate\()?[`"]Mahsulotni o'chirish/],
  ['message deletion', /function S\(e\)\{c&&window\.confirm\((?:__uiTranslate\()?[`"]Xabarni o'chirish/],
  ['group editing', /if\(t&&!window\.confirm\(__uiTranslate\(`Guruhdagi o'zgarishlarni/],
  ['product editing', /e&&!window\.confirm\((?:__uiTranslate\()?[`"]Mahsulotdagi o'zgarishlarni/],
  ['account editing', /if\(!window\.confirm\((?:__uiTranslate\()?[`"]Hisobdagi o'zgarishlarni/],
  ['attendance saving', /if\(!window\.confirm\((?:__uiTranslate\()?[`"]Davomatni saqlash/],
  ['payment status', /if\(!window\.confirm\((?:__uiTranslate\()?[`"]To'lov holatini o'zgartirish/],
  ['support cancellation', /if\(!window\.confirm\((?:__uiTranslate\()?[`"]Support so'rovini bekor/],
  ['coin balance', /window\.confirm\((?:__uiTranslate\()?[`"]Coin balansini o'zgartirish/],
]) {
  test(`confirmation guard: ${name}`, () => assert.match(bundle, pattern));
}
