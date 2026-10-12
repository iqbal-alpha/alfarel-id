import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowDown, MessageCircle, Sparkles, Wind, Truck, Compass } from 'lucide-react';

export const HeroBanner = ({ onExploreClick }) => {
  const { t } = useLanguage();

  return (
    <section style={{
      position: 'relative',
      padding: '3.5rem 0 4rem',
      background: 'linear-gradient(180deg, rgba(243, 239, 230, 0.6) 0%, rgba(251, 249, 245, 1) 100%)',
      borderBottom: '1px solid var(--bg-muted)',
      overflow: 'hidden'
    }}>
      {/* Subtle organic ambient atmosphere glow */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '-5%',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        backgroundColor: 'rgba(98, 182, 168, 0.08)',
        filter: 'blur(70px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '-5%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        backgroundColor: 'rgba(231, 101, 80, 0.05)',
        filter: 'blur(60px)',
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
          {/* Top Pill Label */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.95rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-seafoam-light)',
            color: 'var(--color-primary)',
            fontSize: '0.78125rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            border: '1px solid rgba(98, 182, 168, 0.25)'
          }}>
            <Compass size={14} color="var(--color-primary)" />
            <span>{t('hero_badge')}</span>
          </div>

          {/* Headline - Editorial & Balanced */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            color: 'var(--text-primary)',
            marginBottom: '1.15rem'
          }}>
            {t('hero_title_1')}{' '}
            <span style={{
              color: 'var(--color-primary)',
              fontStyle: 'italic',
              fontWeight: 800
            }}>
              {t('hero_title_highlight')}
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            maxWidth: '640px',
            marginBottom: '2.25rem'
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
            marginBottom: '2.75rem'
          }}>
            <button
              onClick={onExploreClick}
              className="btn btn-primary"
              style={{
                padding: '0.85rem 1.85rem',
                fontSize: '0.95rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <span>{t('hero_cta')}</span>
              <ArrowDown size={16} />
            </button>

            <a
              href="#catalog"
              onClick={onExploreClick}
              className="btn btn-secondary"
              style={{
                padding: '0.85rem 1.6rem',
                fontSize: '0.925rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <MessageCircle size={16} color="var(--color-primary)" />
              <span>{t('hero_fast_order')}</span>
            </a>
          </div>

          {/* Value Props Row with Vector Icons (No Emojis) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            width: '100%',
            maxWidth: '660px',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--bg-muted)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Wind size={14} color="var(--color-primary)" />
              </div>
              <strong style={{ color: 'var(--text-primary)' }}>100% Breathable Fabric</strong>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageCircle size={14} color="var(--color-primary)" />
              </div>
              <strong style={{ color: 'var(--text-primary)' }}>Fast WhatsApp Checkout</strong>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Truck size={14} color="var(--color-primary)" />
              </div>
              <strong style={{ color: 'var(--text-primary)' }}>Tarif Ongkir Transparan</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
