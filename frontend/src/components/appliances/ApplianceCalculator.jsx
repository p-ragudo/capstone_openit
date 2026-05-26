import "../../styles/components/calculator.css";
import "../../styles/components/calculator-controls.css";
import "../../styles/components/calculator-result.css";
import { useCalculator } from "../../hooks/useCalculator";
import { CATEGORIES, SEARCH_LABELS, DAYS_LABELS } from "../../utils/applianceData";
import { CATEGORY_ICONS } from "./CategoryIcons";

export default function ApplianceCalculator({ onAdd, onCancel }) {
  const calc = useCalculator();
  const fmt  = n => n.toFixed(2);

  function handleAdd() {
    const result = calc.buildResult();
    if (result) onAdd(result);
  }

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

            <div>
              <h3 className="calc-section-label">Select Appliance Type</h3>
              <div className="cat-grid">
                {CATEGORIES.map(cat => {
                  const Icon = CATEGORY_ICONS[cat.key];
                  return (
                    <button key={cat.key} className={`cat-btn${calc.category === cat.key ? " cat-active" : ""}`} onClick={() => calc.changeCategory(cat.key)}>
                      <span className="cat-icon"><Icon /></span>
                      <span className="cat-label-text">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="calc-search-wrap">
                <input
                  className="calc-search"
                  placeholder={SEARCH_LABELS[calc.category]}
                  value={calc.searchQuery}
                  onChange={e => { calc.setSearchQuery(e.target.value); calc.setShowDropdown(true); }}
                  onFocus={() => calc.setShowDropdown(true)}
                  onBlur={() => setTimeout(() => calc.setShowDropdown(false), 150)}
                />
                <svg className="calc-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                {calc.showDropdown && calc.filtered.length > 0 && (
                  <div className="calc-dropdown">
                    {calc.filtered.map((a, i) => (
                      <button key={i} className="calc-dropdown-opt" onMouseDown={() => calc.pickAppliance(a)}>{a.name}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="calc-mini-card calc-qty-row">
              <span className="calc-mini-label">Quantity</span>
              <div className="qty-right">
                <span className="qty-val">{calc.quantity}</span>
                <div className="stepper-group">
                  <button className="stepper-btn" onClick={() => calc.setQuantity(q => Math.max(1, q - 1))}>−</button>
                  <div className="stepper-sep" />
                  <button className="stepper-btn" onClick={() => calc.setQuantity(q => q + 1)}>+</button>
                </div>
              </div>
            </div>

            <div className="calc-mini-row">
              <div className="calc-mini-card">
                <span className="calc-mini-label">Wattage</span>
                <span className="calc-mini-sub">This is the appliance power rating</span>
                <input className="calc-watts-input" type="number" min="0" value={calc.watts || ""} placeholder="0"
                  onChange={e => { calc.setWatts(Number(e.target.value)); }} />
              </div>
              <div className="calc-mini-card">
                <div className="calc-hours-head">
                  <span className="calc-mini-label">Hours used per day</span>
                  <span className="calc-hours-badge">{calc.hoursPerDay}h</span>
                </div>
                <span className="calc-mini-sub">How long do you operate the appliance daily</span>
                <input type="range" className="hours-slider" min={1} max={24} value={calc.hoursPerDay}
                  style={{ "--pct": calc.sliderPct }} onChange={e => calc.setHours(Number(e.target.value))} />
                <div className="slider-ticks">
                  <span>1 HOUR</span><span>12 HOURS</span><span>24 HOURS</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="calc-right">
            <div className="calc-mini-card">
              <span className="calc-mini-label">Days used per week</span>
              <span className="calc-mini-sub">How long do you operate the appliance weekly</span>
              <div className="days-row">
                {DAYS_LABELS.map((d, i) => (
                  <button key={i} className={`day-btn${calc.selectedDays.has(i) ? " day-active" : ""}`} onClick={() => calc.toggleDay(i)}>{d}</button>
                ))}
              </div>
            </div>

            <div className="calc-mini-card calc-estimate">
              <span className="calc-est-heading">Estimate Cost To Operate</span>
              {calc.selectedAppliance && <span className="calc-est-name">{calc.selectedAppliance.name}</span>}
              <div className="cost-grid">
                <div className="cost-item"><span className="cost-label">Cost per hour</span><span className="cost-val">Php {fmt(calc.costPerHour)}</span></div>
                <div className="cost-item"><span className="cost-label">Cost per day</span><span className="cost-val">Php {fmt(calc.costPerDay)}</span></div>
                <div className="cost-item"><span className="cost-label">Cost per week</span><span className="cost-val">Php {fmt(calc.costPerWeek)}</span></div>
                <div className="cost-item"><span className="cost-label">Cost per month</span><span className="cost-val">Php {fmt(calc.costPerMonth)}</span></div>
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
