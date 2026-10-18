// Registration/profile form with inline validation (no alert boxes).
const pform = $('#profile-form');
const rules = {
  fullName: v => /^[A-Za-z][A-Za-z .'-]{2,}$/.test(v) || 'Enter your full name using letters only (min 3 characters).',
  regNo: v => /^\d{4}-[A-Za-z]{2,5}-\d{1,4}$/.test(v) || 'Use the format 2023-BSCS-014.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Please enter a valid university email address.',
  department: v => !!v || 'Select your department.',
  semester: v => !!v || 'Select your current semester.',
  phone: v => /^(\+92|0)3\d{9}$/.test(v.replace(/[\s-]/g, '')) || 'Use a Pakistani mobile number like 0300-1234567.',
  password: v => (v.length >= 8 && /[A-Za-z]/.test(v) && /\d/.test(v)) || 'Use at least 8 characters, including a letter and a number.',
  confirm: v => (v !== '' && v === pform.elements.password.value) || 'Passwords do not match.'
};

function check(name) {
  const input = pform.elements[name], field = input.closest('.field');
  const result = rules[name](input.value.trim());
  field.classList.toggle('invalid', result !== true);
  field.classList.toggle('valid', result === true);
  $('.error', field).textContent = result === true ? '' : result;
  return result === true;
}

Object.keys(rules).forEach(n => {
  const el = pform.elements[n];
  el.addEventListener('blur', () => check(n));
  el.addEventListener('input', () => { if (el.closest('.field').classList.contains('invalid')) check(n); });
});

pform.addEventListener('submit', e => {
  e.preventDefault();
  const allValid = Object.keys(rules).map(check).every(Boolean); // run every check so all errors show
  if (!allValid) return toast('Please fix the highlighted fields.', 'error');
  const { password, confirm, ...profile } = Object.fromEntries(new FormData(pform)); // never store passwords
  localStorage.setItem('campus_profile', JSON.stringify(profile));
  toast('Profile saved successfully.');
});

try {
  const saved = JSON.parse(localStorage.getItem('campus_profile'));
  if (saved) Object.entries(saved).forEach(([k, v]) => { if (pform.elements[k]) pform.elements[k].value = v; });
} catch { /* ignore corrupt data */ }
