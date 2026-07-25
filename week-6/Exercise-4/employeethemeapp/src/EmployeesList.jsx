import React from 'react';
import EmployeeCard from './EmployeeCard';

export default function EmployeesList({ employees }) {
  return (
    <div className="employees-list-container">
      <div className="list-header">
        <h2>Employee Directory</h2>
        <p>Notice: Theme is consumed automatically by child <code>EmployeeCard</code> components via <code>useContext(ThemeContext)</code>, without receiving any theme props!</p>
      </div>

      <div className="employees-grid">
        {employees.map((employee) => (
          /* Step 7: Call EmployeeCard WITHOUT passing theme prop */
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}
