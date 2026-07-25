import React from 'react';
import FlightList from './FlightList';

export default function GuestPage({ flights, onLogin }) {
  return (
    <div className="page-wrapper guest-page">
      <div className="hero-banner guest-hero">
        <div className="banner-badge">Guest Access View</div>
        <h1>Welcome to SkyWings Flight Search</h1>
        <p>
          You are currently browsing as a <strong>Guest User</strong>. You can view all live flight schedules, timetables, and pricing.
        </p>
        <div className="guest-action-callout">
          <span>🔒 Want to reserve seats and book tickets?</span>
          <button className="btn btn-login-banner" onClick={onLogin}>
            Login to Book Tickets
          </button>
        </div>
      </div>

      <FlightList isLoggedIn={false} flights={flights} />
    </div>
  );
}
