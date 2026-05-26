import { useNavigate } from "react-router-dom";
import { ArrowBtn, MoneyIcon } from "../Icons";
import { useAppliances } from "../../contexts/ApplianceContext";
import { useBills } from "../../contexts/BillContext";
import { formatAmount, parseAmount } from "../../utils/formatting";

const TICK_COUNT = 30;

export default function EstimatedConsumptionCard() {
  const navigate = useNavigate();
  const { totalCost } = useAppliances();
  const { bills } = useBills();
  const latestBill = [...bills].sort((a, b) => new Date(b.billDate) - new Date(a.billDate))[0];
  const billBudget = latestBill ? parseAmount(latestBill.amount) : 0;
  const budget = billBudget || (totalCost ? Math.round(totalCost * 1.3) : 0);
  const remaining = Math.max(0, budget - totalCost);
  const percent = budget > 0 ? Math.min(100, Math.round((totalCost / budget) * 100)) : 0;
  const filledTicks = Math.round(TICK_COUNT * (percent / 100));
  return (
    <div className="card">
      <ArrowBtn onClick={() => navigate("/TrackAppliances")} />
      <div className="card-title-row">
        <span className="card-icon"><MoneyIcon /></span>
        Estimated Consumption
      </div>
      <p className="card-amount">{formatAmount(totalCost)}</p>
      <div className="tick-bar">
        {Array.from({ length: TICK_COUNT }, (_, i) => (
          <span key={i} className={`tick ${i < filledTicks ? "tick-on" : "tick-off"}`} />
        ))}
      </div>
      <div className="card-foot">
        <span className="muted">Budget Remaining: {formatAmount(remaining)}</span>
        <span className="amber-text">{percent}%</span>
      </div>
    </div>
  );
}
