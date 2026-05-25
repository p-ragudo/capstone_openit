import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const SHORT_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const YEARS = ["2023","2024","2025","2026","2027"];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));

const INITIAL_BILLS = [
  { id: 1,  billDate: "April 2026",     dueDate: "May 15",       kwh: 215, amount: "₱980",   change: "-8%",  dir: "down"    },
  { id: 2,  billDate: "March 2026",     dueDate: "April 15",     kwh: 238, amount: "₱1,070", change: "-27%", dir: "down"    },
  { id: 3,  billDate: "February 2026",  dueDate: "March 15",     kwh: 310, amount: "₱1,460", change: "+14%", dir: "up"      },
  { id: 4,  billDate: "January 2026",   dueDate: "February 15",  kwh: 278, amount: "₱1,280", change: "-14%", dir: "down"    },
  { id: 5,  billDate: "December 2025",  dueDate: "January 15",   kwh: 322, amount: "₱1,490", change: "+24%", dir: "up"      },
  { id: 6,  billDate: "November 2025",  dueDate: "December 15",  kwh: 260, amount: "₱1,200", change: "-8%",  dir: "down"    },
  { id: 7,  billDate: "October 2025",   dueDate: "November 15",  kwh: 282, amount: "₱1,300", change: "+10%", dir: "up"      },
  { id: 8,  billDate: "September 2025", dueDate: "October 15",   kwh: 258, amount: "₱1,185", change: "-5%",  dir: "down"    },
  { id: 9,  billDate: "August 2025",    dueDate: "September 15", kwh: 270, amount: "₱1,245", change: "+6%",  dir: "up"      },
  { id: 10, billDate: "July 2025",      dueDate: "August 15",    kwh: 255, amount: "₱1,175", change: "—",    dir: "neutral" },
];

function parseAmount(str) {
  return parseFloat(String(str).replace(/[₱,]/g, "")) || 0;
}

function formatAmount(num) {
  return "₱" + Number(num).toLocaleString("en-PH");
}

function recalcChanges(bills) {
  if (bills.length === 0) return bills;
  const sorted = [...bills].sort((a, b) => new Date(a.billDate) - new Date(b.billDate));
  const withChanges = sorted.map((bill, idx) => {
    if (idx === 0) return { ...bill, change: "—", dir: "neutral" };
    const prev = sorted[idx - 1];
    const prevAmt = parseAmount(prev.amount);
    const currAmt = parseAmount(bill.amount);
    const pct = Math.round(((currAmt - prevAmt) / prevAmt) * 100);
    return {
      ...bill,
      change: pct === 0 ? "0%" : pct > 0 ? `+${pct}%` : `${pct}%`,
      dir: pct > 0 ? "up" : pct < 0 ? "down" : "neutral",
    };
  });
  return withChanges.reverse();
}

