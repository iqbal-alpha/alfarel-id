import React, { useState, useMemo, useRef } from 'react';
import { useLanguage } from './i18n/LanguageContext';
import { useCart } from './context/CartContext';
import { initialProducts, initialCategories, initialStoreSettings } from './data/mockProducts';

import { Header } from './components/Header';
import { MarqueeTicker } from './components/MarqueeTicker';
import { EditorialHero } from './components/EditorialHero';
import { AboutSection } from './components/AboutSection';
import { TopCollectionSection } from './components/TopCollectionSection';
import { FeaturedProductsSection } from './components/FeaturedProductsSection';
import { EditorialMoodGallery } from './components/EditorialMoodGallery';
import { CuratedBrandsSection } from './components/CuratedBrandsSection';
import { ProductSpotlightSection } from './components/ProductSpotlightSection';
import { NextDropBanner } from './components/NextDropBanner';
import { PhilosophyFooterSection } from './components/PhilosophyFooterSection';

import { CategoryFilter } from './components/CategoryFilter';
import { SearchBar } from './components/SearchBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingCartButton } from './components/FloatingCartButton';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';

import { Sparkles, Search } from 'lucide-react';

export function MainStore() {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();

  const [products, setProducts] = useState(initialProducts);
  const [categories] = useState(initialCategories);
  const [storeSettings, setStoreSettings] = useState(initialStoreSettings);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdminView, setIsAdminView] = useState(false);

  React.useEffect(() => {
    if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
      setIsAdminView(true);
    }
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminView(true);
      } else if (window.location.hash === '') {
        setIsAdminView(false);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const searchInputRef = useRef(null);

  // Filter products by category, active status, and search query
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (!item.isActive) return false;

      // Category check
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Keyword Search check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const title = (lang === 'en' ? item.title_en : item.title_id).toLowerCase();
        const desc = (lang === 'en' ? item.description_en : item.description_id).toLowerCase();
        const mat = (lang === 'en' ? item.material_en : item.material_id).toLowerCase();
        const cat = item.category.toLowerCase();

        return (
          title.includes(query) ||
          desc.includes(query) ||
          mat.includes(query) ||
          cat.includes(query)
        );
      }

      return true;
    });
  }, [products, activeCategory, searchQuery, lang]);

  // Category item counts
  const categoryCounts = useMemo(() => {
    const counts = { all: products.filter((p) => p.isActive).length };
    products.forEach((p) => {
      if (p.isActive) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const handleOpenSearchFocus = () => {
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 300);
  };

  const handleSelectCuratedCategory = (catId) => {
    setActiveCategory(catId);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-sand)' }}>
      {/* 1. Sticky Editorial Header (referensi.webp) */}
      <Header
        onOpenSearch={handleOpenSearchFocus}
        onOpenAdmin={() => setIsAdminView(true)}
        searchQuery={searchQuery}
      />

      {/* Main Content: Admin View or 11-Section Editorial Store View */}
      {isAdminView ? (
        <AdminPanel
          products={products}
          setProducts={setProducts}
          categories={categories}
          storeSettings={storeSettings}
          setStoreSettings={setStoreSettings}
          onClose={() => {
            setIsAdminView(false);
            if (window.location.hash === '#admin') {
              window.history.pushState(null, '', window.location.pathname);
            }
          }}
        />
      ) : (
        <main style={{ flex: 1 }}>
          {/* Section 1: Giant Condensed Hero (referensi.webp Hero) */}
          <EditorialHero />

          {/* Section 2: Animated Marquee Ticker Banner (referensi.webp Ticker) */}
          <MarqueeTicker />

          {/* Section 3: About AlfaREL Section (referensi.webp About) */}
          <AboutSection />

          {/* Section 4: Our Top Collection Numbered Cards [001] & [002] (referensi.webp) */}
          <TopCollectionSection />

          {/* Section 5: Featured Product Carousel in Terracotta (#EE592B) (referensi.webp) */}
          <FeaturedProductsSection
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />

          {/* Section 6: Editorial Mood Gallery with Ghost Typography (referensi.webp) */}
          <EditorialMoodGallery />

          {/* Section 7: Our Best Curations List with Interactive Floating Preview (referensi.webp) */}
          <CuratedBrandsSection
            onSelectCategory={handleSelectCuratedCategory}
          />

          {/* Section 8: Spotlight Product Configurator with Color Swatches (referensi.webp) */}
          <ProductSpotlightSection
            products={products}
          />

          {/* Section 9: Next Drop Banner (referensi.webp) */}
          <NextDropBanner />

          {/* Section 10: Instant Search & Full E-Commerce Catalog Grid */}
          <section id="catalog" style={{
            padding: '5rem 1.5rem',
            backgroundColor: 'var(--bg-sand)',
            borderTop: '1px solid rgba(0,0,0,0.06)'
          }}>
            <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--bg-sunset)',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    <Sparkles size={14} />
                    <span>ALFAREL FULL E-CATALOG</span>
                  </div>
                  <h2 className="font-impact" style={{
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                    color: '#0C131A',
                    margin: '0.3rem 0 0 0'
                  }}>
                    EXPLORE ALL VACATION PIECES
                  </h2>
                </div>

                {/* Instant Search Bar */}
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  inputRef={searchInputRef}
                />
              </div>

              {/* Category Filter Chips */}
              <div style={{ marginBottom: '2.5rem' }}>
                <CategoryFilter
                  categories={categories}
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  counts={categoryCounts}
                />
              </div>

              {/* Search Result Status Banner */}
              {searchQuery && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(238, 89, 43, 0.08)',
                  border: '1px solid rgba(238, 89, 43, 0.2)',
                  marginBottom: '2rem',
                  fontSize: '0.875rem'
                }}>
                  <span>
                    <strong>{filteredProducts.length}</strong> {t('search_results')} "<strong>{searchQuery}</strong>"
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--bg-sunset)',
                      fontWeight: 800,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {t('search_reset')}
                  </button>
                </div>
              )}

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div style={{
                  padding: '5rem 1rem',
                  textAlign: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.08)'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-sand)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    color: 'var(--text-tertiary)'
                  }}>
                    <Search size={26} strokeWidth={1.5} />
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#0C131A',
                    marginTop: '1.25rem',
                    marginBottom: '0.5rem'
                  }}>
                    {t('search_no_results')}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Try searching with terms like "linen", "shirt", "boardshorts", or reset your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="btn btn-primary"
                  >
                    <span>{t('search_reset')}</span>
                  </button>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '1.5rem'
                }} className="product-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelectProduct={(p) => setSelectedProduct(p)}
                      onQuickAdd={(p) => {
                        const firstSize = (p.sizes && p.sizes[0]) || 'All Size';
                        const firstColor = (p.colors && p.colors[0]) || '';
                        addToCart(p, firstSize, firstColor, 1);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Section 11: Philosophy Quote & Dual B&W Editorial Footer (referensi.webp) */}
          <PhilosophyFooterSection />
        </main>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Floating Cart Launcher Button */}
      <FloatingCartButton />

      {/* Slide-out Cart Drawer with Instant WhatsApp Checkout */}
      <CartDrawer
        storeSettings={storeSettings}
      />

      {/* WhatsApp Fast Checkout Modal */}
      <CheckoutModal
        storeSettings={storeSettings}
      />
    </div>
  );
}

export default function App() {
  return <MainStore />;
}
