import { useState, useRef, useEffect } from "react";
import "../styles/components/navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../assets/Logo.png";

const NAV_ITEMS = [
  { label: "Dashboard",        path: "/Dashboard" },
  { label: "Bill History",     path: "/BillHistory" },
  { label: "Track Appliances", path: "/TrackAppliances" },
  { label: "Insights",         path: "/Insights" },
];

function Navbar() {
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
