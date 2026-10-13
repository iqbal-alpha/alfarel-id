import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, ShieldCheck, ArrowRight, Menu, X } from 'lucide-react';

export const Header = ({ onOpenSearch, onOpenAdmin, searchQuery }) => {
  const { t } = useLanguage();
  const { totalItems = 0, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'PRODUCTS', href: '#featured-products' },
    { label: 'COLLECTIONS', href: '#top-collection' },
    { label: 'ABOUT', href: '#about-section' },
    { label: 'CURATIONS', href: '#curations-section' },
    { label: 'CATALOG', href: '#catalog' }
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backgroundColor: 'rgba(12, 19, 26, 0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      transition: 'all var(--transition-normal)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4.5rem',
        padding: '0 1.5rem'
      }}>
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            className="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Brand Logo Lockup */}
          <a href="#" style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            gap: '0.2rem'
          }}>
            <span className="font-impact" style={{
              fontSize: '1.9rem',
              color: '#FFFFFF',
              letterSpacing: '0.06em'
            }}>
              ALFAREL
            </span>
            <span style={{
              color: 'var(--bg-ticker)',
              fontSize: '1.2rem',
              fontWeight: 900
            }}>
              .ID
            </span>
          </a>
        </div>

        {/* Center Navigation Links (Editorial Reference) */}
        <nav style={{
          display: 'none',
          gap: '2.5rem',
          alignItems: 'center'
        }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: 'rgba(255, 255, 255, 0.75)',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bg-ticker)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Icons & ORDER NOW Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label={t('search_placeholder')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: searchQuery ? 'rgba(227, 249, 52, 0.15)' : 'rgba(255, 255, 255, 0.08)',
              border: '1px solid',
              borderColor: searchQuery ? 'var(--bg-ticker)' : 'rgba(255, 255, 255, 0.12)',
              color: searchQuery ? 'var(--bg-ticker)' : '#FFFFFF',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            title={t('search_placeholder')}
          >
            <Search size={18} />
          </button>

          {/* Admin shortcut */}
          <button
            onClick={onOpenAdmin}
            aria-label="Admin Login"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'color var(--transition-fast)'
            }}
            title="Admin Login"
            onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
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
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            }}
            aria-label={t('cart_title')}
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                minWidth: '18px',
                height: '18px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-sunset)',
                color: '#FFFFFF',
                fontSize: '0.6875rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                boxShadow: '0 2px 5px rgba(238, 89, 43, 0.4)'
              }}>
                {totalItems}
              </span>
            )}
          </button>

          {/* Yellow ORDER NOW Pill Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="order-now-desktop-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--bg-ticker)',
              color: '#0C131A',
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform var(--transition-fast), filter var(--transition-fast)',
              boxShadow: '0 4px 15px rgba(227, 249, 52, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
              e.currentTarget.style.filter = 'brightness(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.filter = 'none';
            }}
          >
            <span>ORDER NOW</span>
            <div style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: '#0C131A',
              color: 'var(--bg-ticker)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ArrowRight size={12} strokeWidth={3} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div style={{
          backgroundColor: '#0A0E13',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              style={{
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                padding: '0.4rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        .mobile-nav-toggle {
          display: flex;
        }
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
        @media (max-width: 520px) {
          .order-now-desktop-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
