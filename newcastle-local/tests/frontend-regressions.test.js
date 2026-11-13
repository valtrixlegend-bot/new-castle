const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = p => fs.readFileSync(path.join(__dirname, '..', 'public', p), 'utf8');

test('short screens use the available viewport and dialogs have accessible labels', () => {
  const css = read('theme.css');
  assert.match(css, /height: 100dvh/);
  assert.match(css, /ns-soft-enter \{ from \{ opacity: 0; \} to \{ opacity: 1; \} \}/);
  const js = read('assets/index-DKwGrC2V.js');
  assert.match(js, /role:`dialog`,"aria-modal":!0,"aria-label":e/);
  assert.match(js, /"aria-label":`Yopish`/);
});

test('homework selection uses teacher groups and requires confirmation', () => {
  const js = read('assets/index-DKwGrC2V.js');
  const section = js.slice(js.indexOf('function Ak('), js.indexOf('function jk('));
  assert.match(section, /t\.teacherId===e\.id/);
  assert.match(section, /homework-group-students/);
  assert.match(section, /new Set\(\[\.\.\.prev/);
  assert.match(section, /Vazifani tanlangan o'quvchilarga berishni tasdiqlaysizmi/);
});

test('account creation has English labels and a confirmation', () => {
  const js = read('assets/index-DKwGrC2V.js');
  const section = js.slice(js.indexOf('function Vk('), js.indexOf('function Hk('));
  assert.match(section, /`To'liq ism`,`Full name`/);
  assert.match(section, /Yangi hisob yaratishni tasdiqlaysizmi/);
});

test('common role-specific labels are available in English', () => {
  const js = read('assets/index-DKwGrC2V.js');
  for (const label of ['My bookings', 'Mark attendance', 'Payment history', 'Edit account', 'Group name', 'No messages yet']) {
    assert.ok(js.includes(JSON.stringify(label)), `missing English label: ${label}`);
  }
});

test('group details and editing provide English search and action labels', () => {
  const js = read('assets/index-DKwGrC2V.js');
  const details = js.slice(js.indexOf('function Kk('), js.indexOf('function qk('));
  const edit = js.slice(js.indexOf('function qk('), js.indexOf('function Jk('));
  assert.match(details, /Search by name\.\.\./);
  assert.match(details, /No students found/);
  assert.match(edit, /Save changes to this group\?/);
  assert.match(edit, /__uiTranslate\(`Saqlash`,`Save`\)/);
});
