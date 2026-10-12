import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

export const Header = ({ onOpenSearch, onOpenAdmin, searchQuery }) => {
  const { t } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 30,
      backgroundColor: 'var(--bg-glass)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--bg-muted)',
      transition: 'all var(--transition-normal)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4rem'
      }}>
        {/* Brand Logo Lockup */}
        <a href="#catalog" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
          <Logo />
        </a>

        {/* Right Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: searchQuery ? 'var(--color-seafoam-light)' : 'var(--bg-subtle)',
              border: '1px solid',
              borderColor: searchQuery ? 'var(--color-seafoam)' : 'var(--bg-muted)',
              color: searchQuery ? 'var(--color-primary)' : 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 500,
              transition: 'all var(--transition-fast)'
            }}
            title={t('search_placeholder')}
          >
            <Search size={16} />
            <span style={{ display: 'none', '@media (min-width: 640px)': { display: 'inline' } }} className="desktop-search-label">
              {searchQuery ? `"${searchQuery}"` : t('search_placeholder').slice(0, 16) + '...'}
            </span>
          </button>

          {/* Admin shortcut */}
          <button
            onClick={onOpenAdmin}
            style={{
              padding: '0.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'transparent',
              color: 'var(--text-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color var(--transition-fast)'
            }}
            title="Admin Login"
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}
          >
            <ShieldCheck size={18} />
          </button>

          {/* Cart Icon & Counter */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.55rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--bg-muted)',
              color: 'var(--text-primary)',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              e.currentTarget.style.color = 'var(--text-white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            aria-label={t('cart_title')}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                minWidth: '18px',
                height: '18px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-accent-coral)',
                color: 'var(--text-white)',
                fontSize: '0.6875rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                boxShadow: '0 2px 5px rgba(255, 107, 87, 0.4)',
                animation: 'scaleIn 150ms ease-out'
              }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
