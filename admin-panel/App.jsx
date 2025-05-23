import React from 'react';
import './styles.css';
import { db } from './firebase';

const App = () => {
  return (
    <div className="dashboard">
      <h1>EnerySoft Admin Dashboard</h1>
      <p>Manage your ads, rewards, users and referrals here.</p>
    </div>
  );
};

export default App;