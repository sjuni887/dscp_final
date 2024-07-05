import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import './App.css';

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem('auth');
  return auth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Healthcare Dashboard</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
