import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowDown, MessageCircle, Sparkles, Wind, Truck, Compass, Search, ChevronRight } from 'lucide-react';

export const HeroBanner = ({ onExploreClick, onQuickSearch, categories = [] }) => {
  const { lang, t } = useLanguage();
  const [localQuery, setLocalQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (onQuickSearch) {
      onQuickSearch({ query: localQuery, category: selectedCat });
    }
  };

  return (
    <section style={{
      position: 'relative',
      padding: '3rem 0 3.5rem',
      background: 'linear-gradient(180deg, rgba(246, 242, 235, 0.7) 0%, rgba(251, 249, 245, 1) 100%)',
      borderBottom: '1px solid var(--bg-muted)',
      overflow: 'hidden'
    }}>
      {/* Subtle organic ambient atmosphere glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        backgroundColor: 'rgba(98, 182, 168, 0.09)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '-5%',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        backgroundColor: 'rgba(231, 101, 80, 0.05)',
        filter: 'blur(70px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Main 2-Column Split Hero Layout (Reference Image 1 & 2) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          alignItems: 'center',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Left Column: Copy & CTAs & Quick Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Top Season Badge */}
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
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              border: '1px solid rgba(98, 182, 168, 0.3)'
            }}>
              <Compass size={14} color="var(--color-primary)" />
              <span>{t('hero_badge')}</span>
            </div>

            {/* Display Headline */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5.2vw, 4.25rem)',
              fontWeight: 800,
              lineHeight: 1.06,
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
              maxWidth: '560px',
              marginBottom: '1.75rem'
            }}>
              {t('hero_subtitle')}
            </p>

            {/* Action CTA Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.85rem',
              marginBottom: '2rem',
              width: '100%'
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

            {/* Integrated Quick Search & Filter Card (Reference Image 2) */}
            <div style={{
              width: '100%',
              maxWidth: '540px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '1.15rem 1.25rem',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid rgba(0, 0, 0, 0.06)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem'
              }}>
                <Search size={15} color="var(--color-primary)" />
                <span>Pencarian Cepat Pakaian Pantai</span>
              </div>

              <form onSubmit={handleQuickSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '0.65rem'
                }}>
                  {/* Search Input */}
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={localQuery}
                      onChange={(e) => setLocalQuery(e.target.value)}
                      placeholder={t('quick_search_placeholder')}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.875rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--bg-muted)',
                        backgroundColor: 'var(--bg-subtle)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Category Select Dropdown */}
                  <div>
                    <select
                      value={selectedCat}
                      onChange={(e) => setSelectedCat(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.875rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--bg-muted)',
                        backgroundColor: 'var(--bg-subtle)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="all">Semua Kategori</option>
                      {categories.filter(c => c.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {lang === 'en' ? cat.name_en : cat.name_id}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-sm)',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Search size={15} />
                  <span>{t('quick_search_btn')}</span>
                  <ChevronRight size={15} />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: High-Fashion Coastal Lifestyle Model (Reference Image 1) */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Visual Framing Container */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '460px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              backgroundColor: '#EDE8DF',
              border: '1px solid rgba(255, 255, 255, 0.8)'
            }}>
              {/* Lifestyle Image */}
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                alt="AlfaREL Coastal Apparel Model"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '4 / 5',
                  objectFit: 'cover',
                  display: 'block'
                }}
                loading="eager"
              />

              {/* Floating Bottom Badge */}
              <div style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                right: '1.25rem',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1.15rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.6)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-seafoam-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)'
                  }}>
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Summer Resort 2026 Drop
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      100% Breathable Organic Cotton & Linen
                    </div>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}>
                  New
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Value Props Row with Vector Icons (No Emojis) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          width: '100%',
          paddingTop: '2rem',
          borderTop: '1px solid var(--bg-muted)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--bg-muted)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-seafoam-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Wind size={18} color="var(--color-primary)" />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>100% Breathable Fabric</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Linen & katun sejuk anti gerah</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--bg-muted)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-seafoam-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <MessageCircle size={18} color="var(--color-primary)" />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Fast WhatsApp Checkout</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Tanpa registrasi & tanpa fee admin</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--bg-muted)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-seafoam-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Truck size={18} color="var(--color-primary)" />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Ongkir Transparan</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Jabodetabek 10k · Jawa 18k · Luar 30k</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
