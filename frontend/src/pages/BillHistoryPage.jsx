import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import BillStatsHeader from "../components/billhistory/BillStatsHeader";
import BillTable from "../components/billhistory/BillTable";
import AddBillModal from "../components/billhistory/AddBillModal";

function BillHistoryPage() {
  const location = useLocation();
  const [isOpen,  setIsOpen]  = useState(location.state?.openAdd === true);
  const [editRow, setEditRow] = useState(null);

  function openAdd()     { setEditRow(null); setIsOpen(true);  }
  function openEdit(row) { setEditRow(row);  setIsOpen(true);  }
  function closeModal()  { setIsOpen(false); setEditRow(null); }

  return (
    <div className="page">
      <Navbar />
      <main className="bh-main">
        <div className="bh-blob" />
        <BillStatsHeader />
        <BillTable onEditClick={openEdit} />
        <button className="fab" onClick={openAdd}>+</button>
        {isOpen && <AddBillModal editRow={editRow} onClose={closeModal} />}
      </main>
    </div>
  );
}

export default BillHistoryPage;
