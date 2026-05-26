import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

/* ── Constants ── */
const RATE_PER_KWH = 10;
const BREAKDOWN_COLORS = ["#E07A10", "#E8B84B", "#F5C842", "#D4C5A0"];
const DAYS_LABELS = ["SU", "M", "T", "W", "TH", "F", "S"];

const SEARCH_LABELS = {
  AIRCON: "Search Aircons", FRIDGE: "Search Fridges", TV: "Search TVs",
  WASHER: "Search Washers", OVEN: "Search Ovens", COMPUTER: "Search Computers", LIGHTS: "Search Lights",
};

const CATEGORIES = [
  { key: "AIRCON", label: "AIRCON" }, { key: "FRIDGE", label: "FRIDGE" },
  { key: "TV", label: "TV" },         { key: "WASHER", label: "WASHER" },
  { key: "OVEN", label: "OVEN" },     { key: "COMPUTER", label: "COMPUTER" },
  { key: "LIGHTS", label: "LIGHTS" },
];

const APPLIANCE_DATA = {
  AIRCON: [
    { name: "Air Conditioner - Split Type, Inverter (1.00 HP)", watts: 1450 },
    { name: "Air Conditioner - Split Type, Inverter (1.50 HP)", watts: 2150 },
    { name: "Air Conditioner - Split Type, Inverter (2.00 HP)", watts: 2900 },
    { name: "Air Conditioner - Window Type (1.00 HP)", watts: 900 },
    { name: "Air Conditioner - Window Type (1.50 HP)", watts: 1350 },
    { name: "Portable Air Conditioner (1.00 HP)", watts: 1200 },
  ],
  FRIDGE: [
    { name: "Refrigerator - Single Door (3 cu ft)", watts: 60 },
    { name: "Refrigerator - Single Door (5 cu ft)", watts: 80 },
    { name: "Refrigerator - Two Door (7 cu ft)", watts: 120 },
    { name: "Refrigerator - Two Door (10 cu ft)", watts: 160 },
    { name: "Side-by-Side Refrigerator (16 cu ft)", watts: 200 },
    { name: "Chest Freezer (5 cu ft)", watts: 100 },
  ],
  TV: [
    { name: "LED TV 24\"", watts: 25 },
    { name: "LED TV 32\"", watts: 40 },
    { name: "LED TV 43\"", watts: 80 },
    { name: "LED TV 55\"", watts: 130 },
    { name: "OLED TV 55\"", watts: 100 },
    { name: "Smart TV 32\"", watts: 45 },
    { name: "Smart TV 43\"", watts: 85 },
  ],
  WASHER: [
    { name: "Washing Machine - Top Load (6 kg)", watts: 350 },
    { name: "Washing Machine - Top Load (8 kg)", watts: 500 },
    { name: "Washing Machine - Front Load (7 kg)", watts: 350 },
    { name: "Washing Machine - Front Load (8 kg)", watts: 400 },
    { name: "Washing Machine - Twin Tub (6 kg)", watts: 300 },
  ],
  OVEN: [
    { name: "Microwave Oven (20L)", watts: 1000 },
    { name: "Microwave Oven (30L)", watts: 1200 },
    { name: "Electric Oven (25L)", watts: 1200 },
    { name: "Electric Oven (42L)", watts: 1800 },
    { name: "Toaster Oven (15L)", watts: 800 },
    { name: "Air Fryer (3L)", watts: 1200 },
    { name: "Air Fryer (5L)", watts: 1500 },
  ],
  COMPUTER: [
    { name: "Desktop Computer (Office Use)", watts: 150 },
    { name: "Desktop Computer (Mid Range)", watts: 250 },
    { name: "Desktop Computer (Gaming)", watts: 600 },
    { name: "Laptop (Budget)", watts: 45 },
    { name: "Laptop (Standard)", watts: 60 },
    { name: "Gaming Laptop", watts: 150 },
    { name: "All-in-One PC", watts: 100 },
  ],
  LIGHTS: [
    { name: "LED Bulb (5W)", watts: 5 },
    { name: "LED Bulb (9W)", watts: 9 },
    { name: "LED Bulb (14W)", watts: 14 },
    { name: "LED Tube Light (18W)", watts: 18 },
    { name: "LED Downlight (12W)", watts: 12 },
    { name: "Fluorescent Lamp (20W)", watts: 20 },
    { name: "Fluorescent Lamp (40W)", watts: 40 },
  ],
};

