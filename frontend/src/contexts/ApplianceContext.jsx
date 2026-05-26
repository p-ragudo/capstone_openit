import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { addApplianceAsync, getAllAppliances } from "../services/ApplianceService";

const ApplianceContext = createContext(null);

const BREAKDOWN_COLORS = ["#E07A10", "#E8B84B", "#F5C842", "#D4C5A0"];

export function ApplianceProvider({ children }) {
  const [appliances, setAppliances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppliances = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllAppliances();
      setAppliances(data);
    } catch (err) {
      console.error("Failed to fetch database appliances:", err);
      setError("Could not synchronize hardware assets.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppliances();
  }, [fetchAppliances]);

  async function addAppliance(applianceData) {
    try {
      await addApplianceAsync(applianceData);
      await fetchAppliances();
    } catch (err) {
      console.error("Failed to add appliance asset:", err);
    }
  }

  async function deleteAppliance(id) {
    try {
      // await deleteApplianceAsync(id);
      // await fetchAppliances();
      
      // Temporary optimistic UI update for safety:
      setAppliances(prev => prev.filter(app => app.id !== id));
    } catch (err) {
      console.error("Failed to delete appliance:", err);
    }
  }

  function getApplianceById(id) {
    if (!id || !appliances) return null;
    return appliances.find(app => app.id.toString().toLowerCase() === id.toString().toLowerCase()) ?? null;
  }

  return (
    <ApplianceContext.Provider value={{ 
      appliances, 
      loading, 
      error, 
      breakdownColors: BREAKDOWN_COLORS,
      refetchAppliances: fetchAppliances,
      addAppliance,
      deleteAppliance,
      getApplianceById
    }}>
      {children}
    </ApplianceContext.Provider>
  );
}

export function useAppliances() { return useContext(ApplianceContext); }
