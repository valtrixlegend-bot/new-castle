const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

test('pilot bazasi alohida yaratiladi va 12 o‘quvchi guruhga biriktirilgan', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'newcastle-pilot-'));
  try {
    const run = spawnSync(process.execPath, ['-e', `
      const { createServer } = require('./server');
      const server = createServer().listen(0, '127.0.0.1', async () => {
        try {
          const response = await fetch('http://127.0.0.1:' + server.address().port + '/api/db');
          const data = JSON.parse((await response.json()).payload);
          console.log(JSON.stringify(data));
        } catch (error) { console.error(error); process.exitCode = 1; }
        finally { server.close(); }
      });
    `], { cwd: path.join(__dirname, '..'), env: { ...process.env, DATA_DIR: dir, SEED_FILE: path.join(__dirname, '../data/pilot-data.json') }, encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    const data = JSON.parse(run.stdout);
    assert.equal(data.users.filter(u => u.role === 'student').length, 12);
    assert.equal(data.groups[0].studentIds.length, 12);
    assert.equal(data.payments.length, 0);
    assert.ok(fs.existsSync(path.join(dir, 'db.json')));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
