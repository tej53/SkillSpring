import React, { useState } from 'react';
import Counter from './components/Counter';
import CurrencyConvertor from './components/CurrencyConvertor';
import EventTheory from './components/EventTheory';

export default function App() {
  const [activeTab, setActiveTab] = useState('counter');

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-section">
          <div className="app-logo">⚛️</div>
          <div>
            <h1>EventExamplesApp</h1>
            <p>Week 6 - Exercise 1: React Event Handling & Synthetic Events</p>
          </div>
        </div>

        <nav className="tab-nav">
          <button
            className={`tab-btn ${activeTab === 'counter' ? 'active' : ''}`}
            onClick={() => setActiveTab('counter')}
          >
            🔢 Counter & Events Demo
          </button>
          <button
            className={`tab-btn ${activeTab === 'currency' ? 'active' : ''}`}
            onClick={() => setActiveTab('currency')}
          >
            💱 Currency Convertor
          </button>
          <button
            className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
            onClick={() => setActiveTab('theory')}
          >
            📚 Theory & Concepts
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'counter' && <Counter />}
        {activeTab === 'currency' && <CurrencyConvertor />}
        {activeTab === 'theory' && <EventTheory />}
      </main>

      <footer className="app-footer">
        <p>SkillSpring Lab Week-6 Exercise-1 • React Synthetic Events & Event Handlers</p>
      </footer>
    </div>
  );
}
