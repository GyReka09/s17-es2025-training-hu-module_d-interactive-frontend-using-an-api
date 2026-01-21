import React from "react";
import { Link } from "react-router-dom";
import "./css/navigation.css";
import useAuthContext from "../hooks/UseAuthContext";

export default function Navigation() {
  const { user, logout } = useAuthContext();
  const creditBalance = user?.user?.creditBalance ?? 0;
  const userName = user?.user?.name || "User";

  return (
    <div className="navbar">
      <div className="navbar-inner">
        <Link to="/dashboard" className="nav-brand">
          SKILLSHARE ACADEMY
        </Link>

        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">
            Írányítópult
          </Link>
          <Link to="/courses" className="nav-link">
            Képzések
          </Link>
          <Link to="/mentors" className="nav-link">
            Mentorok
          </Link>
        </div>

        <div className="nav-right-side">
          <span className="nav-pill">{creditBalance} credit</span>
          <span className="nav-user">Üdv, {userName}</span>
          <button className="nav-btn" onClick={logout}>
            Kijelentkezés
          </button>
        </div>
      </div>
    </div>
  );
}
