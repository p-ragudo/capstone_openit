import { useState } from "react";
import { useAppliances } from "../../contexts/ApplianceContext";

export default function EditApplianceModal({ appliance, onClose }) {
  const { updateAppliance } = useAppliances();
  const [name,   setName]   = useState(appliance.name);
  const [status, setStatus] = useState(appliance.status);
  const [watts,  setWatts]  = useState(String(appliance.watts));
  const [kwh,    setKwh]    = useState(String(appliance.monthlyKwh));
  const [cost,   setCost]   = useState(String(appliance.costPerMonth));

  function handleSave() {
    updateAppliance(appliance.id, {
      name,
      status,
      watts:        parseFloat(watts)  || 0,
      monthlyKwh:   parseFloat(kwh)    || 0,
      costPerMonth: parseFloat(cost)   || 0,
    });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Edit Appliance</h2>
        <div className="modal-field">
          <label className="modal-label">Appliance Name</label>
          <input className="modal-input" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="modal-field">
          <label className="modal-label">Status</label>
          <input className="modal-input" value={status} onChange={e => setStatus(e.target.value)} />
        </div>
        <div className="modal-field">
          <label className="modal-label">Wattage (W)</label>
          <input className="modal-input" type="number" min="0" value={watts} onChange={e => setWatts(e.target.value)} />
        </div>
        <div className="modal-field">
          <label className="modal-label">Monthly kWh</label>
          <input className="modal-input" type="number" min="0" value={kwh} onChange={e => setKwh(e.target.value)} />
        </div>
        <div className="modal-field">
          <label className="modal-label">Cost Per Month (₱)</label>
          <input className="modal-input" type="number" min="0" value={cost} onChange={e => setCost(e.target.value)} />
        </div>
        <div className="modal-actions">
          <button className="modal-add-btn" onClick={handleSave}>Save Changes</button>
          <button className="modal-cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
