import "../../styles/components/billtable.css";
import { useBills } from "../../contexts/BillContext";
import { PencilIcon, XIcon, EyeIcon, ArrowUp, ArrowDown } from "../Icons";

export default function BillTable({ onEditClick }) {
  const { bills, deleteBill } = useBills();
  return (
    <div className="bh-card">
      <h2 className="bh-card-title">Bill History</h2>
      <div className="bh-table-wrap">
        <table className="bh-table">
          <thead>
            <tr>
              <th className="th-tl" />
              <th>Bill Date</th>
              <th>Due Date</th>
              <th>KWH Used</th>
              <th>Total Amount</th>
              <th>Change</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {bills.map((row, idx) => (
              <tr key={row.id} className="bh-row">
                <td className="td-tl">
                  <span className={`tl-dot ${idx === 0 ? "dot-filled" : "dot-outline"}`} />
                </td>
                <td className="td-date">{row.billDate}</td>
                <td className="td-muted">{row.dueDate}</td>
                <td className="td-kwh">{row.kwh}</td>
                <td className={`td-amount${row.dir !== "neutral" ? " td-amount-bold" : ""}`}>
                  {row.amount}
                </td>
                <td className="td-change">
                  <div className="td-change-inner">
                    {row.dir === "up"      && <><ArrowUp />  <span className="chg-up">{row.change}</span></>}
                    {row.dir === "down"    && <><ArrowDown /> <span className="chg-down">{row.change}</span></>}
                    {row.dir === "neutral" && <span className="chg-neutral">{row.change}</span>}
                  </div>
                </td>
                <td className="td-actions">
                  <div className="bh-actions">
                    <button className="act-btn act-view"   aria-label="View"><EyeIcon /></button>
                    <button className="act-btn act-edit"   aria-label="Edit"   onClick={() => onEditClick(row)}><PencilIcon /></button>
                    <button className="act-btn act-delete" aria-label="Delete" onClick={() => deleteBill(row.id)}><XIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
