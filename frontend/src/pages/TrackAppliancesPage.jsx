import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import ConsumptionBreakdownCard from "../components/appliances/ConsumptionBreakdownCard";
import ApplianceStatCards from "../components/appliances/ApplianceStatCards";
import AppliancesTable from "../components/appliances/AppliancesTable";
import ApplianceCalculator from "../components/appliances/ApplianceCalculator";
import EditApplianceModal from "../components/appliances/EditApplianceModal";
import { useAppliances } from "../contexts/ApplianceContext";

function TrackAppliancesPage() {
  const location = useLocation();
  const { addAppliance } = useAppliances();
  const [isCalcOpen,       setCalcOpen]       = useState(location.state?.openAdd === true);
  const [editingAppliance, setEditingAppliance] = useState(null);

  function handleCalcAdd(data) {
    addAppliance(data);
    setCalcOpen(false);
  }

  return (
    <div className="page">
      <Navbar />
      <main className="ta-main">
        <div className="ta-blob" />
        <h1 className="ta-title">Whats consuming your Electricity?</h1>
        <div className="ta-top-cards">
          <ConsumptionBreakdownCard />
          <ApplianceStatCards />
        </div>
        <AppliancesTable onEditClick={setEditingAppliance} />
        <button className="fab" onClick={() => setCalcOpen(true)}>+</button>
        {isCalcOpen && <ApplianceCalculator onAdd={handleCalcAdd} onCancel={() => setCalcOpen(false)} />}
        {editingAppliance && <EditApplianceModal appliance={editingAppliance} onClose={() => setEditingAppliance(null)} />}
      </main>
    </div>
  );
}

export default TrackAppliancesPage;
