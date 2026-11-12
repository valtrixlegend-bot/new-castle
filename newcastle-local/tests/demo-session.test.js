const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../public/demo-session.js'), 'utf8');
function browser(host, storage = new Map()) {
  const window = { location: {hostname: host}, sessionStorage: { getItem: k => storage.get(k) || null, setItem: (k,v) => storage.set(k,v), removeItem: k => storage.delete(k) } };
  vm.runInNewContext(source, {window}); return window.NewcastleDemoSession;
}
test('demo tabida sahifa yangilanganda hisob eslanadi, chiqishda tozalanadi', () => {
  const store = new Map();
  const first = browser('valtrixlegend-bot.github.io', store);
  first.set('student1');
  const reload = browser('valtrixlegend-bot.github.io', store);
  assert.equal(reload.get(), 'student1');
  reload.clear(); assert.equal(reload.get(), null);
});
test('boshqa hostlarda demo sessiya faollashmaydi', () => {
  const page = browser('example.com'); page.set('admin'); assert.equal(page.get(), null);
});
