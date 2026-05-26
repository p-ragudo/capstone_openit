import { parseAmount } from "./formatting";

export function recalcChanges(bills) {
  if (bills.length === 0) return bills;
  const sorted = [...bills].sort((a, b) => new Date(a.billDate) - new Date(b.billDate));
  const withChanges = sorted.map((bill, idx) => {
    if (idx === 0) return { ...bill, change: "—", dir: "neutral" };
    const prev = sorted[idx - 1];
    const pct = Math.round(((parseAmount(bill.amount) - parseAmount(prev.amount)) / parseAmount(prev.amount)) * 100);
    return {
      ...bill,
      change: pct === 0 ? "0%" : pct > 0 ? `+${pct}%` : `${pct}%`,
      dir: pct > 0 ? "up" : pct < 0 ? "down" : "neutral",
    };
  });
  return withChanges.reverse();
}
