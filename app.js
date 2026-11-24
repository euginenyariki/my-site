/* Northstar IT — interactive estimate and enquiry form, stored locally. */
const KEY = 'northstar:enquiries';
function money(n) { return 'KES ' + Math.round(n).toLocaleString('en-KE'); }
function esc(v) { return String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function toast(m) { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2500); }

function estimate() {
  const base = Number(document.getElementById('service').value);
  const speed = Number(document.getElementById('speed').value);
  const team = Number(document.getElementById('team').value);
  document.getElementById('teamOut').textContent = team + (team === 1 ? ' person' : ' people');
  const scale = 1 + Math.log2(team + 1) * 0.12;
  document.getElementById('total').textContent = money(base * speed * scale);
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('northstar:dark') === 'true') document.body.classList.add('dark');
  ['service', 'speed', 'team'].forEach(id => document.getElementById(id).addEventListener('input', estimate));
  estimate();

  document.getElementById('theme').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('northstar:dark', document.body.classList.contains('dark'));
  });

  document.getElementById('enquiry').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const item = {
      name: String(f.get('name') || '').trim(),
      contact: String(f.get('contact') || '').trim(),
      topic: String(f.get('topic') || '').trim(),
      message: String(f.get('message') || '').trim(),
      estimate: document.getElementById('total').textContent,
      at: new Date().toISOString(),
    };
    if (!item.name || !item.contact || !item.message) return;
    let list = [];
    try { list = JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) {}
    list.unshift(item);
    try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50))); } catch (_) {}
    e.target.reset();
    estimate();
    toast('Enquiry saved locally. Thanks — I would be in touch within a working day.');
  });
});
