import { createContext, useContext, useEffect, useState } from "react";
import { addApplianceAsync, deleteApplianceAsync, getAllAppliances, updateApplianceAsync } from "../services/ApplianceService";
import { useAuth } from "./AuthContext";

const ApplianceContext = createContext(null);

export function useAppliances() { return useContext(ApplianceContext); }

const BREAKDOWN_COLORS = ["#E07A10", "#E8B84B", "#F5C842", "#D4C5A0"];

const INITIAL_APPLIANCES = [];

export function ApplianceProvider({ children }) {
  const { user } = useAuth();
  const [appliances, setAppliances] = useState(INITIAL_APPLIANCES);

  async function refreshAppliances() {
    const data = await getAllAppliances();
    setAppliances(data ?? []);
  }

  useEffect(() => {
    if (user === undefined) return;
    if (!user) {
      setAppliances([]);
      return;
    }

    refreshAppliances().catch((error) => {
      console.error(error);
    });
  }, [user]);

  async function addAppliance(data) {
    try {
      const created = await addApplianceAsync({
        name: data.name,
        status: data.status,
        watts: data.watts,
        monthlyKwh: data.monthlyKwh,
        costPerMonth: data.costPerMonth,
      });
      setAppliances(prev => [...prev, created]);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateAppliance(id, data) {
    try {
      const updated = await updateApplianceAsync(id, {
        name: data.name,
        status: data.status,
        watts: data.watts,
        monthlyKwh: data.monthlyKwh,
        costPerMonth: data.costPerMonth,
      });
      setAppliances(prev => prev.map(a => a.id === id ? updated : a));
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteAppliance(id) {
    try {
      await deleteApplianceAsync(id);
      setAppliances(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  const totalKwh  = appliances.reduce((s, a) => s + Number(a.monthlyKwh || 0),  0);
  const totalCost = appliances.reduce((s, a) => s + Number(a.costPerMonth || 0), 0);
  const ranked    = [...appliances].sort((a, b) => b.costPerMonth - a.costPerMonth);
  const top3      = ranked.slice(0, 3);

  const breakdownItems = [
    ...top3.map((a, i) => ({ id: a.id, label: a.name, cost: Number(a.costPerMonth || 0), color: BREAKDOWN_COLORS[i] })),
    ...(appliances.length > 3 && totalCost > 0
      ? [{ id: -1, label: "Others", cost: totalCost - top3.reduce((s, a) => s + Number(a.costPerMonth || 0), 0), color: BREAKDOWN_COLORS[3] }]
      : []),
  ];

  return (
    <ApplianceContext.Provider value={{ appliances, ranked, totalKwh, totalCost, breakdownItems, addAppliance, updateAppliance, deleteAppliance, refreshAppliances }}>
      {children}
    </ApplianceContext.Provider>
  );
}
