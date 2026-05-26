import { useState, useRef, useEffect } from "react";
import "../styles/components/navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useBills } from "../contexts/BillContext";
import { useAppliances } from "../contexts/ApplianceContext";
import { applySeedData, removeSeedData } from "../services/SeedService";
import Logo from "../assets/Logo.png";

const NAV_ITEMS = [
  { label: "Dashboard",        path: "/Dashboard" },
  { label: "Bill History",     path: "/BillHistory" },
  { label: "Track Appliances", path: "/TrackAppliances" },
  { label: "Insights",         path: "/Insights" },
];

function Navbar() {
  const { logout } = useAuth();
  const { refreshBills } = useBills();
  const { refreshAppliances } = useAppliances();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [seedBusy, setSeedBusy] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSeedApply() {
    if (seedBusy) return;
    setSeedBusy(true);
    try {
      const result = await applySeedData();
      await Promise.all([refreshBills(), refreshAppliances()]);
      window.alert(`Seeded ${result?.billsAdded ?? 0} bills and ${result?.appliancesAdded ?? 0} appliances.`);
    } catch (error) {
      console.error(error);
      window.alert("Failed to seed data. Please try again.");
    } finally {
      setSeedBusy(false);
    }
  }

  async function handleSeedRemove() {
    if (seedBusy) return;
    if (!window.confirm("Remove seeded sample data for this account?")) return;
    setSeedBusy(true);
    try {
      const result = await removeSeedData();
      await Promise.all([refreshBills(), refreshAppliances()]);
      window.alert(`Removed ${result?.billsRemoved ?? 0} bills and ${result?.appliancesRemoved ?? 0} appliances.`);
    } catch (error) {
      console.error(error);
      window.alert("Failed to remove seed data. Please try again.");
    } finally {
      setSeedBusy(false);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={Logo} alt="Liwanag logo" className="navbar-logo" />
        <span className="navbar-name">Liwanag</span>
      </div>

      <ul className="navbar-nav">
        {NAV_ITEMS.map(({ label, path }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                "nav-item" + (isActive ? " nav-item-active" : "")
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navbar-actions">
        <button className="icon-btn" aria-label="Notifications">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        <button className="seed-btn" onClick={handleSeedApply} disabled={seedBusy}>
          Seed Data
        </button>
        <button className="seed-btn seed-btn-outline" onClick={handleSeedRemove} disabled={seedBusy}>
          Remove Seed
        </button>

        <div className="avatar-wrapper" ref={dropdownRef}>
          <button
            className="avatar-btn"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-label="User menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="avatar-dropdown">
              <button
                className="dropdown-item"
                onClick={() => { setDropdownOpen(false); logout(); }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
