import React, { useState } from 'react';

export default function CurrencyConvertor() {
  const [rupees, setRupees] = useState('');
  const [convertedEuro, setConvertedEuro] = useState(null);
  const [conversionHistory, setConversionHistory] = useState([]);

  // Exchange rate: 1 EUR = ₹90.00 INR
  const exchangeRate = 90.0;

  // Handle click event of button / form submit to invoke handleSubmit event
  const handleSubmit = (e) => {
    e.preventDefault(); // Demonstrate preventDefault synthetic event method

    const inr = parseFloat(rupees);
    if (isNaN(inr) || inr <= 0) {
      alert('Please enter a valid positive number for Indian Rupees.');
      return;
    }

    const euro = inr / exchangeRate;
    const formattedEuro = euro.toFixed(2);
    setConvertedEuro(formattedEuro);

    const record = {
      id: Date.now(),
      inr: inr.toLocaleString('en-IN'),
      euro: formattedEuro,
      time: new Date().toLocaleTimeString(),
    };

    setConversionHistory((prev) => [record, ...prev]);
  };

  const handleReset = () => {
    setRupees('');
    setConvertedEuro(null);
  };

  return (
    <div className="card currency-card">
      <div className="card-header">
        <div className="badge-pill">Requirement 4</div>
        <h2>Currency Convertor Component</h2>
        <p className="card-subtitle">
          Convert Indian Rupees (INR ₹) to Euro (€) by handling form submission & click events.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="currency-form">
        <div className="form-group">
          <label htmlFor="inr-input">Enter Amount in Indian Rupees (INR ₹):</label>
          <div className="input-wrapper">
            <span className="currency-symbol">₹</span>
            <input
              id="inr-input"
              type="number"
              step="any"
              value={rupees}
              onChange={(e) => setRupees(e.target.value)}
              placeholder="e.g. 900"
              required
            />
          </div>
        </div>

        <div className="rate-info">
          <span>Current Exchange Rate: <strong>₹90.00 INR = 1.00 € EUR</strong></span>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-convert">
            💱 Convert (handleSubmit Event)
          </button>
          <button type="button" className="btn btn-reset" onClick={handleReset}>
            🔄 Reset Form
          </button>
        </div>
      </form>

      {convertedEuro !== null && (
        <div className="result-card">
          <div className="result-header">Conversion Result</div>
          <div className="result-values">
            <span className="inr-value">₹ {parseFloat(rupees).toLocaleString('en-IN')} INR</span>
            <span className="arrow-icon">➡️</span>
            <span className="euro-value">€ {convertedEuro} EUR</span>
          </div>
        </div>
      )}

      {conversionHistory.length > 0 && (
        <div className="history-section">
          <h4>Recent Conversions</h4>
          <div className="history-list">
            {conversionHistory.map((item) => (
              <div key={item.id} className="history-item">
                <span>₹{item.inr} INR</span>
                <span>=</span>
                <span className="history-euro">€{item.euro} EUR</span>
                <span className="history-time">({item.time})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
