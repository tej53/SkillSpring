import React from 'react';

export default function GuestView({ flights, onLogin }) {
  return (
    <div className="view-container guest-view">
      <div className="view-hero guest-hero">
        <div className="view-badge">Guest Browsing Mode</div>
        <h2>Live Flight Schedules & Real-time Fares</h2>
        <p>Explore real-time flight routes across major cities. Login to unlock instant seat reservation.</p>
        <button className="btn btn-hero-login" onClick={onLogin}>
          🔐 Login to Book Tickets
        </button>
      </div>

      <div className="flight-table-container">
        <h3>Flight Timetable</h3>
        <table className="flight-table">
          <thead>
            <tr>
              <th>Flight</th>
              <th>Airline</th>
              <th>Origin ➔ Destination</th>
              <th>Departure</th>
              <th>Fare (INR)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((f) => (
              <tr key={f.id}>
                <td><span className="code-pill">{f.flightNo}</span></td>
                <td>{f.airline}</td>
                <td>{f.from} ({f.fromCode}) ➔ {f.to} ({f.toCode})</td>
                <td>{f.departure}</td>
                <td><strong className="fare">₹{f.price.toLocaleString('en-IN')}</strong></td>
                <td>
                  <button className="btn btn-disabled" disabled title="Login to book">
                    🔒 Login Required
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
