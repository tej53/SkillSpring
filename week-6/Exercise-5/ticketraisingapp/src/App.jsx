import React from 'react';
import ComplaintRegister from './components/ComplaintRegister';

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-box">🎫</div>
        <div>
          <h1>TicketRaisingApp</h1>
          <p>Week 6 - Exercise 5: React Forms & Controlled Input Components</p>
        </div>
      </header>

      <main className="app-main">
        <ComplaintRegister />
      </main>

      <footer className="app-footer">
        <p>SkillSpring Lab Week-6 Exercise-5 • React Controlled Form Submission</p>
      </footer>
    </div>
  );
}
