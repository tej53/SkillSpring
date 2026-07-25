import React from 'react';

export default function EventTheory() {
  return (
    <div className="card theory-card">
      <div className="card-header">
        <div className="badge-pill badge-theory">Lab Objectives Overview</div>
        <h2>Understanding React Events & SyntheticEvents</h2>
        <p className="card-subtitle">
          Core concepts and rules governing event handling in modern React applications.
        </p>
      </div>

      <div className="theory-grid">
        <div className="theory-box">
          <div className="theory-icon">⚡</div>
          <h3>1. What are React Events?</h3>
          <p>
            Handling events with React elements is very similar to handling events on DOM elements.
            However, React events are wrapped inside a cross-browser Synthetic Event system to ensure consistent behavior across all modern web browsers.
          </p>
        </div>

        <div className="theory-box">
          <div className="theory-icon">🎯</div>
          <h3>2. Event Handlers & Binding</h3>
          <p>
            Event handlers are functions that execute in response to user actions (e.g. <code>onClick</code>, <code>onSubmit</code>).
            With React functional components, event handlers are defined directly within the component scope without needing manual <code>this</code> binding.
          </p>
        </div>

        <div className="theory-box">
          <div className="theory-icon">🌐</div>
          <h3>3. Synthetic Events</h3>
          <p>
            React defines a <code>SyntheticEvent</code> object, a cross-browser wrapper around the browser's native event.
            It has the same interface as native events (e.g. <code>preventDefault()</code>, <code>stopPropagation()</code>), but works identically across browsers.
          </p>
        </div>

        <div className="theory-box">
          <div className="theory-icon">🔤</div>
          <h3>4. React Event Naming Conventions</h3>
          <ul className="convention-list">
            <li>React events are named using <strong>camelCase</strong> rather than lowercase (e.g. <code>onClick</code> instead of <code>onclick</code>).</li>
            <li>With JSX you pass a <strong>function reference</strong> as the event handler rather than a string (e.g. <code>onClick={'{handleClick}'}</code>).</li>
            <li>To pass arguments, use an inline arrow function: <code>{"onClick={() => handleWelcome('welcome')}"}</code>.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
