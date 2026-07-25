import React from 'react';

// DEMONSTRATION OF PREVENTING COMPONENT FROM RENDERING BY RETURNING NULL
export default function DealsBanner({ showDeals, isLoggedIn, onClose }) {
  // If deals toggle is off or user is not logged in, return null to prevent rendering in DOM
  if (!showDeals || !isLoggedIn) {
    return null;
  }

  return (
    <div className="deals-banner">
      <div className="deals-content">
        <span className="deals-icon">🎁</span>
        <div>
          <strong>Exclusive Logged-in Deal Applied!</strong>
          <p>Use promo code <code>FLYHAPPY15</code> at checkout for 15% instant cashback on all domestic flights.</p>
        </div>
      </div>
      <button className="close-deals-btn" onClick={onClose}>✕</button>
    </div>
  );
}
