import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Chat from './components/Chat';
import './App.css';

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem('auth');
  return auth ? children : <Navigate to="/login" />;
};

// Placeholder components for the new sections
const EnterPatientData = () => <div><h2>Enter Patient Data</h2></div>;
const PredictOutcomes = () => <div><h2>Predict ICU and Death</h2></div>;
const AccessPatientData = () => <div><h2>Access Patient Data</h2></div>;
const Dashboards = () => <div><h2>Dashboards</h2></div>;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/enter-patient-data" element={<PrivateRoute><EnterPatientData /></PrivateRoute>} />
          <Route path="/predict-outcomes" element={<PrivateRoute><PredictOutcomes /></PrivateRoute>} />
          <Route path="/access-patient-data" element={<PrivateRoute><AccessPatientData /></PrivateRoute>} />
          <Route path="/dashboards" element={<PrivateRoute><Dashboards /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
