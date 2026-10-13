import React, { useState } from 'react';
import { editorialAssets } from '../data/editorialAssets';
import { useCart } from '../context/CartContext';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export const ProductSpotlightSection = ({ products = [] }) => {
  const { addToCart } = useCart();

  // Find a flagship shirt product or fallback
  const flagshipProduct = (products && products.length > 0)
    ? (products.find(p => p.id === 'prod-02' || p.category === 'shirts') || products[0])
    : null;

  const colors = [
    { name: 'Sunset Terracotta', hex: '#EE592B' },
    { name: 'Midnight Charcoal', hex: '#0C131A' },
    { name: 'Breezy Linen Sand', hex: '#EAE5D9' }
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleOrderNow = () => {
    if (flagshipProduct) {
      addToCart(flagshipProduct, 'L', selectedColor.name, 1);
    }
  };

  return (
    <section style={{
      backgroundColor: 'var(--bg-sand)',
      color: '#0C131A',
      padding: '5.5rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
    }}>
      <div className="container" style={{
        maxWidth: '1240px',
        margin: '0 auto',
        position: 'relative'
      }}>
        {/* Top Metadata Row: Rating & Title on Left, Price on Right (Zero overlapping text) */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          {/* Left: Star Reviews & Title */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--bg-sunset)',
              marginBottom: '0.5rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.08em'
            }}>
              <span>★★★★★</span>
              <span style={{ color: '#0C131A', marginLeft: '0.3rem' }}>PROPER REVIEWS [4.9]</span>
            </div>

            <h2 className="font-impact" style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 0.9,
              letterSpacing: '0.02em',
              margin: 0,
              color: '#0C131A'
            }}>
              TOP RESORT<br />SLEEVE SHIRT
            </h2>
          </div>

          {/* Right: Price & Navigation Controls */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '1.6rem',
              fontWeight: 900,
              color: '#0C131A'
            }}>
              IDR 189,000
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: 'rgba(12, 19, 26, 0.4)',
              textDecoration: 'line-through',
              marginBottom: '0.85rem'
            }}>
              IDR 249,000
            </div>

            <div style={{
              display: 'inline-flex',
              gap: '0.5rem'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(12, 19, 26, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <ChevronLeft size={18} />
              </div>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-sunset)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <ChevronRight size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Center: Model Sitting on Beach Lounge Chair (Clean container, no text behind it) */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          margin: '2rem 0 3rem 0'
        }}>
          <div style={{
            maxWidth: '460px',
            width: '90%',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: '#F3EFE8'
          }}>
            <img
              src={editorialAssets.spotlightModel}
              alt="Top Sleeve Resort Shirt Spotlight"
              style={{
                width: '100%',
                maxHeight: '520px',
                objectFit: 'cover',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </div>
        </div>

        {/* Bottom Row: Description Left, Color Swatches Center, ORDER NOW Right */}
        <div style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          alignItems: 'center',
          gap: '2rem',
          borderTop: '1px solid rgba(12, 19, 26, 0.1)',
          paddingTop: '2.5rem'
        }}>
          {/* Description */}
          <div style={{
            gridColumn: 'span 5'
          }} className="spotlight-col-desc">
            <p style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              lineHeight: 1.6,
              color: 'rgba(12, 19, 26, 0.75)',
              textTransform: 'uppercase',
              margin: '0 0 0.4rem 0'
            }}>
              OUR LATEST RESORT SHIRT IS A PERFECT BLEND OF TIMELESS ELEGANCE AND TROPICAL FREEDOM.
            </p>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--bg-sunset)',
              letterSpacing: '0.08em'
            }}>
              100% PURE WASHED LINEN // SOFT-DRAPE
            </span>
          </div>

          {/* Color Swatch Picker */}
          <div style={{
            gridColumn: 'span 3',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }} className="spotlight-col-swatch">
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'rgba(12, 19, 26, 0.6)'
            }}>
              COLOR: <span style={{ color: '#0C131A' }}>{selectedColor.name.toUpperCase()}</span>
            </div>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center'
            }}>
              {colors.map((c) => {
                const isSelected = selectedColor.name === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: c.hex,
                      border: isSelected ? '2px solid #0C131A' : '1px solid rgba(0,0,0,0.2)',
                      boxShadow: isSelected ? '0 0 0 3px rgba(238, 89, 43, 0.35)' : 'none',
                      cursor: 'pointer',
                      transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                      transition: 'all var(--transition-fast)'
                    }}
                    title={c.name}
                  />
                );
              })}
            </div>
          </div>

          {/* ORDER NOW Button */}
          <div style={{
            gridColumn: 'span 4',
            display: 'flex',
            justifyContent: 'flex-end'
          }} className="spotlight-col-btn">
            <button
              onClick={handleOrderNow}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: '#0C131A',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                padding: '0.85rem 1.8rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                boxShadow: '0 8px 25px rgba(12, 19, 26, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-sunset)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0C131A';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span>ORDER NOW</span>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                color: '#0C131A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ArrowRight size={13} strokeWidth={3} />
              </div>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .spotlight-col-desc, .spotlight-col-swatch, .spotlight-col-btn {
            grid-column: span 12 !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
};
