import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Store,
  Phone,
  Tag,
  Eye,
  EyeOff
} from 'lucide-react';

export const AdminPanel = ({
  products,
  setProducts,
  categories,
  storeSettings,
  setStoreSettings,
  onClose
}) => {
  const { lang, t } = useLanguage();

  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'settings'

  // New / Edit Product Form State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formTitleId, setFormTitleId] = useState('');
  const [formTitleEn, setFormTitleEn] = useState('');
  const [formCategory, setFormCategory] = useState('shirts');
  const [formPrice, setFormPrice] = useState('');
  const [formComparePrice, setFormComparePrice] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formStockStatus, setFormStockStatus] = useState('ready');
  const [formSizes, setFormSizes] = useState('S, M, L, XL');

  // Store Settings Form State
  const [settingsWa, setSettingsWa] = useState(storeSettings?.whatsappNumber || '6281234567890');
  const [settingsBannerId, setSettingsBannerId] = useState(storeSettings?.announcement_id || '');
  const [settingsBannerEn, setSettingsBannerEn] = useState(storeSettings?.announcement_en || '');
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === storeSettings.adminPin || pinInput === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleToggleActive = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleUpdateStock = (id, newStatus) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stockStatus: newStatus } : p))
    );
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormTitleId('');
    setFormTitleEn('');
    setFormCategory('shirts');
    setFormPrice('');
    setFormComparePrice('');
    setFormImageUrl('');
    setFormStockStatus('ready');
    setFormSizes('S, M, L, XL');
    setIsEditingProduct(true);
  };

  const handleOpenEdit = (p) => {
    setEditingId(p.id);
    setFormTitleId(p.title_id);
    setFormTitleEn(p.title_en);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormComparePrice(p.compareAtPrice || '');
    setFormImageUrl(p.images[0] || '');
    setFormStockStatus(p.stockStatus);
    setFormSizes((p.sizes || []).join(', '));
    setIsEditingProduct(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const parsedSizes = formSizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const fallbackImg =
      formImageUrl ||
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80';

    if (editingId) {
      // Update
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                title_id: formTitleId || p.title_id,
                title_en: formTitleEn || formTitleId || p.title_en,
                category: formCategory,
                price: Number(formPrice) || p.price,
                compareAtPrice: formComparePrice ? Number(formComparePrice) : null,
                images: [fallbackImg],
                stockStatus: formStockStatus,
                sizes: parsedSizes
              }
            : p
        )
      );
    } else {
      // Add new
      const newProd = {
        id: `prod-${Date.now()}`,
        category: formCategory,
        title_id: formTitleId,
        title_en: formTitleEn || formTitleId,
        description_id: 'Koleksi apparel pantai santai AlfaREL.ID.',
        description_en: 'Relaxed coastal beach apparel from AlfaREL.ID.',
        price: Number(formPrice) || 120000,
        compareAtPrice: formComparePrice ? Number(formComparePrice) : null,
        images: [fallbackImg],
        sizes: parsedSizes.length > 0 ? parsedSizes : ['S', 'M', 'L', 'XL'],
        colors: [],
        stockStatus: formStockStatus,
        isFeatured: false,
        isActive: true
      };
      setProducts((prev) => [newProd, ...prev]);
    }

    setIsEditingProduct(false);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setStoreSettings((prev) => ({
      ...prev,
      whatsappNumber: settingsWa,
      announcement_id: settingsBannerId,
      announcement_en: settingsBannerEn
    }));
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const formatPrice = (num) => new Intl.NumberFormat('id-ID').format(num);

  // If Not Authenticated: Render PIN Screen
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--bg-muted)',
          boxShadow: 'var(--shadow-md)',
          width: '100%',
          maxWidth: '380px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-seafoam-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <Lock size={22} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '0.25rem'
          }}>
            {t('admin_title')}
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {t('admin_subtitle')}
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                {t('admin_pin_label')}
              </label>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Demo PIN: 1234"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  textAlign: 'center',
                  fontSize: '1.2rem',
                  letterSpacing: '0.25em',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--bg-muted)',
                  outline: 'none'
                }}
                autoFocus
              />
              {pinError && (
                <p style={{ color: 'var(--color-accent-coral)', fontSize: '0.75rem', marginTop: '0.4rem' }}>
                  {t('admin_pin_wrong')}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
              <span>{t('admin_pin_btn')}</span>
            </button>
          </form>

          <button
            onClick={onClose}
            style={{
              marginTop: '1.25rem',
              fontSize: '0.8125rem',
              color: 'var(--text-tertiary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <ArrowLeft size={14} />
            <span>{t('admin_back')}</span>
          </button>
        </div>
      </div>
    );
  }

  // If Authenticated: Render Admin Dashboard
  return (
    <div style={{ padding: '2rem 0 4rem' }}>
      <div className="container">
        {/* Admin Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--bg-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8125rem' }}
            >
              <ArrowLeft size={16} />
              <span>{t('admin_back')}</span>
            </button>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--text-primary)'
              }}>
                {t('admin_title')}
              </h1>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: 'var(--badge-ready)',
                fontWeight: 600
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--badge-ready)' }} />
                Terotentikasi (Akses CRUD Aktif)
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('products')}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 700,
                backgroundColor: activeTab === 'products' ? 'var(--color-primary)' : 'var(--bg-subtle)',
                color: activeTab === 'products' ? 'var(--text-white)' : 'var(--text-secondary)'
              }}
            >
              {t('admin_products_tab')} ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 700,
                backgroundColor: activeTab === 'settings' ? 'var(--color-primary)' : 'var(--bg-subtle)',
                color: activeTab === 'settings' ? 'var(--text-white)' : 'var(--text-secondary)'
              }}
            >
              {t('admin_settings_tab')}
            </button>
          </div>
        </div>

        {/* TAB 1: PRODUCTS LIST & CRUD */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Kelola status ketersediaan, harga, dan koleksi katalog AlfaREL.ID.
              </p>
              <button
                onClick={handleOpenAdd}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
              >
                <Plus size={16} />
                <span>{t('admin_add_product')}</span>
              </button>
            </div>

            {/* Products Table / Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {products.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '0.875rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--bg-muted)',
                    opacity: p.isActive ? 1 : 0.6
                  }}
                >
                  {/* Thumbnail & Title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: '240px', flex: 1 }}>
                    <img
                      src={p.images[0]}
                      alt=""
                      style={{
                        width: '48px',
                        height: '58px',
                        borderRadius: 'var(--radius-xs)',
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                          {p.category}
                        </span>
                        {!p.isActive && (
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                            (Disembunyikan)
                          </span>
                        )}
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {p.title_id}
                      </h4>
                      <span className="price-nums" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                        Rp {formatPrice(p.price)}
                      </span>
                    </div>
                  </div>

                  {/* Stock Selector Dropdown */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Stok:</span>
                    <select
                      value={p.stockStatus}
                      onChange={(e) => handleUpdateStock(p.id, e.target.value)}
                      style={{
                        padding: '0.35rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--bg-muted)',
                        backgroundColor: 'var(--bg-subtle)',
                        fontSize: '0.8125rem',
                        fontWeight: 600
                      }}
                    >
                      <option value="ready">Ready Stock</option>
                      <option value="low_stock">Sisa Sedikit</option>
                      <option value="pre_order">Pre-Order</option>
                      <option value="sold_out">Habis</option>
                    </select>
                  </div>

                  {/* Action Buttons: Toggle Active, Edit, Delete */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleToggleActive(p.id)}
                      style={{
                        padding: '0.4rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-subtle)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        color: p.isActive ? 'var(--text-secondary)' : 'var(--text-tertiary)'
                      }}
                      title={p.isActive ? 'Sembunyikan' : 'Tampilkan'}
                    >
                      {p.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                      <span>{p.isActive ? 'Aktif' : 'Nonaktif'}</span>
                    </button>

                    <button
                      onClick={() => handleOpenEdit(p)}
                      style={{
                        padding: '0.4rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--color-seafoam-light)',
                        color: 'var(--color-primary)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <Edit2 size={13} />
                      <span>{t('admin_edit')}</span>
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      style={{
                        padding: '0.4rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--color-coral-light)',
                        color: 'var(--color-accent-coral)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <Trash2 size={13} />
                      <span>{t('admin_delete')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '600px' }}>
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--bg-muted)',
              padding: '1.5rem'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.1rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}>
                <Store size={18} color="var(--color-primary)" />
                <span>Pengaturan Toko & Kontak WhatsApp</span>
              </h3>

              <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    {t('admin_wa_number')}
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsWa}
                    onChange={(e) => setSettingsWa(e.target.value)}
                    placeholder="6281234567890"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--bg-muted)',
                      fontSize: '0.875rem'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    Pastikan diawali dengan kode negara 62 (bukan 08...).
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Teks Banner Pengumuman (Bahasa Indonesia)
                  </label>
                  <input
                    type="text"
                    value={settingsBannerId}
                    onChange={(e) => setSettingsBannerId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--bg-muted)',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Teks Banner Pengumuman (English)
                  </label>
                  <input
                    type="text"
                    value={settingsBannerEn}
                    onChange={(e) => setSettingsBannerEn(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--bg-muted)',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', alignSelf: 'flex-start' }}>
                  {settingsSaved ? <Check size={16} /> : null}
                  <span>{settingsSaved ? 'Tersimpan!' : t('admin_save')}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT PRODUCT */}
        {isEditingProduct && (
          <div className="overlay" onClick={() => setIsEditingProduct(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 160 }}>
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem 1.5rem',
                width: '100%',
                maxWidth: '520px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setIsEditingProduct(false)}
                style={{ position: 'absolute', top: '1rem', right: '1rem' }}
              >
                <X size={20} />
              </button>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                {editingId ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h3>

              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Nama Produk (Bahasa Indonesia) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitleId}
                    onChange={(e) => setFormTitleId(e.target.value)}
                    placeholder="Contoh: Kemeja Linen Pantai Uluwatu"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--bg-muted)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Nama Produk (English)
                  </label>
                  <input
                    type="text"
                    value={formTitleEn}
                    onChange={(e) => setFormTitleEn(e.target.value)}
                    placeholder="Contoh: Uluwatu Linen Beach Shirt"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--bg-muted)' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                      Kategori *
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--bg-muted)' }}
                    >
                      <option value="shirts">Kemeja Linen Pantai</option>
                      <option value="boardshorts">Celana Boardshorts</option>
                      <option value="tees">Kaos Santai / Oversized</option>
                      <option value="accessories">Aksesoris Pantai</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                      Status Ketersediaan *
                    </label>
                    <select
                      value={formStockStatus}
                      onChange={(e) => setFormStockStatus(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--bg-muted)' }}
                    >
                      <option value="ready">Ready Stock</option>
                      <option value="low_stock">Sisa Sedikit</option>
                      <option value="pre_order">Pre-Order</option>
                      <option value="sold_out">Habis</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                      Harga Jual (Rp) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="189000"
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--bg-muted)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                      Harga Coret / Promo (Rp)
                    </label>
                    <input
                      type="number"
                      value={formComparePrice}
                      onChange={(e) => setFormComparePrice(e.target.value)}
                      placeholder="229000"
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--bg-muted)' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    URL Gambar Produk
                  </label>
                  <input
                    type="url"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--bg-muted)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Pilihan Ukuran (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={formSizes}
                    onChange={(e) => setFormSizes(e.target.value)}
                    placeholder="S, M, L, XL"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--bg-muted)' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem', marginTop: '0.5rem' }}>
                  <span>Simpan Produk</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
