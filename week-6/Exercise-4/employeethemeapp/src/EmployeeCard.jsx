import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

export default function EmployeeCard({ employee }) {
  // Step 8b: Retrieve the context value using useContext()
  const theme = useContext(ThemeContext);

  // Step 8c: Use context variable for button and card className
  const buttonClassName = theme === 'dark' ? 'btn-dark' : 'btn-light';
  const cardClassName = theme === 'dark' ? 'card-dark' : 'card-light';

  return (
    <div className={`employee-card ${cardClassName}`}>
      <div className="avatar-section">
        <span className="emp-avatar">{employee.avatar}</span>
      </div>

      <div className="emp-details">
        <h3 className="emp-name">{employee.name}</h3>
        <p className="emp-designation">{employee.designation}</p>
        <div className="emp-meta">
          <span>📁 {employee.department}</span>
          <span>📍 {employee.location}</span>
        </div>
      </div>

      <div className="emp-actions">
        {/* Using context-derived className for buttons */}
        <button className={`btn ${buttonClassName}`}>
          View Profile
        </button>
        <button className={`btn ${buttonClassName} btn-outline`}>
          Send Message
        </button>
      </div>

      <div className="theme-indicator">
        Context Theme: <strong>{theme.toUpperCase()}</strong>
      </div>
    </div>
  );
}
