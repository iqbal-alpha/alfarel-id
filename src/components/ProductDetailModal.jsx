import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { StockBadge } from './StockBadge';
import { X, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const ProductDetailModal = ({ product, onClose }) => {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(() => (product?.sizes && product.sizes[0]) || 'All Size');
  const [selectedColor, setSelectedColor] = useState(() => (product?.colors && product.colors[0]) || '');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const title = lang === 'en' ? product.title_en : product.title_id;
  const description = lang === 'en' ? product.description_en : product.description_id;
  const material = lang === 'en' ? product.material_en : product.material_id;
  const isSoldOut = product.stockStatus === 'sold_out';

  const formatPrice = (num) => new Intl.NumberFormat('id-ID').format(num);

  const handleAddToCart = () => {
    if (isSoldOut) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div className="overlay" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 110
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          position: 'relative',
          animation: 'slideUp 250ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid var(--bg-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-xs)'
          }}
          aria-label={t('close')}
        >
          <X size={18} />
        </button>

        {/* Left: Product Images Gallery */}
        <div style={{
          padding: '1.25rem',
          backgroundColor: 'var(--bg-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {/* Main Selected Image */}
          <div style={{
            width: '100%',
            paddingTop: '115%',
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            backgroundColor: '#FFF'
          }}>
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
              <StockBadge status={product.stockStatus} />
            </div>
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: '2px solid',
                    borderColor: activeImageIndex === idx ? 'var(--color-primary)' : 'transparent',
                    padding: 0,
                    flexShrink: 0
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Controls */}
        <div style={{
          padding: '1.75rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            {/* Category tag */}
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-primary)'
            }}>
              {product.category}
            </span>

            {/* Title */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginTop: '0.35rem',
              marginBottom: '0.75rem',
              lineHeight: 1.3
            }}>
              {title}
            </h2>

            {/* Price section */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.75rem',
              marginBottom: '1.25rem'
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--color-primary)'
              }} className="price-nums">
                {t('currency')} {formatPrice(product.price)}
              </span>

              {product.compareAtPrice && (
                <span style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-tertiary)',
                  textDecoration: 'line-through'
                }} className="price-nums">
                  {t('currency')} {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Size Picker */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {t('select_size')}
                  </label>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                    {selectedSize}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        style={{
                          minWidth: '42px',
                          padding: '0.4rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1.5px solid',
                          borderColor: isSelected ? 'var(--color-primary)' : 'var(--bg-muted)',
                          backgroundColor: isSelected ? 'var(--color-seafoam-light)' : 'var(--bg-surface)',
                          color: isSelected ? 'var(--color-primary)' : 'var(--text-primary)',
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '0.875rem',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Option (if any) */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  {t('select_color')}
                </label>
                <div style={{ display: 'flex', gap: '0.45rem' }}>
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid',
                        borderColor: selectedColor === c ? 'var(--color-primary)' : 'var(--bg-muted)',
                        backgroundColor: selectedColor === c ? 'var(--color-primary)' : 'var(--bg-subtle)',
                        color: selectedColor === c ? 'var(--text-white)' : 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description & Material */}
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '1rem',
              paddingTop: '0.75rem',
              borderTop: '1px dashed var(--bg-muted)'
            }}>
              <p style={{ marginBottom: '0.5rem' }}>{description}</p>
              {material && (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                  <strong>{t('material')}</strong> {material}
                </p>
              )}
            </div>
          </div>

          {/* Quantity & Add to Cart Controls */}
          <div style={{
            paddingTop: '1rem',
            borderTop: '1px solid var(--bg-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.875rem'
          }}>
            {/* Quantity Adjuster */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--bg-muted)',
              backgroundColor: 'var(--bg-subtle)'
            }}>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: 700
                }}
              >
                -
              </button>
              <span style={{
                minWidth: '28px',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}>
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: 700
                }}
              >
                +
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isSoldOut}
              className={`btn ${isAdded ? 'btn-coral' : 'btn-primary'}`}
              style={{
                flex: 1,
                padding: '0.75rem 1.25rem',
                fontSize: '0.95rem',
                opacity: isSoldOut ? 0.6 : 1,
                cursor: isSoldOut ? 'not-allowed' : 'pointer'
              }}
            >
              {isAdded ? (
                <>
                  <Check size={18} />
                  <span>Ditambahkan! 🤙</span>
                </>
              ) : isSoldOut ? (
                <span>{t('out_of_stock')}</span>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>{t('add_to_cart')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
