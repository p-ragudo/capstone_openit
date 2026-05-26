import { createContext, useContext, useEffect, useState } from "react";
import { recalcChanges } from "../utils/calculations";
import { formatAmount, parseAmount } from "../utils/formatting";
import { MONTHS, SHORT_MONTHS } from "../utils/constants";
import { addBill, deleteBill, getAllBills, updateBill } from "../services/BillService";
import { useAuth } from "./AuthContext";

const BillContext = createContext(null);

export function useBills() { return useContext(BillContext); }

const INITIAL_BILLS = [];

function parseDateOnly(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatBillDate(value) {
  const date = parseDateOnly(value);
  if (!date) return "Unknown";
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function formatDueDate(value) {
  const date = parseDateOnly(value);
  if (!date) return "Unknown";
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

function toDateOnlyString(year, monthIndex, day) {
  const mm = String(monthIndex + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function toUiBill(bill) {
  return {
    id: bill.id,
    billDate: formatBillDate(bill.billingMonth),
    dueDate: formatDueDate(bill.dueDate),
    kwh: Number(bill.energyKwh ?? 0),
    amount: formatAmount(Number(bill.totalAmount ?? 0)),
    change: "—",
    dir: "neutral",
  };
}

export function BillProvider({ children }) {
  const { user } = useAuth();
  const [bills, setBills] = useState(() => recalcChanges(INITIAL_BILLS));

  async function refreshBills() {
    const data = await getAllBills();
    const mapped = (data ?? []).map(toUiBill);
    setBills(recalcChanges(mapped));
  }

  useEffect(() => {
    if (user === undefined) return;
    if (!user) {
      setBills([]);
      return;
    }

    refreshBills().catch((error) => {
      console.error(error);
    });
  }, [user]);

  async function addOrUpdateBill({ id, billMonth, billYear, amount, kwh, dueMonth, dueDay }) {
    const amtNum = parseFloat(amount);
    const kwhNum = parseFloat(kwh);
    if (isNaN(amtNum) || isNaN(kwhNum)) return;

    const billMonthIndex = MONTHS.indexOf(billMonth);
    const dueMonthIndex = SHORT_MONTHS.includes(dueMonth)
      ? SHORT_MONTHS.indexOf(dueMonth)
      : MONTHS.indexOf(dueMonth);

    if (billMonthIndex < 0 || dueMonthIndex < 0) return;

    const billYearNum = parseInt(billYear, 10);
    const dueDayNum = parseInt(dueDay, 10);
    const dueYearNum = dueMonthIndex < billMonthIndex ? billYearNum + 1 : billYearNum;

    const payload = {
      billingMonth: toDateOnlyString(billYearNum, billMonthIndex, 1),
      dueDate: toDateOnlyString(dueYearNum, dueMonthIndex, dueDayNum),
      generationAmount: null,
      transmissionAmount: null,
      distributionAmount: null,
      governmentTaxAmount: null,
      energyKwh: kwhNum,
      totalAmount: amtNum,
      status: null,
    };

    try {
      const saved = id
        ? await updateBill(id, payload)
        : await addBill(payload);
      const mapped = toUiBill(saved);
      setBills(prev => {
        const next = prev.some(b => b.id === mapped.id)
          ? prev.map(b => b.id === mapped.id ? mapped : b)
          : [...prev, mapped];
        return recalcChanges(next);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function removeBill(id) {
    try {
      await deleteBill(id);
      setBills(prev => recalcChanges(prev.filter(b => b.id !== id)));
    } catch (error) {
      console.error(error);
    }
  }

  const lowestBill = bills.length
    ? bills.reduce((a, b) => parseAmount(a.amount) <= parseAmount(b.amount) ? a : b)
    : null;
  const highestBill = bills.length
    ? bills.reduce((a, b) => parseAmount(a.amount) >= parseAmount(b.amount) ? a : b)
    : null;

  return (
    <BillContext.Provider value={{ bills, lowestBill, highestBill, addOrUpdateBill, deleteBill: removeBill, refreshBills }}>
      {children}
    </BillContext.Provider>
  );
}
