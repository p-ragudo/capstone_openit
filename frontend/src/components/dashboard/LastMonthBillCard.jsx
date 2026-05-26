import { useNavigate } from "react-router-dom";
import { ArrowBtn, CalendarIcon } from "../Icons";

export default function LastMonthBillCard() {
  const navigate = useNavigate();
  return (
    <div className="card">
      <ArrowBtn onClick={() => navigate("/BillHistory")} />
      <div className="card-title-row">
        <span className="card-icon"><CalendarIcon size={18} color="currentColor" /></span>
        Last Month's Bill
      </div>
      <p className="card-amount">₱3,450</p>
      <p className="card-change">↑ 12% from previous month</p>
    </div>
  );
}
