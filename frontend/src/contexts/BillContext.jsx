import { createContext, useContext, useState } from "react";
import { recalcChanges } from "../utils/calculations";
import { formatAmount, parseAmount } from "../utils/formatting";

const BillContext = createContext(null);

export function useBills() { return useContext(BillContext); }

const INITIAL_BILLS = [
  { id: 1,  billDate: "April 2026",     dueDate: "May 15",       kwh: 215, amount: "₱980",   change: "-8%",  dir: "down"    },
  { id: 2,  billDate: "March 2026",     dueDate: "April 15",     kwh: 238, amount: "₱1,070", change: "-27%", dir: "down"    },
  { id: 3,  billDate: "February 2026",  dueDate: "March 15",     kwh: 310, amount: "₱1,460", change: "+14%", dir: "up"      },
  { id: 4,  billDate: "January 2026",   dueDate: "February 15",  kwh: 278, amount: "₱1,280", change: "-14%", dir: "down"    },
  { id: 5,  billDate: "December 2025",  dueDate: "January 15",   kwh: 322, amount: "₱1,490", change: "+24%", dir: "up"      },
  { id: 6,  billDate: "November 2025",  dueDate: "December 15",  kwh: 260, amount: "₱1,200", change: "-8%",  dir: "down"    },
  { id: 7,  billDate: "October 2025",   dueDate: "November 15",  kwh: 282, amount: "₱1,300", change: "+10%", dir: "up"      },
  { id: 8,  billDate: "September 2025", dueDate: "October 15",   kwh: 258, amount: "₱1,185", change: "-5%",  dir: "down"    },
  { id: 9,  billDate: "August 2025",    dueDate: "September 15", kwh: 270, amount: "₱1,245", change: "+6%",  dir: "up"      },
  { id: 10, billDate: "July 2025",      dueDate: "August 15",    kwh: 255, amount: "₱1,175", change: "—",    dir: "neutral" },
];

export function BillProvider({ children }) {
  const [bills, setBills] = useState(() => recalcChanges(INITIAL_BILLS));

  function addOrUpdateBill({ billMonth, billYear, amount, kwh, dueMonth, dueDay }) {
    const amtNum = parseFloat(amount);
    const kwhNum = parseInt(kwh, 10);
    if (isNaN(amtNum) || isNaN(kwhNum)) return;
    const billDate = `${billMonth} ${billYear}`;
    const dueDate  = `${dueMonth} ${dueDay}`;
    setBills(prev => {
      const exists  = prev.find(b => b.billDate === billDate);
      const updated = exists
        ? prev.map(b => b.billDate === billDate ? { ...b, amount: formatAmount(amtNum), kwh: kwhNum, dueDate } : b)
        : [...prev, { id: Math.max(0, ...prev.map(b => b.id)) + 1, billDate, dueDate, kwh: kwhNum, amount: formatAmount(amtNum), change: "—", dir: "neutral" }];
      return recalcChanges(updated);
    });
  }

  function deleteBill(id) {
    setBills(prev => recalcChanges(prev.filter(b => b.id !== id)));
  }

  const lowestBill  = bills.reduce((a, b) => parseAmount(a.amount) <= parseAmount(b.amount) ? a : b, bills[0]);
  const highestBill = bills.reduce((a, b) => parseAmount(a.amount) >= parseAmount(b.amount) ? a : b, bills[0]);

  return (
    <BillContext.Provider value={{ bills, lowestBill, highestBill, addOrUpdateBill, deleteBill }}>
      {children}
    </BillContext.Provider>
  );
}
