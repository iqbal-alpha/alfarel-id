import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { StockBadge } from './StockBadge';
import { ShoppingBag, Eye } from 'lucide-react';

export const ProductCard = ({ product, onSelectProduct, onQuickAdd }) => {
  const { lang, t } = useLanguage();

  const title = lang === 'en' ? product.title_en : product.title_id;
  const isSoldOut = product.stockStatus === 'sold_out';

  const formatPrice = (num) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--bg-muted)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all var(--transition-normal)',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.borderColor = 'var(--color-seafoam)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'var(--bg-muted)';
      }}
    >
      {/* Product Image Area with 4:5 Aspect Ratio */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '120%', /* 4:5 Aspect Ratio approximately */
        backgroundColor: 'var(--bg-subtle)',
        overflow: 'hidden'
      }}>
        <img
          src={product.images[0]}
          alt={title}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
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

        {/* Quick Sizes Pill Overlay at Bottom of Image */}
        {product.sizes && product.sizes.length > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '0.5rem',
            left: '0.5rem',
            right: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.3rem',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            color: 'var(--text-secondary)'
          }}>
            {product.sizes.map((s) => (
              <span key={s} style={{ padding: '0 2px' }}>{s}</span>
            ))}
          </div>
        )}
      </div>

      {/* Card Info Content */}
      <div style={{
        padding: '0.875rem 1rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Category mini label */}
          <span style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--color-primary)'
          }}>
            {product.category}
          </span>

          {/* Title */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.95rem',
            fontWeight: 700,
            lineHeight: 1.35,
            color: 'var(--text-primary)',
            marginTop: '0.2rem',
            marginBottom: '0.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {title}
          </h3>
        </div>

        {/* Price & Action Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '0.5rem',
          paddingTop: '0.5rem',
          borderTop: '1px dashed var(--bg-muted)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: 'var(--text-primary)'
              }} className="price-nums">
                {t('currency')} {formatPrice(product.price)}
              </span>
            </div>

            {product.compareAtPrice && (
              <span style={{
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                textDecoration: 'line-through'
              }} className="price-nums">
                {t('currency')} {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Quick Action Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isSoldOut) {
                onQuickAdd(product);
              } else {
                onSelectProduct(product);
              }
            }}
            disabled={isSoldOut}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isSoldOut ? 'var(--bg-muted)' : 'var(--color-primary)',
              color: isSoldOut ? 'var(--text-tertiary)' : 'var(--text-white)',
              boxShadow: isSoldOut ? 'none' : 'var(--shadow-sm)',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              if (!isSoldOut) {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSoldOut) {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
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
