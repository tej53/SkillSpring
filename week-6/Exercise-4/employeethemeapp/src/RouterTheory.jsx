import React from 'react';

export default function RouterTheory() {
  return (
    <div className="theory-section">
      <div className="theory-header">
        <span className="badge-pill">Lab Objectives Summary</span>
        <h2>React Context API & Router Components Theory</h2>
      </div>

      <div className="theory-grid">
        <div className="theory-card">
          <div className="icon">🌐</div>
          <h3>Need & Benefits of React Context API</h3>
          <p>
            In typical React applications, data is passed top-down (parent to child) via props.
            However, when data (like themes, user auth, or language) is needed by many components deep in the component tree, passing props through intermediate components (<strong>Prop Drilling</strong>) becomes tedious and substandard.
          </p>
          <ul>
            <li><strong>Eliminates Prop Drilling:</strong> Intermediate components don't need to know about or forward unused props.</li>
            <li><strong>Global Access:</strong> Lowers complexity for app-wide state management.</li>
            <li><strong>Clean Architecture:</strong> Decouples child components from parent hierarchy.</li>
          </ul>
        </div>

        <div className="theory-card">
          <div className="icon">⚙️</div>
          <h3>Working with <code>createContext()</code></h3>
          <p>
            The React Context API consists of three core elements:
          </p>
          <ol className="step-list">
            <li><strong>Context Creation:</strong> <code>const ThemeContext = createContext('light');</code></li>
            <li><strong>Context Provider:</strong> <code>&lt;ThemeContext.Provider value={'{theme}'}&gt;</code> wraps the component tree.</li>
            <li><strong>Context Consumer / Hook:</strong> <code>const theme = useContext(ThemeContext);</code> reads context state inside nested child components.</li>
          </ol>
        </div>

        <div className="theory-card">
          <div className="icon">🧭</div>
          <h3>Types of Router Components (React Router)</h3>
          <p>
            React Router provides several router and navigation components for single-page web applications:
          </p>
          <div className="router-types-grid">
            <div className="r-type">
              <strong>1. BrowserRouter</strong>
              <p>Uses standard HTML5 History API (pushState) for clean URLs (e.g. <code>/employees</code>).</p>
            </div>
            <div className="r-type">
              <strong>2. HashRouter</strong>
              <p>Uses the URL hash portion (e.g. <code>/#/employees</code>) for static file servers.</p>
            </div>
            <div className="r-type">
              <strong>3. MemoryRouter</strong>
              <p>Keeps URL history in memory (useful for testing and React Native environments).</p>
            </div>
            <div className="r-type">
              <strong>4. StaticRouter</strong>
              <p>Used for Server-Side Rendering (SSR) where URL location is static.</p>
            </div>
            <div className="r-type">
              <strong>5. Routes & Route</strong>
              <p>Renders the best matching element based on current browser path location.</p>
            </div>
            <div className="r-type">
              <strong>6. Link & NavLink</strong>
              <p>Enables client-side navigation without full page reloads.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
