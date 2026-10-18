// Course cards are generated from the COURSES array; search + filters update live.
const grid = $('#course-grid'), searchBox = $('#search'), semFilter = $('#semester'), statusFilter = $('#status');

function courseCard(c) {
  return `<article class="card"><span class="badge ${c.status}">${c.status}</span>
    <h3>${c.name}</h3><p>${c.code}</p>
    <div class="meta"><span>👤 ${c.instructor}</span><span>🎓 ${c.credits} credit hrs</span><span>📅 Semester ${c.semester}</span></div></article>`;
}

function showCourses() {
  const q = searchBox.value.trim().toLowerCase();
  const result = COURSES.filter(c =>
    (c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)) &&
    (semFilter.value === 'all' || c.semester === Number(semFilter.value)) &&
    (statusFilter.value === 'all' || c.status === statusFilter.value));
  grid.innerHTML = result.length ? result.map(courseCard).join('') : '<p class="empty">No matching course found. Try a different name, code or filter.</p>';
  $('#count').textContent = `${result.length} of ${COURSES.length} courses`;
}

[...new Set(COURSES.map(c => c.semester))].sort().forEach(s => semFilter.add(new Option(`Semester ${s}`, s)));
[...new Set(COURSES.map(c => c.status))].forEach(s => statusFilter.add(new Option(s, s)));
[searchBox, semFilter, statusFilter].forEach(el => el.addEventListener('input', showCourses));
showCourses();
