import { useAppliances } from "../../contexts/ApplianceContext";
import { useApplianceUsageLogs } from "../../contexts/ApplianceUsageLogContext";

function CalendarDecorIcon() {
  return (
    <svg width="92" height="92" viewBox="0 0 92 92" fill="none">
      <rect x="8"  y="14" width="76" height="66" rx="10" fill="#E8B84B" opacity="0.28"/>
      <rect x="8"  y="26" width="76" height="8"  fill="#E8B84B" opacity="0.38"/>
      <rect x="23" y="6"  width="8"  height="16" rx="4" fill="#E8B84B" opacity="0.38"/>
      <rect x="61" y="6"  width="8"  height="16" rx="4" fill="#E8B84B" opacity="0.38"/>
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
      <rect x="6"  y="24" width="80" height="48" rx="9"  fill="#E8B84B" opacity="0.30"/>
      <circle cx="46" cy="48" r="14"                      fill="#E8B84B" opacity="0.35"/>
      <rect x="12" y="30" width="18" height="12" rx="4"  fill="#E8B84B" opacity="0.28"/>
      <rect x="62" y="58" width="18" height="12" rx="4"  fill="#E8B84B" opacity="0.28"/>
    </svg>
  );
}

export default function ApplianceStatCards() {
  const { appliances } = useAppliances()
  const { usageLogs } = useApplianceUsageLogs()

  const totalCost = usageLogs.reduce((sum, log) => sum + (log.costAmount ?? 0), 0)
  const totalEnergyCost = usageLogs.reduce((sum, log) => sum + (log.energyKwh ?? 0), 0)

  return (
    <>
      <div className="card ta-stat-card">
        <div className="ta-stat-decor"><CalendarDecorIcon /></div>
        <div className="ta-stat-number">{totalEnergyCost.toFixed(1)}</div>
        <div className="ta-stat-label">Monthly kWh</div>
      </div>
      <div className="card ta-stat-card">
        <div className="ta-stat-decor"><MoneyDecorIcon /></div>
        <div className="ta-stat-number">₱{totalCost.toLocaleString("en-PH")}</div>
        <div className="ta-stat-label">Est. Monthly Cost</div>
      </div>
    </>
  );
}
