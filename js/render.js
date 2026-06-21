function renderProductList(filter = '', catFilter = '', statusFilter = '') {
  const tbody = document.getElementById('product-list');
  const q = filter.toLowerCase();

  let filtered = products.filter(p => {
    const matchText = !q || (p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    const matchCat = !catFilter || p.category === catFilter;
    return matchText && matchCat;
  });

  if (statusFilter) {
    filtered = filtered.filter(p => {
      if (statusFilter === 'out')      return p.stock === 0;
      if (statusFilter === 'critical') return p.stock > 0 && p.stock < p.minStock;
      if (statusFilter === 'low')      return p.stock >= p.minStock && p.stock < p.minStock * 1.5;
      if (statusFilter === 'active')   return p.stock >= p.minStock * 1.5;
      return true;
    });
  }

  document.getElementById('product-count').textContent = filtered.length;
  tbody.innerHTML = '';

  if (filtered.length === 0) {
    const emptyRow = document.createElement('tr');
    const emptyCell = document.createElement('td');
    emptyCell.colSpan = 7;
    emptyCell.className = 'text-center text-outline py-10 text-[13px]';
    emptyCell.textContent = tr('no_results');
    emptyRow.appendChild(emptyCell);
    tbody.appendChild(emptyRow);
    return;
  }

  filtered.forEach(p => {
    const st = stockStatus(p);
    const row = document.createElement('tr');
    row.className = 'hover:bg-surface-container-low transition-colors cursor-pointer';
    row.dataset.pid = p.id;
    row.innerHTML = `
      <td class="px-5 py-4 text-[12px] font-mono text-outline font-semibold">${escapeHTML(p.sku)}</td>
      <td class="px-5 py-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background:${escapeHTML(p.iconBg)}">
            <span class="material-symbols-outlined text-[20px]" style="color:${escapeHTML(p.iconColor)};font-variation-settings:'FILL' 1;">${escapeHTML(p.icon)}</span>
          </div>
          <div>
            <p class="font-semibold text-[14px] text-on-surface">${escapeHTML(p.name)}</p>
            <p class="text-[11px] text-outline">${escapeHTML(p.manufacturer)}</p>
          </div>
        </div>
      </td>
      <td class="px-5 py-4">
        <span class="px-2.5 py-1 bg-surface-container rounded-full text-[12px] font-medium text-on-surface-variant">${escapeHTML(p.category)}</span>
      </td>
      <td class="px-5 py-4 text-[14px] font-semibold">${fmtInt(p.stock)} <span class="text-outline font-normal text-[12px]">${tr('inv_units')}</span></td>
      <td class="px-5 py-4 text-[14px] font-semibold">$${fmt(p.sellingPrice)}</td>
      <td class="px-5 py-4">
        <span class="px-2.5 py-1 rounded-full ${st.bg} ${st.text} text-[11px] font-bold inline-flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full ${st.dot} inline-block"></span>${escapeHTML(st.label)}
        </span>
      </td>
      <td class="px-5 py-4">
        <button class="p-1.5 rounded-full hover:bg-surface-container transition-colors text-outline" data-action="noop">
          <span class="material-symbols-outlined text-[18px]">more_vert</span>
        </button>
      </td>`;
    row.addEventListener('click', e => {
      if (e.target.closest('[data-action="noop"]')) return;
      selectProduct(p.id);
    });
    tbody.appendChild(row);
  });
}

function renderDetail(id) {
  const p = getProduct(id);
  if (!p) return;
  const st = stockStatus(p);
  const pct = Math.min(100, Math.round((p.stock / p.maxStock) * 100));
  const mgn = margin(p.unitCost, p.sellingPrice);

  const imageHtml = p.image
    ? `<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}"/>`
    : `<div class="w-full h-full flex flex-col items-center justify-center gap-4" style="background:${escapeHTML(p.iconBg)}">
        <span class="material-symbols-outlined text-[80px]" style="color:${escapeHTML(p.iconColor)};font-variation-settings:'FILL' 1;">${escapeHTML(p.icon)}</span>
        <p class="text-[13px] font-bold" style="color:${escapeHTML(p.iconColor)}">${escapeHTML(p.category)}</p>
       </div>`;

  const mvRows = p.movements.slice(0, 4).map(mv => `
    <tr class="hover:bg-surface/50 transition-colors">
      <td class="px-5 py-3.5 text-[13px]">${escapeHTML(mv.date)}</td>
      <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full ${typeStyles(mv.type)} text-[11px] font-bold">${escapeHTML(mv.type)}</span></td>
      <td class="px-5 py-3.5 text-[13px]">${escapeHTML(mv.warehouse)}</td>
      <td class="px-5 py-3.5">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-${escapeHTML(mv.color)}-100 flex items-center justify-center text-[10px] font-bold">${escapeHTML(mv.initials)}</div>
          <span class="text-[13px]">${escapeHTML(mv.user)}</span>
        </div>
      </td>
      <td class="px-5 py-3.5 font-bold ${changeClass(mv.change)}">${changeLabel(mv.change)}</td>
      <td class="px-5 py-3.5 font-bold text-right">${fmtInt(mv.balance)}</td>
    </tr>`).join('');

  const tagsHtml = p.tags.map(tag =>
    `<span class="px-3 py-1 bg-surface-container rounded-md text-on-surface-variant text-[12px] font-medium">${escapeHTML(tag)}</span>`
  ).join('');

  document.getElementById('detail-panel').innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div class="lg:col-span-7 space-y-5">
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="font-headline-lg text-headline-lg text-on-surface" style="font-size:clamp(22px,3vw,32px);">${escapeHTML(p.name)}</h2>
          <span class="px-3 py-1.5 rounded-full ${st.bg} ${st.text} text-[12px] font-bold flex items-center gap-2">
            <span class="w-2 h-2 rounded-full ${st.dot}"></span>${escapeHTML(st.label)}
          </span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="p-3 rounded-xl bg-white/50 border border-white/30">
            <p class="text-[10px] uppercase font-bold text-outline mb-1">SKU</p>
            <p class="font-bold text-[13px] text-primary">${escapeHTML(p.sku)}</p>
          </div>
          <div class="p-3 rounded-xl bg-white/50 border border-white/30">
            <p class="text-[10px] uppercase font-bold text-outline mb-1">Barcode</p>
            <p class="font-bold text-[13px] text-primary">${escapeHTML(p.barcode)}</p>
          </div>
          <div class="p-3 rounded-xl bg-white/50 border border-white/30">
            <p class="text-[10px] uppercase font-bold text-outline mb-1">Category</p>
            <p class="font-bold text-[13px] text-primary">${escapeHTML(p.category)}</p>
          </div>
          <div class="p-3 rounded-xl bg-white/50 border border-white/30">
            <p class="text-[10px] uppercase font-bold text-outline mb-1">Manufacturer</p>
            <p class="font-bold text-[13px] text-primary">${escapeHTML(p.manufacturer)}</p>
          </div>
        </div>
        <div class="glass-card p-5">
          <h3 class="font-headline-md text-headline-md mb-3" style="font-size:18px;">${tr('det_description')}</h3>
          <p class="text-[15px] text-on-surface-variant leading-relaxed">${escapeHTML(p.description)}</p>
          <div class="mt-4 flex flex-wrap gap-2">${tagsHtml}</div>
        </div>
      </div>
      <div class="lg:col-span-5">
        <div class="glass-card p-4 flex flex-col items-center relative group">
          <div class="w-full aspect-square rounded-xl overflow-hidden bg-surface-container-lowest">${imageHtml}</div>
          <div class="w-full mt-4 flex justify-between items-center px-2">
            <div class="flex -space-x-2">
              <div class="w-7 h-7 rounded-full border-2 border-white bg-slate-200"></div>
              <div class="w-7 h-7 rounded-full border-2 border-white bg-slate-300"></div>
              <div class="w-7 h-7 rounded-full border-2 border-white bg-slate-400"></div>
            </div>
            <button class="text-primary font-label-md text-label-md flex items-center gap-1 text-[13px] group/btn" data-action="open-movement" data-pid="${p.id}">
              ${tr('det_reg_mv')} <span class="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">arrow_right_alt</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="glass-card p-5">
        <div class="flex justify-between items-start mb-6">
          <div><h3 class="font-bold text-[16px]">${tr('det_inv_status')}</h3><p class="text-outline text-[13px]">${tr('det_live')}</p></div>
          <div class="p-2.5 bg-primary-fixed rounded-xl"><span class="material-symbols-outlined text-primary" style="font-variation-settings:'FILL' 1;">warehouse</span></div>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-end">
            <div>
              <span class="font-black text-on-surface" style="font-size:40px;">${fmtInt(p.stock)}</span>
              <span class="text-outline text-[13px] block mt-1">${tr('det_units')}</span>
            </div>
            <div class="text-right">
              <span class="text-[12px] font-bold text-outline">${pct}% ${tr('det_capacity')}</span>
            </div>
          </div>
          <div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">
            <div class="h-full ${pct < 20 ? 'bg-red-500' : pct < 40 ? 'bg-amber-500' : 'bg-primary'} transition-all" style="width:${pct}%"></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-surface-container-low p-3 rounded-xl">
              <p class="text-[10px] uppercase font-bold text-outline mb-1">${tr('det_min')}</p>
              <p class="font-bold text-[16px]">${fmtInt(p.minStock)}</p>
            </div>
            <div class="bg-surface-container-low p-3 rounded-xl">
              <p class="text-[10px] uppercase font-bold text-outline mb-1">${tr('det_location')}</p>
              <p class="font-bold text-[16px]">${escapeHTML(p.location)}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-card p-5">
        <div class="flex justify-between items-start mb-6">
          <div><h3 class="font-bold text-[16px]">${tr('det_pricing')}</h3><p class="text-outline text-[13px]">${tr('det_profit_sub')}</p></div>
          <div class="p-2.5 bg-tertiary-fixed rounded-xl"><span class="material-symbols-outlined text-on-tertiary-container" style="font-variation-settings:'FILL' 1;">payments</span></div>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <p class="text-on-surface-variant text-[13px] font-semibold">${tr('det_margin')}</p>
            <div class="flex items-center gap-2">
              <span class="font-black text-[22px]">${mgn}</span>
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-600">
                <span class="material-symbols-outlined text-[16px]">check</span>
              </div>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between items-center text-[13px]">
              <span class="text-outline">${tr('det_cost')}</span>
              <span class="font-bold">$${fmt(p.unitCost)}</span>
            </div>
            <div class="flex justify-between items-center text-[13px]">
              <span class="text-outline">${tr('det_price')}</span>
              <span class="font-bold text-primary">$${fmt(p.sellingPrice)}</span>
            </div>
            <div class="flex justify-between items-center text-[13px]">
              <span class="text-outline">${tr('det_stock_val')}</span>
              <span class="font-bold">$${fmt(p.stock * p.sellingPrice)}</span>
            </div>
          </div>
          <button class="w-full py-3 bg-primary text-on-primary rounded-full text-[13px] font-bold shadow hover:scale-105 active:scale-95 transition-all" data-action="open-pricing" data-id="${p.id}">
            ${tr('det_adjust')}
          </button>
        </div>
      </div>

      <div class="glass-card p-5 flex flex-col">
        <div class="mb-4"><h3 class="font-bold text-[16px]">${tr('det_demand')}</h3><p class="text-outline text-[13px]">${tr('det_weekly')}</p></div>
        <div class="flex-1 min-h-[100px] flex items-end gap-1.5 mb-4">
          ${[40,62,85,100,70,50,65].map((h, i) =>
            `<div class="flex-1 rounded-t-md ${i === 3 ? 'bg-primary' : 'bg-surface-container hover:bg-primary/30'} transition-all cursor-pointer" style="height:${h}%"></div>`
          ).join('')}
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button class="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-surface-variant/50 hover:bg-surface-variant transition-colors group" data-action="export">
            <span class="material-symbols-outlined text-primary group-hover:-translate-y-1 transition-transform">download</span>
            <span class="text-[10px] font-bold uppercase">${tr('det_export')}</span>
          </button>
          <button class="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-surface-variant/50 hover:bg-surface-variant transition-colors group" data-action="go-history">
            <span class="material-symbols-outlined text-primary group-hover:-translate-y-1 transition-transform">history</span>
            <span class="text-[10px] font-bold uppercase">${tr('det_history_btn')}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="glass-card overflow-hidden">
      <div class="px-5 py-4 border-b border-surface-container flex justify-between items-center">
        <div><h3 class="font-bold text-[16px]">${tr('det_mv_history')}</h3><p class="text-outline text-[13px]">${tr('det_mv_sub')} ${escapeHTML(p.name)}</p></div>
        <button class="text-primary text-[13px] font-bold flex items-center gap-1 hover:underline" data-action="go-history">
          ${tr('det_view_all')} <span class="material-symbols-outlined text-[16px]">open_in_new</span>
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead><tr class="bg-surface-container/30">
            <th class="px-5 py-3 text-[10px] uppercase font-bold text-outline">${tr('col_date')}</th>
            <th class="px-5 py-3 text-[10px] uppercase font-bold text-outline">${tr('col_action')}</th>
            <th class="px-5 py-3 text-[10px] uppercase font-bold text-outline">${tr('col_warehouse')}</th>
            <th class="px-5 py-3 text-[10px] uppercase font-bold text-outline">${tr('col_user')}</th>
            <th class="px-5 py-3 text-[10px] uppercase font-bold text-outline">${tr('col_change')}</th>
            <th class="px-5 py-3 text-[10px] uppercase font-bold text-outline text-right">${tr('col_balance')}</th>
          </tr></thead>
          <tbody class="divide-y divide-surface-container">${mvRows}</tbody>
        </table>
        ${p.movements.length === 0 ? `<div class="text-center text-outline text-[13px] py-8">${tr('no_movements')}</div>` : ''}
      </div>
    </div>`;
}

function selectProduct(id) {
  selectedId = id;
  renderDetail(id);
  document.getElementById('inv-list-view').style.display = 'none';
  document.getElementById('inv-detail-view').style.display = 'block';
}

function showInventoryList() {
  document.getElementById('inv-list-view').style.display = 'block';
  document.getElementById('inv-detail-view').style.display = 'none';
  renderProductList(
    document.getElementById('list-search').value,
    document.getElementById('cat-filter').value,
    document.getElementById('status-filter').value
  );
}

function renderDashboard() {
  const total = products.reduce((s, p) => s + p.stock * p.sellingPrice, 0);
  const active = products.filter(p => p.stock > 0).length;
  const low = products.filter(p => p.stock < p.minStock).length;

  document.getElementById('dash-products').textContent = products.length;
  const valShort = total >= 1000000
    ? '$' + Math.round(total / 1000000) + 'M'
    : total >= 1000
      ? '$' + Math.round(total / 1000) + 'k'
      : '$' + Math.round(total);
  document.getElementById('dash-value').textContent = valShort;
  document.getElementById('dash-active').textContent = active;
  document.getElementById('dash-low').textContent = low;

  const now = new Date();
  const loc = lang === 'es' ? 'es-MX' : 'en-US';
  document.getElementById('dash-date').textContent = now.toLocaleDateString(loc, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const inData  = [3200,4100,3800,6400,5200,4700,5800,4200,6100,5500,4800,6200];
  const outData = [2100,3200,2900,4800,3900,3500,4200,3100,4600,4100,3600,4700];
  const maxBar = Math.max(...inData, ...outData);

  document.getElementById('dash-chart').innerHTML = inData.map((v, i) => `
    <div class="flex flex-col items-center gap-0.5 flex-1">
      <div class="w-full flex items-end gap-0.5" style="height:140px">
        <div class="flex-1 rounded-t-sm bg-on-surface transition-all" style="height:${Math.round((v / maxBar) * 100)}%"></div>
        <div class="flex-1 rounded-t-sm bg-gray-300 transition-all" style="height:${Math.round((outData[i] / maxBar) * 100)}%"></div>
      </div>
      ${i === 3 ? `<div class="text-[9px] font-bold text-white bg-on-surface rounded px-1 py-0.5 mt-1">${(v / 1000).toFixed(1)}k</div>` : ''}
    </div>`).join('');

  document.getElementById('dash-months').innerHTML = months.map((m, i) =>
    `<span class="${i === 3 ? 'font-bold text-on-surface' : ''}">${m}</span>`
  ).join('');

  const alertProds = products.filter(p => p.stock < p.minStock).sort((a, b) => a.stock - b.stock);
  document.getElementById('dash-alerts').innerHTML = alertProds.length === 0
    ? `<div class="flex items-center gap-3 text-outline py-2"><span class="material-symbols-outlined text-emerald-500">check_circle</span><p class="text-[13px]">${tr('all_stocked')}</p></div>`
    : alertProds.map(p => {
        const st = stockStatus(p);
        const isOut = p.stock === 0;
        return `<div class="flex items-start gap-3 p-3 rounded-xl ${isOut ? 'bg-red-50' : 'bg-amber-50'} cursor-pointer hover:opacity-80 transition-opacity" data-action="go-product" data-pid="${p.id}">
          <span class="material-symbols-outlined text-[18px] ${isOut ? 'text-red-500' : 'text-amber-500'} mt-0.5">${isOut ? 'error' : 'warning'}</span>
          <div class="flex-1 min-w-0">
            <p class="text-[12px] font-bold truncate ${isOut ? 'text-red-700' : 'text-amber-700'}">${escapeHTML(st.label)}: ${escapeHTML(p.sku)}</p>
            <p class="text-[11px] text-outline truncate">${escapeHTML(p.name)} · ${fmtInt(p.stock)} ${tr('inv_units')} left</p>
          </div>
        </div>`;
      }).join('');

  const allMv = [];
  products.forEach(p => p.movements.forEach(mv => allMv.push({ ...mv, productName: p.name, productSku: p.sku, pid: p.id })));
  allMv.sort((a, b) => b.date.localeCompare(a.date));

  const typeIcon  = { INBOUND: 'arrow_downward', OUTBOUND: 'arrow_upward', TRANSFER: 'swap_horiz' };
  const typeColor = { INBOUND: 'text-emerald-600', OUTBOUND: 'text-red-500', TRANSFER: 'text-amber-500' };
  const typeLabel = { INBOUND: tr('type_inbound'), OUTBOUND: tr('type_outbound'), TRANSFER: tr('type_transfer') };

  document.getElementById('dash-movements-tbody').innerHTML = allMv.slice(0, 5).map(mv => `
    <tr class="hover:bg-surface-container-low transition-colors cursor-pointer" data-action="go-product" data-pid="${mv.pid}">
      <td class="px-5 py-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-[16px] ${typeColor[mv.type]}">${typeIcon[mv.type]}</span>
          </div>
          <div>
            <p class="text-[13px] font-semibold">${escapeHTML(mv.productName)}</p>
            <p class="text-[11px] text-outline">${escapeHTML(mv.productSku)}</p>
          </div>
        </div>
      </td>
      <td class="px-5 py-4">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${typeStyles(mv.type)}">
          <span class="material-symbols-outlined text-[12px]">${typeIcon[mv.type]}</span>${escapeHTML(typeLabel[mv.type])}
        </span>
      </td>
      <td class="px-5 py-4 font-bold ${changeClass(mv.change)}">${changeLabel(mv.change)} ${tr('inv_units')}</td>
      <td class="px-5 py-4 text-[13px] text-outline">${escapeHTML(mv.date)}</td>
      <td class="px-5 py-4 text-right">
        <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">${tr('mv_done')}</span>
      </td>
    </tr>`).join('');
}

function renderHistory(filter = '') {
  const tbody = document.getElementById('history-tbody');
  const allMovements = [];
  products.forEach(p => {
    p.movements.forEach(mv => allMovements.push({ ...mv, productName: p.name, productSku: p.sku }));
  });
  allMovements.sort((a, b) => b.date.localeCompare(a.date));
  const filtered = filter ? allMovements.filter(mv => mv.type === filter) : allMovements;

  tbody.innerHTML = filtered.map(mv => `
    <tr class="hover:bg-surface/50 transition-colors">
      <td class="px-card-padding py-3.5 text-[13px]">${escapeHTML(mv.date)}</td>
      <td class="px-card-padding py-3.5">
        <div class="text-[12px] font-semibold">${escapeHTML(mv.productName)}</div>
        <div class="text-[11px] text-outline">${escapeHTML(mv.productSku)}</div>
      </td>
      <td class="px-card-padding py-3.5"><span class="px-2.5 py-1 rounded-full ${typeStyles(mv.type)} text-[11px] font-bold">${escapeHTML(mv.type)}</span></td>
      <td class="px-card-padding py-3.5 text-[13px]">${escapeHTML(mv.warehouse)}</td>
      <td class="px-card-padding py-3.5">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-${escapeHTML(mv.color)}-100 flex items-center justify-center text-[10px] font-bold">${escapeHTML(mv.initials)}</div>
          <span class="text-[13px]">${escapeHTML(mv.user)}</span>
        </div>
      </td>
      <td class="px-card-padding py-3.5 font-bold ${changeClass(mv.change)}">${changeLabel(mv.change)}</td>
      <td class="px-card-padding py-3.5 font-bold text-right">${fmtInt(mv.balance)}</td>
    </tr>`).join('');
}

function shipStatusBadge(status) {
  const map = {
    transit:    { label: tr('ship_st_transit'),    cls: 'bg-blue-100 text-blue-700' },
    delivered:  { label: tr('ship_st_delivered'),  cls: 'bg-emerald-100 text-emerald-700' },
    delayed:    { label: tr('ship_st_delayed'),    cls: 'bg-orange-100 text-orange-700' },
    processing: { label: tr('ship_st_processing'), cls: 'bg-gray-200 text-gray-600' },
  };
  return map[status] || map.processing;
}

function renderShipments() {
  const tbody = document.getElementById('ship-tbody');
  if (!tbody) return;
  tbody.innerHTML = shipments.map(s => {
    const b = shipStatusBadge(s.status);
    const isSelected = s.id === selectedShipmentId;
    return `<tr class="hover:bg-surface-container-low transition-colors cursor-pointer ${isSelected ? 'bg-surface-container-low' : ''}" data-action="select-shipment" data-sid="${escapeHTML(s.id)}">
      <td class="px-5 py-4 font-bold text-[13px]">${escapeHTML(s.id)}</td>
      <td class="px-5 py-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-surface-container rounded-full flex items-center justify-center text-[11px] font-bold text-on-surface">${escapeHTML(s.initials)}</div>
          <span class="text-[14px]">${escapeHTML(s.recipient)}</span>
        </div>
      </td>
      <td class="px-5 py-4 text-[13px] text-outline">${escapeHTML(s.carrier)}</td>
      <td class="px-5 py-4 text-[13px] text-outline">${escapeHTML(s.date)}</td>
      <td class="px-5 py-4 text-right">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${b.cls}">${escapeHTML(b.label)}</span>
      </td>
    </tr>`;
  }).join('');

  const labelEl = document.getElementById('ship-selected-label');
  if (labelEl) labelEl.textContent = tr('ship_col_id') + ': ' + selectedShipmentId;
}

function selectShipment(id) {
  selectedShipmentId = id;
  renderShipments();
}
