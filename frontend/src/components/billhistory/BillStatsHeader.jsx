import { useBills } from "../../contexts/BillContext";
import { TrendUp, TrendDown } from "../Icons";

export default function BillStatsHeader() {
  const { lowestBill, highestBill } = useBills();
  return (
    <div className="bh-header">
      <h1 className="bh-title">From Bill Tracking to<br />Bigger Savings</h1>
      <div className="bh-stats">
        <div className="bh-stat-card">
          <div className="bh-stat-top">
            <span className="bh-stat-amount">{lowestBill?.amount}</span>
            <TrendDown />
          </div>
          <p className="bh-stat-label">Lowest Month ({lowestBill?.billDate.split(" ")[0]})</p>
        </div>
        <div className="bh-stat-card">
          <div className="bh-stat-top">
            <span className="bh-stat-amount">{highestBill?.amount}</span>
            <TrendUp />
          </div>
          <p className="bh-stat-label">Highest Month ({highestBill?.billDate.split(" ")[0]})</p>
        </div>
      </div>
    </div>
  );
}
