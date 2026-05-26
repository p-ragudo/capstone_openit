import { createContext, useContext, useState } from "react";

const ApplianceContext = createContext(null);

export function useAppliances() { return useContext(ApplianceContext); }

const BREAKDOWN_COLORS = ["#E07A10", "#E8B84B", "#F5C842", "#D4C5A0"];

const INITIAL_APPLIANCES = [
  { id: 1,  name: "Air Conditioner",  status: "8 hours / 3 days / week",   watts: 1200, monthlyKwh: 249.6, costPerMonth: 2840 },
  { id: 2,  name: "Refrigerator",     status: "24 hours / 7 days / week",  watts: 180,  monthlyKwh: 129.6, costPerMonth: 1620 },
  { id: 3,  name: "Smart Home TV",    status: "4 hours / 7 days / week",   watts: 120,  monthlyKwh:  51.8, costPerMonth: 1240 },
  { id: 4,  name: "Washing Machine",  status: "3 hours / 3 days / week",   watts: 800,  monthlyKwh:  93.6, costPerMonth:  860 },
  { id: 5,  name: "Electric Fan",     status: "8 hours / 7 days / week",   watts: 70,   monthlyKwh:  80.2, costPerMonth:  698 },
  { id: 6,  name: "Water Heater",     status: "1 hour / 7 days / week",    watts: 2000, monthlyKwh:  34.6, costPerMonth:  415 },
  { id: 7,  name: "Electric Stove",   status: "1 hour / 7 days / week",    watts: 1500, monthlyKwh:  25.9, costPerMonth:  311 },
  { id: 8,  name: "Microwave",        status: "0.5 hours / 5 days / week", watts: 1000, monthlyKwh:  10.8, costPerMonth:  130 },
  { id: 9,  name: "Rice Cooker",      status: "1 hour / 7 days / week",    watts: 500,  monthlyKwh:   8.6, costPerMonth:  103 },
  { id: 10, name: "Desktop Computer", status: "6 hours / 5 days / week",   watts: 250,  monthlyKwh:  32.5, costPerMonth:  390 },
];

export function ApplianceProvider({ children }) {
  const [appliances, setAppliances] = useState(INITIAL_APPLIANCES);

  function addAppliance(data) {
    const newId = Math.max(0, ...appliances.map(a => a.id)) + 1;
    setAppliances(prev => [...prev, { id: newId, ...data }]);
  }

  function updateAppliance(id, data) {
    setAppliances(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  }

  function deleteAppliance(id) {
    setAppliances(prev => prev.filter(a => a.id !== id));
  }

  const totalKwh  = appliances.reduce((s, a) => s + a.monthlyKwh,  0);
  const totalCost = appliances.reduce((s, a) => s + a.costPerMonth, 0);
  const ranked    = [...appliances].sort((a, b) => b.costPerMonth - a.costPerMonth);
  const top3      = ranked.slice(0, 3);

  const breakdownItems = [
    ...top3.map((a, i) => ({ id: a.id, label: a.name, cost: a.costPerMonth, color: BREAKDOWN_COLORS[i] })),
    ...(appliances.length > 3
      ? [{ id: -1, label: "Others", cost: totalCost - top3.reduce((s, a) => s + a.costPerMonth, 0), color: BREAKDOWN_COLORS[3] }]
      : []),
  ];

  return (
    <ApplianceContext.Provider value={{ appliances, ranked, totalKwh, totalCost, breakdownItems, addAppliance, updateAppliance, deleteAppliance }}>
      {children}
    </ApplianceContext.Provider>
  );
}
