import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/barchart.css";
import { useBills } from "../../contexts/BillContext";
import { parseAmount, formatAmount } from "../../utils/formatting";
import { SHORT_MONTHS } from "../../utils/constants";

export default function MonthlyUsageCard() {
  const navigate    = useNavigate();
  const [hoveredBar, setHoveredBar] = useState(null);
  const { bills } = useBills();

  const chartData = useMemo(() => {
    const sorted = [...bills].sort((a, b) => new Date(a.billDate) - new Date(b.billDate));
    const recent = sorted.slice(-7);
    const maxAmount = Math.max(1, ...recent.map(b => parseAmount(b.amount)));
    return recent.map((bill) => {
      const date = new Date(bill.billDate);
      const month = SHORT_MONTHS[date.getMonth()];
      const amount = parseAmount(bill.amount);
      const pct = Math.round((amount / maxAmount) * 100);
      return {
        month,
        pct,
        kwh: bill.kwh,
        amount: formatAmount(amount),
      };
    });
  }, [bills]);

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
        {chartData.map(({ month, pct, kwh, amount }) => (
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
        {chartData.length === 0 && (
          <div className="bar-empty">No bill data yet.</div>
        )}
      </div>
    </div>
  );
}
