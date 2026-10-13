import React, { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { ArrowUpRight, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export const FeaturedProductsSection = ({ products = [], onSelectProduct }) => {
  const { addToCart } = useCart();
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const formatPrice = (price) => {
    return 'IDR ' + new Intl.NumberFormat('en-US').format(price);
  };

  // Filter or show active products
  const displayProducts = products.filter(p => p.isActive !== false);

  return (
    <section id="featured-products" style={{
      backgroundColor: 'var(--bg-sunset)',
      color: '#FFFFFF',
      padding: '5rem 1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{
        maxWidth: '1300px',
        margin: '0 auto'
      }}>
        {/* Giant Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 className="font-impact" style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '0.04em',
            color: '#FFFFFF',
            margin: 0
          }}>
            FEATURED PRODUCT
          </h2>
        </div>

        {/* Horizontal Scrolling Slider */}
        <div
          ref={sliderRef}
          style={{
            display: 'flex',
            gap: '1.25rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '1.5rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="hide-scrollbar"
        >
          {displayProducts.map((product) => {
            const title = product.title_en || product.title_id;
            const image = product.images?.[0] || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80';

            return (
              <div
                key={product.id}
                style={{
                  flex: '0 0 280px',
                  scrollSnapAlign: 'start',
                  backgroundColor: '#FFFFFF',
                  color: '#0C131A',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
                  transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
                }}
              >
                {/* Product Image Area */}
                <div
                  onClick={() => onSelectProduct(product)}
                  style={{
                    position: 'relative',
                    aspectRatio: '3/4',
                    backgroundColor: '#F3EFE6',
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={image}
                    alt={title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform var(--transition-normal)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />

                  {/* Diagonal Arrow Icon on Top-Right */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0C131A'
                  }}>
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Details Footer */}
                <div style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                  gap: '0.6rem'
                }}>
                  <div>
                    <h4
                      onClick={() => onSelectProduct(product)}
                      style={{
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        color: '#0C131A',
                        margin: 0,
                        cursor: 'pointer',
                        lineHeight: 1.3
                      }}
                    >
                      {title}
                    </h4>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '0.35rem'
                    }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: 'rgba(12, 19, 26, 0.5)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}>
                        ALFAREL • {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Price & Quick Add Button */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                    paddingTop: '0.6rem'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: 900,
                        color: 'var(--bg-sunset)'
                      }}>
                        {formatPrice(product.price)}
                      </div>
                      {product.compareAtPrice && (
                        <div style={{
                          fontSize: '0.75rem',
                          color: 'rgba(12, 19, 26, 0.4)',
                          textDecoration: 'line-through'
                        }}>
                          {formatPrice(product.compareAtPrice)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        const defaultSize = product.sizes?.[0] || 'M';
                        const defaultColor = product.colors?.[0] || 'Standard';
                        addToCart(product, defaultSize, defaultColor, 1);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.45rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: '#0C131A',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'background-color var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-ticker)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0C131A'}
                    >
                      <Plus size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Arrows (< and >) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <button
            onClick={() => scroll('left')}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = 'var(--bg-sunset)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll('right')}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: 'none',
              color: 'var(--bg-sunset)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-ticker)';
              e.currentTarget.style.color = '#0C131A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = 'var(--bg-sunset)';
            }}
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