const INITIAL_APPLIANCES = [
  { id: 1,  name: "Air Conditioner",   status: "8 hours / 3 days / week",   watts: 1200, monthlyKwh: 249.6, costPerMonth: 2840 },
  { id: 2,  name: "Refrigerator",      status: "24 hours / 7 days / week",  watts: 180,  monthlyKwh: 129.6, costPerMonth: 1620 },
  { id: 3,  name: "Smart Home TV",     status: "4 hours / 7 days / week",   watts: 120,  monthlyKwh:  51.8, costPerMonth: 1240 },
  { id: 4,  name: "Washing Machine",   status: "3 hours / 3 days / week",   watts: 800,  monthlyKwh:  93.6, costPerMonth:  860 },
  { id: 5,  name: "Electric Fan",      status: "8 hours / 7 days / week",   watts: 70,   monthlyKwh:  80.2, costPerMonth:  698 },
  { id: 6,  name: "Water Heater",      status: "1 hour / 7 days / week",    watts: 2000, monthlyKwh:  34.6, costPerMonth:  415 },
  { id: 7,  name: "Electric Stove",    status: "1 hour / 7 days / week",    watts: 1500, monthlyKwh:  25.9, costPerMonth:  311 },
  { id: 8,  name: "Microwave",         status: "0.5 hours / 5 days / week", watts: 1000, monthlyKwh:  10.8, costPerMonth:  130 },
  { id: 9,  name: "Rice Cooker",       status: "1 hour / 7 days / week",    watts: 500,  monthlyKwh:   8.6, costPerMonth:  103 },
  { id: 10, name: "Desktop Computer",  status: "6 hours / 5 days / week",   watts: 250,  monthlyKwh:  32.5, costPerMonth:  390 },
];

/* ── Category Icons ── */
const CATEGORY_ICONS = {
  AIRCON: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/>
      <circle cx="12" cy="12" r="2.5"/>
    </svg>
  ),
  FRIDGE: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <line x1="5" y1="10" x2="19" y2="10"/>
      <line x1="10" y1="6" x2="10" y2="8"/>
      <line x1="10" y1="14" x2="10" y2="18"/>
    </svg>
  ),
  TV: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="14" rx="2"/>
      <line x1="8" y1="22" x2="16" y2="22"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
    </svg>
  ),
  WASHER: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2"/>
      <circle cx="12" cy="13" r="5"/>
      <circle cx="8" cy="6" r="1" fill="currentColor"/>
    </svg>
  ),
  OVEN: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2"/>
      <rect x="6" y="9" width="12" height="9" rx="1"/>
      <circle cx="7" cy="6" r="0.8" fill="currentColor"/><circle cx="12" cy="6" r="0.8" fill="currentColor"/><circle cx="17" cy="6" r="0.8" fill="currentColor"/>
    </svg>
  ),
  COMPUTER: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="13" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  LIGHTS: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 3-2 4.5-3 6H9c-1-1.5-3-3-3-6a6 6 0 0 1 6-6z"/>
      <line x1="9" y1="17" x2="15" y2="17"/>
    </svg>
  ),
};

/* ── Shared small icons ── */
function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

/* ── Decorative icons for stat cards ── */
function CalendarDecorIcon() {
  return (
    <svg width="92" height="92" viewBox="0 0 92 92" fill="none">
      <rect x="8" y="14" width="76" height="66" rx="10" fill="#E8B84B" opacity="0.28"/>
      <rect x="8" y="26" width="76" height="8" fill="#E8B84B" opacity="0.38"/>
      <rect x="23" y="6" width="8" height="16" rx="4" fill="#E8B84B" opacity="0.38"/>
      <rect x="61" y="6" width="8" height="16" rx="4" fill="#E8B84B" opacity="0.38"/>
      <rect x="20" y="42" width="14" height="11" rx="3" fill="#E8B84B" opacity="0.30"/>
      <rect x="39" y="42" width="14" height="11" rx="3" fill="#E8B84B" opacity="0.30"/>
      <rect x="58" y="42" width="14" height="11" rx="3" fill="#E8B84B" opacity="0.30"/>
      <rect x="20" y="59" width="14" height="11" rx="3" fill="#E8B84B" opacity="0.30"/>
      <rect x="39" y="59" width="14" height="11" rx="3" fill="#E8B84B" opacity="0.30"/>
      <rect x="58" y="59" width="14" height="11" rx="3" fill="#E8B84B" opacity="0.30"/>
    </svg>
  );
}
function MoneyDecorIcon() {
  return (
    <svg width="92" height="92" viewBox="0 0 92 92" fill="none">
      <rect x="6" y="24" width="80" height="48" rx="9" fill="#E8B84B" opacity="0.30"/>
      <circle cx="46" cy="48" r="14" fill="#E8B84B" opacity="0.35"/>
      <rect x="12" y="30" width="18" height="12" rx="4" fill="#E8B84B" opacity="0.28"/>
      <rect x="62" y="58" width="18" height="12" rx="4" fill="#E8B84B" opacity="0.28"/>
    </svg>
  );
}

