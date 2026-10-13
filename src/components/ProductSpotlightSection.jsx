import React, { useState } from 'react';
import { editorialAssets } from '../data/editorialAssets';
import { useCart } from '../context/CartContext';
import { ChevronLeft, ChevronRight, ArrowRight, Check } from 'lucide-react';

export const ProductSpotlightSection = ({ products = [] }) => {
  const { addToCart } = useCart();

  // Filter active products
  const activeProducts = products.filter((p) => p.isActive !== false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const currentProduct = activeProducts.length > 0
    ? activeProducts[currentIndex % activeProducts.length]
    : {
        id: 'prod-02',
        title_en: 'Top Resort Sleeve Shirt',
        title_id: 'Kemeja Pantai Resort Lengan Pendek',
        price: 189000,
        compareAtPrice: 249000,
        sizes: ['S', 'M', 'L', 'XL'],
        images: [editorialAssets.spotlightModel]
      };

  const colors = [
    { name: 'Sunset Terracotta', hex: '#EE592B' },
    { name: 'Midnight Charcoal', hex: '#0C131A' },
    { name: 'Breezy Linen Sand', hex: '#EAE5D9' }
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(() => (currentProduct.sizes && currentProduct.sizes[0]) || 'L');

  // Sync size when currentProduct changes
  React.useEffect(() => {
    if (currentProduct.sizes && currentProduct.sizes.length > 0) {
      if (!currentProduct.sizes.includes(selectedSize)) {
        setSelectedSize(currentProduct.sizes[0]);
      }
    }
  }, [currentProduct.id]);

  const handlePrev = () => {
    if (activeProducts.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + activeProducts.length) % activeProducts.length);
  };

  const handleNext = () => {
    if (activeProducts.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % activeProducts.length);
  };

  const handleOrderNow = () => {
    if (currentProduct) {
      addToCart(currentProduct, selectedSize, selectedColor.name, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  const formatPrice = (price) => {
    return 'IDR ' + new Intl.NumberFormat('en-US').format(price);
  };

  const title = currentProduct.title_en || currentProduct.title_id || 'Top Resort Sleeve Shirt';
  const displayImage = currentProduct.images?.[0] || editorialAssets.spotlightModel;

  return (
    <section style={{
      backgroundColor: 'var(--bg-sand)',
      color: '#0C131A',
      padding: '5.5rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
    }}>
      <div className="container" style={{
        maxWidth: '1240px',
        margin: '0 auto',
        position: 'relative'
      }}>
        {/* Top Metadata Row: Title on Left, Price & Switchers on Right */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          {/* Left: Authentic Badge & Title */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--bg-sunset)',
              marginBottom: '0.5rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.08em'
            }}>
              <span>FLAGSHIP HIGHLIGHT</span>
              <span style={{ color: '#0C131A', marginLeft: '0.3rem' }}>
                [{currentIndex + 1} OF {Math.max(activeProducts.length, 1)}]
              </span>
            </div>

            <h2 className="font-impact" style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              margin: 0,
              color: '#0C131A',
              maxWidth: '650px',
              textTransform: 'uppercase'
            }}>
              {title}
            </h2>
          </div>

          {/* Right: Price & Navigation Controls */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '1.6rem',
              fontWeight: 900,
              color: '#0C131A'
            }}>
              {formatPrice(currentProduct.price)}
            </div>
            {currentProduct.compareAtPrice && (
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(12, 19, 26, 0.4)',
                textDecoration: 'line-through',
                marginBottom: '0.85rem'
              }}>
                {formatPrice(currentProduct.compareAtPrice)}
              </div>
            )}

            <div style={{
              display: 'inline-flex',
              gap: '0.5rem',
              marginTop: currentProduct.compareAtPrice ? 0 : '0.5rem'
            }}>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous product"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(12, 19, 26, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: 'none',
                  color: '#0C131A',
                  transition: 'background-color var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(12, 19, 26, 0.16)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(12, 19, 26, 0.08)'}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next product"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-sunset)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'opacity var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Center: Image Presentation Container */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          margin: '2rem 0 3rem 0'
        }}>
          <div style={{
            maxWidth: '460px',
            width: '90%',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: '#F3EFE8'
          }}>
            <img
              src={displayImage}
              alt={title}
              style={{
                width: '100%',
                maxHeight: '520px',
                objectFit: 'cover',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </div>
        </div>

        {/* Bottom Row: Description Left, Swatches & Sizes Center, ORDER NOW Right */}
        <div style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          alignItems: 'center',
          gap: '2rem',
          borderTop: '1px solid rgba(12, 19, 26, 0.1)',
          paddingTop: '2.5rem'
        }}>
          {/* Description */}
          <div style={{
            gridColumn: 'span 5'
          }} className="spotlight-col-desc">
            <p style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              lineHeight: 1.6,
              color: 'rgba(12, 19, 26, 0.75)',
              textTransform: 'uppercase',
              margin: '0 0 0.4rem 0'
            }}>
              {currentProduct.description_en || currentProduct.description_id || 'OUR LATEST RESORT SHIRT IS A PERFECT BLEND OF TIMELESS ELEGANCE AND TROPICAL FREEDOM.'}
            </p>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--bg-sunset)',
              letterSpacing: '0.08em'
            }}>
              {currentProduct.material_en || currentProduct.material_id || '100% PURE WASHED LINEN // SOFT-DRAPE'}
            </span>
          </div>

          {/* Configurator: Swatches + Size Picker */}
          <div style={{
            gridColumn: 'span 4',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem'
          }} className="spotlight-col-swatch">
            {/* Color selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', color: 'rgba(12, 19, 26, 0.6)' }}>
                COLOR:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {colors.map((c) => {
                  const isSelected = selectedColor.name === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      aria-label={c.name}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: c.hex,
                        border: isSelected ? '2px solid #0C131A' : '1px solid rgba(0,0,0,0.2)',
                        boxShadow: isSelected ? '0 0 0 2px rgba(238, 89, 43, 0.35)' : 'none',
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                        transition: 'all var(--transition-fast)'
                      }}
                      title={c.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size selector */}
            {currentProduct.sizes && currentProduct.sizes.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', color: 'rgba(12, 19, 26, 0.6)' }}>
                  SIZE:
                </span>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {currentProduct.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        style={{
                          padding: '0.2rem 0.55rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: isSelected ? '1.5px solid #0C131A' : '1px solid rgba(12, 19, 26, 0.2)',
                          backgroundColor: isSelected ? '#0C131A' : 'transparent',
                          color: isSelected ? '#FFFFFF' : '#0C131A',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ORDER NOW Button */}
          <div style={{
            gridColumn: 'span 3',
            display: 'flex',
            justifyContent: 'flex-end'
          }} className="spotlight-col-btn">
            <button
              onClick={handleOrderNow}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: isAdded ? 'var(--badge-ready)' : '#0C131A',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                padding: '0.85rem 1.6rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                boxShadow: '0 8px 25px rgba(12, 19, 26, 0.2)'
              }}
              onMouseEnter={(e) => {
                if (!isAdded) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-sunset)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isAdded) {
                  e.currentTarget.style.backgroundColor = '#0C131A';
                  e.currentTarget.style.transform = 'none';
                }
              }}
            >
              <span>{isAdded ? 'ADDED!' : 'ORDER NOW'}</span>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                color: '#0C131A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isAdded ? <Check size={13} strokeWidth={3} /> : <ArrowRight size={13} strokeWidth={3} />}
              </div>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .spotlight-col-desc, .spotlight-col-swatch, .spotlight-col-btn {
            grid-column: span 12 !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
};
