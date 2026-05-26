import { useAppliances } from "../../contexts/ApplianceContext";
import { useApplianceUsageLogs } from "../../contexts/ApplianceUsageLogContext";

export default function ConsumptionBreakdownCard() {
  const { getApplianceById } = useAppliances()
  const { usageLogs } = useApplianceUsageLogs()

  const totalCost = usageLogs.reduce((sum, log) => sum + (log.costAmount ?? 0), 0);

  return (
    <div className="card ta-breakdown-card">
      <h3 className="ta-breakdown-title">Consumption Breakdown</h3>
      <div className="ta-bar">
        {usageLogs.map((item, i) => (
          <div key={item.id} className="ta-bar-seg" style={{
            width: `${(item.costAmount / totalCost) * 100}%`,
            background: item.color,
            borderRadius: i === 0 ? "8px 0 0 8px" : i === usageLogs.length - 1 ? "0 8px 8px 0" : "0",
          }} />
        ))}
      </div>
      <div className="ta-legend">
        {usageLogs.map(item => (
          <span key={item.id} className="ta-legend-item">
            <span className="ta-legend-dot" style={{ background: item.color }} />
            {getApplianceById(usageLogs.applianceId)?.name}
          </span>
        ))}
      </div>
    </div>
  );
}
