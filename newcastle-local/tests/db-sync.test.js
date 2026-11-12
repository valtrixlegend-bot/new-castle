const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../public/db-sync.js'), 'utf8');
function setup(fetch) {
  const alerts = [], events = [];
  const window = { alert: s => alerts.push(s), dispatchEvent: e => events.push(e.type) };
  vm.runInNewContext(source, {window, fetch, console, CustomEvent: class {constructor(type){this.type = type;}}});
  return {sync:window.NewcastleSync, alerts, events};
}
test('ketma-ket yozuvlar javob versiyasini kutadi', async () => {
  const writes=[];
  const {sync}=setup(async (_, options) => {
    if (options.method !== 'PUT') return new Response(JSON.stringify({payload:'{"users":[]}', revision:'a'}));
    let data=JSON.parse(options.body); writes.push(data.revision);
    await new Promise(r=>setTimeout(r,5));
    return new Response(JSON.stringify({ok:true,revision:writes.length===1?'b':'c'}));
  });
  await sync.load();
  assert.deepEqual(await Promise.all([sync.save({users:[1]}),sync.save({users:[2]})]),[true,true]);
  assert.deepEqual(writes,['a','b']);
});
test('konflikt keyingi saqlashlarni to‘xtatadi va ogohlantiradi', async () => {
  let writes=0;
  const {sync,alerts}=setup(async (_, options) => options.method==='PUT' ? (writes++,new Response('{}',{status:409})) : new Response(JSON.stringify({payload:'{"users":[]}',revision:'a'})));
  await sync.load();
  assert.deepEqual(await Promise.all([sync.save({users:[1]}),sync.save({users:[2]})]),[false,false]);
  assert.equal(writes,1); assert.equal(alerts.length,1); assert.match(alerts[0],/boshqa oynada/);
});
