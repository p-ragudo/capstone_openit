import { useAppliances } from "../../contexts/ApplianceContext";
import { PencilIcon, XIcon } from "../Icons";

export default function AppliancesTable({ onEditClick }) {
  const { ranked, deleteAppliance } = useAppliances();
  return (
    <div className="card ta-appliances-card">
      <h2 className="ta-appliances-title">Tracked appliances</h2>
      <div className="ta-table-wrap">
        <table className="ta-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Appliance</th>
              <th>Status</th>
              <th>Wattage</th>
              <th>Cost Per Month</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {ranked.map((a, idx) => (
              <tr key={a.id} className="ta-row">
                <td className="ta-td-rank">
                  <span className={`ta-rank ${idx === 0 ? "ta-rank-gold" : "ta-rank-grey"}`}>{idx + 1}</span>
                </td>
                <td className="ta-td-name">{a.name}</td>
                <td className="ta-td-status">{a.status}</td>
                <td className="ta-td-watts">{a.watts} W</td>
                <td className={`ta-td-cost${idx === 0 ? " ta-cost-gold" : ""}`}>₱{a.costPerMonth.toLocaleString("en-PH")}</td>
                <td className="ta-td-actions">
                  <div className="ta-actions">
                    <button className="ta-act-edit"   aria-label="Edit"   onClick={() => onEditClick(a)}><PencilIcon /></button>
                    <button className="ta-act-delete" aria-label="Delete" onClick={() => deleteAppliance(a.id)}><XIcon /></button>
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
