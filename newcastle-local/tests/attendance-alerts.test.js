const test = require('node:test');
const assert = require('node:assert/strict');
const { planAttendanceAlerts } = require('../lib/attendance-alerts');
const users = [
  { id: 's', role: 'student' },
  { id: 'p', role: 'parent', childIds: ['s'] },
  { id: 'p2', role: 'parent', childIds: ['s'] },
  { id: 'other', role: 'parent', childIds: ['other-student'] },
];
function lesson(id, date, status, groupId = 'g') {
  return { id, date, groupId, records: [{ studentId: 's', status }] };
}
function db(...mainAttendance) { return { users, mainAttendance }; }

test('yangi kelmaslik o‘quvchi va ota-onalarga rejalashtiriladi', () => {
  const before = db();
  const after = db(lesson('a', '2026-11-01', 'absent'));
  const alerts = planAttendanceAlerts(before, after);
  assert.deepEqual(alerts.map(a => a.recipientId), ['s', 'p', 'p2']);
  assert.ok(alerts.every(a => a.type === 'absence'));
  assert.deepEqual(planAttendanceAlerts(after, after), []);
});

test('ketma-ket ikkinchi kechikish faqat ota-onaga; uchinchisida takrorlanmaydi', () => {
  const a = lesson('a', '2026-11-01', 'late');
  const b = lesson('b', '2026-11-02', 'late');
  const c = lesson('c', '2026-11-03', 'late');
  assert.deepEqual(planAttendanceAlerts(db(a), db(a,b)).map(x => [x.type, x.recipientId]), [
    ['two_consecutive_lates', 'p'], ['two_consecutive_lates', 'p2'],
  ]);
  assert.deepEqual(planAttendanceAlerts(db(a,b), db(a,b,c)), []);
});

test('davomat holati o‘zgarsa va kelish seriyani uzsa', () => {
  const a = lesson('a', '2026-11-01', 'late');
  const b = lesson('b', '2026-11-02', 'present');
  const c = lesson('c', '2026-11-03', 'late');
  assert.deepEqual(planAttendanceAlerts(db(a,b), db(a,b,c)), []);
  assert.equal(planAttendanceAlerts(db(b), db(lesson('b','2026-11-02','absent'))).length, 3);
});

test('turli guruhlar va eski davomat o‘zaro hisoblanmaydi', () => {
  const a = lesson('a','2026-11-01','late','g1');
  const b = lesson('b','2026-11-02','late','g2');
  assert.deepEqual(planAttendanceAlerts(db(a), db(a,b)), []);
  assert.deepEqual(planAttendanceAlerts(db(a,b), db(a,b)), []);
});
