import React, { useState } from 'react';

// Step 6a: Import ThemeContext
import ThemeContext from './ThemeContext';
import EmployeesList from './EmployeesList';
import RouterTheory from './RouterTheory';

const sampleEmployees = [
  { id: 1, name: 'Ananya Roy', designation: 'Senior Software Engineer', department: 'Engineering', location: 'Bengaluru', avatar: '👩‍💻' },
  { id: 2, name: 'Vikram Mehta', designation: 'Product Designer', department: 'UI/UX Design', location: 'Mumbai', avatar: '👨‍🎨' },
  { id: 3, name: 'Siddharth Nair', designation: 'DevOps Specialist', department: 'Cloud Infrastructure', location: 'Hyderabad', avatar: '👨‍💻' },
  { id: 4, name: 'Neha Kapoor', designation: 'QA Lead', department: 'Quality Assurance', location: 'New Delhi', avatar: '👩‍🔬' },
];

export default function App() {
  // Step 6c: Assign the value for theme provider from state
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('directory');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // Step 6b: Define the theme context provider to wrap the entire JSX of App component
    <ThemeContext.Provider value={theme}>
      <div className={`app-container theme-${theme}`}>
        <header className="app-header">
          <div className="header-brand">
            <span className="logo-icon">🏢</span>
            <div>
              <h1>Apps Centric Solutions</h1>
              <p>Employee Management System • React Context API Lab</p>
            </div>
          </div>

          <div className="header-actions">
            <nav className="tab-nav">
              <button
                className={`tab-btn ${activeTab === 'directory' ? 'active' : ''}`}
                onClick={() => setActiveTab('directory')}
              >
                👥 Employee Directory
              </button>
              <button
                className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
                onClick={() => setActiveTab('theory')}
              >
                📚 Router & Context Theory
              </button>
            </nav>

            <button className="btn btn-theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Switch to Dark Theme' : '☀️ Switch to Light Theme'}
            </button>
          </div>
        </header>

        <main className="app-main">
          {activeTab === 'directory' ? (
            /* Step 6d: Modify call to EmployeesList so theme is NO LONGER passed as props */
            <EmployeesList employees={sampleEmployees} />
          ) : (
            <RouterTheory />
          )}
        </main>

        <footer className="app-footer">
          <p>SkillSpring Lab Week-6 Exercise-4 • Theme Context Value: <strong>{theme}</strong></p>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}
