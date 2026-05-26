import { useNavigate } from "react-router-dom";
import { ArrowBtn, CalendarIcon } from "../Icons";
import { useBills } from "../../contexts/BillContext";
import { parseAmount } from "../../utils/formatting";

export default function LastMonthBillCard() {
  const navigate = useNavigate();
  const { bills } = useBills();
  const sorted = [...bills].sort((a, b) => new Date(b.billDate) - new Date(a.billDate));
  const latest = sorted[0];
  const previous = sorted[1];
  const latestAmount = latest ? parseAmount(latest.amount) : 0;
  const prevAmount = previous ? parseAmount(previous.amount) : 0;
  const diffPct = prevAmount > 0 ? Math.round(((latestAmount - prevAmount) / prevAmount) * 100) : 0;
  const diffLabel = prevAmount > 0
    ? `${diffPct > 0 ? "↑" : diffPct < 0 ? "↓" : "→"} ${Math.abs(diffPct)}% from previous month`
    : "No previous month data";
  return (
    <div className="card">
      <ArrowBtn onClick={() => navigate("/BillHistory")} />
      <div className="card-title-row">
        <span className="card-icon"><CalendarIcon size={18} color="currentColor" /></span>
        Last Month's Bill
      </div>
      <p className="card-amount">{latest?.amount ?? "₱0"}</p>
      <p className="card-change">{diffLabel}</p>
    </div>
  );
}
