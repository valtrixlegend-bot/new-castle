const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../public/theme.js'), 'utf8');

function load(initial, blocked = false) {
  let saved = initial;
  let ready, click;
  const attrs = {};
  const button = { setAttribute: (key, value) => { attrs[key] = value; }, addEventListener: (_, fn) => { click = fn; } };
  const root = { dataset: {}, style: {} };
  const document = { documentElement: root, getElementById: () => button, addEventListener: (_, fn) => { ready = fn; } };
  const localStorage = { getItem: () => { if (blocked) throw Error('blocked'); return saved; }, setItem: (_, value) => { if (blocked) throw Error('blocked'); saved = value; } };
  vm.runInNewContext(source, { document, localStorage });
  ready();
  return { root, attrs, click: () => click(), saved: () => saved };
}

test('qora va yorug‘ rejim almashadi va saqlanadi', () => {
  const page = load(null);
  assert.equal(page.root.dataset.theme, 'dark');
  assert.equal(page.attrs['aria-pressed'], 'true');
  page.click();
  assert.equal(page.root.dataset.theme, 'light');
  assert.equal(page.attrs['aria-pressed'], 'false');
  assert.equal(page.saved(), 'light');
  assert.equal(load(page.saved()).root.dataset.theme, 'light');
  page.click();
  assert.equal(page.saved(), 'dark');
});

test('storage o‘chirilganda ham rejim almashadi', () => {
  const page = load(null, true);
  page.click();
  assert.equal(page.root.dataset.theme, 'light');
});
