import React from 'react';
import { editorialAssets } from '../data/editorialAssets';
import { ArrowUpRight } from 'lucide-react';

export const EditorialHero = () => {
  const [heroImgSrc, setHeroImgSrc] = React.useState(editorialAssets.heroCutout);

  React.useEffect(() => {
    setHeroImgSrc(editorialAssets.heroCutout);
  }, []);

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
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          textAlign: 'center',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          {/* Eyebrow tagline cleanly placed ABOVE the brand name to eliminate any overlap */}
          <div style={{
            fontSize: 'clamp(0.68rem, 1.2vw, 0.82rem)',
            fontWeight: 800,
            letterSpacing: '0.32em',
            color: 'var(--bg-ticker)',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
            opacity: 0.95
          }}>
            WEAR THE VACATION FEELING
          </div>
          <h1 className="font-impact" style={{
            fontSize: 'clamp(72px, 18vw, 240px)',
            color: 'rgba(255, 255, 255, 0.94)',
            margin: 0,
            lineHeight: 0.85,
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}>
            ALFAREL
          </h1>
        </div>

        {/* Layer 2: Center Model Cutout without background (Authentic Beach Resort Wear) */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          width: '100%',
          maxHeight: 'clamp(460px, 62vh, 640px)',
          pointerEvents: 'none'
        }}>
          <img
            src={heroImgSrc}
            alt="AlfaREL Beach Resort Model"
            onError={() => {
              if (heroImgSrc !== editorialAssets.heroModel) {
                setHeroImgSrc(editorialAssets.heroModel);
              }
            }}
            style={{
              maxHeight: 'clamp(450px, 60vh, 620px)',
              width: 'auto',
              maxWidth: '90%',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.85))'
            }}
          />
        </div>

        {/* Layer 3: Flanking Bottom Content Row (Clean Floating Typography Matching referensi.webp) */}
        <div className="hero-info-row" style={{
          position: 'relative',
          zIndex: 4,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: '-3.5rem',
          paddingBottom: '0.75rem',
          gap: '2rem'
        }}>
          {/* Left Narrative Blurb - Sleek floating typography matching referensi.webp */}
          <div style={{
            maxWidth: '280px'
          }}>
            <p style={{
              fontSize: '0.78rem',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.72)',
              lineHeight: 1.55,
              letterSpacing: '0.01em',
              margin: '0 0 0.75rem 0'
            }}>
              Breezy linen cuts and sun-washed coastal tones, crafted for effortless afternoons and ocean sunsets.
            </p>
            <a
              href="#featured-products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--bg-ticker)',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '0.1em'
              }}
            >
              <span>EXPLORE DROPS</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Right Brand Badge - Authentic resort atelier claim */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--bg-ticker)',
              fontSize: '0.75rem',
              fontWeight: 800
            }}>
              100%
            </div>
            <div>
              <div style={{
                fontSize: '0.88rem',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                lineHeight: 1.2
              }}>
                SMALL BATCH CRAFT
              </div>
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'rgba(255, 255, 255, 0.65)',
                textTransform: 'uppercase'
              }}>
                NATURAL BREATHABLE LINEN
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

