import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';

export const CartDrawer = () => {
  const { lang, t } = useLanguage();
  const {
    items,
    totalItems,
    subtotal,
    orderNote,
    setOrderNote,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  React.useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const formatPrice = (num) => new Intl.NumberFormat('en-US').format(num);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="overlay" onClick={() => setIsCartOpen(false)} style={{ zIndex: 120 }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'var(--bg-surface)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 130,
          animation: 'slideRight 250ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--bg-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} color="var(--color-primary)" />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              fontWeight: 800,
              color: 'var(--text-primary)'
            }}>
              {t('cart_title')} ({totalItems})
            </h2>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close shopping cart"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: 'none',
              background: 'none'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem 1.5rem'
        }}>
          {items.length === 0 ? (
            /* Empty State */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '4rem 1rem',
              gap: '1rem'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-sand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                marginBottom: '0.25rem'
              }}>
                <ShoppingBag size={28} strokeWidth={1.5} />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}>
                {t('cart_empty_title')}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '280px' }}>
                {t('cart_empty_desc')}
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn btn-primary"
                style={{ marginTop: '0.5rem' }}
              >
                <span>{t('hero_cta')}</span>
              </button>
            </div>
          ) : (
            /* Cart Items List */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map((item) => {
                const title = item.title_en || item.title_id;
                return (
                  <div
                    key={item.cartItemId}
                    style={{
                      display: 'flex',
                      gap: '0.875rem',
                      padding: '0.875rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--bg-muted)'
                    }}
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={title}
                      style={{
                        width: '70px',
                        height: '84px',
                        borderRadius: 'var(--radius-sm)',
                        objectFit: 'cover',
                        flexShrink: 0
                      }}
                    />

                    {/* Item Details */}
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            lineHeight: 1.25,
                            paddingRight: '0.5rem'
                          }}>
                            {title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            style={{
                              color: 'var(--text-tertiary)',
                              padding: '0.2rem',
                              transition: 'color var(--transition-fast)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-coral)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}
                            title="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Size & Color Tag */}
                        <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.25rem' }}>
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            padding: '0.1rem 0.45rem',
                            borderRadius: 'var(--radius-xs)',
                            backgroundColor: 'var(--bg-surface)',
                            color: 'var(--text-secondary)'
                          }}>
                            {t('cart_size')} {item.size}
                          </span>
                          {item.color && (
                            <span style={{
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              padding: '0.1rem 0.45rem',
                              borderRadius: 'var(--radius-xs)',
                              backgroundColor: 'var(--bg-surface)',
                              color: 'var(--text-secondary)'
                            }}>
                              {item.color}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '0.5rem'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--bg-surface)',
                          border: '1px solid var(--bg-muted)'
                        }}>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, -1)}
                            style={{
                              width: '26px',
                              height: '26px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.9rem'
                            }}
                          >
                            -
                          </button>
                          <span style={{
                            minWidth: '22px',
                            textAlign: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 700
                          }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, 1)}
                            style={{
                              width: '26px',
                              height: '26px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.9rem'
                            }}
                          >
                            +
                          </button>
                        </div>

                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '0.925rem',
                          color: 'var(--color-primary)'
                        }} className="price-nums">
                          {t('currency')} {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Order Notes Field */}
              <div style={{ marginTop: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.35rem'
                }}>
                  {t('cart_note_label')}
                </label>
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder={t('cart_note_placeholder')}
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--bg-muted)',
                    backgroundColor: 'var(--bg-subtle)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-primary)',
                    resize: 'none',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Clear Cart Button */}
              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={clearCart}
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                    textDecoration: 'underline'
                  }}
                >
                  {t('cart_clear')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer / Subtotal & Checkout */}
        {items.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--bg-muted)',
            backgroundColor: 'var(--bg-surface)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {t('cart_subtotal')}
              </span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--text-primary)'
              }} className="price-nums">
                {t('currency')} {formatPrice(subtotal)}
              </span>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="btn btn-whatsapp"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem'
              }}
            >
              <MessageCircle size={20} />
              <span>{t('cart_checkout_btn')}</span>
              <ArrowRight size={18} />
            </button>

            <p style={{
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginTop: '0.65rem',
              letterSpacing: '0.01em'
            }}>
              Transaksi langsung ke WhatsApp resmi · Bebas biaya admin marketplace
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