function TrendUp() {
  return (
    <svg width="56" height="38" viewBox="0 0 56 38" fill="none">
      <polyline points="2,32 18,14 30,22 54,4" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="38,2 54,2 54,18" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrendDown() {
  return (
    <svg width="56" height="38" viewBox="0 0 56 38" fill="none">
      <polyline points="2,6 18,24 30,16 54,34" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="38,36 54,36 54,20" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3,17 9,11 13,15 21,7" />
      <polyline points="15,7 21,7 21,13" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3,7 9,13 13,9 21,17" />
      <polyline points="15,17 21,17 21,11" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function BillHistoryPage() {
  const location = useLocation();
  const [bills, setBills] = useState(() => recalcChanges(INITIAL_BILLS));
  const [isOpen, setIsOpen] = useState(location.state?.openAdd === true);
  const [mode, setMode] = useState("manual");
  const [billMonth, setBillMonth] = useState("September");
  const [billYear, setBillYear] = useState("2025");
  const [amount, setAmount] = useState("");
  const [kwh, setKwh] = useState("");
  const [dueMonth, setDueMonth] = useState("Oct");
  const [dueDay, setDueDay] = useState("15");

  function handleBillMonthChange(month) {
    setBillMonth(month);
    setDueMonth(SHORT_MONTHS[(MONTHS.indexOf(month) + 1) % 12]);
  }

  function openModal() {
    setMode("manual");
    setBillMonth("September");
    setBillYear("2025");
    setAmount("");
    setKwh("");
    setDueMonth("Oct");
    setDueDay("15");
    setIsOpen(true);
  }

  function openEditModal(row) {
    const [month, year] = row.billDate.split(" ");
    const [dueMon, dueD] = row.dueDate.split(" ");
    const fullIdx = MONTHS.indexOf(dueMon);
    setBillMonth(month);
    setBillYear(year);
    setAmount(String(parseAmount(row.amount)));
    setKwh(String(row.kwh));
    setDueMonth(fullIdx >= 0 ? SHORT_MONTHS[fullIdx] : dueMon);
    setDueDay(dueD);
    setIsOpen(true);
  }

  function closeModal() { setIsOpen(false); }

  function handleSubmit() {
    if (!amount || !kwh) return;
    const amtNum = parseFloat(amount);
    const kwhNum = parseInt(kwh, 10);
    if (isNaN(amtNum) || isNaN(kwhNum)) return;

    const billDate = `${billMonth} ${billYear}`;
    const dueDate = `${dueMonth} ${dueDay}`;

    setBills(prev => {
      const exists = prev.find(b => b.billDate === billDate);
      let updated;
      if (exists) {
        updated = prev.map(b =>
          b.billDate === billDate
            ? { ...b, amount: formatAmount(amtNum), kwh: kwhNum, dueDate }
            : b
        );
      } else {
        const newId = Math.max(0, ...prev.map(b => b.id)) + 1;
        updated = [...prev, { id: newId, billDate, dueDate, kwh: kwhNum, amount: formatAmount(amtNum), change: "—", dir: "neutral" }];
      }
      return recalcChanges(updated);
    });

    closeModal();
  }

  const lowestBill  = bills.reduce((a, b) => parseAmount(a.amount) <= parseAmount(b.amount) ? a : b, bills[0]);
  const highestBill = bills.reduce((a, b) => parseAmount(a.amount) >= parseAmount(b.amount) ? a : b, bills[0]);

  return (
    <div className="page">
      <Navbar />
      <main className="bh-main">

        <div className="bh-blob" />

        {/* Header */}
        <div className="bh-header">
          <h1 className="bh-title">From Bill Tracking to<br />Bigger Savings</h1>
          <div className="bh-stats">
            <div className="bh-stat-card">
              <div className="bh-stat-top">
                <span className="bh-stat-amount">{lowestBill?.amount}</span>
                <TrendDown />
              </div>
              <p className="bh-stat-label">Lowest Month ({lowestBill?.billDate.split(" ")[0]})</p>
            </div>
            <div className="bh-stat-card">
              <div className="bh-stat-top">
                <span className="bh-stat-amount">{highestBill?.amount}</span>
                <TrendUp />
              </div>
              <p className="bh-stat-label">Highest Month ({highestBill?.billDate.split(" ")[0]})</p>
            </div>
          </div>
        </div>

        {/* Bill History card */}
        <div className="bh-card">
          <h2 className="bh-card-title">Bill History</h2>
          <div className="bh-table-wrap">
            <table className="bh-table">
              <thead>
                <tr>
                  <th className="th-tl" />
                  <th>Bill Date</th>
                  <th>Due Date</th>
                  <th>KWH Used</th>
                  <th>Total Amount</th>
                  <th>Change</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {bills.map((row, idx) => (
                  <tr key={row.id} className="bh-row">
                    <td className="td-tl">
                      <span className={`tl-dot ${idx === 0 ? "dot-filled" : "dot-outline"}`} />
                    </td>
                    <td className="td-date">{row.billDate}</td>
                    <td className="td-muted">{row.dueDate}</td>
                    <td className="td-kwh">{row.kwh}</td>
                    <td className={`td-amount${row.dir !== "neutral" ? " td-amount-bold" : ""}`}>
                      {row.amount}
                    </td>
                    <td className="td-change">
                      <div className="td-change-inner">
                        {row.dir === "up"      && <><ArrowUp />  <span className="chg-up">{row.change}</span></>}
                        {row.dir === "down"    && <><ArrowDown /> <span className="chg-down">{row.change}</span></>}
                        {row.dir === "neutral" && <span className="chg-neutral">{row.change}</span>}
                      </div>
                    </td>
                    <td className="td-actions">
                      <div className="bh-actions">
                        <button className="act-btn act-view"><EyeIcon /></button>
                        <button className="act-btn act-edit" onClick={() => openEditModal(row)}><PencilIcon /></button>
                        <button className="act-btn act-delete"><XIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button className="fab" onClick={openModal}>+</button>

        {/* Add New Bill Modal */}
        {isOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <h2 className="modal-title">Add New Bill</h2>

              <div className="modal-toggle">
                <button className={`toggle-btn${mode === "manual" ? " toggle-active" : ""}`} onClick={() => setMode("manual")}>Manual</button>
                <button className={`toggle-btn${mode === "scan" ? " toggle-active" : ""}`} onClick={() => setMode("scan")}>Scan</button>
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
                <button className="modal-add-btn" onClick={handleSubmit}>Add bill</button>
                <button className="modal-cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default BillHistoryPage;
