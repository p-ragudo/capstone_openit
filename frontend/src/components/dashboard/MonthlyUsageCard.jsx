import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/barchart.css";

const CHART_DATA = [
  { month: "Jan", pct: 28,  kwh: 255, amount: "₱1,175" },
  { month: "Feb", pct: 22,  kwh: 215, amount: "₱980"   },
  { month: "Mar", pct: 100, kwh: 604, amount: "₱7,258" },
  { month: "Apr", pct: 74,  kwh: 448, amount: "₱5,370" },
  { month: "May", pct: 55,  kwh: 333, amount: "₱3,996" },
  { month: "Jun", pct: 34,  kwh: 206, amount: "₱2,470" },
  { month: "Jul", pct: 20,  kwh: 121, amount: "₱1,452" },
];

export default function MonthlyUsageCard() {
  const navigate    = useNavigate();
  const [hoveredBar, setHoveredBar] = useState(null);

  return (
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
  );
}
