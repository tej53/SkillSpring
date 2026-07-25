import React from 'react';

export default function Navbar({ isLoggedIn, user, onLogin, onLogout }) {
  return (
    <nav className="app-navbar">
      <div className="nav-logo">
        <span className="logo-icon">🛩️</span>
        <div>
          <span className="logo-title">SkyWings Express</span>
          <span className="logo-subtitle">Week 6 - Exercise 3</span>
        </div>
      </div>

      <div className="nav-controls">
        {isLoggedIn ? (
          <div className="user-badge-box">
            <span className="avatar">🧑‍✈️</span>
            <div className="user-details">
              <span className="name">{user.name}</span>
              <span className="status">Logged In</span>
            </div>
            <button className="btn btn-logout" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="btn btn-login" onClick={onLogin}>
            Login as User
          </button>
        )}
      </div>
    </nav>
  );
}
