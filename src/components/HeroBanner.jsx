import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowDown, MessageCircle } from 'lucide-react';

export const HeroBanner = ({ onExploreClick }) => {
  const { t } = useLanguage();

  return (
    <section style={{
      position: 'relative',
      backgroundColor: '#ADD2C1', // Fresh pastel seafoam green canvas
      borderBottom: '1px solid rgba(19, 53, 42, 0.08)',
      overflow: 'hidden',
      padding: '2.5rem 0 2rem'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Responsive Mobile-First Grid Layout */}
        <div className="hero-split-grid">
          {/* Left Column: Clean Typography & Action Buttons */}
          <div className="hero-text-block">
            {/* Tag */}
            <span style={{
              color: '#0284C7',
              fontSize: '0.8125rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              display: 'inline-block'
            }}>
              {t('hero_badge')}
            </span>

            {/* Headline */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5.5vw, 3.75rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#13352A',
              marginBottom: '1rem'
            }}>
              {t('hero_title_1')}{' '}
              <span style={{ color: '#16535F', fontStyle: 'italic' }}>
                {t('hero_title_highlight')}
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
              color: '#224B3E',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
              maxWidth: '480px'
            }}>
              {t('hero_subtitle')}
            </p>

            {/* Action Buttons */}
            <div className="hero-actions-row">
              <button
                onClick={onExploreClick}
                className="btn btn-primary"
                style={{
                  padding: '0.85rem 1.85rem',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  borderRadius: '6px',
                  backgroundColor: '#0284C7',
                  borderColor: '#0284C7',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)',
                  textTransform: 'uppercase'
                }}
              >
                <span>{t('hero_cta')}</span>
                <ArrowDown size={15} />
              </button>

              <a
                href="#catalog"
                onClick={onExploreClick}
                className="btn btn-secondary"
                style={{
                  padding: '0.85rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#13352A',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
              >
                <MessageCircle size={15} color="#0284C7" />
                <span>{t('hero_fast_order')}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Circular Portal Breakout Visual */}
          <div className="hero-visual-block">
            <img
              src="/images/hero-model-circle.jpg"
              alt="AlfaREL.ID Resort Fashion Model"
              style={{
                width: '100%',
                maxWidth: '460px',
                height: 'auto',
                maxHeight: 'clamp(260px, 42vw, 480px)',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 14px 26px rgba(19, 53, 42, 0.12))'
              }}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
