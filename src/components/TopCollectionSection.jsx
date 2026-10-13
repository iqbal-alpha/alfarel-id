import React from 'react';
import { editorialAssets } from '../data/editorialAssets';
import { ArrowRight } from 'lucide-react';

export const TopCollectionSection = () => {
  return (
    <section id="top-collection" style={{
      backgroundColor: 'var(--bg-sand)',
      color: '#0C131A',
      padding: '5rem 1.5rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
    }}>
      <div className="container" style={{
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        {/* Main Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 className="font-impact" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
            letterSpacing: '0.04em',
            color: '#0C131A',
            margin: 0
          }}>
            OUR TOP COLLECTION
          </h2>
        </div>

        {/* 3-Column Editorial Grid matching referensi.webp */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          {/* Card [001] */}
          <div style={{
            gridColumn: 'span 4',
            display: 'flex',
            flexDirection: 'column'
          }} className="col-collection-1">
            <div style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: 'rgba(12, 19, 26, 0.7)',
              marginBottom: '0.75rem'
            }}>
              [001]
            </div>

            <div style={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#0C131A',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)'
            }}>
              <img
                src={editorialAssets.collection001}
                alt="Top Collection 001 Resort Hat"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '1.25rem',
              alignItems: 'flex-start',
              marginTop: '1.25rem'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}>
                <div style={{ width: '1px', height: '24px', backgroundColor: '#0C131A' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>02</span>
              </div>
              <p style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                lineHeight: 1.5,
                color: 'rgba(12, 19, 26, 0.75)',
                textTransform: 'uppercase'
              }}>
                FROM TIMELESS CLASSICS TO BOLD, TRENDSETTING PIECES, EVERY OUTFIT TELLS A STORY
              </p>
            </div>
          </div>

          {/* Card [002] */}
          <div style={{
            gridColumn: 'span 5',
            display: 'flex',
            flexDirection: 'column'
          }} className="col-collection-2">
            <div style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: 'rgba(12, 19, 26, 0.7)',
              marginBottom: '0.75rem'
            }}>
              [002]
            </div>

            <div style={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#0C131A',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)'
            }}>
              <img
                src={editorialAssets.collection002}
                alt="Top Collection 002 Red Glasses"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          {/* Right Editorial Title & Arrow Button */}
          <div style={{
            gridColumn: 'span 3',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: '1rem'
          }} className="col-collection-3">
            <h3 className="font-impact" style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              lineHeight: 0.95,
              color: '#0C131A',
              letterSpacing: '0.02em',
              marginBottom: '2rem'
            }}>
              SEASONAL<br />
              ELEVATING<br />
              ESSENTIALS<br />
              PRODUCT
            </h3>

            <a
              href="#featured-products"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'rgba(12, 19, 26, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0C131A',
                textDecoration: 'none',
                transition: 'all var(--transition-normal)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-sunset)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(12, 19, 26, 0.08)';
                e.currentTarget.style.color = '#0C131A';
                e.currentTarget.style.transform = 'none';
              }}
              aria-label="View seasonal essentials"
            >
              <ArrowRight size={22} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .col-collection-1, .col-collection-2, .col-collection-3 {
            grid-column: span 12 !important;
            padding-left: 0 !important;
            align-items: center;
            text-align: center;
          }
          .col-collection-3 {
            margin-top: 1rem;
          }
        }
      `}</style>
    </section>
  );
};
