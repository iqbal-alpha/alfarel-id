import React from 'react';
import { editorialAssets } from '../data/editorialAssets';
import { ArrowRight, MessageCircle, MapPin, Instagram } from 'lucide-react';

export const PhilosophyFooterSection = () => {
  return (
    <footer style={{
      backgroundColor: '#0C131A',
      color: '#FFFFFF',
      paddingTop: '6rem',
      paddingBottom: '3rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        {/* Giant Philosophy Statement matching referensi.webp */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '4rem',
          marginBottom: '4rem'
        }}>
          <h2 className="font-impact" style={{
            fontSize: 'clamp(2rem, 5vw, 4.2rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            color: 'var(--bg-sunset)',
            margin: 0,
            maxWidth: '920px'
          }}>
            At AlfaREL.ID, fashion is more than what you wear—it's a reflection of your personality and confidence
          </h2>

          <a
            href="#catalog"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'all var(--transition-normal)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-sunset)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'none';
            }}
            aria-label="Back to catalog"
          >
            <ArrowRight size={24} />
          </a>
        </div>

        {/* 3-Column Editorial Photography Duo & Quotes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2.5rem',
          alignItems: 'center',
          paddingBottom: '4rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {/* Left B&W Portrait */}
          <div style={{
            gridColumn: 'span 3',
            display: 'flex',
            justifyContent: 'center'
          }} className="footer-col-photo-1">
            <div style={{
              width: '100%',
              maxWidth: '240px',
              aspectRatio: '3/4',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#1a1a1a',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)'
            }}>
              <img
                src={editorialAssets.bwQuote1}
                alt="Editorial Portrait B&W 1"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Center Minimalist Quotes */}
          <div style={{
            gridColumn: 'span 6',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem'
          }} className="footer-col-quotes">
            <div>
              <p style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.75)',
                textTransform: 'uppercase',
                marginBottom: '2rem'
              }}>
                MORE IMPORTANTLY, THEY LISTENED TO MY PERSONALITY AND WHAT I WANTED TO PROJECT.
              </p>
              <p style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase'
              }}>
                THE QUALITY OF THE FABRICS IS TOP-NOTCH.
              </p>
            </div>

            <div>
              <p style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.75)',
                textTransform: 'uppercase',
                marginBottom: '2rem'
              }}>
                THE QUALITY OF THE RESORT LINEN IS TOP-NOTCH AND KEEPS ME CHILL IN THE HEAT.
              </p>
              <p style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase'
              }}>
                THE FASHION IS FROM HERE.
              </p>
            </div>
          </div>

          {/* Right B&W Portrait */}
          <div style={{
            gridColumn: 'span 3',
            display: 'flex',
            justifyContent: 'center'
          }} className="footer-col-photo-2">
            <div style={{
              width: '100%',
              maxWidth: '240px',
              aspectRatio: '3/4',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#1a1a1a',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)'
            }}>
              <img
                src={editorialAssets.bwQuote2}
                alt="Editorial Portrait B&W 2"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Contact */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '2.5rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: 'rgba(255, 255, 255, 0.5)',
          textTransform: 'uppercase',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            COPYRIGHT 2026 ALFAREL.ID ALL RIGHTS RESERVED
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ color: 'var(--bg-ticker)' }}>FAST WHATSAPP CHECKOUT</span>
            <span>BALI & JAKARTA, INDONESIA</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .footer-col-photo-1, .footer-col-quotes, .footer-col-photo-2 {
            grid-column: span 12 !important;
            text-align: center;
          }
          .footer-col-quotes {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
