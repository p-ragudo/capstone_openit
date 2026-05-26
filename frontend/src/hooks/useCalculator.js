import { useState } from "react";
import { RATE_PER_KWH } from "../utils/constants";
import { APPLIANCE_DATA } from "../utils/applianceData";

export function useCalculator() {
  const [category,          setCategory]    = useState("AIRCON");
  const [searchQuery,       setSearchQuery] = useState("");
  const [showDropdown,      setShowDropdown] = useState(false);
  const [selectedAppliance, setSelected]    = useState(null);
  const [quantity,          setQuantity]    = useState(1);
  const [watts,             setWatts]       = useState(0);
  const [hoursPerDay,       setHours]       = useState(8);
  const [selectedDays,      setDays]        = useState(new Set([1, 2, 3]));

  const daysCount    = selectedDays.size;
  const costPerHour  = (watts * quantity / 1000) * RATE_PER_KWH;
  const costPerDay   = costPerHour * hoursPerDay;
  const costPerWeek  = costPerDay * daysCount;
  const costPerMonth = costPerWeek * 4.33;
  const sliderPct    = `${((hoursPerDay - 1) / 23) * 100}%`;

  const filtered = (APPLIANCE_DATA[category] || []).filter(a =>
    !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function changeCategory(cat) {
    setCategory(cat);
    setSearchQuery("");
    setSelected(null);
    setWatts(0);
    setShowDropdown(false);
  }

  function pickAppliance(a) {
    setSelected(a);
    setWatts(a.watts);
    setSearchQuery(a.name);
    setShowDropdown(false);
  }

  function toggleDay(i) {
    setDays(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  function buildResult() {
    if (!watts) return null;
    const monthlyHours = hoursPerDay * daysCount * 4.33;
    return {
      name: selectedAppliance ? selectedAppliance.name : searchQuery || "Custom Appliance",
      status: `${hoursPerDay} hour${hoursPerDay > 1 ? "s" : ""} / ${daysCount} day${daysCount !== 1 ? "s" : ""} / week`,
      watts,
      monthlyKwh:   parseFloat(((watts * quantity / 1000) * monthlyHours).toFixed(1)),
      costPerMonth: Math.round(costPerMonth),
    };
  }

  return {
    category, searchQuery, showDropdown, selectedAppliance,
    quantity, watts, hoursPerDay, selectedDays,
    daysCount, costPerHour, costPerDay, costPerWeek, costPerMonth, sliderPct, filtered,
    setSearchQuery, setShowDropdown, setQuantity, setWatts, setHours,
    changeCategory, pickAppliance, toggleDay, buildResult,
  };
}
