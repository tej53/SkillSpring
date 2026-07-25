import React from 'react';

export default function ConditionalInfoCard({ currentMode }) {
  return (
    <div className="info-card">
      <div className="info-header">
        <span className="badge-pill">Lab Objectives & Techniques</span>
        <h2>Conditional Rendering Techniques Applied Here</h2>
      </div>

      <div className="techniques-grid">
        <div className="tech-box">
          <div className="tech-num">1</div>
          <h4>Element Variables</h4>
          <p>
            Storing JSX elements in JavaScript variables. In this app, <code>pageContent</code> is assigned <code>&lt;UserPage /&gt;</code> or <code>&lt;GuestPage /&gt;</code> based on <code>isLoggedIn</code>.
          </p>
          <div className="code-snippet">
            <code>
              {`let pageContent;
if (isLoggedIn) {
  pageContent = <UserPage />;
} else {
  pageContent = <GuestPage />;
}`}
            </code>
          </div>
        </div>

        <div className="tech-box">
          <div className="tech-num">2</div>
          <h4>Preventing Component Rendering</h4>
          <p>
            Returning <code>null</code> from a component's render method hides it completely without creating DOM nodes (e.g. <code>BookingConfirmationModal</code> returns <code>null</code> when no flight is selected).
          </p>
          <div className="code-snippet">
            <code>
              {`function BookingConfirmationModal({ flight }) {
  if (!flight) return null; // Prevents rendering
  return <div className="modal">...</div>;
}`}
            </code>
          </div>
        </div>

        <div className="tech-box">
          <div className="tech-num">3</div>
          <h4>Inline Ternary & Short-Circuit (&&)</h4>
          <p>
            Using <code>isLoggedIn ? &lt;BookButton /&gt; : &lt;DisabledButton /&gt;</code> for button states and <code>{`{successToast && <Notification />}`}</code> for conditional banners.
          </p>
        </div>
      </div>
    </div>
  );
}