/* ══════════════════════════════
   APPLIANCE CALCULATOR
══════════════════════════════ */
function ApplianceCalculator({ onAdd, onCancel }) {
  const [category, setCategory]               = useState("AIRCON");
  const [searchQuery, setSearchQuery]         = useState("");
  const [showDropdown, setShowDropdown]       = useState(false);
  const [selectedAppliance, setSelected]      = useState(null);
  const [quantity, setQuantity]               = useState(1);
  const [watts, setWatts]                     = useState(0);
  const [hoursPerDay, setHours]               = useState(8);
  const [selectedDays, setDays]               = useState(new Set([1, 2, 3]));

  const daysCount    = selectedDays.size || 0;
  const costPerHour  = (watts * quantity / 1000) * RATE_PER_KWH;
  const costPerDay   = costPerHour * hoursPerDay;
  const costPerWeek  = costPerDay * daysCount;
  const costPerMonth = costPerWeek * 4.33;
  const sliderPct    = `${((hoursPerDay - 1) / 23) * 100}%`;

  const filtered = (APPLIANCE_DATA[category] || []).filter(a =>
    !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function changeCategory(cat) {
    setCategory(cat); setSearchQuery(""); setSelected(null); setWatts(0); setShowDropdown(false);
  }

  function pickAppliance(a) {
    setSelected(a); setWatts(a.watts); setSearchQuery(a.name); setShowDropdown(false);
  }

  function toggleDay(i) {
    setDays(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  }

  function handleAdd() {
    if (!watts) return;
    const monthlyHours = hoursPerDay * daysCount * 4.33;
    const monthlyKwh   = parseFloat(((watts * quantity / 1000) * monthlyHours).toFixed(1));
    onAdd({
      name: selectedAppliance ? selectedAppliance.name : searchQuery || "Custom Appliance",
      status: `${hoursPerDay} hour${hoursPerDay > 1 ? "s" : ""} / ${daysCount} day${daysCount !== 1 ? "s" : ""} / week`,
      watts,
      monthlyKwh,
      costPerMonth: Math.round(costPerMonth),
    });
  }

  const fmt = n => n.toFixed(2);

  return (
    <div className="calc-overlay" onClick={onCancel}>
      <div className="calc-card" onClick={e => e.stopPropagation()}>

        <div className="calc-blob-ur" />
        <div className="calc-blob-lr" />

        <div className="calc-body">

          {/* ── LEFT ── */}
          <div className="calc-left">
            <div>
              <h2 className="calc-title">Appliance Energy Calculator</h2>
              <p className="calc-sub">Know how much your gadgets and appliances consume so you stay in control and manage your monthly budget better.</p>
            </div>

            {/* Select Appliance Type */}
            <div>
              <h3 className="calc-section-label">Select Appliance Type</h3>
              <div className="cat-grid">
                {CATEGORIES.map(cat => {
                  const Icon = CATEGORY_ICONS[cat.key];
                  return (
                    <button key={cat.key} className={`cat-btn${category === cat.key ? " cat-active" : ""}`} onClick={() => changeCategory(cat.key)}>
                      <span className="cat-icon"><Icon /></span>
                      <span className="cat-label-text">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="calc-search-wrap">
                <input
                  className="calc-search"
                  placeholder={SEARCH_LABELS[category]}
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setShowDropdown(true); }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                />
                <svg className="calc-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                {showDropdown && filtered.length > 0 && (
                  <div className="calc-dropdown">
                    {filtered.map((a, i) => (
                      <button key={i} className="calc-dropdown-opt" onMouseDown={() => pickAppliance(a)}>{a.name}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="calc-mini-card calc-qty-row">
              <span className="calc-mini-label">Quantity</span>
              <div className="qty-right">
                <span className="qty-val">{quantity}</span>
                <div className="stepper-group">
                  <button className="stepper-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                  <div className="stepper-sep" />
                  <button className="stepper-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
              </div>
            </div>

            {/* Wattage + Hours */}
            <div className="calc-mini-row">
              <div className="calc-mini-card">
                <span className="calc-mini-label">Wattage</span>
                <span className="calc-mini-sub">This is the appliance power rating</span>
                <input
                  className="calc-watts-input"
                  type="number" min="0"
                  value={watts || ""}
                  placeholder="0"
                  onChange={e => { setWatts(Number(e.target.value)); setSelected(null); }}
                />
              </div>

              <div className="calc-mini-card">
                <div className="calc-hours-head">
                  <span className="calc-mini-label">Hours used per day</span>
                  <span className="calc-hours-badge">{hoursPerDay}h</span>
                </div>
                <span className="calc-mini-sub">How long do you operate the appliance daily</span>
                <input
                  type="range" className="hours-slider"
                  min={1} max={24} value={hoursPerDay}
                  style={{ "--pct": sliderPct }}
                  onChange={e => setHours(Number(e.target.value))}
                />
                <div className="slider-ticks">
                  <span>1 HOUR</span><span>12 HOURS</span><span>24 HOURS</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="calc-right">

            {/* Days */}
            <div className="calc-mini-card">
              <span className="calc-mini-label">Days used per week</span>
              <span className="calc-mini-sub">How long do you operate the appliance weekly</span>
              <div className="days-row">
                {DAYS_LABELS.map((d, i) => (
                  <button key={i} className={`day-btn${selectedDays.has(i) ? " day-active" : ""}`} onClick={() => toggleDay(i)}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimate */}
            <div className="calc-mini-card calc-estimate">
              <span className="calc-est-heading">Estimate Cost To Operate</span>
              {selectedAppliance && <span className="calc-est-name">{selectedAppliance.name}</span>}

              <div className="cost-grid">
                <div className="cost-item">
                  <span className="cost-label">Cost per hour</span>
                  <span className="cost-val">Php {fmt(costPerHour)}</span>
                </div>
                <div className="cost-item">
                  <span className="cost-label">Cost per day</span>
                  <span className="cost-val">Php {fmt(costPerDay)}</span>
                </div>
                <div className="cost-item">
                  <span className="cost-label">Cost per week</span>
                  <span className="cost-val">Php {fmt(costPerWeek)}</span>
                </div>
                <div className="cost-item">
                  <span className="cost-label">Cost per month</span>
                  <span className="cost-val">Php {fmt(costPerMonth)}</span>
                </div>
              </div>

              <div className="calc-actions">
                <button className="modal-add-btn" onClick={handleAdd}>Add To My Appliances</button>
                <button className="modal-cancel-btn" onClick={onCancel}>Cancel</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   TRACK APPLIANCES PAGE
══════════════════════════════ */
function TrackAppliancesPage() {
  const location = useLocation();
  const [appliances, setAppliances] = useState(INITIAL_APPLIANCES);
  const [isCalcOpen, setCalcOpen]   = useState(location.state?.openAdd === true);
  const [isEditOpen, setEditOpen]   = useState(false);
  const [editId, setEditId]         = useState(null);
  const [editName, setEditName]     = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editWatts, setEditWatts]   = useState("");
  const [editKwh, setEditKwh]       = useState("");
  const [editCost, setEditCost]     = useState("");

  const totalKwh  = appliances.reduce((s, a) => s + a.monthlyKwh,   0);
  const totalCost = appliances.reduce((s, a) => s + a.costPerMonth,  0);
  const ranked    = [...appliances].sort((a, b) => b.costPerMonth - a.costPerMonth);
  const top3      = ranked.slice(0, 3);
  const top3Cost  = top3.reduce((s, a) => s + a.costPerMonth, 0);
  const othersCost = totalCost - top3Cost;

  const breakdownItems = [
    ...top3.map((a, i) => ({ id: a.id, label: a.name, cost: a.costPerMonth, color: BREAKDOWN_COLORS[i] })),
    ...(appliances.length > 3 ? [{ id: -1, label: "Others", cost: othersCost, color: BREAKDOWN_COLORS[3] }] : []),
  ];

  function handleCalcAdd(newAppliance) {
    const newId = Math.max(0, ...appliances.map(a => a.id)) + 1;
    setAppliances(prev => [...prev, { id: newId, ...newAppliance }]);
    setCalcOpen(false);
  }

  function openEdit(a) {
    setEditId(a.id); setEditName(a.name); setEditStatus(a.status);
    setEditWatts(String(a.watts)); setEditKwh(String(a.monthlyKwh)); setEditCost(String(a.costPerMonth));
    setEditOpen(true);
  }

  function handleEditSave() {
    setAppliances(prev => prev.map(a =>
      a.id === editId ? { ...a, name: editName, status: editStatus, watts: parseFloat(editWatts) || 0, monthlyKwh: parseFloat(editKwh) || 0, costPerMonth: parseFloat(editCost) || 0 } : a
    ));
    setEditOpen(false);
  }

  function handleDelete(id) { setAppliances(prev => prev.filter(a => a.id !== id)); }

  return (
    <div className="page">
      <Navbar />
      <main className="ta-main">

        <div className="ta-blob" />
        <h1 className="ta-title">Whats consuming your Electricity?</h1>

        {/* Top cards */}
        <div className="ta-top-cards">
          <div className="card ta-breakdown-card">
            <h3 className="ta-breakdown-title">Consumption Breakdown</h3>
            <div className="ta-bar">
              {breakdownItems.map((item, i) => (
                <div key={item.id} className="ta-bar-seg" style={{
                  width: `${(item.cost / totalCost) * 100}%`,
                  background: item.color,
                  borderRadius: i === 0 ? "8px 0 0 8px" : i === breakdownItems.length - 1 ? "0 8px 8px 0" : "0",
                }} />
              ))}
            </div>
            <div className="ta-legend">
              {breakdownItems.map(item => (
                <span key={item.id} className="ta-legend-item">
                  <span className="ta-legend-dot" style={{ background: item.color }} />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div className="card ta-stat-card">
            <div className="ta-stat-decor"><CalendarDecorIcon /></div>
            <div className="ta-stat-number">{totalKwh.toFixed(1)}</div>
            <div className="ta-stat-label">Monthly kWh</div>
          </div>

          <div className="card ta-stat-card">
            <div className="ta-stat-decor"><MoneyDecorIcon /></div>
            <div className="ta-stat-number">₱{totalCost.toLocaleString("en-PH")}</div>
            <div className="ta-stat-label">Est. Monthly Cost</div>
          </div>
        </div>

        {/* Table */}
        <div className="card ta-appliances-card">
          <h2 className="ta-appliances-title">Tracked appliances</h2>
          <div className="ta-table-wrap">
            <table className="ta-table">
              <thead>
                <tr>
                  <th>No.</th><th>Appliance</th><th>Status</th><th>Wattage</th><th>Cost Per Month</th><th />
                </tr>
              </thead>
              <tbody>
                {ranked.map((a, idx) => (
                  <tr key={a.id} className="ta-row">
                    <td className="ta-td-rank">
                      <span className={`ta-rank ${idx === 0 ? "ta-rank-gold" : "ta-rank-grey"}`}>{idx + 1}</span>
                    </td>
                    <td className="ta-td-name">{a.name}</td>
                    <td className="ta-td-status">{a.status}</td>
                    <td className="ta-td-watts">{a.watts} W</td>
                    <td className={`ta-td-cost${idx === 0 ? " ta-cost-gold" : ""}`}>₱{a.costPerMonth.toLocaleString("en-PH")}</td>
                    <td className="ta-td-actions">
                      <div className="ta-actions">
                        <button className="ta-act-edit"   onClick={() => openEdit(a)}><PencilIcon /></button>
                        <button className="ta-act-delete" onClick={() => handleDelete(a.id)}><XIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button className="fab" onClick={() => setCalcOpen(true)}>+</button>

        {/* Calculator overlay */}
        {isCalcOpen && <ApplianceCalculator onAdd={handleCalcAdd} onCancel={() => setCalcOpen(false)} />}

        {/* Edit modal */}
        {isEditOpen && (
          <div className="modal-overlay" onClick={() => setEditOpen(false)}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <h2 className="modal-title">Edit Appliance</h2>
              <div className="modal-field">
                <label className="modal-label">Appliance Name</label>
                <input className="modal-input" value={editName} onChange={e => setEditName(e.target.value)} />
              </div>
              <div className="modal-field">
                <label className="modal-label">Status</label>
                <input className="modal-input" value={editStatus} onChange={e => setEditStatus(e.target.value)} />
              </div>
              <div className="modal-field">
                <label className="modal-label">Wattage (W)</label>
                <input className="modal-input" type="number" min="0" value={editWatts} onChange={e => setEditWatts(e.target.value)} />
              </div>
              <div className="modal-field">
                <label className="modal-label">Monthly kWh</label>
                <input className="modal-input" type="number" min="0" value={editKwh} onChange={e => setEditKwh(e.target.value)} />
              </div>
              <div className="modal-field">
                <label className="modal-label">Cost Per Month (₱)</label>
                <input className="modal-input" type="number" min="0" value={editCost} onChange={e => setEditCost(e.target.value)} />
              </div>
              <div className="modal-actions">
                <button className="modal-add-btn" onClick={handleEditSave}>Save Changes</button>
                <button className="modal-cancel-btn" onClick={() => setEditOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default TrackAppliancesPage;
