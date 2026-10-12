import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowDown, MessageCircle, Sparkles, SunMedium } from 'lucide-react';

export const HeroBanner = ({ onExploreClick }) => {
  const { t } = useLanguage();

  return (
    <section style={{
      position: 'relative',
      padding: '3rem 0 3.5rem',
      background: 'linear-gradient(180deg, rgba(243, 239, 230, 0.7) 0%, rgba(251, 249, 245, 1) 100%)',
      borderBottom: '1px solid var(--bg-muted)',
      overflow: 'hidden'
    }}>
      {/* Decorative ambient background blur dots */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        backgroundColor: 'rgba(98, 182, 168, 0.12)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '-5%',
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 107, 87, 0.08)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '780px',
          margin: '0 auto'
        }}>
          {/* Top Pill Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.95rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-seafoam-light)',
            color: 'var(--color-primary)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            letterSpacing: '0.03em',
            marginBottom: '1.25rem',
            border: '1px solid rgba(98, 182, 168, 0.3)'
          }}>
            <Sparkles size={14} color="var(--color-primary)" />
            <span>{t('hero_badge')}</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.3rem, 5.5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '1.1rem'
          }}>
            {t('hero_title_1')}{' '}
            <span style={{
              color: 'var(--color-primary)',
              position: 'relative',
              display: 'inline-block'
            }}>
              {t('hero_title_highlight')}
              <svg
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  width: '100%',
                  height: '8px'
                }}
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M1 5.5C45 2 155 2 199 5.5"
                  stroke="var(--color-seafoam)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '640px',
            marginBottom: '2rem'
          }}>
            {t('hero_subtitle')}
          </p>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.875rem',
            marginBottom: '2.5rem'
          }}>
            <button
              onClick={onExploreClick}
              className="btn btn-primary"
              style={{
                padding: '0.8rem 1.75rem',
                fontSize: '1rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <span>{t('hero_cta')}</span>
              <ArrowDown size={18} />
            </button>

            <a
              href="#catalog"
              onClick={onExploreClick}
              className="btn btn-secondary"
              style={{
                padding: '0.8rem 1.5rem',
                fontSize: '0.9375rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <SunMedium size={18} color="var(--color-accent-coral)" />
              <span>{t('hero_fast_order')}</span>
            </a>
          </div>

          {/* Quick Value Props Banner */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            width: '100%',
            maxWidth: '640px',
            paddingTop: '1.25rem',
            borderTop: '1px dashed var(--bg-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <span>🍃</span>
              <strong>100% Breathable Fabric</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <span>💬</span>
              <strong>Fast WA Checkout</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <span>🚚</span>
              <strong>Flat Ongkir Transparan</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
