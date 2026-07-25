import React, { useState } from 'react';

// Component demonstrating "preventing component rendering" when no flight is selected or banner hidden
function BookingConfirmationModal({ flight, user, onClose, onConfirm }) {
  // If flight is null, prevent component from rendering by returning null
  if (!flight) return null;

  const [seats, setSeats] = useState(1);
  const [passengerName, setPassengerName] = useState(user?.name || '');

  const handleBooking = (e) => {
    e.preventDefault();
    onConfirm({
      bookingId: 'SW-' + Math.floor(100000 + Math.random() * 900000),
      flight,
      seats,
      passengerName,
      totalPrice: flight.price * seats,
      date: new Date().toLocaleDateString(),
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Confirm Flight Booking</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-flight-summary">
          <div><strong>Flight:</strong> {flight.flightNo} - {flight.airline}</div>
          <div><strong>Route:</strong> {flight.from} ➔ {flight.to}</div>
          <div><strong>Departure:</strong> {flight.departure} | <strong>Price:</strong> ₹{flight.price.toLocaleString('en-IN')}</div>
        </div>

        <form onSubmit={handleBooking} className="booking-form">
          <div className="form-group">
            <label>Passenger Name:</label>
            <input
              type="text"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Number of Passengers / Seats:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={seats}
              onChange={(e) => setSeats(parseInt(e.target.value) || 1)}
              required
            />
          </div>

          <div className="total-price-box">
            <span>Total Payable:</span>
            <strong>₹{(flight.price * seats).toLocaleString('en-IN')}</strong>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-confirm">
              🎉 Confirm & Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function FlightList({ isLoggedIn, user, flights, onBookSuccess }) {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleBookClick = (flight) => {
    if (!isLoggedIn) return;
    setSelectedFlight(flight);
  };

  const handleConfirmBooking = (bookingData) => {
    setSelectedFlight(null);
    if (onBookSuccess) onBookSuccess(bookingData);
  };

  return (
    <div className="flight-list-container">
      <h3>Available Direct Flights</h3>
      <div className="flight-grid">
        {flights.map((flight) => (
          <div key={flight.id} className="flight-card">
            <div className="flight-card-header">
              <span className="airline-tag">{flight.airline}</span>
              <span className="flight-no">{flight.flightNo}</span>
            </div>

            <div className="flight-route">
              <div className="route-city">
                <span className="city-code">{flight.fromCode}</span>
                <span className="city-name">{flight.from}</span>
                <span className="time">{flight.departure}</span>
              </div>
              <div className="flight-duration">
                <span>✈️ {flight.duration}</span>
                <div className="line"></div>
                <span className="direct">Direct</span>
              </div>
              <div className="route-city">
                <span className="city-code">{flight.toCode}</span>
                <span className="city-name">{flight.to}</span>
                <span className="time">{flight.arrival}</span>
              </div>
            </div>

            <div className="flight-footer">
              <div className="price-tag">
                <span className="price-label">Price per seat</span>
                <span className="price-val">₹{flight.price.toLocaleString('en-IN')}</span>
              </div>

              {/* Conditional Rendering of Action Button */}
              {isLoggedIn ? (
                <button
                  className="btn btn-book"
                  onClick={() => handleBookClick(flight)}
                >
                  🎫 Book Ticket
                </button>
              ) : (
                <button className="btn btn-disabled" disabled title="Please log in to book">
                  🔒 Login Required
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Confirmation Modal demonstrating preventing component rendering via null check */}
      <BookingConfirmationModal
        flight={selectedFlight}
        user={user}
        onClose={() => setSelectedFlight(null)}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
}
