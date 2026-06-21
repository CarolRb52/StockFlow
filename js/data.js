const products = [
  {
    id: 1, name: 'Procesador Industrial X-100', sku: 'SF-PR-100X', barcode: '7421-988-210',
    category: 'Heavy Machinery', manufacturer: 'Aether Tech',
    stock: 1240, maxStock: 1650, minStock: 250, location: 'WH-04 / B12',
    unitCost: 2140, sellingPrice: 3780,
    icon: 'memory', iconBg: '#dae2fd', iconColor: '#131b2e',
    description: 'High-performance processor engineered for 24/7 heavy-duty manufacturing. Features real-time thermal monitoring, modular component swapping, and automated throughput optimization. Built with military-grade alloys.',
    tags: ['Modular Architecture', 'Thermal Shielding', 'IoT Ready'],
    image: null,
    movements: [
      { date: 'Oct 24, 09:12 AM', type: 'INBOUND',  warehouse: 'Warehouse Global A',   user: 'John Doe',   initials: 'JD', color: 'blue',   change: +120,  balance: 1240 },
      { date: 'Oct 23, 02:45 PM', type: 'TRANSFER', warehouse: 'WH-A to WH-B',         user: 'Sarah Alv.', initials: 'SA', color: 'purple', change: -45,   balance: 1120 },
      { date: 'Oct 21, 11:30 AM', type: 'OUTBOUND', warehouse: 'Customer Fulfillment', user: 'Mike Koz.',  initials: 'MK', color: 'rose',   change: -210,  balance: 1165 },
      { date: 'Oct 19, 08:00 AM', type: 'INBOUND',  warehouse: 'Warehouse Global A',   user: 'John Doe',   initials: 'JD', color: 'blue',   change: +300,  balance: 1375 },
    ]
  },
  {
    id: 2, name: 'Sensor de Temperatura ST-200', sku: 'SF-ST-200', barcode: '8832-441-019',
    category: 'Electronics', manufacturer: 'SenseTech',
    stock: 85, maxStock: 500, minStock: 100, location: 'WH-02 / A04',
    unitCost: 380, sellingPrice: 720,
    icon: 'thermostat', iconBg: '#fcdeb5', iconColor: '#574425',
    description: 'Precision industrial temperature sensor with ±0.1°C accuracy and IP67 waterproofing. Supports MODBUS RTU and 4–20 mA outputs. Designed for extreme environments from -40°C to +200°C.',
    tags: ['IP67 Waterproof', 'MODBUS RTU', 'Wide Range'],
    image: null,
    movements: [
      { date: 'Oct 22, 10:00 AM', type: 'OUTBOUND', warehouse: 'Client Site B', user: 'Ana Lopez',  initials: 'AL', color: 'green',  change: -50,  balance: 85 },
      { date: 'Oct 20, 03:00 PM', type: 'INBOUND',  warehouse: 'WH-02',         user: 'John Doe',   initials: 'JD', color: 'blue',   change: +200, balance: 135 },
      { date: 'Oct 18, 09:30 AM', type: 'OUTBOUND', warehouse: 'Client Site A', user: 'Sarah Alv.', initials: 'SA', color: 'purple', change: -65,  balance: 70 },
    ]
  },
  {
    id: 3, name: 'Compresor Neumático CP-450', sku: 'SF-CP-450', barcode: '3319-774-882',
    category: 'Heavy Machinery', manufacturer: 'AirForce Ind.',
    stock: 520, maxStock: 800, minStock: 150, location: 'WH-01 / C07',
    unitCost: 5200, sellingPrice: 8900,
    icon: 'air', iconBg: '#e0e3e5', iconColor: '#45464d',
    description: 'Heavy-duty pneumatic compressor delivering 450 L/min at 10 bar. Direct-drive motor, oil-free cylinder design. Ideal for production lines, automotive workshops and industrial painting systems.',
    tags: ['Oil-Free', '10 Bar', '450 L/min'],
    image: null,
    movements: [
      { date: 'Oct 23, 11:00 AM', type: 'INBOUND',  warehouse: 'WH-01',           user: 'Mike Koz.', initials: 'MK', color: 'rose',  change: +100, balance: 520 },
      { date: 'Oct 20, 02:00 PM', type: 'OUTBOUND', warehouse: 'Factory Floor 3', user: 'John Doe',  initials: 'JD', color: 'blue',  change: -80,  balance: 420 },
      { date: 'Oct 17, 08:45 AM', type: 'INBOUND',  warehouse: 'WH-01',           user: 'Ana Lopez', initials: 'AL', color: 'green', change: +200, balance: 500 },
    ]
  },
  {
    id: 4, name: 'Cable Fibra Óptica FO-12', sku: 'SF-FO-12', barcode: '5527-663-100',
    category: 'Raw Materials', manufacturer: 'OpticNet',
    stock: 3200, maxStock: 5000, minStock: 500, location: 'WH-03 / D01',
    unitCost: 12, sellingPrice: 28,
    icon: 'cable', iconBg: '#d3e4fe', iconColor: '#131b2e',
    description: '12-core single-mode fiber optic cable, OS2 grade. Zero-water-peak (ZWP), LSZH jacket for safe indoor use. Supports 10G/40G/100G Ethernet over distances up to 10 km.',
    tags: ['OS2 Single-Mode', 'LSZH Jacket', '100G Ready'],
    image: null,
    movements: [
      { date: 'Oct 21, 01:00 PM', type: 'OUTBOUND', warehouse: 'Data Center Install', user: 'Sarah Alv.', initials: 'SA', color: 'purple', change: -800,  balance: 3200 },
      { date: 'Oct 19, 09:00 AM', type: 'INBOUND',  warehouse: 'WH-03',               user: 'John Doe',   initials: 'JD', color: 'blue',   change: +2000, balance: 4000 },
      { date: 'Oct 15, 04:00 PM', type: 'OUTBOUND', warehouse: 'Client Offices',       user: 'Mike Koz.',  initials: 'MK', color: 'rose',   change: -500,  balance: 2000 },
    ]
  },
  {
    id: 5, name: 'Motor Eléctrico ME-75', sku: 'SF-ME-75', barcode: '6641-229-558',
    category: 'Electronics', manufacturer: 'DriveTech',
    stock: 0, maxStock: 200, minStock: 20, location: 'WH-02 / B09',
    unitCost: 1850, sellingPrice: 3200,
    icon: 'electric_bolt', iconBg: '#ffdad6', iconColor: '#ba1a1a',
    description: '75 kW three-phase induction motor, IE3 energy efficiency class. Cast iron frame with IP55 protection. Designed for pumps, fans, conveyors, and compressors in demanding industrial settings.',
    tags: ['IE3 Efficiency', 'IP55', 'Cast Iron'],
    image: null,
    movements: [
      { date: 'Oct 24, 07:00 AM', type: 'OUTBOUND', warehouse: 'Plant Expansion A', user: 'Ana Lopez',  initials: 'AL', color: 'green',  change: -10, balance: 0 },
      { date: 'Oct 20, 10:00 AM', type: 'OUTBOUND', warehouse: 'Maintenance Dept.', user: 'John Doe',   initials: 'JD', color: 'blue',   change: -15, balance: 10 },
      { date: 'Oct 10, 02:00 PM', type: 'INBOUND',  warehouse: 'WH-02',             user: 'Sarah Alv.', initials: 'SA', color: 'purple', change: +25, balance: 25 },
    ]
  },
  {
    id: 6, name: 'Válvula de Control VC-300', sku: 'SF-VC-300', barcode: '9930-118-742',
    category: 'Tools & Parts', manufacturer: 'FlowMaster',
    stock: 180, maxStock: 600, minStock: 200, location: 'WH-04 / A02',
    unitCost: 420, sellingPrice: 780,
    icon: 'valve', iconBg: '#e0e3e5', iconColor: '#45464d',
    description: 'Pneumatic 3-way control valve DN50 with stainless steel body and PTFE seat. PN40 rated. Compatible with PLC automation systems. Used in chemical processing, HVAC and fluid control applications.',
    tags: ['DN50', 'PN40', 'PTFE Seat'],
    image: null,
    movements: [
      { date: 'Oct 23, 08:30 AM', type: 'OUTBOUND', warehouse: 'Chemical Plant 1', user: 'Mike Koz.', initials: 'MK', color: 'rose',  change: -120, balance: 180 },
      { date: 'Oct 18, 11:00 AM', type: 'INBOUND',  warehouse: 'WH-04',            user: 'John Doe',  initials: 'JD', color: 'blue',  change: +300, balance: 300 },
      { date: 'Oct 14, 03:45 PM', type: 'OUTBOUND', warehouse: 'HVAC Project B',   user: 'Ana Lopez', initials: 'AL', color: 'green', change: -80,  balance: 0 },
    ]
  },
  {
    id: 7, name: 'Panel Solar PS-500W', sku: 'SF-PS-500', barcode: '2214-997-333',
    category: 'Electronics', manufacturer: 'SolarEdge',
    stock: 95, maxStock: 300, minStock: 50, location: 'WH-05 / E03',
    unitCost: 280, sellingPrice: 520,
    icon: 'solar_power', iconBg: '#fcdeb5', iconColor: '#574425',
    description: 'Monocrystalline 500W solar panel with 21.5% efficiency. Half-cut cell technology for better shade tolerance. Anodized aluminum frame, tempered glass front. 25-year linear power warranty.',
    tags: ['Half-Cut Cell', '21.5% Efficiency', '25-yr Warranty'],
    image: null,
    movements: [
      { date: 'Oct 22, 09:00 AM', type: 'INBOUND',  warehouse: 'WH-05',              user: 'Sarah Alv.', initials: 'SA', color: 'purple', change: +100, balance: 95 },
      { date: 'Oct 19, 02:30 PM', type: 'OUTBOUND', warehouse: 'Solar Farm Project', user: 'Mike Koz.',  initials: 'MK', color: 'rose',   change: -55,  balance: -5 },
      { date: 'Oct 15, 10:00 AM', type: 'INBOUND',  warehouse: 'WH-05',              user: 'Ana Lopez',  initials: 'AL', color: 'green',  change: +50,  balance: 50 },
    ]
  },
  {
    id: 8, name: 'Tornillería Industrial TI-M8', sku: 'SF-TI-M8', barcode: '7750-002-411',
    category: 'Tools & Parts', manufacturer: 'BoltPro',
    stock: 8500, maxStock: 15000, minStock: 2000, location: 'WH-01 / F12',
    unitCost: 0.45, sellingPrice: 1.20,
    icon: 'hardware', iconBg: '#e5eeff', iconColor: '#45464d',
    description: 'M8 hexagonal-head bolts and nuts, grade 8.8 zinc-plated steel. DIN 933/934 standard. Sold in bags of 100 units. Suitable for structural assemblies, machinery maintenance and general industrial use.',
    tags: ['Grade 8.8', 'Zinc-Plated', 'DIN 933/934'],
    image: null,
    movements: [
      { date: 'Oct 24, 06:00 AM', type: 'INBOUND',  warehouse: 'WH-01',           user: 'John Doe',   initials: 'JD', color: 'blue',   change: +3000, balance: 8500 },
      { date: 'Oct 21, 08:00 AM', type: 'OUTBOUND', warehouse: 'Maintenance Stock', user: 'Mike Koz.', initials: 'MK', color: 'rose',   change: -1500, balance: 5500 },
      { date: 'Oct 17, 01:00 PM', type: 'INBOUND',  warehouse: 'WH-01',           user: 'Sarah Alv.', initials: 'SA', color: 'purple', change: +4000, balance: 7000 },
    ]
  },
];

let selectedId = 1;

const shipments = [
  { id: '#SF-9021', recipient: 'Alpha Motors',    initials: 'AM', carrier: 'DHL Express', date: '24 Sep, 2023', status: 'transit' },
  { id: '#SF-8854', recipient: 'Zenith Tech',     initials: 'ZT', carrier: 'FedEx',       date: '23 Sep, 2023', status: 'delivered' },
  { id: '#SF-7643', recipient: 'Global Corp',     initials: 'GC', carrier: 'Maersk',      date: '25 Sep, 2023', status: 'delayed' },
  { id: '#SF-9112', recipient: 'Sys-X Inc.',      initials: 'SY', carrier: 'UPS Supply',  date: '28 Sep, 2023', status: 'processing' },
  { id: '#SF-6830', recipient: 'NovaTech SA',     initials: 'NT', carrier: 'DHL Express', date: '30 Sep, 2023', status: 'transit' },
  { id: '#SF-5512', recipient: 'Beta Industries', initials: 'BI', carrier: 'Schenker',    date: '01 Oct, 2023', status: 'processing' },
];

let selectedShipmentId = '#SF-9021';
