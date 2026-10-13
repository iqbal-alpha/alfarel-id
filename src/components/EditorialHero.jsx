import React from 'react';
import { editorialAssets } from '../data/editorialAssets';
import { ArrowUpRight } from 'lucide-react';

export const EditorialHero = () => {
  return (
    <section style={{
      position: 'relative',
      backgroundColor: '#0A0E13',
      background: 'radial-gradient(circle at 50% 40%, rgba(28, 38, 48, 0.85) 0%, #080C10 75%)',
      color: '#FFFFFF',
      overflow: 'hidden',
      paddingTop: '2rem',
      paddingBottom: '3.5rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
    }}>
      {/* Top Metadata Badges (Matching referensi.webp) */}
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1.5rem',
        fontSize: '0.75rem',
        fontWeight: 800,
        letterSpacing: '0.18em',
        color: 'rgba(255, 255, 255, 0.7)',
        textTransform: 'uppercase',
        marginBottom: '1rem',
        position: 'relative',
        zIndex: 5
      }}>
        <span>COASTAL RESORT APPAREL</span>
        <span>@2026 BRAND // LIMITED DROPS</span>
      </div>

      {/* Main Hero Center Stage */}
      <div className="container" style={{
        position: 'relative',
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '0 1.5rem',
        minHeight: 'clamp(480px, 62vh, 640px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        {/* Layer 1: Giant Background Typography ALFAREL (Matching FASHIOLY in referensi.webp) */}
        <div style={{
          position: 'absolute',
          top: '32%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          textAlign: 'center',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          <h1 className="font-impact" style={{
            fontSize: 'clamp(68px, 17vw, 230px)',
            color: 'rgba(255, 255, 255, 0.94)',
            margin: 0,
            lineHeight: 0.85,
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}>
            ALFAREL
          </h1>
          <div style={{
            fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
            fontWeight: 800,
            letterSpacing: '0.25em',
            color: 'var(--bg-ticker)',
            textTransform: 'uppercase',
            marginTop: '0.5rem',
            opacity: 0.9
          }}>
            WEAR THE VACATION FEELING
          </div>
        </div>

        {/* Layer 2: Center Model Cutout without background (Matching referensi.webp cutout) */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          width: '100%',
          maxHeight: 'clamp(440px, 58vh, 600px)',
          pointerEvents: 'none'
        }}>
          <img
            src={editorialAssets.heroCutout}
            alt="AlfaREL Resort Model"
            style={{
              maxHeight: 'clamp(430px, 56vh, 590px)',
              width: 'auto',
              maxWidth: '85%',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.75))',
              maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)'
            }}
          />
        </div>

        {/* Layer 3: Flanking Bottom Content Row (Matching referensi.webp lower overlay) */}
        <div className="hero-info-row" style={{
          position: 'relative',
          zIndex: 4,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: '-4rem',
          paddingBottom: '0.5rem',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}>
          {/* Left Narrative Blurb */}
          <div style={{
            flex: '1 1 320px',
            maxWidth: '420px',
            backgroundColor: 'rgba(10, 14, 19, 0.78)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            padding: '1.25rem 1.5rem',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)'
          }}>
            <p style={{
              fontSize: '0.88rem',
              color: 'rgba(255, 255, 255, 0.88)',
              lineHeight: 1.6,
              margin: '0 0 0.85rem 0'
            }}>
              Breezy linen silhouettes and sun-drenched coastal tones. Crafted for relaxed beach club afternoons, ocean sunsets, and timeless vacation comfort.
            </p>
            <a
              href="#featured-products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--bg-ticker)',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '0.82rem',
                letterSpacing: '0.08em'
              }}
            >
              <span>EXPLORE DROPS</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Right Social Proof & Review Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            backgroundColor: 'rgba(10, 14, 19, 0.78)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            padding: '1.15rem 1.6rem',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)'
          }}>
            {/* Avatar Stack */}
            <div style={{ display: 'flex', marginRight: '0.25rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #0A0E13',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-sunset)'
              }}>
                <img src={editorialAssets.collection002} alt="Customer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #0A0E13',
                overflow: 'hidden',
                marginLeft: '-12px',
                backgroundColor: 'var(--color-seafoam)'
              }}>
                <img src={editorialAssets.collection001} alt="Customer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #0A0E13',
                overflow: 'hidden',
                marginLeft: '-12px',
                backgroundColor: 'var(--bg-ticker)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0A0E13',
                fontWeight: 900,
                fontSize: '0.85rem'
              }}>
                ★
              </div>
            </div>

            <div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '0.04em'
              }}>
                3.5+ MILLION
              </div>
              <div style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'rgba(255, 255, 255, 0.65)',
                textTransform: 'uppercase'
              }}>
                SATISFIED SHOPPERS
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-info-row {
            flex-direction: column !important;
            align-items: stretch !important;
            margin-top: 1rem !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

