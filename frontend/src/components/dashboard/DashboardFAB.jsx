import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardFAB() {
  const navigate = useNavigate();
  const [fabOpen, setFabOpen] = useState(false);

  function goTo(path) {
    setFabOpen(false);
    navigate(path, { state: { openAdd: true } });
  }

  return (
    <>
      {fabOpen && <div className="fab-backdrop" onClick={() => setFabOpen(false)} />}
      <div className="fab-wrap">
        {fabOpen && (
          <div className="fab-menu">
            <button className="fab-menu-item" onClick={() => goTo("/BillHistory")}>Add Bill</button>
            <button className="fab-menu-item" onClick={() => goTo("/TrackAppliances")}>Add Appliance</button>
          </div>
        )}
        <button className={`fab${fabOpen ? " fab-open" : ""}`} onClick={() => setFabOpen(v => !v)}>+</button>
      </div>
    </>
  );
}
