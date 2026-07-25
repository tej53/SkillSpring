import React, { useState } from 'react';
import SeatSelectionModal from './SeatSelectionModal';

export default function UserView({ flights, user, onLogout }) {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [confirmedTickets, setConfirmedTickets] = useState([]);

  const handleOpenBookingModal = (flight) => {
    setSelectedFlight(flight);
  };

  const handleConfirmTicket = (ticketData) => {
    setConfirmedTickets((prev) => [ticketData, ...prev]);
    setSelectedFlight(null);
  };

  return (
    <div className="view-container user-view">
      <div className="view-hero user-hero">
        <div className="view-badge logged-in-badge">Logged In: {user.name}</div>
        <h2>Select Flight & Reserve Preferred Seats</h2>
        <p>You can now choose seats and generate official e-tickets instantly.</p>
      </div>

      {/* Ticket History rendered conditionally when tickets exist */}
      {confirmedTickets.length > 0 && (
        <div className="history-box">
          <h3>Your Issued E-Tickets ({confirmedTickets.length})</h3>
          <div className="tickets-grid">
            {confirmedTickets.map((t) => (
              <div key={t.pnr} className="e-ticket">
                <div className="t-header">
                  <span className="pnr">PNR: {t.pnr}</span>
                  <span className="status-badge">ISSUED</span>
                </div>
                <div className="t-body">
                  <div><strong>Flight:</strong> {t.flight.flightNo} ({t.flight.airline})</div>
                  <div><strong>Route:</strong> {t.flight.from} ➔ {t.flight.to}</div>
                  <div><strong>Passenger:</strong> {t.passenger} | <strong>Seat:</strong> {t.seatNo}</div>
                  <div><strong>Fare Paid:</strong> ₹{t.price.toLocaleString('en-IN')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flight-cards-section">
        <h3>Available Flights for Booking</h3>
        <div className="cards-grid">
          {flights.map((f) => (
            <div key={f.id} className="card-item">
              <div className="card-top">
                <span className="airline-name">{f.airline}</span>
                <span className="f-no">{f.flightNo}</span>
              </div>
              <div className="route-row">
                <div>
                  <div className="code">{f.fromCode}</div>
                  <div className="time">{f.departure}</div>
                </div>
                <div className="duration">➔ {f.duration} ➔</div>
                <div>
                  <div className="code">{f.toCode}</div>
                  <div className="time">{f.arrival}</div>
                </div>
              </div>
              <div className="card-bottom">
                <span className="price">₹{f.price.toLocaleString('en-IN')}</span>
                <button
                  className="btn btn-select-seat"
                  onClick={() => handleOpenBookingModal(f)}
                >
                  🎫 Reserve Seat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal prevented from rendering via null check when selectedFlight is null */}
      <SeatSelectionModal
        isOpen={selectedFlight !== null}
        flight={selectedFlight}
        user={user}
        onClose={() => setSelectedFlight(null)}
        onConfirmBooking={handleConfirmTicket}
      />
    </div>
  );
}
