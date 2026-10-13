import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { StockBadge } from './StockBadge';
import { ShoppingBag, Eye, ArrowRight } from 'lucide-react';

export const ProductCard = ({ product, onSelectProduct, onQuickAdd }) => {
  const { lang, t } = useLanguage();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const title = product.title_en || product.title_id;
  const material = product.material_en || product.material_id;
  const isSoldOut = product.stockStatus === 'sold_out';

  const formatPrice = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const categoryLabels = {
    shirts: 'Linen Beach Shirts',
    boardshorts: 'Boardshorts & Trunks',
    tees: 'Oversized Beach Tees',
    accessories: 'Beach Accessories'
  };

  return (
    <div
      role="article"
      tabIndex={0}
      aria-label={`View ${title}`}
      onClick={() => onSelectProduct(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectProduct(product);
        }
      }}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--bg-muted)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 280ms cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        boxShadow: 'var(--shadow-sm)'
      }}
      className="product-card-hover"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.borderColor = 'rgba(98, 182, 168, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'var(--bg-muted)';
      }}
    >
      {/* 3:4 Tall Portrait Image Area (Reference Image 4) */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '133%', /* 3:4 Tall Aspect Ratio */
        backgroundColor: '#F3EFE8',
        overflow: 'hidden'
      }}>
        <img
          src={product.images[selectedImageIdx] || product.images[0]}
          alt={title}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="product-card-img"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Floating Stock Badge */}
        <div style={{
          position: 'absolute',
          top: '0.65rem',
          left: '0.65rem',
          zIndex: 2
        }}>
          <StockBadge status={product.stockStatus} />
        </div>

        {/* Discount Badge if compareAtPrice exists */}
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <div style={{
            position: 'absolute',
            top: '0.65rem',
            right: '0.65rem',
            zIndex: 2,
            backgroundColor: 'var(--color-accent-coral)',
            color: '#FFFFFF',
            fontSize: '0.6875rem',
            fontWeight: 800,
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-full)',
            letterSpacing: '0.02em'
          }}>
            SALE
          </div>
        )}

        {/* Sizes Pill Strip Overlay */}
        {product.sizes && product.sizes.length > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '0.5rem',
            left: '0.5rem',
            right: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            color: 'var(--text-secondary)'
          }}>
            {product.sizes.slice(0, 4).map((s) => (
              <span key={s} style={{ padding: '0 2px' }}>{s}</span>
            ))}
          </div>
        )}
      </div>

      {/* Card Info Content (Reference Image 4 Layout) */}
      <div style={{
        padding: '1rem 1.1rem 1.15rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Category Department Tag */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.25rem'
          }}>
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-primary)'
            }}>
              {categoryLabels[product.category] || product.category}
            </span>

            {/* Quick stock status text */}
            <span style={{
              fontSize: '0.6875rem',
              color: 'var(--text-tertiary)'
            }}>
              {product.stockStatus === 'ready' ? (lang === 'en' ? 'Ready to Ship' : 'Siap Kirim') : ''}
            </span>
          </div>

          {/* Product Title */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.975rem',
            fontWeight: 700,
            lineHeight: 1.35,
            color: 'var(--text-primary)',
            marginBottom: '0.35rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {title}
          </h3>

          {/* Material Subtitle */}
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)',
            marginBottom: '0.65rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {material}
          </p>

          {/* Color Swatch Dots (Reference Image 4) */}
          {product.colorHexes && product.colorHexes.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              marginBottom: '0.75rem'
            }}>
              {product.colorHexes.map((hex, idx) => (
                <span
                  key={idx}
                  style={{
                    width: '13px',
                    height: '13px',
                    borderRadius: '50%',
                    backgroundColor: hex,
                    border: '1.5px solid #FFFFFF',
                    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.18)',
                    display: 'inline-block'
                  }}
                  title={product.colors?.[idx] || ''}
                />
              ))}
              <span style={{
                fontSize: '0.6875rem',
                color: 'var(--text-tertiary)',
                marginLeft: '0.2rem'
              }}>
                {product.colors?.length} {lang === 'en' ? (product.colors?.length === 1 ? 'color' : 'colors') : 'warna'}
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Add-to-Cart Action */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.65rem',
          borderTop: '1px solid var(--bg-muted)',
          marginTop: '0.25rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: 'var(--color-primary)'
              }} className="price-nums">
                {t('currency')} {formatPrice(product.price)}
              </span>
            </div>

            {product.compareAtPrice && (
              <span style={{
                fontSize: '0.72rem',
                color: 'var(--text-tertiary)',
                textDecoration: 'line-through'
              }} className="price-nums">
                {t('currency')} {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Quick Action Button (>= 44x44px touch target) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!isSoldOut) {
                onQuickAdd(product);
              } else {
                onSelectProduct(product);
              }
            }}
            disabled={isSoldOut}
            aria-label={isSoldOut ? `View details for ${title}` : `Add ${title} to Cart`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '44px',
              minHeight: '44px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isSoldOut ? 'var(--bg-muted)' : 'var(--color-seafoam-light)',
              color: isSoldOut ? 'var(--text-tertiary)' : 'var(--color-primary)',
              border: '1px solid',
              borderColor: isSoldOut ? 'transparent' : 'rgba(98, 182, 168, 0.4)',
              cursor: isSoldOut ? 'default' : 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              if (!isSoldOut) {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSoldOut) {
                e.currentTarget.style.backgroundColor = 'var(--color-seafoam-light)';
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
            title={isSoldOut ? t('out_of_stock') : t('add_to_cart')}
          >
            {isSoldOut ? <Eye size={16} /> : <ShoppingBag size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};
