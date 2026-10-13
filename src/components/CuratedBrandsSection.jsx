import React, { useState } from 'react';
import { editorialAssets } from '../data/editorialAssets';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export const CuratedBrandsSection = ({ onSelectCategory }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const curations = [
    {
      name: 'Resort Linen Shirts',
      number: '01',
      category: 'shirts',
      tagline: 'Garment-washed pure linen camp collars tailored for tropical sunshine.',
      image: editorialAssets.heroModel
    },
    {
      name: 'Sunset Boardshorts',
      number: '02',
      category: 'boardshorts',
      tagline: 'Quick-dry 4-way stretch shorts crafted for ocean dips & beach club lounging.',
      image: editorialAssets.mood01
    },
    {
      name: 'Oversized Beach Tees',
      number: '03',
      category: 'tees',
      tagline: '240 GSM breathable combed cotton with an effortless relaxed drape.',
      image: editorialAssets.collection001
    },
    {
      name: 'Coastal Kimono Outer',
      number: '04',
      category: 'shirts',
      tagline: 'Airy summer layering designed to catch the afternoon sea breeze.',
      image: editorialAssets.aboutModel
    },
    {
      name: 'Beach Club Accessories',
      number: '05',
      category: 'accessories',
      tagline: 'Handwoven natural raffia straw hats and polarized UV400 sunglasses.',
      image: editorialAssets.collection002
    }
  ];

  const activeCuration = curations[activeIdx] || curations[0];

  return (
    <section id="curations-section" style={{
      backgroundColor: 'var(--bg-sand)',
      color: '#0C131A',
      padding: '6rem 1.5rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
      position: 'relative'
    }}>
      <div className="container" style={{
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: 'var(--bg-sunset)',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            SIGNATURE SELECTIONS // 2026
          </div>
          <h2 className="font-impact" style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
            letterSpacing: '0.04em',
            color: '#0C131A',
            margin: 0
          }}>
            OUR BEST CURATIONS
          </h2>
        </div>

        {/* 2-Column Responsive Layout: List on Left, Showcase Card on Right */}
        <div className="curations-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 1fr',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Interactive Curation Rows */}
          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            {curations.map((item, idx) => {
              const isActive = activeIdx === idx;

              return (
                <div
                  key={item.number}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => {
                    setActiveIdx(idx);
                    if (onSelectCategory) {
                      onSelectCategory(item.category);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.6rem 0.5rem',
                    borderBottom: '1px solid rgba(12, 19, 26, 0.12)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    position: 'relative'
                  }}
                >
                  {/* Left: Brand / Curation Name & Number */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span className="font-impact" style={{
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.9rem)',
                      lineHeight: 0.95,
                      letterSpacing: '0.02em',
                      color: isActive ? 'var(--bg-sunset)' : '#0C131A',
                      transition: 'color var(--transition-fast)'
                    }}>
                      {item.name}
                    </span>
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      color: isActive ? 'var(--bg-sunset)' : 'rgba(12, 19, 26, 0.45)',
                      marginTop: '0.2rem',
                      transition: 'color var(--transition-fast)'
                    }}>
                      {item.number}
                    </span>
                  </div>

                  {/* Right: Diagonal Arrow */}
                  <div style={{
                    color: isActive ? 'var(--bg-sunset)' : 'rgba(12, 19, 26, 0.4)',
                    transition: 'transform var(--transition-fast), color var(--transition-fast)',
                    transform: isActive ? 'translate(3px, -3px)' : 'none'
                  }}>
                    <ArrowUpRight size={28} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dedicated Showcase Preview Card */}
          <div className="curations-showcase-column" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '380px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              transition: 'all var(--transition-normal)'
            }}>
              {/* Product Photo Showcase */}
              <div style={{
                position: 'relative',
                aspectRatio: '4/5',
                overflow: 'hidden',
                backgroundColor: '#F3EFE8'
              }}>
                <img
                  key={activeCuration.number}
                  src={activeCuration.image}
                  alt={activeCuration.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    animation: 'fadeIn 300ms ease-in-out'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: 'rgba(12, 19, 26, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--bg-ticker)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em'
                }}>
                  CURATION [{activeCuration.number}]
                </div>
              </div>

              {/* Showcase Caption Details & Action */}
              <div style={{ padding: '1.5rem' }}>
                <h3 className="font-impact" style={{
                  fontSize: '1.5rem',
                  letterSpacing: '0.02em',
                  color: '#0C131A',
                  margin: '0 0 0.4rem 0'
                }}>
                  {activeCuration.name}
                </h3>
                <p style={{
                  fontSize: '0.84rem',
                  color: 'rgba(12, 19, 26, 0.65)',
                  lineHeight: 1.5,
                  margin: '0 0 1.25rem 0'
                }}>
                  {activeCuration.tagline}
                </p>
                <button
                  onClick={() => onSelectCategory && onSelectCategory(activeCuration.category)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'var(--bg-sunset)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.65rem 1.25rem',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                >
                  <span>VIEW {activeCuration.name.toUpperCase()}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0.4; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 860px) {
          .curations-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .curations-showcase-column {
            margin-top: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};
