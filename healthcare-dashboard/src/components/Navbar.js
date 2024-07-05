import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/enter-patient-data">Enter Patient Data</Link></li>
        <li><Link to="/predict-outcomes">Predict ICU and Death</Link></li>
        <li><Link to="/access-patient-data">Access Patient Data</Link></li>
        <li><Link to="/chat">Generative AI Chat</Link></li>
        <li><Link to="/dashboards">Dashboards</Link></li>
      </ul>
      <button className="logout-button" onClick={onLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
