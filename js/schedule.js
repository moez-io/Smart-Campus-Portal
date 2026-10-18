// Weekly timetable generated from SCHEDULE, optionally filtered by day.
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const tbody = $('#schedule-body'), dayBar = $('#day-filters');

function showSchedule(day = 'All') {
  const rows = SCHEDULE.filter(s => day === 'All' || s.day === day)
    .sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.start.localeCompare(b.start));
  tbody.innerHTML = rows.length ? rows.map(s => `<tr>
    <td data-label="Course"><b>${s.course}</b></td><td data-label="Instructor">${s.instructor}</td><td data-label="Day">${s.day}</td>
    <td data-label="Start">${s.start}</td><td data-label="End">${s.end}</td><td data-label="Room">${s.room}</td></tr>`).join('')
    : '<tr><td>No classes on this day.</td></tr>';
}

dayBar.innerHTML = ['All', ...DAYS].map((d, i) => `<button class="chip ${i ? '' : 'on'}" data-day="${d}">${d}</button>`).join('');
dayBar.addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  $$('.chip', dayBar).forEach(c => c.classList.toggle('on', c === chip));
  showSchedule(chip.dataset.day);
});
showSchedule();
