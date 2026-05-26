import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DashboardAsset1 from "../assets/DashboardAsset1.png";

const CHART_DATA = [
  { month: "Jan", pct: 28,  kwh: 255, amount: "₱1,175" },
  { month: "Feb", pct: 22,  kwh: 215, amount: "₱980"   },
  { month: "Mar", pct: 100, kwh: 604, amount: "₱7,258" },
  { month: "Apr", pct: 74,  kwh: 448, amount: "₱5,370" },
  { month: "May", pct: 55,  kwh: 333, amount: "₱3,996" },
  { month: "Jun", pct: 34,  kwh: 206, amount: "₱2,470" },
  { month: "Jul", pct: 20,  kwh: 121, amount: "₱1,452" },
];

const TOP_CONSUMERS = [
  { rank: 1, name: "Air Conditioner",  watts: 52,  note: "8 HRS / 3 DAYS / WEEK",  cost: "₱2,840" },
  { rank: 2, name: "Refrigerator",     watts: 85,  note: "24 HRS / 7 DAYS / WEEK", cost: "₱1,220" },
  { rank: 3, name: "Smart Home TV",    watts: 18,  note: "3 HRS / 2 DAYS / WEEK",  cost: "₱940"   },
  { rank: 4, name: "Washing Machine",  watts: 120, note: "3 HRS / 2 DAYS / WEEK",  cost: "₱450"   },
  { rank: 5, name: "Electric Fan",     watts: 35,  note: "THIS MONTH",              cost: "₱280"   },
];

const TICK_COUNT = 30;
const FILLED_TICKS = Math.round(TICK_COUNT * 0.71);

function ArrowBtn({ onClick }) {
  return (
    <button className="card-arrow-btn" aria-label="View details" onClick={onClick}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </button>
  );
}

function MoneyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const [fabOpen, setFabOpen] = useState(false);
  const [hoveredBar, setHoveredBar] = useState(null);

  function goTo(path) {
    setFabOpen(false);
    navigate(path, { state: { openAdd: true } });
  }

  return (
    <div className="page">
      <Navbar />
      <main className="dashboard-main">

        {/* Layer 1 — background blobs */}
        <div className="blob blob-left" />
        <div className="blob blob-right" />

        {/* Layer 2 — content */}
        <h1 className="welcome-text">Welcome Back, User!</h1>

        <div className="dashboard-grid">

          {/* Layer 3 — mascot image */}
          <img src={DashboardAsset1} alt="" className="dashboard-asset" />

          {/* Center stack: Estimated Consumption + Last Month's Bill */}
          <div className="center-cards">

            <div className="card">
              <ArrowBtn onClick={() => navigate("/TrackAppliances")} />
              <div className="card-title-row">
                <span className="card-icon"><MoneyIcon /></span>
                Estimated Consumption
              </div>
              <p className="card-amount">₱2,450</p>
              <div className="tick-bar">
                {Array.from({ length: TICK_COUNT }, (_, i) => (
                  <span key={i} className={`tick ${i < FILLED_TICKS ? "tick-on" : "tick-off"}`} />
                ))}
              </div>
              <div className="card-foot">
                <span className="muted">Budget Remaining: ₱1,050</span>
                <span className="amber-text">71%</span>
              </div>
            </div>

            <div className="card">
              <ArrowBtn onClick={() => navigate("/BillHistory")} />
              <div className="card-title-row">
                <span className="card-icon"><CalendarIcon /></span>
                Last Month's Bill
              </div>
              <p className="card-amount">₱3,450</p>
              <p className="card-change">↑ 12% from previous month</p>
            </div>

          </div>

          {/* Right: Top Consumers */}
          <div className="card top-consumers-card">
            <ArrowBtn onClick={() => navigate("/TrackAppliances")} />
            <h3 className="card-heading">Top Consumers</h3>
            <p className="muted" style={{ fontSize: "13px", marginTop: "4px" }}>
              Appliances ranked by weekly load.
            </p>
            <ul className="consumers-list">
              {TOP_CONSUMERS.map((item) => (
                <li key={item.rank} className="consumer-item">
                  <span className={`rank-badge ${item.rank === 1 ? "rank-gold" : "rank-grey"}`}>
                    {item.rank}
                  </span>
                  <div className="consumer-info">
                    <span className="consumer-name">{item.name}</span>
                    <span className="consumer-watts">{item.watts}W</span>
                  </div>
                  <div className="consumer-right">
                    <span className="consumer-cost">{item.cost}</span>
                    <span className="consumer-note">{item.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom spanning: Monthly Usage */}
          <div className="card monthly-card">
            <div className="monthly-card-header">
              <span className="monthly-card-title">Monthly Usage</span>
              <button className="monthly-arrow-btn" aria-label="View details" onClick={() => navigate("/BillHistory")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </div>
            <div className="bar-chart">
              {CHART_DATA.map(({ month, pct, kwh, amount }) => (
                <div
                  key={month}
                  className="bar-col"
                  onMouseEnter={() => setHoveredBar(month)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {hoveredBar === month && (
                    <div className="bar-tooltip">
                      <span className="bar-tooltip-month">{month}</span>
                      <span className="bar-tooltip-row"><span>kWh</span><strong>{kwh}</strong></span>
                      <span className="bar-tooltip-row"><span>Cost</span><strong>{amount}</strong></span>
                    </div>
                  )}
                  <div className="bar-space">
                    <div className={`bar${hoveredBar === month ? " bar-hovered" : ""}`} style={{ height: `${pct}%` }} />
                  </div>
                  <span className="bar-label">{month}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Layer 4 — FAB + drop-up */}
        {fabOpen && <div className="fab-backdrop" onClick={() => setFabOpen(false)} />}
        <div className="fab-wrap">
          {fabOpen && (
            <div className="fab-menu">
              <button className="fab-menu-item" onClick={() => goTo("/BillHistory")}>Add Bill</button>
              <button className="fab-menu-item" onClick={() => goTo("/TrackAppliances")}>Add Appliance</button>
            </div>
          )}
          <button className={`fab${fabOpen ? " fab-open" : ""}`} onClick={() => setFabOpen(v => !v)}>+</button>
        </div>

      </main>
    </div>
  );
}

export default DashboardPage;
