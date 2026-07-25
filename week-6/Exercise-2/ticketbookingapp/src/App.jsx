import React, { useState } from 'react';
import Navbar from './components/Navbar';
import GuestPage from './components/GuestPage';
import UserPage from './components/UserPage';
import ConditionalInfoCard from './components/ConditionalInfoCard';

// Sample flights dataset
const initialFlights = [
  { id: 101, flightNo: 'AI-204', airline: 'Air India', from: 'New Delhi', fromCode: 'DEL', to: 'Mumbai', toCode: 'BOM', departure: '07:30 AM', arrival: '09:45 AM', duration: '2h 15m', price: 4850 },
  { id: 102, flightNo: '6E-512', airline: 'IndiGo', from: 'Bengaluru', fromCode: 'BLR', to: 'Hyderabad', toCode: 'HYD', departure: '10:15 AM', arrival: '11:30 AM', duration: '1h 15m', price: 3200 },
  { id: 103, flightNo: 'UK-819', airline: 'Vistara', from: 'Mumbai', fromCode: 'BOM', to: 'Goa', toCode: 'GOI', departure: '01:00 PM', arrival: '02:15 PM', duration: '1h 15m', price: 4100 },
  { id: 104, flightNo: 'SG-402', airline: 'SpiceJet', from: 'Chennai', fromCode: 'MAA', to: 'Kolkata', toCode: 'CCU', departure: '04:45 PM', arrival: '07:15 PM', duration: '2h 30m', price: 5400 },
  { id: 105, flightNo: '6E-994', airline: 'IndiGo', from: 'New Delhi', fromCode: 'DEL', to: 'Bengaluru', toCode: 'BLR', departure: '08:20 PM', arrival: '11:05 PM', duration: '2h 45m', price: 6150 },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
  });

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // DEMONSTRATING ELEMENT VARIABLES FOR CONDITIONAL RENDERING (Lab Objective)
  let mainContentComponent;
  if (isLoggedIn) {
    mainContentComponent = (
      <UserPage
        user={user}
        flights={initialFlights}
        onLogout={handleLogout}
      />
    );
  } else {
    mainContentComponent = (
      <GuestPage
        flights={initialFlights}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="app-container">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        user={user}
      />

      <main className="app-main">
        {/* Render the Element Variable */}
        {mainContentComponent}

        <ConditionalInfoCard currentMode={isLoggedIn ? 'User' : 'Guest'} />
      </main>

      <footer className="app-footer">
        <p>SkillSpring Lab Week-6 Exercise-2 • Ticket Booking App (Conditional Rendering)</p>
      </footer>
    </div>
  );
}
