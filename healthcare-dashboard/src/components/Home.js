import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  console.log('Home component rendering'); // Debugging log
  return (
    <div>
      <h2>Welcome to the Healthcare Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <p>This is the home page.</p>
    </div>
  );
}

export default Home;
