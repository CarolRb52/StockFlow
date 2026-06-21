/* ── Schedule Shipment Modal ── */
const scheduleModal = document.getElementById('schedule-modal');

function openScheduleModal() {
  const sel = document.getElementById('sch-product');
  sel.innerHTML = products.map(p =>
    `<option value="${p.id}">${escapeHTML(p.name)} · ${escapeHTML(p.sku)}</option>`
  ).join('');
  updateSchStock();
  const d = new Date();
  d.setDate(d.getDate() + 7);
  document.getElementById('sch-date').value = d.toISOString().slice(0, 10);
  ['sch-qty','sch-street','sch-city','sch-postal','sch-country','sch-cust-name','sch-cust-phone','sch-cust-postal','sch-note'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  scheduleModal.classList.add('active');
}

function closeScheduleModal() {
  scheduleModal.classList.remove('active');
}

function updateSchStock() {
  const pid = parseInt(document.getElementById('sch-product').value);
  const p = products.find(x => x.id === pid);
  const badge = document.getElementById('sch-stock-badge');
  if (p) {
    const st = stockStatus(p);
    const dot = document.createElement('span');
    dot.className = `w-2 h-2 rounded-full ${st.dot} inline-block flex-shrink-0`;
    badge.textContent = '';
    badge.appendChild(dot);
    badge.appendChild(document.createTextNode(' ' + p.stock.toLocaleString() + ' ' + tr('inv_units')));
  } else {
    badge.textContent = '—';
  }
}

document.getElementById('sch-product').addEventListener('change', updateSchStock);
document.getElementById('schedule-modal-close').addEventListener('click', closeScheduleModal);
document.getElementById('schedule-modal-cancel').addEventListener('click', closeScheduleModal);
scheduleModal.addEventListener('click', closeScheduleModal);

document.getElementById('schedule-modal-save').addEventListener('click', () => {
  const pid      = parseInt(document.getElementById('sch-product').value);
  const qty      = parseInt(document.getElementById('sch-qty').value) || 0;
  const street   = document.getElementById('sch-street').value.trim();
  const custName = document.getElementById('sch-cust-name').value.trim();
  const custPhone = document.getElementById('sch-cust-phone').value.trim();

  if (!street)     { showToast(tr('toast_ship_address'), 'error'); return; }
  if (!custName)   { showToast(tr('toast_ship_cust'), 'error'); return; }
  if (!custPhone)  { showToast(tr('toast_ship_phone'), 'error'); return; }
  if (qty < 1)     { showToast(tr('toast_no_qty'), 'error'); return; }

  const p = products.find(x => x.id === pid);
  if (p && qty > p.stock) { showToast(tr('toast_no_stock'), 'error'); return; }

  const wh         = document.getElementById('sch-warehouse').value;
  const city       = document.getElementById('sch-city').value.trim() || '—';
  const postal     = document.getElementById('sch-postal').value.trim() || '—';
  const carrier    = document.getElementById('sch-carrier').value;
  const dateVal    = document.getElementById('sch-date').value;
  const note       = document.getElementById('sch-note').value.trim();
  const custPostal = document.getElementById('sch-cust-postal').value.trim() || '—';

  const dateLabel = dateVal
    ? new Date(dateVal).toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

  const newId = '#SF-' + (Math.floor(Math.random() * 9000) + 1000);
  const initials = custName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  shipments.unshift({
    id: newId,
    recipient: custName,
    initials,
    carrier,
    date: dateLabel,
    status: 'processing',
    address: street + ', ' + city + ' ' + postal,
    phone: custPhone,
    postalCustomer: custPostal,
    warehouse: wh,
    product: p ? p.name : '—',
    qty,
    note
  });

  if (p) {
    p.stock = Math.max(0, p.stock - qty);
    p.movements.unshift({
      date: new Date().toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      type: 'OUTBOUND',
      warehouse: wh,
      user: custName,
      initials,
      color: 'blue',
      change: -qty,
      balance: p.stock
    });
  }

  closeScheduleModal();
  renderShipments();
  showToast(tr('ship_scheduled') + ': ' + newId);
});


/* ── Add Product Modal ── */
const addProductModal = document.getElementById('add-product-modal');
let addProductImageDataUrl = null;

function openAddProductModal() {
  addProductImageDataUrl = null;
  ['ap-name','ap-sku','ap-barcode','ap-manufacturer','ap-desc','ap-location'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  ['ap-stock','ap-minstock','ap-maxstock','ap-cost','ap-price'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('img-preview').classList.add('hidden');
  document.getElementById('img-placeholder').classList.remove('hidden');
  document.getElementById('img-remove-btn').classList.add('hidden');
  addProductModal.classList.add('active');
}

function closeAddProductModal() {
  addProductModal.classList.remove('active');
}

function removeProductImage() {
  addProductImageDataUrl = null;
  document.getElementById('img-preview').classList.add('hidden');
  document.getElementById('img-placeholder').classList.remove('hidden');
  document.getElementById('img-remove-btn').classList.add('hidden');
  document.getElementById('img-file-input').value = '';
}

document.getElementById('img-file-input').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { showToast('Image too large (max 5 MB)', 'error'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    addProductImageDataUrl = e.target.result;
    const preview = document.getElementById('img-preview');
    preview.src = addProductImageDataUrl;
    preview.classList.remove('hidden');
    document.getElementById('img-placeholder').classList.add('hidden');
    document.getElementById('img-remove-btn').classList.remove('hidden');
  };
  reader.readAsDataURL(file);
});

document.getElementById('img-remove-btn').addEventListener('click', e => {
  e.stopPropagation();
  removeProductImage();
});

document.getElementById('img-drop-zone').addEventListener('click', () => {
  document.getElementById('img-file-input').click();
});

const dropZone = document.getElementById('img-drop-zone');
dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('border-primary', 'bg-primary-fixed/20');
});
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('border-primary', 'bg-primary-fixed/20');
});
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('border-primary', 'bg-primary-fixed/20');
  const file = e.dataTransfer.files[0];
  if (!file || !file.type.startsWith('image/')) return;
  document.getElementById('img-file-input').files = e.dataTransfer.files;
  document.getElementById('img-file-input').dispatchEvent(new Event('change'));
});

