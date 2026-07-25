import React from 'react';

// CohortDetails component displays the details of a single cohort
function CohortDetails({ cohort }) {
  if (!cohort) return null;

  const statusClass = cohort.status === 'Completed' ? 'status-completed' : 'status-ongoing';

  return (
    <div className="cohort-card" data-testid="cohort-card">
      <div className="cohort-header">
        <h3>{cohort.code}</h3>
        <span className={`status-badge ${statusClass}`}>{cohort.status}</span>
      </div>
      <div className="cohort-body">
        <p className="cohort-name">{cohort.name}</p>
        <div className="cohort-meta">
          <div><strong>Trainer:</strong> {cohort.trainer}</div>
          <div><strong>Start:</strong> {cohort.startDate}</div>
          <div><strong>End:</strong> {cohort.endDate}</div>
          <div><strong>Participants:</strong> {cohort.participants}</div>
        </div>
      </div>
    </div>
  );
}

export default CohortDetails;
