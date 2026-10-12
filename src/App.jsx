import React, { useState, useMemo, useRef } from 'react';
import { useLanguage } from './i18n/LanguageContext';
import { useCart } from './context/CartContext';
import { initialProducts, initialCategories, initialStoreSettings } from './data/mockProducts';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { SearchBar } from './components/SearchBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingCartButton } from './components/FloatingCartButton';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';

import { Sparkles, MessageCircle, Heart, Shield, RefreshCw } from 'lucide-react';

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

  const announcementText =
    lang === 'en' ? storeSettings.announcement_en : storeSettings.announcement_id;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar announcementText={announcementText} />

      {/* 2. Sticky Header Navbar */}
      <Header
        onOpenSearch={handleOpenSearchFocus}
        onOpenAdmin={() => setIsAdminView(true)}
        searchQuery={searchQuery}
      />

      {/* Main Content: Admin View or Catalog View */}
      {isAdminView ? (
        <AdminPanel
          products={products}
          setProducts={setProducts}
          categories={categories}
          storeSettings={storeSettings}
          setStoreSettings={setStoreSettings}
          onClose={() => setIsAdminView(false)}
        />
      ) : (
        <main style={{ flex: 1 }}>
          {/* 3. Hero Showcase Banner */}
          <HeroBanner
            onExploreClick={() => {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 4. Catalog Section */}
          <section id="catalog" style={{ padding: '2.5rem 0 5rem' }}>
            <div className="container">
              {/* Catalog Section Header & Search */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <Sparkles size={14} />
                    <span>AlfaREL.ID Essentials</span>
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginTop: '0.2rem'
                  }}>
                    {t('nav_catalog')}
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
              <div style={{ marginBottom: '2rem' }}>
                <CategoryFilter
                  categories={categories}
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  counts={categoryCounts}
                />
              </div>

              {/* Search Result Status Banner (if searching) */}
              {searchQuery && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--bg-muted)',
                  marginBottom: '1.5rem',
                  fontSize: '0.875rem'
                }}>
                  <span>
                    <strong>{filteredProducts.length}</strong> {t('search_results')} "<strong>{searchQuery}</strong>"
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700 }}
                  >
                    {t('search_reset')}
                  </button>
                </div>
              )}

              {/* 5. Product Grid */}
              {filteredProducts.length === 0 ? (
                /* No Results State */
                <div style={{
                  padding: '5rem 1rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--bg-muted)'
                }}>
                  <span style={{ fontSize: '3rem' }}>🔍</span>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginTop: '1rem',
                    marginBottom: '0.5rem'
                  }}>
                    {t('search_no_results')}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Coba gunakan kata kunci lain seperti "linen", "shirt", "pantai", atau ganti filter kategori.
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
                /* Responsive Product Cards Grid */
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: '1.25rem',
                  '@media (min-width: 640px)': {
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '1.5rem'
                  }
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

          {/* 6. Footer */}
          <footer style={{
            backgroundColor: 'var(--text-primary)',
            color: 'var(--text-white)',
            padding: '3.5rem 0 2.5rem',
            marginTop: 'auto'
          }}>
            <div className="container">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '2.5rem',
                paddingBottom: '2.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
              }}>
                {/* Brand Column */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🌴</span>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: 'var(--text-white)'
                    }}>
                      AlfaREL.ID
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, maxWidth: '340px' }}>
                    {t('footer_about')}
                  </p>
                </div>

                {/* Service Hours & Contact */}
                <div>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--color-seafoam)'
                  }}>
                    Layanan Pelanggan WhatsApp
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.75rem' }}>
                    {t('footer_hours')}
                  </p>
                  <a
                    href={`https://wa.me/${storeSettings.whatsappNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-whatsapp"
                    style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}
                  >
                    <MessageCircle size={16} />
                    <span>Chat CS: +{storeSettings.whatsappNumber}</span>
                  </a>
                </div>

                {/* Values & Guarantee */}
                <div>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--color-seafoam)'
                  }}>
                    Jaminan Belanja
                  </h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    <li>✓ 100% Foto Produk Asli & Bahan Berkualitas</li>
                    <li>✓ Fast Checkout Tanpa Biaya Tambahan</li>
                    <li>✓ Pilihan Ekspedisi Nasional Cepat & Terpercaya</li>
                    <li>✓ Tukar Ukuran Fleksibel via Chat WhatsApp</li>
                  </ul>
                </div>
              </div>

              {/* Copyright & Admin Link */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1.5rem',
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)'
              }}>
                <span>{t('footer_copyright')}</span>
                <button
                  onClick={() => setIsAdminView(true)}
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.75rem',
                    textDecoration: 'underline'
                  }}
                >
                  {t('nav_admin')} Portal
                </button>
              </div>
            </div>
          </footer>
        </main>
      )}

      {/* Interactive Overlays & Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer />

      <FloatingCartButton />

      <CheckoutModal storeSettings={storeSettings} />
    </div>
  );
}

export default function App() {
  return <MainStore />;
}