document.getElementById('add-product-modal-close').addEventListener('click', closeAddProductModal);
document.getElementById('add-product-cancel').addEventListener('click', closeAddProductModal);
addProductModal.addEventListener('click', closeAddProductModal);

document.getElementById('add-product-save').addEventListener('click', () => {
  const name     = document.getElementById('ap-name').value.trim();
  const sku      = document.getElementById('ap-sku').value.trim();
  const stock    = parseInt(document.getElementById('ap-stock').value) || 0;
  const minStock = parseInt(document.getElementById('ap-minstock').value) || 0;
  const maxStock = parseInt(document.getElementById('ap-maxstock').value) || Math.max(stock * 2, 10);
  const warehouse = document.getElementById('ap-warehouse').value;
  const location = document.getElementById('ap-location').value.trim() || '—';
  const cost     = parseFloat(document.getElementById('ap-cost').value) || 0;
  const price    = parseFloat(document.getElementById('ap-price').value) || 0;
  const desc     = document.getElementById('ap-desc').value.trim();
  const category = document.getElementById('ap-category').value;
  const manufacturer = document.getElementById('ap-manufacturer').value.trim() || '—';
  const barcode  = document.getElementById('ap-barcode').value.trim() || '—';

  if (!name || !sku) { showToast(tr('toast_prod_required'), 'error'); return; }

  const icons    = { 'Heavy Machinery': 'settings', 'Electronics': 'memory', 'Tools & Parts': 'hardware', 'Raw Materials': 'category' };
  const iconBgs  = { 'Heavy Machinery': '#e0e3e5', 'Electronics': '#dae2fd', 'Tools & Parts': '#e5eeff', 'Raw Materials': '#fcdeb5' };
  const iconColors = { 'Heavy Machinery': '#45464d', 'Electronics': '#131b2e', 'Tools & Parts': '#45464d', 'Raw Materials': '#574425' };

  products.push({
    id: products.length + 1,
    name, sku, barcode, category, manufacturer,
    stock, maxStock, minStock,
    location: warehouse + ' / ' + location,
    unitCost: cost, sellingPrice: price,
    icon: icons[category] || 'inventory_2',
    iconBg: iconBgs[category] || '#e5eeff',
    iconColor: iconColors[category] || '#45464d',
    description: desc || name,
    tags: [],
    image: addProductImageDataUrl || null,
    movements: []
  });

  closeAddProductModal();
  renderProductList();
  showToast(tr('toast_prod_added'));
});


