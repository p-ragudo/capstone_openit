import { useState } from "react";
import { useBills } from "../../contexts/BillContext";
import { CalendarIcon } from "../Icons";
import { MONTHS, SHORT_MONTHS, YEARS, DAYS } from "../../utils/constants";
import { parseAmount } from "../../utils/formatting";

function initFormFromRow(row) {
  if (!row) return { billMonth: "September", billYear: "2025", amount: "", kwh: "", dueMonth: "Oct", dueDay: "15" };
  const [month, year]   = row.billDate.split(" ");
  const [dueMon, dueD]  = row.dueDate.split(" ");
  const fullIdx         = MONTHS.indexOf(dueMon);
  return {
    billMonth: month,
    billYear:  year,
    amount:    String(parseAmount(row.amount)),
    kwh:       String(row.kwh),
    dueMonth:  fullIdx >= 0 ? SHORT_MONTHS[fullIdx] : dueMon,
    dueDay:    dueD,
  };
}

export default function AddBillModal({ onClose, editRow = null }) {
  const { addOrUpdateBill } = useBills();
  const init = initFormFromRow(editRow);

  const [mode,      setMode]      = useState("manual");
  const [billMonth, setBillMonth] = useState(init.billMonth);
  const [billYear,  setBillYear]  = useState(init.billYear);
  const [amount,    setAmount]    = useState(init.amount);
  const [kwh,       setKwh]       = useState(init.kwh);
  const [dueMonth,  setDueMonth]  = useState(init.dueMonth);
  const [dueDay,    setDueDay]    = useState(init.dueDay);

  function handleBillMonthChange(month) {
    setBillMonth(month);
    setDueMonth(SHORT_MONTHS[(MONTHS.indexOf(month) + 1) % 12]);
  }

  function handleSubmit() {
    if (!amount || !kwh) return;
    addOrUpdateBill({ billMonth, billYear, amount, kwh, dueMonth, dueDay });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{editRow ? "Edit Bill" : "Add New Bill"}</h2>

        <div className="modal-toggle">
          <button className={`toggle-btn${mode === "manual" ? " toggle-active" : ""}`} onClick={() => setMode("manual")}>Manual</button>
          <button className={`toggle-btn${mode === "scan"   ? " toggle-active" : ""}`} onClick={() => setMode("scan")}>Scan</button>
        </div>

        <div className="modal-row">
          <CalendarIcon />
          <select className="modal-select" value={billMonth} onChange={e => handleBillMonthChange(e.target.value)}>
            {MONTHS.map(m => <option key={m}>{m}</option>)}
          </select>
          <select className="modal-select" value={billYear} onChange={e => setBillYear(e.target.value)}>
            {YEARS.map(y => <option key={y}>{y}</option>)}
          </select>
        </div>

        <div className="modal-field">
          <label className="modal-label">Total Amount</label>
          <input className="modal-input" type="number" min="0" placeholder="Value" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>

        <div className="modal-field">
          <label className="modal-label">KWH Used</label>
          <input className="modal-input" type="number" min="0" placeholder="Value" value={kwh} onChange={e => setKwh(e.target.value)} />
        </div>

        <div className="modal-due-row">
          <label className="modal-label">Due Date</label>
          <div className="modal-due-selects">
            <select className="modal-select" value={dueMonth} onChange={e => setDueMonth(e.target.value)}>
              {SHORT_MONTHS.map(m => <option key={m}>{m}</option>)}
            </select>
            <select className="modal-select" value={dueDay} onChange={e => setDueDay(e.target.value)}>
              {DAYS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div className="show-more-row">
          <button className="show-more-btn">Show More...</button>
        </div>

        <div className="modal-actions">
          <button className="modal-add-btn" onClick={handleSubmit}>{editRow ? "Save Changes" : "Add Bill"}</button>
          <button className="modal-cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
