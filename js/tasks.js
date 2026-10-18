// Task manager: add, complete, delete, filter. Saved in localStorage.
const taskForm = $('#task-form'), taskList = $('#task-list');
let tasks = getTasks();
let view = 'all';

const saveTasks = () => localStorage.setItem('campus_tasks', JSON.stringify(tasks));

function renderTasks() {
  const today = new Date().toISOString().slice(0, 10);
  const shown = tasks.filter(t => view === 'all' || (view === 'done' ? t.done : !t.done))
    .sort((a, b) => a.done - b.done || a.due.localeCompare(b.due));
  taskList.innerHTML = shown.length ? shown.map(t => {
    const overdue = !t.done && t.due < today;
    return `<li class="task ${t.done ? 'done' : ''} ${overdue ? 'overdue' : ''}" data-id="${t.id}">
      <div class="info"><div class="t-title">${escapeHTML(t.title)}</div>
        <div class="meta"><span>${escapeHTML(t.course)}</span><span>Due ${formatDate(t.due)}</span>
        <span class="badge ${t.priority}">${t.priority} priority</span>${overdue ? '<span style="color:var(--bad)">Overdue</span>' : ''}</div></div>
      <button class="btn ghost" data-act="toggle">${t.done ? 'Undo' : 'Complete'}</button>
      <button class="btn ghost del" data-act="delete">Delete</button></li>`;
  }).join('') : '<li class="empty">No tasks here yet. Add your first task using the form.</li>';
  const pending = tasks.filter(t => !t.done).length;
  $('#task-summary').textContent = `${pending} pending · ${tasks.length - pending} completed`;
}

COURSES.filter(c => c.status === 'Ongoing').forEach(c => $('#t-course').add(new Option(`${c.code} – ${c.name}`, c.name)));
$('#t-due').min = new Date().toISOString().slice(0, 10);

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = $('#t-title').value.trim(), due = $('#t-due').value;
  if (!title || !due) return toast('Please enter a task title and a due date.', 'error');
  tasks.push({ id: Date.now(), title, course: $('#t-course').value, due, priority: $('#t-priority').value, done: false });
  saveTasks(); renderTasks(); taskForm.reset();
  toast('Task added successfully.');
});

taskList.addEventListener('click', e => {
  const btn = e.target.closest('[data-act]');
  if (!btn) return;
  const id = Number(btn.closest('.task').dataset.id);
  if (btn.dataset.act === 'toggle') {
    const t = tasks.find(t => t.id === id);
    t.done = !t.done;
    toast(t.done ? 'Task marked as completed.' : 'Task moved back to pending.');
  } else {
    tasks = tasks.filter(t => t.id !== id);
    toast('Task deleted.');
  }
  saveTasks(); renderTasks();
});

$('#task-filters').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  $$('#task-filters .chip').forEach(c => c.classList.toggle('on', c === chip));
  view = chip.dataset.view; renderTasks();
});
renderTasks();
