import React from 'react';
import Getuser from './components/Getuser';

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-box">🌐</div>
        <div>
          <h1>FetchUserApp</h1>
          <p>Week 6 - Exercise 7: Consuming REST APIs from React Applications</p>
        </div>
      </header>

      <main className="app-main">
        <Getuser />
      </main>

      <footer className="app-footer">
        <p>SkillSpring Lab Week-6 Exercise-7 • REST API Consumption with fetch() & componentDidMount()</p>
      </footer>
    </div>
  );
}
