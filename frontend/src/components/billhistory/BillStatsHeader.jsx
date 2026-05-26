import { useBills } from "../../contexts/BillContext";
import { TrendUp, TrendDown } from "../Icons";

export default function BillStatsHeader() {
  const { lowestBill, highestBill } = useBills();
  const lowestMonth = lowestBill?.billDate?.split(" ")[0] ?? "—";
  const highestMonth = highestBill?.billDate?.split(" ")[0] ?? "—";
  return (
    <div className="bh-header">
      <h1 className="bh-title">From Bill Tracking to<br />Bigger Savings</h1>
      <div className="bh-stats">
        <div className="bh-stat-card">
          <div className="bh-stat-top">
            <span className="bh-stat-amount">{lowestBill?.amount ?? "—"}</span>
            <TrendDown />
          </div>
          <p className="bh-stat-label">Lowest Month ({lowestMonth})</p>
        </div>
        <div className="bh-stat-card">
          <div className="bh-stat-top">
            <span className="bh-stat-amount">{highestBill?.amount ?? "—"}</span>
            <TrendUp />
          </div>
          <p className="bh-stat-label">Highest Month ({highestMonth})</p>
        </div>
      </div>
    </div>
  );
}
