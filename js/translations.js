let lang = 'en';

const translations = {
  en: {
    nav_dashboard: 'Dashboard', nav_inventory: 'Inventory', nav_shipments: 'Shipments',
    nav_analytics: 'Analytics', nav_history: 'History', nav_support: 'Support', nav_account: 'Account',
    notif_title: 'Notifications', notif_mark_read: 'Mark all read',
    notif1_title: 'Inbound received · WH-04', notif1_body: '+120 units of X-100',
    notif2_title: 'Low stock · Sensor ST-200', notif2_body: 'Only 85 units remaining',
    notif3_title: 'Out of stock · Motor ME-75', notif3_body: '0 units available',
    notif_2h: '2 hours ago', notif_5h: '5 hours ago', notif_yest: 'Yesterday',
    lbl_unit_cost: 'Unit Cost (USD)', lbl_sell_price: 'Selling Price (USD)',
    lbl_calc_margin: 'Calculated Margin', btn_cancel: 'Cancel', btn_save: 'Save',
    modal_mv_title: 'Register Movement', lbl_product: 'Product',
    lbl_action_type: 'Action Type', lbl_warehouse: 'Warehouse / Location',
    lbl_resp_user: 'Responsible User', lbl_qty: 'Quantity', btn_register: 'Register',
    ph_warehouse: 'e.g. WH-04 / B12', ph_user: 'e.g. Jane Doe',
    type_inbound: 'INBOUND', type_outbound: 'OUTBOUND', type_transfer: 'TRANSFER',
    st_active: 'ACTIVE', st_low: 'LOW STOCK', st_critical: 'CRITICAL', st_out: 'OUT OF STOCK',
    kpi_products: 'Total Products', kpi_value: 'Total Stock Value',
    kpi_active: 'Products in Stock', kpi_low: 'Need Attention',
    badge_urgent: 'urgent',
    section_alerts: 'Stock Alerts', btn_manage: 'Manage inventory →',
    section_activity: 'Recent Activity', btn_view_all: 'View all →',
    qa_scan: 'Scan Item', qa_dispatch: 'Dispatch', qa_audit: 'Audit', qa_suppliers: 'Suppliers',
    all_stocked: 'All products are well stocked',
    section_movements: 'Stock Movements', sub_movements: 'Entries vs Exits (Last 12 Months)',
    legend_entry: 'Entries', legend_exit: 'Exits',
    section_last_mv: 'Last 5 Movements', sub_last_mv: 'Real-time inventory ledger',
    kpi_queue: 'Queue', mv_done: 'COMPLETED',
    inv_list_title: 'Inventory List', inv_list_sub: 'Manage your products and global stock levels.',
    btn_export_csv: 'Export CSV', btn_add_item: 'Add New Item',
    inv_all_status: 'All Status', inv_units: 'Units',
    col_sku: 'SKU', col_category: 'Category', col_stock: 'Current Stock',
    col_price: 'Unit Price', col_status: 'Status', col_product: 'Product',
    no_results: 'No products found.',
    inv_all_cats: 'All categories',
    inv_heavy: 'Heavy Machinery', inv_electronics: 'Electronics',
    inv_tools: 'Tools & Parts', inv_raw: 'Raw Materials',
    det_description: 'Description', det_inv_status: 'Inventory Status',
    det_live: 'Live stock count', det_units: 'Current Units', det_capacity: 'capacity',
    det_min: 'Min. Stock', det_location: 'Location',
    det_pricing: 'Pricing Model', det_profit_sub: 'Profit & Margin',
    det_margin: 'Profit Margin', det_cost: 'Unit Cost', det_price: 'Selling Price',
    det_stock_val: 'Stock Value', det_adjust: 'Adjust Pricing',
    det_demand: 'Demand Trends', det_weekly: 'Weekly orders',
    det_export: 'Export', det_history_btn: 'History',
    det_mv_history: 'Movement History', det_mv_sub: 'Latest logs for',
    det_view_all: 'View All', det_reg_mv: 'Register Movement',
    col_date: 'Date & Time', col_action: 'Action', col_warehouse: 'Warehouse',
    col_user: 'User', col_change: 'Change', col_balance: 'Balance',
    no_movements: 'No movements recorded yet', back_list: 'Back to list',
    hist_title: 'Movement History', hist_sub: 'Complete audit log', hist_all: 'All types',
    cs_analytics: 'Advanced analytics coming soon.',
    ship_title: 'Shipment Management', ship_sub: 'Monitor and coordinate global logistics in real time.',
    btn_schedule: 'Schedule Shipment', ship_scheduled: 'Shipment scheduled',
    ship_kpi_transit: 'In Transit', ship_kpi_delivered: 'Delivered Today', ship_units: 'units',
    ship_kpi_delay: 'Delay Alerts',
    ship_table_title: 'Cargo Tracking',
    ship_col_id: 'Shipment ID', ship_col_dest: 'Recipient', ship_col_carrier: 'Carrier',
    ship_col_date: 'Est. Date', ship_col_status: 'Status',
    ship_route_title: 'Active Route Detail', ship_location: 'Current Location',
    ship_step1: 'Origin Departure', ship_step2: 'International Transit', ship_step3: 'Arrival at Destination',
    ship_btn_docs: 'View Documentation', ship_docs_toast: 'Documentation opened',
    ship_st_transit: 'In Transit', ship_st_delivered: 'Delivered',
    ship_st_delayed: 'Delayed', ship_st_processing: 'Processing',
    toast_notif_read: 'All notifications marked as read',
    toast_export: 'Export started',
    toast_bad_price: 'Enter valid prices',
    toast_price_cost: 'Selling price must exceed cost',
    toast_pricing_ok: 'Pricing updated for',
    toast_no_wh: 'Enter a warehouse location',
    toast_no_user: 'Enter a responsible user',
    toast_no_qty: 'Enter a valid quantity',
    toast_no_stock: 'Insufficient stock for this operation',
    toast_prod_added: 'Product added to inventory',
    toast_prod_required: 'Name and SKU are required',
    toast_ship_address: 'Enter a shipping address',
    toast_ship_cust: 'Enter customer name',
    toast_ship_phone: 'Enter customer phone',
    modal_ship_title: 'Schedule Shipment',
    modal_ship_sub: 'Complete the fields to register a new outbound order',
    ship_sec_origin: 'Origin', ship_sec_address: 'Shipping Address',
    ship_sec_customer: 'Customer', ship_sec_carrier: 'Carrier & Date',
    lbl_ship_product: 'Product', lbl_ship_stock: 'Available Stock',
    lbl_ship_street: 'Street / Address', lbl_ship_city: 'City',
    lbl_ship_postal: 'Postal Code', lbl_ship_country: 'Country',
    lbl_cust_name: 'Full Name', lbl_cust_phone: 'Phone', lbl_cust_postal: 'Postal Code',
    lbl_carrier: 'Carrier', lbl_ship_date: 'Est. Delivery Date',
    lbl_buyer_note: 'Buyer Note', ph_buyer_note: 'Special instructions or comments…',
    modal_add_title: 'Add New Product',
    lbl_image: 'Product Image', lbl_img_hint: 'Click to upload or drag an image',
    lbl_prod_name: 'Product Name', lbl_sku: 'SKU', lbl_barcode: 'Barcode',
    lbl_category: 'Category', lbl_manufacturer: 'Manufacturer',
    lbl_description: 'Description',
    lbl_stock: 'Current Stock', lbl_min_stock: 'Min. Stock', lbl_max_stock: 'Max. Stock',
    lbl_location: 'Location / Shelf',
    btn_save: 'Save Product',
    bc_home: 'Home', bc_dashboard: 'Dashboard',
    bc_inventory: 'Inventory', bc_products: 'Products',
    bc_logistics: 'Logistics', bc_reports: 'Reports',
    bc_mv_history: 'Movement History',
  },
  es: {
    nav_dashboard: 'Inicio', nav_inventory: 'Inventario', nav_shipments: 'Envíos',
    nav_analytics: 'Analítica', nav_history: 'Historial', nav_support: 'Soporte', nav_account: 'Cuenta',
    notif_title: 'Notificaciones', notif_mark_read: 'Marcar todo leído',
    notif1_title: 'Entrada recibida · WH-04', notif1_body: '+120 unidades de X-100',
    notif2_title: 'Stock bajo · Sensor ST-200', notif2_body: 'Solo 85 unidades restantes',
    notif3_title: 'Sin stock · Motor ME-75', notif3_body: '0 unidades disponibles',
    notif_2h: 'Hace 2 horas', notif_5h: 'Hace 5 horas', notif_yest: 'Ayer',
    lbl_unit_cost: 'Costo Unitario (USD)', lbl_sell_price: 'Precio de Venta (USD)',
    lbl_calc_margin: 'Margen Calculado', btn_cancel: 'Cancelar', btn_save: 'Guardar',
    modal_mv_title: 'Registrar Movimiento', lbl_product: 'Producto',
    lbl_action_type: 'Tipo de Acción', lbl_warehouse: 'Almacén / Ubicación',
    lbl_resp_user: 'Usuario Responsable', lbl_qty: 'Cantidad', btn_register: 'Registrar',
    ph_warehouse: 'ej. WH-04 / B12', ph_user: 'ej. Jane Doe',
    type_inbound: 'ENTRADA', type_outbound: 'SALIDA', type_transfer: 'TRANSFERENCIA',
    st_active: 'ACTIVO', st_low: 'STOCK BAJO', st_critical: 'CRÍTICO', st_out: 'SIN STOCK',
    kpi_products: 'Total de Productos', kpi_value: 'Valor del Inventario',
    kpi_active: 'Productos en Stock', kpi_low: 'Requieren Atención',
    badge_urgent: 'urgente',
    section_alerts: 'Alertas de Stock', btn_manage: 'Gestionar inventario →',
    section_activity: 'Actividad Reciente', btn_view_all: 'Ver todo →',
    qa_scan: 'Escanear', qa_dispatch: 'Despacho', qa_audit: 'Auditoría', qa_suppliers: 'Proveedores',
    all_stocked: 'Todos los productos tienen stock suficiente',
    section_movements: 'Movimientos de Stock', sub_movements: 'Entradas vs Salidas (Últimos 12 Meses)',
    legend_entry: 'Entradas', legend_exit: 'Salidas',
    section_last_mv: 'Últimos 5 Movimientos', sub_last_mv: 'Libro de inventario en tiempo real',
    kpi_queue: 'En Cola', mv_done: 'COMPLETADO',
    inv_list_title: 'Lista de Inventario', inv_list_sub: 'Gestione sus productos y niveles de stock globales.',
    btn_export_csv: 'Exportar CSV', btn_add_item: 'Agregar Producto',
    inv_all_status: 'Todo el Estado', inv_units: 'Unidades',
    col_sku: 'SKU', col_category: 'Categoría', col_stock: 'Stock Actual',
    col_price: 'Precio Unit.', col_status: 'Estado', col_product: 'Producto',
    no_results: 'No se encontraron productos.',
    inv_all_cats: 'Todas las categorías',
    inv_heavy: 'Maquinaria Pesada', inv_electronics: 'Electrónica',
    inv_tools: 'Herramientas', inv_raw: 'Materias Primas',
    det_description: 'Descripción', det_inv_status: 'Estado del Inventario',
    det_live: 'Conteo de stock en vivo', det_units: 'Unidades Actuales', det_capacity: 'capacidad',
    det_min: 'Stock Mín.', det_location: 'Ubicación',
    det_pricing: 'Modelo de Precios', det_profit_sub: 'Rentabilidad',
    det_margin: 'Margen de Ganancia', det_cost: 'Costo Unitario', det_price: 'Precio de Venta',
    det_stock_val: 'Valor en Stock', det_adjust: 'Ajustar Precios',
    det_demand: 'Tendencia de Demanda', det_weekly: 'Pedidos semanales',
    det_export: 'Exportar', det_history_btn: 'Historial',
    det_mv_history: 'Historial de Movimientos', det_mv_sub: 'Últimos registros de',
    det_view_all: 'Ver Todo', det_reg_mv: 'Registrar Movimiento',
    col_date: 'Fecha y Hora', col_action: 'Acción', col_warehouse: 'Almacén',
    col_user: 'Usuario', col_change: 'Cambio', col_balance: 'Saldo',
    no_movements: 'Sin movimientos registrados', back_list: 'Volver a la lista',
    hist_title: 'Historial de Movimientos', hist_sub: 'Registro de auditoría completo', hist_all: 'Todos los tipos',
    cs_analytics: 'Analítica avanzada próximamente.',
    ship_title: 'Gestión de Envíos', ship_sub: 'Supervisa y coordina la logística global en tiempo real.',
    btn_schedule: 'Agendar Envío', ship_scheduled: 'Envío agendado',
    ship_kpi_transit: 'En Tránsito', ship_kpi_delivered: 'Entregados Hoy', ship_units: 'unidades',
    ship_kpi_delay: 'Alertas de Retraso',
    ship_table_title: 'Seguimiento de Cargas',
    ship_col_id: 'ID Envío', ship_col_dest: 'Destinatario', ship_col_carrier: 'Transportista',
    ship_col_date: 'Fecha Est.', ship_col_status: 'Estado',
    ship_route_title: 'Detalle de Ruta Activa', ship_location: 'Ubicación Actual',
    ship_step1: 'Salida de Origen', ship_step2: 'Tránsito Internacional', ship_step3: 'Llegada a Destino',
    ship_btn_docs: 'Ver Documentación', ship_docs_toast: 'Documentación abierta',
    ship_st_transit: 'En Tránsito', ship_st_delivered: 'Entregado',
    ship_st_delayed: 'Retrasado', ship_st_processing: 'Procesando',
    toast_notif_read: 'Notificaciones marcadas como leídas',
    toast_export: 'Exportación iniciada',
    toast_bad_price: 'Ingresa precios válidos',
    toast_price_cost: 'El precio de venta debe superar el costo',
    toast_pricing_ok: 'Precios actualizados para',
    toast_no_wh: 'Ingresa una ubicación de almacén',
    toast_no_user: 'Ingresa un usuario responsable',
    toast_no_qty: 'Ingresa una cantidad válida',
    toast_no_stock: 'Stock insuficiente para esta operación',
    toast_prod_added: 'Producto agregado al inventario',
    toast_prod_required: 'Nombre y SKU son obligatorios',
    toast_ship_address: 'Ingresa una dirección de envío',
    toast_ship_cust: 'Ingresa el nombre del cliente',
    toast_ship_phone: 'Ingresa el teléfono del cliente',
    modal_ship_title: 'Agendar Envío',
    modal_ship_sub: 'Completa los campos para registrar una nueva orden de salida',
    ship_sec_origin: 'Origen', ship_sec_address: 'Dirección de Envío',
    ship_sec_customer: 'Cliente', ship_sec_carrier: 'Transportista y Fecha',
    lbl_ship_product: 'Producto', lbl_ship_stock: 'Stock Disponible',
    lbl_ship_street: 'Calle / Dirección', lbl_ship_city: 'Ciudad',
    lbl_ship_postal: 'Código Postal', lbl_ship_country: 'País',
    lbl_cust_name: 'Nombre Completo', lbl_cust_phone: 'Teléfono', lbl_cust_postal: 'Código Postal',
    lbl_carrier: 'Transportista', lbl_ship_date: 'Fecha Est. de Entrega',
    lbl_buyer_note: 'Nota del Comprador', ph_buyer_note: 'Instrucciones especiales o comentarios…',
    modal_add_title: 'Agregar Producto',
    lbl_image: 'Imagen del Producto', lbl_img_hint: 'Haz clic para subir o arrastra una imagen',
    lbl_prod_name: 'Nombre del Producto', lbl_sku: 'SKU', lbl_barcode: 'Código de Barras',
    lbl_category: 'Categoría', lbl_manufacturer: 'Fabricante',
    lbl_description: 'Descripción',
    lbl_stock: 'Stock Actual', lbl_min_stock: 'Stock Mín.', lbl_max_stock: 'Stock Máx.',
    lbl_location: 'Ubicación / Estante',
    btn_save: 'Guardar Producto',
    bc_home: 'Inicio', bc_dashboard: 'Panel',
    bc_inventory: 'Inventario', bc_products: 'Productos',
    bc_logistics: 'Logística', bc_reports: 'Reportes',
    bc_mv_history: 'Historial de Movimientos',
  }
};

