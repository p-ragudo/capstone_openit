import { useAppliances } from "../../contexts/ApplianceContext";

export default function ConsumptionBreakdownCard() {
  const { breakdownItems, totalCost } = useAppliances();
  return (
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
  );
}
