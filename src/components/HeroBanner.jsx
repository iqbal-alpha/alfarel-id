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
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid var(--bg-muted)',
      overflow: 'hidden',
      paddingTop: '2.5rem'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Seamless Wide 2-Column Split Hero (Exact Match Reference Image 1 & 2) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {/* Left Column: Minimalist Editorial Typography & CTAs */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingBottom: '2.5rem',
            paddingTop: '1rem',
            maxWidth: '560px'
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
              SUMMER 2026
            </span>

            {/* Display Headline - High Impact & Wide */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: 'var(--text-primary)',
              marginBottom: '1.25rem'
            }}>
              Wear The{' '}
              <span style={{ color: 'var(--color-primary)' }}>
                Vacation Feeling
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.125rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: '2rem',
              maxWidth: '500px'
            }}>
              {t('hero_subtitle')}
            </p>

            {/* Dual Action CTAs (Reference Image 1: Primary filled + Secondary outline) */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2.25rem'
            }}>
              <button
                onClick={onExploreClick}
                className="btn btn-primary"
                style={{
                  padding: '0.85rem 2rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: '#0284C7',
                  borderColor: '#0284C7',
                  color: '#FFFFFF'
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
                  padding: '0.85rem 1.75rem',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-xs)',
                  borderColor: '#CBD5E1',
                  color: 'var(--text-primary)'
                }}
              >
                <MessageCircle size={16} color="var(--color-primary)" />
                <span>{t('hero_fast_order')}</span>
              </a>
            </div>

            {/* Mobile / Quick Search & Filter Card (Reference Image 2) */}
            <div style={{
              width: '100%',
              backgroundColor: '#F8FAFC',
              borderRadius: 'var(--radius-sm)',
              padding: '1.15rem 1.25rem',
              border: '1px solid #E2E8F0',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.78125rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
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

          {/* Right Column: Seamless Edge-to-Edge Cutout Fashion Model (Reference Image 1) */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            position: 'relative',
            minHeight: '440px',
            overflow: 'hidden'
          }}>
            {/* The model image with NO box, NO borders, completely seamless with white canvas */}
            <img
              src="/images/hero-model.jpg"
              alt="AlfaREL.ID Resort Fashion Model"
              style={{
                width: 'auto',
                maxWidth: '100%',
                maxHeight: 'clamp(420px, 50vw, 620px)',
                objectFit: 'contain',
                display: 'block',
                mixBlendMode: 'multiply',
                filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.05))',
                transform: 'scale(1.02)',
                transformOrigin: 'bottom center'
              }}
              loading="eager"
            />
          </div>
        </div>

        {/* Value Props Row with Vector Icons (No Emojis) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          width: '100%',
          padding: '2rem 0',
          borderTop: '1px solid var(--bg-muted)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#FAFAFA',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid #E2E8F0'
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
            backgroundColor: '#FAFAFA',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid #E2E8F0'
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
            backgroundColor: '#FAFAFA',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid #E2E8F0'
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