function tr(key) {
  return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = tr(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = tr(el.dataset.i18nPlaceholder);
  });
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.placeholder = tr('inv_search') || 'Search products...';
  const listSearch = document.getElementById('list-search');
  if (listSearch) listSearch.placeholder = tr('inv_search') || 'Search product...';

  const cf = document.getElementById('cat-filter');
  if (cf && cf.options.length >= 5) {
    cf.options[0].text = tr('inv_all_cats');
    cf.options[1].text = tr('inv_heavy');
    cf.options[2].text = tr('inv_electronics');
    cf.options[3].text = tr('inv_tools');
    cf.options[4].text = tr('inv_raw');
  }
  const sf = document.getElementById('status-filter');
  if (sf && sf.options.length >= 5) {
    sf.options[0].text = tr('inv_all_status');
    sf.options[1].text = tr('st_active');
    sf.options[2].text = tr('st_low');
    sf.options[3].text = tr('st_critical');
    sf.options[4].text = tr('st_out');
  }
  const hf = document.getElementById('history-filter');
  if (hf && hf.options.length >= 4) {
    hf.options[0].text = tr('hist_all');
    hf.options[1].text = tr('type_inbound');
    hf.options[2].text = tr('type_outbound');
    hf.options[3].text = tr('type_transfer');
  }
  const mt = document.getElementById('mv-type');
  if (mt && mt.options.length >= 3) {
    mt.options[0].text = tr('type_inbound');
    mt.options[1].text = tr('type_outbound');
    mt.options[2].text = tr('type_transfer');
  }
}

function toggleLang() {
  lang = lang === 'en' ? 'es' : 'en';
  document.getElementById('lang-label').textContent = lang === 'en' ? 'ES' : 'EN';
  applyTranslations();
  const active = document.querySelector('[id^="page-"]:not([style*="display: none"]):not([style*="display:none"])');
  if (active) {
    const pg = active.id.replace('page-', '');
    if (pg === 'dashboard') renderDashboard();
    else if (pg === 'inventory') {
      const detailVisible = document.getElementById('inv-detail-view').style.display !== 'none';
      if (detailVisible) renderDetail(selectedId);
      else renderProductList(
        document.getElementById('list-search').value,
        document.getElementById('cat-filter').value,
        document.getElementById('status-filter').value
      );
    } else if (pg === 'shipments') renderShipments();
    else if (pg === 'history') renderHistory(document.getElementById('history-filter').value);
  }
  updateBreadcrumbs(currentPage);
}
