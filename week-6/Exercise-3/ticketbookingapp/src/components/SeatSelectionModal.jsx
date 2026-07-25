import React, { useState } from 'react';

export default function SeatSelectionModal({ isOpen, flight, user, onClose, onConfirmBooking }) {
  // Prevent rendering if modal is not open or no flight selected
  if (!isOpen || !flight) {
    return null;
  }

  const [selectedSeat, setSelectedSeat] = useState('12A');

  const availableSeats = [
    '10A', '10B', '10C', '11A', '11B', '11C',
    '12A', '12B', '12C', '14A', '14B', '14C'
  ];

  const handleConfirm = () => {
    onConfirmBooking({
      pnr: 'SW' + Math.floor(100000 + Math.random() * 900000),
      flight,
      seatNo: selectedSeat,
      passenger: user.name,
      price: flight.price,
      time: new Date().toLocaleTimeString(),
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Select Preferred Seat & Confirm</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="flight-brief">
          <span className="badge-flight">{flight.flightNo}</span>
          <span>{flight.from} ({flight.fromCode}) ➔ {flight.to} ({flight.toCode})</span>
        </div>

        <div className="seat-grid-label">Choose Seat:</div>
        <div className="seat-grid">
          {availableSeats.map((seat) => (
            <button
              key={seat}
              className={`seat-btn ${selectedSeat === seat ? 'selected' : ''}`}
              onClick={() => setSelectedSeat(seat)}
            >
              💺 {seat}
            </button>
          ))}
        </div>

        <div className="seat-summary">
          <div>Selected Seat: <strong>{selectedSeat}</strong></div>
          <div>Total Price: <strong className="highlight-price">₹{flight.price.toLocaleString('en-IN')}</strong></div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-confirm" onClick={handleConfirm}>Confirm & Generate Ticket</button>
        </div>
      </div>
    </div>
  );
}
