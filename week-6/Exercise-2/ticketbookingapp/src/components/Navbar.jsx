import React from 'react';

export default function Navbar({ isLoggedIn, onLogin, onLogout, user }) {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <span className="brand-logo">✈️</span>
        <div>
          <span className="brand-name">SkyWings Airways</span>
          <span className="brand-sub">Ticket Booking App</span>
        </div>
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <div className="user-profile">
            <span className="user-avatar">👤</span>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">Logged In ({user.email})</span>
            </div>
            <button className="btn btn-logout" onClick={onLogout}>
              🔓 Logout
            </button>
          </div>
        ) : (
          <div className="guest-profile">
            <span className="guest-badge">Browsing as Guest</span>
            <button className="btn btn-login" onClick={onLogin}>
              🔐 Login to Book Tickets
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
