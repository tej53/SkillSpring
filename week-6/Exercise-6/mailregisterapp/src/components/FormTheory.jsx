import React from 'react';

export default function FormTheory() {
  return (
    <div className="card theory-card">
      <div className="card-header">
        <div className="badge-pill badge-theory">Form Objectives & Concepts</div>
        <h2>React Forms & Validation Theory</h2>
      </div>

      <div className="theory-grid">
        <div className="theory-box">
          <h3>1. React Form vs. Standard HTML Form</h3>
          <p>
            In standard HTML forms, input elements maintain their own internal state and submit directly via HTTP POST/GET causing full page reloads.
            In React, component state serves as the "single source of truth". Input elements get their values from state and update state via <code>onChange</code> event handlers.
          </p>
        </div>

        <div className="theory-box">
          <h3>2. Controlled Components</h3>
          <p>
            An input element whose value is controlled by React state is called a <strong>Controlled Component</strong>.
            Every state mutation has an associated handler function, making it easy to enforce input validation, formatting, and submission rules.
          </p>
        </div>

        <div className="theory-box">
          <h3>3. Event Handling & Validation</h3>
          <p>
            Validations are triggered dynamically during <code>onChange</code> (input events) or <code>onBlur</code> (focus change) and verified finally in <code>onSubmit</code>.
            If errors exist, <code>e.preventDefault()</code> prevents form submission and error messages are rendered dynamically.
          </p>
        </div>

        <div className="theory-box">
          <h3>4. React Form Input Controls</h3>
          <ul>
            <li><code>&lt;input type="text|email|password" /&gt;</code>: Controlled via <code>value</code> and <code>onChange</code>.</li>
            <li><code>&lt;textarea /&gt;</code>: Uses <code>value</code> attribute in React (unlike inner text in HTML).</li>
            <li><code>&lt;select /&gt;</code>: Uses <code>value</code> attribute on <code>&lt;select&gt;</code> tag for selected option.</li>
            <li><code>&lt;input type="checkbox|radio" /&gt;</code>: Controlled via <code>checked</code> property.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
