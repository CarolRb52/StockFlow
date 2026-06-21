function escapeHTML(str) {
  const d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n) {
  return n.toLocaleString('en-US');
}

function margin(cost, price) {
  return price > 0 && cost >= 0 ? (((price - cost) / price) * 100).toFixed(1) + '%' : '—';
}

function getProduct(id) {
  return products.find(p => p.id === id);
}

function stockStatus(p) {
  if (p.stock === 0)              return { label: tr('st_out'),      bg: 'bg-red-100',     text: 'text-red-700',    dot: 'bg-red-500' };
  if (p.stock < p.minStock)       return { label: tr('st_critical'), bg: 'bg-red-100',     text: 'text-red-700',    dot: 'bg-red-500' };
  if (p.stock < p.minStock * 1.5) return { label: tr('st_low'),      bg: 'bg-amber-100',   text: 'text-amber-700',  dot: 'bg-amber-500' };
  return                                 { label: tr('st_active'),   bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' };
}

function typeStyles(type) {
  if (type === 'INBOUND')  return 'bg-emerald-100 text-emerald-700';
  if (type === 'OUTBOUND') return 'bg-red-100 text-red-700';
  return 'bg-amber-100 text-amber-700';
}

function changeClass(c) {
  return c > 0 ? 'text-emerald-600' : c < 0 ? 'text-red-600' : 'text-outline';
}

function changeLabel(c) {
  return c > 0 ? '+' + fmtInt(c) : fmtInt(c);
}

function showToast(msg, type = 'success') {
  const tc = document.getElementById('toast-container');
  const t = document.createElement('div');
  const icon = type === 'success' ? 'check_circle' : 'error';
  const bg = type === 'success' ? 'bg-emerald-600' : 'bg-red-600';
  t.className = `toast flex items-center gap-3 ${bg} text-white px-5 py-3.5 rounded-2xl shadow-2xl pointer-events-auto`;

  const iconEl = document.createElement('span');
  iconEl.className = 'material-symbols-outlined text-[20px]';
  iconEl.style.fontVariationSettings = "'FILL' 1";
  iconEl.textContent = icon;

  const msgEl = document.createElement('span');
  msgEl.className = 'text-[14px] font-semibold';
  msgEl.textContent = msg;

  t.appendChild(iconEl);
  t.appendChild(msgEl);
  tc.appendChild(t);
  setTimeout(() => { t.classList.add('hiding'); setTimeout(() => t.remove(), 300); }, 3000);
}