/* ── Pricing Modal ── */
const pricingModal = document.getElementById('pricing-modal');
let pricingTargetId = null;

function openPricingModal(id) {
  pricingTargetId = id;
  const p = getProduct(id);
  document.getElementById('input-cost').value = p.unitCost;
  document.getElementById('input-price').value = p.sellingPrice;
  updateMarginPreview();
  pricingModal.classList.add('active');
}

function closePricingModal() {
  pricingModal.classList.remove('active');
}

function updateMarginPreview() {
  const c  = parseFloat(document.getElementById('input-cost').value) || 0;
  const pp = parseFloat(document.getElementById('input-price').value) || 0;
  document.getElementById('modal-margin-preview').textContent = margin(c, pp);
}

document.getElementById('pricing-modal-close').addEventListener('click', closePricingModal);
document.getElementById('pricing-modal-cancel').addEventListener('click', closePricingModal);
pricingModal.addEventListener('click', closePricingModal);
document.getElementById('input-cost').addEventListener('input', updateMarginPreview);
document.getElementById('input-price').addEventListener('input', updateMarginPreview);

document.getElementById('pricing-modal-save').addEventListener('click', () => {
  const c  = parseFloat(document.getElementById('input-cost').value);
  const pp = parseFloat(document.getElementById('input-price').value);
  if (isNaN(c) || isNaN(pp) || c <= 0 || pp <= 0) { showToast(tr('toast_bad_price'), 'error'); return; }
  if (pp <= c) { showToast(tr('toast_price_cost'), 'error'); return; }
  const p = getProduct(pricingTargetId);
  p.unitCost = c;
  p.sellingPrice = pp;
  renderDetail(selectedId);
  renderProductList(
    document.getElementById('list-search').value,
    document.getElementById('cat-filter').value
  );
  closePricingModal();
  showToast(tr('toast_pricing_ok') + ' ' + p.name);
});


/* ── Movement Modal ── */
const movementModal = document.getElementById('movement-modal');

function openMovementModal(preselectedId) {
  const sel = document.getElementById('mv-product');
  sel.innerHTML = products.map(p =>
    `<option value="${p.id}" ${p.id === (preselectedId || selectedId) ? 'selected' : ''}>${escapeHTML(p.name)} (${escapeHTML(p.sku)})</option>`
  ).join('');
  document.getElementById('mv-type').value = 'INBOUND';
  document.getElementById('mv-warehouse').value = '';
  document.getElementById('mv-user').value = '';
  document.getElementById('mv-qty').value = '';
  movementModal.classList.add('active');
}

function closeMovementModal() {
  movementModal.classList.remove('active');
}

document.getElementById('movement-modal-close').addEventListener('click', closeMovementModal);
document.getElementById('movement-modal-cancel').addEventListener('click', closeMovementModal);
movementModal.addEventListener('click', closeMovementModal);

document.getElementById('movement-modal-save').addEventListener('click', () => {
  const pid       = parseInt(document.getElementById('mv-product').value);
  const type      = document.getElementById('mv-type').value;
  const warehouse = document.getElementById('mv-warehouse').value.trim();
  const user      = document.getElementById('mv-user').value.trim();
  const qty       = parseInt(document.getElementById('mv-qty').value);

  if (!warehouse)    { showToast(tr('toast_no_wh'), 'error'); return; }
  if (!user)         { showToast(tr('toast_no_user'), 'error'); return; }
  if (!qty || qty < 1) { showToast(tr('toast_no_qty'), 'error'); return; }

  const p = getProduct(pid);
  const delta = (type === 'OUTBOUND' || type === 'TRANSFER') ? -qty : +qty;
  const newBal = p.stock + delta;
  if (newBal < 0) { showToast(tr('toast_no_stock'), 'error'); return; }

  p.stock = newBal;
  const initials = user.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  const colors = ['blue', 'purple', 'green', 'rose', 'amber', 'teal'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
    now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  p.movements.unshift({ date: dateStr, type, warehouse, user, initials, color, change: delta, balance: newBal });

  if (pid === selectedId) renderDetail(selectedId);
  renderProductList(
    document.getElementById('list-search').value,
    document.getElementById('cat-filter').value
  );
  closeMovementModal();
  showToast(type + ' registered · ' + qty + ' units of ' + p.name);
});
