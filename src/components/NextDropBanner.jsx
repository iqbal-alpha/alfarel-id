import React from 'react';
import { editorialAssets } from '../data/editorialAssets';
import { ArrowRight } from 'lucide-react';

export const NextDropBanner = () => {
  return (
    <section style={{
      position: 'relative',
      backgroundColor: '#0C131A',
      color: '#FFFFFF',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      {/* Background Graphic & Model Image */}
      <div style={{
        position: 'relative',
        minHeight: '440px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Model Photo spanning background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1
        }}>
          <img
            src={editorialAssets.dropBanner}
            alt="Ready For Next Drop"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center right',
              display: 'block'
            }}
          />
          {/* Gradient Overlay for Text Legibility on Left */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(12, 19, 26, 0.95) 0%, rgba(12, 19, 26, 0.8) 40%, rgba(12, 19, 26, 0.2) 80%, rgba(12, 19, 26, 0) 100%)'
          }} />
        </div>

        {/* Text Content */}
        <div className="container" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '4rem 1.5rem',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <h2 className="font-impact" style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
            lineHeight: 0.9,
            letterSpacing: '0.03em',
            color: '#FFFFFF',
            margin: '0 0 2rem 0',
            textShadow: '0 10px 30px rgba(0,0,0,0.7)'
          }}>
            READY FOR THE<br />
            NEXT DROP?
          </h2>

          <a
            href="#featured-products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: 'var(--bg-sunset)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              padding: '0.85rem 1.75rem',
              borderRadius: 'var(--radius-full)',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
              boxShadow: '0 6px 20px rgba(238, 89, 43, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-ticker)';
              e.currentTarget.style.color = '#0C131A';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-sunset)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <span>VIEW COLLECTION</span>
            <div style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ArrowRight size={14} strokeWidth={3} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
