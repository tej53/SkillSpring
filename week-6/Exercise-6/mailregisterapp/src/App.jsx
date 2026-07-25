import React, { useState } from 'react';
import Register from './components/Register';
import FormTheory from './components/FormTheory';

export default function App() {
  const [activeTab, setActiveTab] = useState('register');

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-box">📬</div>
        <div>
          <h1>MailRegisterApp</h1>
          <p>Week 6 - Exercise 6: React Form Validation & Controlled Components</p>
        </div>

        <nav className="tab-nav">
          <button
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            📝 User Registration
          </button>
          <button
            className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
            onClick={() => setActiveTab('theory')}
          >
            📚 Form Concepts & Validation
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'register' ? <Register /> : <FormTheory />}
      </main>

      <footer className="app-footer">
        <p>SkillSpring Lab Week-6 Exercise-6 • Controlled Form Validation</p>
      </footer>
    </div>
  );
}
