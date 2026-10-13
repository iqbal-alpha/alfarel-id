import React from 'react';
import { editorialAssets } from '../data/editorialAssets';

export const EditorialMoodGallery = () => {
  return (
    <section style={{
      backgroundColor: '#0C131A',
      color: '#FFFFFF',
      padding: '7rem 1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Massive Ghost Lettering Background */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        textAlign: 'center',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <div className="font-impact" style={{
          fontSize: 'clamp(3.5rem, 13vw, 12rem)',
          color: 'rgba(255, 255, 255, 0.04)',
          lineHeight: 0.88,
          letterSpacing: '0.04em',
          textTransform: 'uppercase'
        }}>
          OUR FEATURED<br />
          COASTAL PRODUCT
        </div>
      </div>

      {/* Floating Asymmetric Cards Container */}
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2rem',
          width: '100%',
          alignItems: 'center'
        }}>
          {/* Card Left: Low/Mid floating */}
          <div style={{
            gridColumn: 'span 4',
            display: 'flex',
            justifyContent: 'center'
          }} className="mood-col-1">
            <div style={{
              width: '240px',
              aspectRatio: '3/4',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transform: 'rotate(-4deg)',
              transition: 'transform var(--transition-normal)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-1deg) scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-4deg)'}
            >
              <img
                src={editorialAssets.aboutModel}
                alt="Mood Coastal Streetwear"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Cards Center: Staggered Top and Bottom */}
          <div style={{
            gridColumn: 'span 5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }} className="mood-col-2">
            {/* Top Orange Portrait */}
            <div style={{
              width: '260px',
              aspectRatio: '1/1',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transform: 'translateY(-20px)',
              transition: 'transform var(--transition-normal)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-25px) scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-20px)'}
            >
              <img
                src={editorialAssets.mood01}
                alt="Mood Sunset Portrait"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Bottom Sunset Portrait */}
            <div style={{
              width: '280px',
              aspectRatio: '1/1',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transform: 'translateX(30px)',
              transition: 'transform var(--transition-normal)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(30px) scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(30px)'}
            >
              <img
                src={editorialAssets.mood02}
                alt="Mood Street Style"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Label Right: FEATURED // */}
          <div style={{
            gridColumn: 'span 3',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            height: '100%'
          }} className="mood-col-3">
            <div className="font-impact" style={{
              fontSize: '1.6rem',
              letterSpacing: '0.15em',
              color: '#FFFFFF'
            }}>
              FEATURED //
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .mood-col-1, .mood-col-2, .mood-col-3 {
            grid-column: span 12 !important;
            justify-content: center !important;
            text-align: center;
          }
          .mood-col-2 > div {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};
