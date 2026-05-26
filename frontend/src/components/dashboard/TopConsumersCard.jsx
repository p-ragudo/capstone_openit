import { useNavigate } from "react-router-dom";
import { ArrowBtn } from "../Icons";
import "../../styles/components/consumers.css";
import { useAppliances } from "../../contexts/ApplianceContext";
import { formatAmount } from "../../utils/formatting";

export default function TopConsumersCard() {
  const navigate = useNavigate();
  const { ranked } = useAppliances();
  const topConsumers = ranked.slice(0, 5);
  return (
    <div className="card top-consumers-card">
      <ArrowBtn onClick={() => navigate("/TrackAppliances")} />
      <h3 className="card-heading">Top Consumers</h3>
      <p className="muted" style={{ fontSize: "13px", marginTop: "4px" }}>
        Appliances ranked by weekly load.
      </p>
      <ul className="consumers-list">
        {topConsumers.map((item, idx) => (
          <li key={item.id} className="consumer-item">
            <span className={`rank-badge ${idx === 0 ? "rank-gold" : "rank-grey"}`}>
              {idx + 1}
            </span>
            <div className="consumer-info">
              <span className="consumer-name">{item.name}</span>
              <span className="consumer-watts">{item.watts}W</span>
            </div>
            <div className="consumer-right">
              <span className="consumer-cost">{formatAmount(item.costPerMonth)}</span>
              <span className="consumer-note">{item.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
