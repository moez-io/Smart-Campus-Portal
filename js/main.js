// Shared behaviour: layout, theme, toast, home page rendering.
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const escapeHTML = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const formatDate = iso => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

// Logo: 12-ray orange starburst
const LOGO = '<svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="#E8743B" stroke-width="9" stroke-linecap="round">' +
  Array.from({ length: 12 }, (_, i) => `<line x1="50" y1="8" x2="50" y2="${i % 2 ? 24 : 30}" transform="rotate(${i * 30} 50 50)"/>`).join('') + '</g></svg>';

const PAGES = [['index.html', 'Home'], ['courses.html', 'Courses'], ['schedule.html', 'Schedule'], ['tasks.html', 'Tasks'], ['profile.html', 'Profile']];

function toast(message, type = 'success') {
  let box = $('.toast-box');
  if (!box) { box = document.createElement('div'); box.className = 'toast-box'; box.setAttribute('aria-live', 'polite'); document.body.append(box); }
  const t = document.createElement('div');
  t.className = `toast ${type}`; t.textContent = message;
  box.append(t);
  setTimeout(() => t.remove(), 3200);
}

// Theme (saved in localStorage)
function applyTheme(mode) {
  document.documentElement.classList.toggle('light', mode === 'light');
  const btn = $('#theme-btn');
  if (btn) btn.textContent = mode === 'light' ? '🌙' : '☀️';
}
function toggleTheme() {
  const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
  localStorage.setItem('campus_theme', next);
  applyTheme(next);
}

function buildLayout() {
  const current = location.pathname.split('/').pop() || 'index.html';
  $('#site-header').outerHTML = `
    <header class="site-header"><div class="wrap nav">
      <a class="brand" href="index.html">${LOGO}<span>Smart Campus<small>Student Portal</small></span></a>
      <ul class="nav-links" id="nav-links">${PAGES.map(([href, label]) =>
        `<li><a href="${href}" class="${href === current ? 'active' : ''}">${label}</a></li>`).join('')}</ul>
      <div class="nav-tools">
        <button class="icon-btn" id="theme-btn" aria-label="Switch light or dark mode"></button>
        <button class="icon-btn" id="menu-btn" aria-label="Open menu">☰</button>
      </div></div></header>`;
  $('#site-footer').outerHTML = `
    <footer class="site-footer"><div class="wrap">
      <div class="foot">
        <div><a class="brand" href="index.html">${LOGO}<span>Smart Campus</span></a>
          <p class="muted" style="margin-top:.8rem;max-width:36ch">One place for courses, schedules, tasks and campus news.</p></div>
        <div><h4>Explore</h4><ul>${PAGES.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>
        <div><h4>Contact</h4><ul><li>Islamabad, Pakistan</li><li>help@smartcampus.edu.pk</li><li>Mon–Fri, 9 AM – 5 PM</li></ul></div>
      </div>
      <p class="copy">© ${new Date().getFullYear()} Smart Campus Student Portal. Web Technology assignment prototype.</p></div></footer>`;
  $('#theme-btn').addEventListener('click', toggleTheme);
  $('#menu-btn').addEventListener('click', () => $('#nav-links').classList.toggle('open'));
  applyTheme(localStorage.getItem('campus_theme') || 'dark');
}

function getTasks() {
  try { return JSON.parse(localStorage.getItem('campus_tasks')) || []; } catch { return []; }
}

// ---------- Home page ----------
function renderDashboard() {
  const box = $('#dashboard-stats');
  const ongoing = COURSES.filter(c => c.status === 'Ongoing');
  const attendance = Math.round(ongoing.reduce((sum, c) => sum + c.attendance, 0) / ongoing.length);
  const stats = [
    ['Registered courses', ongoing.length, ''], ['Completed courses', COURSES.filter(c => c.status === 'Completed').length, ''],
    ['Current semester', 5, ''], ['Attendance', attendance, '%'],
    ['Upcoming assignments', getTasks().filter(t => !t.done).length, ''], ['Upcoming events', EVENTS.length, '']
  ];
  box.innerHTML = stats.map(([label]) => `<article class="card stat"><b>0</b><span>${label}</span></article>`).join('');
  $$('.stat b', box).forEach((el, i) => {
    const [, target, suffix] = stats[i];
    let n = 0;
    const timer = setInterval(() => { // count-up animation
      n = Math.min(target, n + Math.max(1, Math.ceil(target / 25)));
      el.textContent = n + suffix;
      if (n === target) clearInterval(timer);
    }, 30);
    if (target === 0) { clearInterval(timer); el.textContent = '0' + suffix; }
  });
}

function renderAnnouncements(category = 'All') {
  const list = ANNOUNCEMENTS.filter(a => category === 'All' || a.category === category);
  $('#announcement-list').innerHTML = list.map(a => `
    <article class="card"><span class="badge">${a.category}</span><h3>${a.title}</h3>
    <p>${a.description}</p><div class="meta"><span>${formatDate(a.date)}</span></div></article>`).join('');
}

function renderEvents() {
  $('#event-list').innerHTML = EVENTS.map(e => {
    const d = new Date(e.date + 'T00:00:00');
    return `<article class="card event"><div class="date-box">${d.getDate()}<small>${d.toLocaleString('en', { month: 'short' })}</small></div>
      <div><h3>${e.title}</h3><p>${e.place}</p></div></article>`;
  }).join('');
}

function setupHome() {
  if (!$('#dashboard-stats')) return;
  renderDashboard(); renderEvents(); renderAnnouncements();
  const cats = ['All', ...new Set(ANNOUNCEMENTS.map(a => a.category))];
  const bar = $('#announcement-filters');
  bar.innerHTML = cats.map((c, i) => `<button class="chip ${i ? '' : 'on'}" data-cat="${c}">${c}</button>`).join('');
  bar.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    $$('.chip', bar).forEach(c => c.classList.toggle('on', c === chip));
    renderAnnouncements(chip.dataset.cat);
  });
}

buildLayout();
setupHome();
