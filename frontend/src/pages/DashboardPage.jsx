import "../styles/pages/dashboard.css";
import Navbar from "../components/Navbar";
import EstimatedConsumptionCard from "../components/dashboard/EstimatedConsumptionCard";
import LastMonthBillCard from "../components/dashboard/LastMonthBillCard";
import TopConsumersCard from "../components/dashboard/TopConsumersCard";
import MonthlyUsageCard from "../components/dashboard/MonthlyUsageCard";
import DashboardFAB from "../components/dashboard/DashboardFAB";
import DashboardAsset1 from "../assets/DashboardAsset1.png";
import { useAuth } from "../contexts/AuthContext";

function DashboardPage() {
  const { user } = useAuth();
  const displayName = user?.displayName || "User";
  return (
    <div className="page">
      <Navbar />
      <main className="dashboard-main">
        <div className="blob blob-left" />
        <div className="blob blob-right" />
        <h1 className="welcome-text">Welcome Back, {displayName}!</h1>
        <div className="dashboard-grid">
          <img src={DashboardAsset1} alt="" className="dashboard-asset" />
          <div className="center-cards">
            <EstimatedConsumptionCard />
            <LastMonthBillCard />
          </div>
          <TopConsumersCard />
          <MonthlyUsageCard />
        </div>
        <DashboardFAB />
      </main>
    </div>
  );
}

export default DashboardPage;
