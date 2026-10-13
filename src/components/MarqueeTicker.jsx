import React from 'react';

export const MarqueeTicker = () => {
  const tickerItems = [
    'COASTAL STREETWEAR',
    'ECOMMERCE BRAND',
    'PREMIUM LINEN FABRICS',
    'VACATION APPAREL',
    'BREEZY RESORT DROPS',
    'FAST WHATSAPP CHECKOUT',
    'UP TO 20% OFF FIRST ORDER',
    '100% ORGANIC COTTON',
  ];

  const fullContent = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      {tickerItems.map((item, idx) => (
        <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '2rem' }}>
          <span style={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.12em' }}>
            {item}
          </span>
          <span style={{ fontSize: '1rem', opacity: 0.7 }}>•</span>
        </span>
      ))}
    </div>
  );

  return (
    <div style={{
      backgroundColor: 'var(--bg-ticker)',
      color: '#0C131A',
      overflow: 'hidden',
      padding: '0.75rem 0',
      borderTop: '1px solid rgba(0,0,0,0.1)',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      userSelect: 'none',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="animate-marquee" style={{ display: 'flex', gap: '2rem' }}>
        {fullContent}
        {fullContent}
      </div>
    </div>
  );
};
