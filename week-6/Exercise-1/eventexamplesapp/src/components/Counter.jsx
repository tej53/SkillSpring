import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [syntheticEventInfo, setSyntheticEventInfo] = useState(null);

  // Helper to append log messages with timestamp
  const logMessage = (msg, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setMessages((prev) => [{ id: Date.now() + Math.random(), time, text: msg, type }, ...prev]);
  };

  // Method 1a: Increment counter value
  const incrementCounter = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Method 1b: Say Hello with static message
  const sayHello = () => {
    logMessage('Hello! Counter incremented! Welcome to React Event Handling.', 'success');
  };

  // Multiple methods invoked on Increase click
  const handleIncrease = () => {
    incrementCounter();
    sayHello();
  };

  // Decrement handler
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
    logMessage('Counter value decremented.', 'warning');
  };

  // Method 2: Takes argument (e.g. "welcome")
  const handleWelcome = (greeting) => {
    logMessage(`Function invoked with argument: "${greeting.toUpperCase()}"! Welcome aboard! 🎉`, 'welcome');
  };

  // Method 3: Synthetic Event Demo (OnPress / onClick handler)
  const handleSyntheticEvent = (e) => {
    // SyntheticEvent object provided by React
    const info = {
      eventType: e.type,
      targetElement: e.target.tagName,
      buttonText: e.target.innerText,
      isSynthetic: e.nativeEvent ? 'Yes (Wraps native ' + e.nativeEvent.type + ')' : 'Yes',
      timeStamp: Math.round(e.timeStamp) + ' ms',
    };

    setSyntheticEventInfo(info);
    logMessage(`I was clicked! (SyntheticEvent triggered: ${e.type})`, 'event');
  };

  const clearLogs = () => setMessages([]);

  return (
    <div className="card counter-card">
      <div className="card-header">
        <div className="badge-pill">Requirement 1 & 2 & 3</div>
        <h2>Counter & Synthetic Event Demos</h2>
        <p className="card-subtitle">
          Demonstrating multiple method execution, argument passing, and React Synthetic Events.
        </p>
      </div>

      <div className="counter-display-box">
        <span className="counter-label">Current Count Value</span>
        <span className="counter-value">{count}</span>
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={handleIncrease}>
          ➕ Increment (Multiple Methods)
        </button>

        <button className="btn btn-secondary" onClick={handleDecrement}>
          ➖ Decrement
        </button>

        <button className="btn btn-accent" onClick={() => handleWelcome('welcome')}>
          👋 Say Welcome ("welcome" arg)
        </button>

        <button className="btn btn-event" onClick={handleSyntheticEvent}>
          ⚡ OnPress (Synthetic Event)
        </button>
      </div>

      {syntheticEventInfo && (
        <div className="synthetic-info-box">
          <h4>React SyntheticEvent Details</h4>
          <div className="synthetic-grid">
            <div><strong>Event Type:</strong> <code>{syntheticEventInfo.eventType}</code></div>
            <div><strong>Target Tag:</strong> <code>{syntheticEventInfo.targetElement}</code></div>
            <div><strong>Synthetic Wrapper:</strong> <span>{syntheticEventInfo.isSynthetic}</span></div>
            <div><strong>Time Stamp:</strong> <span>{syntheticEventInfo.timeStamp}</span></div>
          </div>
        </div>
      )}

      <div className="log-console">
        <div className="log-console-header">
          <span>Console Output / Invocation Log</span>
          {messages.length > 0 && (
            <button className="btn-text" onClick={clearLogs}>Clear Log</button>
          )}
        </div>
        <div className="log-list">
          {messages.length === 0 ? (
            <div className="empty-log">Click any button above to see event invocation logs.</div>
          ) : (
            messages.map((item) => (
              <div key={item.id} className={`log-item log-${item.type}`}>
                <span className="log-time">[{item.time}]</span>
                <span className="log-text">{item.text}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
