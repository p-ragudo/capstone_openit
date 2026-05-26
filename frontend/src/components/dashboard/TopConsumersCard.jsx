import { useNavigate } from "react-router-dom";
import { ArrowBtn } from "../Icons";
import "../../styles/components/consumers.css";

const TOP_CONSUMERS = [
  { rank: 1, name: "Air Conditioner", watts: 52,  note: "8 HRS / 3 DAYS / WEEK",  cost: "₱2,840" },
  { rank: 2, name: "Refrigerator",    watts: 85,  note: "24 HRS / 7 DAYS / WEEK", cost: "₱1,220" },
  { rank: 3, name: "Smart Home TV",   watts: 18,  note: "3 HRS / 2 DAYS / WEEK",  cost: "₱940"   },
  { rank: 4, name: "Washing Machine", watts: 120, note: "3 HRS / 2 DAYS / WEEK",  cost: "₱450"   },
  { rank: 5, name: "Electric Fan",    watts: 35,  note: "THIS MONTH",              cost: "₱280"   },
];

export default function TopConsumersCard() {
  const navigate = useNavigate();
  return (
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
  );
}
