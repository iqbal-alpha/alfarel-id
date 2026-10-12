import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { categoryBentoData } from '../data/categoryBentoData';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoryBentoGrid = ({ onSelectCategory, activeCategory }) => {
  const { lang, t } = useLanguage();

  return (
    <section style={{
      padding: '3.5rem 0 2rem',
      backgroundColor: 'var(--bg-surface)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: '0.4rem'
            }}>
              <Sparkles size={13} />
              <span>{t('bento_section_title')}</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)'
            }}>
              Koleksi Kategori Esensial
            </h2>
          </div>

          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            maxWidth: '380px',
            lineHeight: 1.5
          }}>
            {t('bento_section_subtitle')}
          </p>
        </div>

        {/* Bento Grid Showcase (Reference Image 3) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
          gap: '1.25rem'
        }}>
          {categoryBentoData.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  position: 'relative',
                  backgroundColor: cat.bgColor,
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isActive ? `2px solid var(--color-primary)` : '1px solid rgba(0, 0, 0, 0.05)',
                  boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  transition: 'all var(--transition-normal)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px'
                }}
                className="category-bento-card"
              >
                {/* Top Text Content */}
                <div style={{ padding: '1.25rem 1.25rem 0.5rem', zIndex: 2, position: 'relative' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.35rem'
                  }}>
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(255, 255, 255, 0.75)',
                      color: cat.accentColor
                    }}>
                      {cat.tag}
                    </span>

                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--text-secondary)'
                    }}>
                      {cat.itemCount} Items
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginTop: '0.25rem'
                  }}>
                    {lang === 'en' ? cat.title_en : cat.title_id}
                  </h3>

                  <p style={{
                    fontSize: '0.78125rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.15rem'
                  }}>
                    {lang === 'en' ? cat.subtitle_en : cat.subtitle_id}
                  </p>
                </div>

                {/* Image Showcase */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '150px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <img
                    src={cat.image}
                    alt={cat.title_id}
                    style={{
                      width: '80%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                      boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.08)',
                      transition: 'transform var(--transition-normal)'
                    }}
                    className="bento-image"
                    loading="lazy"
                  />
                </div>

                {/* Bottom Action Hint */}
                <div style={{
                  padding: '0.6rem 1.25rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                  borderTop: '1px solid rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)'
                }}>
                  <span>Lihat Produk</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
