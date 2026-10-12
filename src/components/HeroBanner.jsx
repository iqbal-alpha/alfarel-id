import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowDown, MessageCircle, Wind, Truck, Search, ChevronRight } from 'lucide-react';

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
      backgroundColor: '#ADD2C1', // Exact matching pastel seafoam green canvas
      borderBottom: '1px solid rgba(19, 53, 42, 0.1)',
      overflow: 'hidden',
      padding: '3rem 0 2rem'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Main 2-Column Split Hero Layout (Matching User Reference Image) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
          alignItems: 'center',
          gap: '2.5rem',
          marginBottom: '2rem'
        }}>
          {/* Left Column: Typography, CTAs & Quick Search */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxWidth: '560px',
            zIndex: 2
          }}>
            {/* Season Tag - Exactly like Reference: "SUMMER 2026" */}
            <span style={{
              color: '#0284C7',
              fontSize: '0.8125rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              display: 'inline-block'
            }}>
              {t('hero_badge')}
            </span>

            {/* Display Headline - High Impact & Bold */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5.2vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#13352A',
              marginBottom: '1.25rem'
            }}>
              {t('hero_title_1')}{' '}
              <span style={{ color: '#16535F' }}>
                {t('hero_title_highlight')}
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.125rem)',
              color: '#224B3E',
              lineHeight: 1.65,
              marginBottom: '2rem',
              maxWidth: '520px'
            }}>
              {t('hero_subtitle')}
            </p>

            {/* Action CTAs (Reference: Vibrant Primary + Subtle Secondary) */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <button
                onClick={onExploreClick}
                className="btn btn-primary"
                style={{
                  padding: '0.85rem 2rem',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  borderRadius: '6px',
                  backgroundColor: '#0284C7',
                  borderColor: '#0284C7',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                  textTransform: 'uppercase'
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
                  padding: '0.85rem 1.65rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.88)',
                  borderColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#13352A',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
              >
                <MessageCircle size={16} color="#0284C7" />
                <span>{t('hero_fast_order')}</span>
              </a>
            </div>

            {/* Quick Search & Filter Box */}
            <div style={{
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.15rem 1.25rem',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 8px 24px rgba(19, 53, 42, 0.08)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.78125rem',
                fontWeight: 700,
                color: '#13352A',
                marginBottom: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                <Search size={14} color="#0284C7" />
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
                  <input
                    type="text"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    placeholder={t('quick_search_placeholder')}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.875rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />

                  {/* Category Dropdown */}
                  <select
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.875rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
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

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-xs)',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#0284C7',
                    borderColor: '#0284C7'
                  }}
                >
                  <Search size={15} />
                  <span>{t('quick_search_btn')}</span>
                  <ChevronRight size={15} />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Circular Portal Breakout Composition (Exact Reference Image Match) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            minHeight: '460px'
          }}>
            {/* Floating Decorative Color Dots (Reference Image Details) */}
            <div style={{
              position: 'absolute',
              top: '8%',
              left: '4%',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#FFE3E3', // Soft pastel pink dot
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
              zIndex: 3
            }} />

            <div style={{
              position: 'absolute',
              bottom: '12%',
              left: '8%',
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              backgroundColor: '#7C3AED', // Purple accent dot
              zIndex: 3
            }} />

            <div style={{
              position: 'absolute',
              top: '36%',
              right: '6%',
              width: '13px',
              height: '13px',
              borderRadius: '50%',
              backgroundColor: '#7C3AED', // Purple accent dot
              zIndex: 3
            }} />

            <div style={{
              position: 'absolute',
              bottom: '22%',
              right: '5%',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#FFE3E3', // Soft pastel pink dot
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
              zIndex: 3
            }} />

            {/* Circular Breakout Model Image */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '520px'
            }}>
              <img
                src="/images/hero-model-circle.jpg"
                alt="AlfaREL.ID Resort Fashion Model"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 'clamp(380px, 46vw, 540px)',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 16px 28px rgba(19, 53, 42, 0.12))'
                }}
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Value Props Row with Vector Icons (No Emojis) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          width: '100%',
          paddingTop: '1.75rem',
          borderTop: '1px solid rgba(19, 53, 42, 0.12)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            boxShadow: '0 2px 8px rgba(19, 53, 42, 0.04)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(2, 132, 199, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Wind size={18} color="#0284C7" />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#13352A' }}>100% Breathable Fabric</div>
              <div style={{ fontSize: '0.72rem', color: '#3A6355' }}>Linen & katun sejuk anti gerah</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            boxShadow: '0 2px 8px rgba(19, 53, 42, 0.04)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(2, 132, 199, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <MessageCircle size={18} color="#0284C7" />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#13352A' }}>Fast WhatsApp Checkout</div>
              <div style={{ fontSize: '0.72rem', color: '#3A6355' }}>Tanpa registrasi & tanpa fee admin</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            boxShadow: '0 2px 8px rgba(19, 53, 42, 0.04)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(2, 132, 199, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Truck size={18} color="#0284C7" />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#13352A' }}>Ongkir Transparan</div>
              <div style={{ fontSize: '0.72rem', color: '#3A6355' }}>Jabodetabek 10k · Jawa 18k · Luar 30k</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
