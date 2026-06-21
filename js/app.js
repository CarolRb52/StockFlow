const pages = ['inventory', 'dashboard', 'shipments', 'analytics', 'history'];
let currentPage = 'dashboard';

function updateBreadcrumbs(name) {
  const bc = {
    inventory: [tr('bc_inventory'), tr('bc_products')],
    dashboard: [tr('bc_home'),      tr('bc_dashboard')],
    shipments: [tr('bc_logistics'), tr('nav_shipments')],
    analytics: [tr('bc_reports'),   tr('nav_analytics')],
    history:   [tr('bc_inventory'), tr('bc_mv_history')],
  };
  const pair = bc[name] || ['', ''];
  document.getElementById('breadcrumb-parent').textContent = pair[0];
  document.getElementById('breadcrumb-current').textContent = pair[1];
}

function showPage(name) {
  if (!pages.includes(name)) return;
  currentPage = name;
  pages.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.style.display = p === name ? 'block' : 'none';
  });
  document.querySelectorAll('.nav-link').forEach(a => {
    const active = a.dataset.page === name;
    a.className = active
      ? 'nav-link flex items-center space-x-3 px-4 py-3 rounded-full bg-primary text-on-primary shadow-md transition-all'
      : 'nav-link flex items-center space-x-3 px-4 py-3 rounded-full text-on-surface-variant hover:bg-surface-variant/50 transition-all';
  });
  updateBreadcrumbs(name);
  closeSidebar();
  if (name === 'dashboard') renderDashboard();
  if (name === 'inventory') {
    document.getElementById('inv-list-view').style.display = 'block';
    document.getElementById('inv-detail-view').style.display = 'none';
    renderProductList();
  }
  if (name === 'shipments') renderShipments();
  if (name === 'history')   renderHistory(document.getElementById('history-filter').value);
  document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Navigation ── */
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); showPage(a.dataset.page); });
});

/* ── Sidebar (mobile) ── */
function openSidebar() {
  document.getElementById('sidebar').style.transform = 'translateX(0)';
  document.getElementById('sidebar-overlay').classList.remove('hidden');
}
function closeSidebar() {
  if (window.innerWidth >= 1024) return;
  document.getElementById('sidebar').style.transform = '';
  document.getElementById('sidebar-overlay').classList.add('hidden');
}
document.getElementById('hamburger-btn').addEventListener('click', openSidebar);
document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);

/* ── Notifications ── */
const bellBtn    = document.getElementById('bell-btn');
const notifPanel = document.getElementById('notif-panel');
bellBtn.addEventListener('click', e => { e.stopPropagation(); notifPanel.classList.toggle('hidden'); });
document.addEventListener('click', () => notifPanel.classList.add('hidden'));
notifPanel.addEventListener('click', e => e.stopPropagation());
document.getElementById('mark-all-read').addEventListener('click', () => {
  document.getElementById('notif-dot').classList.add('hidden');
  showToast(tr('toast_notif_read'));
  notifPanel.classList.add('hidden');
});

/* ── Language toggle ── */
document.getElementById('lang-btn').addEventListener('click', toggleLang);

/* ── Search ── */
document.getElementById('search-input').addEventListener('input', function () {
  document.getElementById('list-search').value = this.value;
  showPage('inventory');
  renderProductList(this.value, document.getElementById('cat-filter').value, document.getElementById('status-filter').value);
});
document.getElementById('list-search').addEventListener('input', function () {
  renderProductList(this.value, document.getElementById('cat-filter').value, document.getElementById('status-filter').value);
});
document.getElementById('cat-filter').addEventListener('change', function () {
  renderProductList(document.getElementById('list-search').value, this.value, document.getElementById('status-filter').value);
});
document.getElementById('status-filter').addEventListener('change', function () {
  renderProductList(document.getElementById('list-search').value, document.getElementById('cat-filter').value, this.value);
});
document.getElementById('history-filter').addEventListener('change', function () {
  renderHistory(this.value);
});

/* ── Inventory buttons ── */
document.getElementById('btn-back-to-list').addEventListener('click', showInventoryList);
document.getElementById('btn-export-csv').addEventListener('click', () => showToast(tr('toast_export')));
document.getElementById('btn-add-product').addEventListener('click', openAddProductModal);

/* ── Dashboard quick actions ── */
document.getElementById('qa-scan-btn').addEventListener('click', () => showToast(tr('qa_scan')));
document.getElementById('qa-dispatch-btn').addEventListener('click', openMovementModal);
document.getElementById('qa-audit-btn').addEventListener('click', () => showPage('history'));
document.getElementById('qa-suppliers-btn').addEventListener('click', () => showToast(tr('qa_suppliers')));
document.getElementById('dash-view-all-btn').addEventListener('click', () => showPage('history'));

/* ── Shipments buttons ── */
document.getElementById('btn-schedule-ship').addEventListener('click', openScheduleModal);
document.getElementById('ship-docs-btn').addEventListener('click', () => showToast(tr('ship_docs_toast')));
document.getElementById('ship-export-btn').addEventListener('click', () => showToast(tr('toast_export')));

/* ── FAB ── */
document.getElementById('fab-btn').addEventListener('click', () => openMovementModal());

/* ── Global delegated actions (dynamically rendered content) ── */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  if (action === 'go-product') {
    showPage('inventory');
    selectProduct(parseInt(el.dataset.pid));
  } else if (action === 'go-history') {
    showPage('history');
  } else if (action === 'open-movement') {
    openMovementModal(parseInt(el.dataset.pid));
  } else if (action === 'open-pricing') {
    openPricingModal(parseInt(el.dataset.id));
  } else if (action === 'export') {
    showToast(tr('toast_export'));
  } else if (action === 'select-shipment') {
    selectShipment(el.dataset.sid);
  }
});

/* ── Init ── */
applyTranslations();
showPage('dashboard');
