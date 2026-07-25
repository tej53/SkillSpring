import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DealsBanner from './components/DealsBanner';
import GuestView from './components/GuestView';
import UserView from './components/UserView';

const sampleFlights = [
  { id: 201, flightNo: 'UK-955', airline: 'Vistara', from: 'Delhi', fromCode: 'DEL', to: 'Mumbai', toCode: 'BOM', departure: '08:00 AM', arrival: '10:15 AM', duration: '2h 15m', price: 5200 },
  { id: 202, flightNo: '6E-241', airline: 'IndiGo', from: 'Bengaluru', fromCode: 'BLR', to: 'Delhi', toCode: 'DEL', departure: '11:30 AM', arrival: '02:15 PM', duration: '2h 45m', price: 4800 },
  { id: 203, flightNo: 'AI-505', airline: 'Air India', from: 'Hyderabad', fromCode: 'HYD', to: 'Chennai', toCode: 'MAA', departure: '03:10 PM', arrival: '04:25 PM', duration: '1h 15m', price: 3100 },
  { id: 204, flightNo: 'SG-818', airline: 'SpiceJet', from: 'Mumbai', fromCode: 'BOM', to: 'Kolkata', toCode: 'CCU', departure: '06:00 PM', arrival: '08:30 PM', duration: '2h 30m', price: 5900 },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDeals, setShowDeals] = useState(true);
  const [user, setUser] = useState({ name: 'Priya Verma', email: 'priya.verma@example.com' });

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // LAB REQUIREMENT: USING ELEMENT VARIABLES FOR DYNAMIC CONDITIONAL RENDERING
  let activeViewComponent;
  if (isLoggedIn) {
    activeViewComponent = (
      <UserView
        flights={sampleFlights}
        user={user}
        onLogout={handleLogout}
      />
    );
  } else {
    activeViewComponent = (
      <GuestView
        flights={sampleFlights}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="app-layout">
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Control bar to toggle promo banner (Demonstrating Preventing Component Rendering) */}
      <div className="deals-toggle-bar">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={showDeals}
            onChange={(e) => setShowDeals(e.target.checked)}
          />
          <span>Show Special Promo Deals (Demonstrates <code>return null</code> when hidden/logged out)</span>
        </label>
      </div>

      {/* DealsBanner component returns null if showDeals is false OR isLoggedIn is false */}
      <DealsBanner
        showDeals={showDeals}
        isLoggedIn={isLoggedIn}
        onClose={() => setShowDeals(false)}
      />

      {/* Render Element Variable */}
      <main className="main-content">
        {activeViewComponent}
      </main>

      <footer className="app-footer">
        <p>SkillSpring Lab Week-6 Exercise-3 • Advanced Conditional Rendering & Element Variables</p>
      </footer>
    </div>
  );
}
