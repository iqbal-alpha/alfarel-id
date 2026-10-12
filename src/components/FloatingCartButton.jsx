import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const FloatingCartButton = () => {
  const { t } = useLanguage();
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  if (totalItems === 0) return null;

  const formatPrice = (num) => new Intl.NumberFormat('id-ID').format(num);

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.25rem',
      right: '1.25rem',
      zIndex: 50,
      animation: 'slideUp 250ms cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <button
        onClick={() => setIsCartOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--text-white)',
          boxShadow: 'var(--shadow-floating)',
          border: '2px solid rgba(255, 255, 255, 0.25)',
          transition: 'all var(--transition-fast)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.backgroundColor = 'var(--color-primary)';
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <ShoppingBag size={20} />
          <span style={{
            position: 'absolute',
            top: '-8px',
            right: '-10px',
            backgroundColor: 'var(--color-accent-coral)',
            color: 'var(--text-white)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.6875rem',
            fontWeight: 800,
            padding: '0 5px',
            lineHeight: '17px',
            border: '1.5px solid var(--text-white)'
          }}>
            {totalItems}
          </span>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          lineHeight: 1.15
        }}>
          <span style={{ fontSize: '0.6875rem', opacity: 0.85, fontWeight: 500 }}>
            {totalItems} {t('cart_items')}
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '0.95rem'
          }} className="price-nums">
            {t('currency')} {formatPrice(subtotal)}
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          marginLeft: '0.25rem'
        }}>
          <ArrowRight size={14} />
        </div>
      </button>
    </div>
  );
};
