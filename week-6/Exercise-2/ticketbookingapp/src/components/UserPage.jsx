import React, { useState } from 'react';
import FlightList from './FlightList';

export default function UserPage({ user, flights, onLogout }) {
  const [userBookings, setUserBookings] = useState([]);
  const [successToast, setSuccessToast] = useState(null);

  const handleBookSuccess = (booking) => {
    setUserBookings((prev) => [booking, ...prev]);
    setSuccessToast(`Ticket booked successfully! Booking ID: ${booking.bookingId}`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  return (
    <div className="page-wrapper user-page">
      <div className="hero-banner user-hero">
        <div className="banner-badge logged-in-badge">Logged In User Dashboard</div>
        <h1>Welcome Back, {user.name}! 👋</h1>
        <p>
          You have full access to search flights, reserve seats, and manage your booked tickets.
        </p>
      </div>

      {/* Success Notification Banner (Demonstrates Conditional Rendering with &&) */}
      {successToast && (
        <div className="toast-notification">
          <span>✅ {successToast}</span>
          <button className="close-toast" onClick={() => setSuccessToast(null)}>✕</button>
        </div>
      )}

      {/* Booking History Section - Prevented from rendering if user has no bookings */}
      {userBookings.length > 0 && (
        <div className="bookings-section">
          <h3>Your Booked Tickets ({userBookings.length})</h3>
          <div className="booking-cards-grid">
            {userBookings.map((b) => (
              <div key={b.bookingId} className="booking-card">
                <div className="b-header">
                  <span className="b-id">{b.bookingId}</span>
                  <span className="b-status">CONFIRMED</span>
                </div>
                <div className="b-details">
                  <div><strong>Flight:</strong> {b.flight.flightNo} ({b.flight.airline})</div>
                  <div><strong>Route:</strong> {b.flight.from} ➔ {b.flight.to}</div>
                  <div><strong>Passenger:</strong> {b.passengerName} ({b.seats} Seat(s))</div>
                  <div><strong>Total Paid:</strong> ₹{b.totalPrice.toLocaleString('en-IN')}</div>
                  <div className="b-date">Booked on: {b.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <FlightList
        isLoggedIn={true}
        user={user}
        flights={flights}
        onBookSuccess={handleBookSuccess}
      />
    </div>
  );
}
