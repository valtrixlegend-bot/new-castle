'use strict';

// Pure planning only: this module does not deliver or persist messages.
// A lesson is one saved mainAttendance record. Streaks are per student and group.
function planAttendanceAlerts(previous, current) {
  const oldAttendance = new Map((previous.mainAttendance || []).map(a => [a.id, a]));
  const users = current.users || [];
  const userById = new Map(users.map(user => [user.id, user]));
  const history = new Map();
  const alerts = [];

  for (const attendance of current.mainAttendance || []) {
    if (!attendance || !attendance.id || !attendance.groupId || !attendance.date || !Array.isArray(attendance.records)) continue;
    for (const record of attendance.records) {
      if (!record || !record.studentId || !['present', 'absent', 'late'].includes(record.status)) continue;
      const key = JSON.stringify([attendance.groupId, record.studentId]);
      if (!history.has(key)) history.set(key, []);
      history.get(key).push({ attendance, record });
    }
  }

  for (const lessons of history.values()) {
    lessons.sort((a, b) => a.attendance.date.localeCompare(b.attendance.date) ||
      String(a.attendance.savedAt || '').localeCompare(String(b.attendance.savedAt || '')) ||
      String(a.attendance.id).localeCompare(String(b.attendance.id)));
    let lateStreak = 0;
    for (const { attendance, record } of lessons) {
      lateStreak = record.status === 'late' ? lateStreak + 1 : 0;
      const old = oldAttendance.get(attendance.id);
      const oldRecord = old && Array.isArray(old.records) && old.records.find(r => r.studentId === record.studentId);
      // Ignore unchanged entries, so unrelated saves do not replay old history.
      if (oldRecord && oldRecord.status === record.status && old.groupId === attendance.groupId && old.date === attendance.date) continue;
      const student = userById.get(record.studentId);
      if (!student || student.role !== 'student') continue;
      const parents = users.filter(u => u.role === 'parent' && Array.isArray(u.childIds) && u.childIds.includes(student.id));
      if (record.status === 'absent') {
        const recipients = [student.id, ...parents.map(parent => parent.id)];
        for (const recipientId of new Set(recipients)) alerts.push({
          type: 'absence', attendanceId: attendance.id, studentId: student.id,
          recipientId, groupId: attendance.groupId, date: attendance.date,
        });
      } else if (record.status === 'late' && lateStreak === 2) {
        for (const recipientId of new Set(parents.map(parent => parent.id))) alerts.push({
          type: 'two_consecutive_lates', attendanceId: attendance.id, studentId: student.id,
          recipientId, groupId: attendance.groupId, date: attendance.date,
        });
      }
    }
  }
  return alerts;
}

module.exports = { planAttendanceAlerts };
