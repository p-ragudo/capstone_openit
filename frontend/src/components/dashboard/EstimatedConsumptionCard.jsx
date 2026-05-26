import { useNavigate } from "react-router-dom";
import { ArrowBtn, MoneyIcon } from "../Icons";

const TICK_COUNT   = 30;
const FILLED_TICKS = Math.round(TICK_COUNT * 0.71);

export default function EstimatedConsumptionCard() {
  const navigate = useNavigate();
  return (
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
  );
}
