import React from 'react';
import { editorialAssets } from '../data/editorialAssets';

export const AboutSection = () => {
  return (
    <section id="about-section" style={{
      backgroundColor: 'var(--bg-sand)',
      color: '#0C131A',
      padding: '6rem 1.5rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
    }}>
      <div className="container" style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '2.5rem',
        alignItems: 'center'
      }}>
        {/* Left Column: Heading & Year tag */}
        <div style={{
          gridColumn: 'span 4',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '380px'
        }} className="about-col-left">
          <div>
            <h2 className="font-impact" style={{
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              lineHeight: 0.9,
              color: '#0C131A',
              marginBottom: '1rem',
              letterSpacing: '0.02em'
            }}>
              ABOUT<br />ALFAREL
            </h2>
          </div>

          <div style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: 'rgba(12, 19, 26, 0.7)',
            textTransform: 'uppercase'
          }}>
            • @2026 BEST COLLECTION
          </div>
        </div>

        {/* Center Column: Photography Card with Tag */}
        <div style={{
          gridColumn: 'span 4',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }} className="about-col-center">
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: 'rgba(12, 19, 26, 0.65)',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            • Limited drops no - restocks no apologies.
          </div>

          <div style={{
            width: '100%',
            maxWidth: '340px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: '#0C131A'
          }}>
            <img
              src={editorialAssets.aboutModel}
              alt="About AlfaREL Editorial Model"
              style={{
                width: '100%',
                height: '380px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Right Column: Editorial Text Blurbs */}
        <div style={{
          gridColumn: 'span 4',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '380px',
          paddingLeft: '1rem'
        }} className="about-col-right">
          <div style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            lineHeight: 1.6,
            color: 'rgba(12, 19, 26, 0.75)'
          }}>
            At AlfaREL.ID we believe every moment on vacation and everyday life has a breezy story waiting to be captured.
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h3 style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              color: '#0C131A',
              marginBottom: '0.6rem',
              letterSpacing: '0.02em'
            }}>
              Capturing the way you need it.
            </h3>
            <p style={{
              fontSize: '0.85rem',
              lineHeight: 1.65,
              color: 'rgba(12, 19, 26, 0.7)'
            }}>
              Discover fashion designed for everyday confidence—modern fits, premium coastal fabrics, and timeless pieces made to move with your lifestyle.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-col-left, .about-col-center, .about-col-right {
            grid-column: span 12 !important;
            min-height: auto !important;
            padding-left: 0 !important;
            text-align: center;
          }
          .about-col-left {
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};
