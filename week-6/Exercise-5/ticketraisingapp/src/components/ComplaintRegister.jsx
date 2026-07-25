import React, { useState } from 'react';

export default function ComplaintRegister() {
  const [employeeName, setEmployeeName] = useState('');
  const [complaint, setComplaint] = useState('');
  const [submittedTickets, setSubmittedTickets] = useState([]);
  const [lastRefNo, setLastRefNo] = useState(null);

  // LAB REQUIREMENT: Use handleSubmit event to submit complaint & generate Reference number in alert box
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employeeName.trim() || !complaint.trim()) {
      alert('Please fill out both your Employee Name and Complaint details.');
      return;
    }

    // Generate random/timestamp reference number
    const refNo = 'REF-' + Math.floor(100000 + Math.random() * 900000);

    // Display Alert Box with Reference number (Lab Requirement)
    alert(`Thank you, ${employeeName}!\n\nYour complaint has been successfully registered.\nReference Number: ${refNo}\n\nPlease keep this Reference Number for further follow ups.`);

    const newTicket = {
      refNo,
      employeeName: employeeName.trim(),
      complaint: complaint.trim(),
      date: new Date().toLocaleString(),
    };

    setSubmittedTickets((prev) => [newTicket, ...prev]);
    setLastRefNo(refNo);

    // Reset form fields
    setEmployeeName('');
    setComplaint('');
  };

  return (
    <div className="card complaint-card">
      <div className="card-header">
        <div className="badge-pill">Controlled Form Component</div>
        <h2>Complaint Register Form</h2>
        <p className="card-subtitle">
          Submit your workplace feedback or technical issues to obtain an instant tracking Reference Number.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="complaint-form">
        <div className="form-group">
          <label htmlFor="employee-name">Employee Name:</label>
          <input
            id="employee-name"
            type="text"
            className="form-control"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Enter your full name (e.g. Ramesh Kumar)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="complaint-text">Complaint / Issue Details:</label>
          <textarea
            id="complaint-text"
            className="form-control textarea-control"
            rows="5"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Describe your issue or complaint in detail..."
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-submit">
            📩 Submit Complaint (handleSubmit Event)
          </button>
        </div>
      </form>

      {lastRefNo && (
        <div className="success-banner">
          <div className="success-icon">✅</div>
          <div>
            <strong>Latest Complaint Registered!</strong>
            <p>Reference Number: <code className="ref-code">{lastRefNo}</code></p>
          </div>
        </div>
      )}

      {submittedTickets.length > 0 && (
        <div className="ticket-history-section">
          <h3>Registered Complaints Log ({submittedTickets.length})</h3>
          <div className="history-grid">
            {submittedTickets.map((t) => (
              <div key={t.refNo} className="history-card">
                <div className="history-card-header">
                  <span className="ref-badge">{t.refNo}</span>
                  <span className="status-badge">OPEN</span>
                </div>
                <div className="history-card-body">
                  <p><strong>Employee:</strong> {t.employeeName}</p>
                  <p className="complaint-snippet">"{t.complaint}"</p>
                  <span className="timestamp">Logged on: {t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
