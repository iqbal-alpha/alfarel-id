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
  EyeOff,
  ShoppingBag,
  RefreshCw
} from 'lucide-react';
import {
  isSupabaseConfigured,
  verifyAdminPin,
  createProduct as dbCreateProduct,
  updateProduct as dbUpdateProduct,
  deleteProduct as dbDeleteProduct,
  updateStoreSettings as dbUpdateSettings,
  getOrderLogs
} from '../lib/supabase';

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
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [banner, setBanner] = useState(null); // { type: 'success' | 'error', text: '' }
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'orders', or 'settings'
  const [orderLogs, setOrderLogs] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const logs = await getOrderLogs(100);
      setOrderLogs(logs || []);
    } catch (err) {
      console.error('Error fetching order logs:', err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  // New / Edit Product Form State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formTitleId, setFormTitleId] = useState('');
  const [formTitleEn, setFormTitleEn] = useState('');
  const [formDescId, setFormDescId] = useState('');
  const [formDescEn, setFormDescEn] = useState('');
  const [formCategory, setFormCategory] = useState('shirts');
  const [formPrice, setFormPrice] = useState('');
  const [formComparePrice, setFormComparePrice] = useState('');
  const [formImages, setFormImages] = useState('');
  const [formStockStatus, setFormStockStatus] = useState('ready');
  const [formSizes, setFormSizes] = useState('S, M, L, XL');

  // Store Settings Form State
  const [settingsWa, setSettingsWa] = useState(storeSettings?.whatsappNumber || '6281234567890');
  const [settingsBannerId, setSettingsBannerId] = useState(storeSettings?.announcement_id || '');
  const [settingsBannerEn, setSettingsBannerEn] = useState(storeSettings?.announcement_en || '');
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setPinError(false);
    try {
      const isValid = await verifyAdminPin(pinInput);
      if (isValid) {
        setIsAuthenticated(true);
        setPinError(false);
      } else {
        setPinError(true);
      }
    } catch (err) {
      console.error('Login verification error:', err);
      setPinError(true);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleToggleActive = async (id) => {
    const prevProducts = [...products];
    const target = products.find((p) => p.id === id);
    if (!target) return;
    const newActive = !target.isActive;
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: newActive } : p))
    );
    if (isSupabaseConfigured()) {
      try {
        await dbUpdateProduct(id, { is_active: newActive });
        setBanner({ type: 'success', text: `Product visibility updated to ${newActive ? 'Active' : 'Hidden'}.` });
      } catch (err) {
        console.error('Failed to update active state in Supabase:', err);
        setProducts(prevProducts); // Rollback
        setBanner({ type: 'error', text: 'Failed to update visibility on server. Reverted changes.' });
      }
    }
  };

  const handleUpdateStock = async (id, newStatus) => {
    const prevProducts = [...products];
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stockStatus: newStatus } : p))
    );
    if (isSupabaseConfigured()) {
      try {
        await dbUpdateProduct(id, { stock_status: newStatus });
        setBanner({ type: 'success', text: 'Stock status updated successfully.' });
      } catch (err) {
        console.error('Failed to update stock status in Supabase:', err);
        setProducts(prevProducts); // Rollback
        setBanner({ type: 'error', text: 'Failed to update stock status on server. Reverted changes.' });
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const prevProducts = [...products];
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (isSupabaseConfigured()) {
        try {
          await dbDeleteProduct(id);
          setBanner({ type: 'success', text: 'Product deleted successfully.' });
        } catch (err) {
          console.error('Failed to delete product in Supabase:', err);
          setProducts(prevProducts); // Rollback
          setBanner({ type: 'error', text: 'Failed to delete product from server. Product restored.' });
        }
      }
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormTitleId('');
    setFormTitleEn('');
    setFormDescId('');
    setFormDescEn('');
    setFormCategory('shirts');
    setFormPrice('');
    setFormComparePrice('');
    setFormImages('');
    setFormStockStatus('ready');
    setFormSizes('S, M, L, XL');
    setIsEditingProduct(true);
  };

  const handleOpenEdit = (p) => {
    setEditingId(p.id);
    setFormTitleId(p.title_id || '');
    setFormTitleEn(p.title_en || '');
    setFormDescId(p.description_id || '');
    setFormDescEn(p.description_en || '');
    setFormCategory(p.category || 'shirts');
    setFormPrice(p.price || '');
    setFormComparePrice(p.compareAtPrice || '');
    setFormImages((p.images || []).join('\n'));
    setFormStockStatus(p.stockStatus || 'ready');
    setFormSizes((p.sizes || []).join(', '));
    setIsEditingProduct(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const parsedSizes = formSizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedImages = formImages
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const fallbackImg =
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80';
    const finalImages = parsedImages.length > 0 ? parsedImages : [fallbackImg];

    if (editingId) {
      // Update
      const prevProducts = [...products];
      const updatedProduct = {
        title_id: formTitleId,
        title_en: formTitleEn || formTitleId,
        description_id: formDescId,
        description_en: formDescEn || formDescId,
        category: formCategory,
        price: Number(formPrice) || 120000,
        compareAtPrice: formComparePrice ? Number(formComparePrice) : null,
        images: finalImages,
        stockStatus: formStockStatus,
        sizes: parsedSizes.length > 0 ? parsedSizes : ['S', 'M', 'L', 'XL']
      };

      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...updatedProduct } : p))
      );

      if (isSupabaseConfigured()) {
        try {
          await dbUpdateProduct(editingId, {
            title_id: updatedProduct.title_id,
            title_en: updatedProduct.title_en,
            description_id: updatedProduct.description_id,
            description_en: updatedProduct.description_en,
            category: updatedProduct.category,
            price: updatedProduct.price,
            compare_at_price: updatedProduct.compareAtPrice,
            images: updatedProduct.images,
            stock_status: updatedProduct.stockStatus,
            available_sizes: updatedProduct.sizes
          });
          setBanner({ type: 'success', text: 'Product updated successfully.' });
        } catch (err) {
          console.error('Failed to update product in Supabase:', err);
          setProducts(prevProducts); // Rollback
          setBanner({ type: 'error', text: 'Failed to update product on server. Reverted changes.' });
        }
      }
    } else {
      // Add new
      const tempId = `prod-${Date.now()}`;
      const newProd = {
        id: tempId,
        category: formCategory,
        title_id: formTitleId,
        title_en: formTitleEn || formTitleId,
        description_id: formDescId || 'Relaxed coastal beach apparel from AlfaREL.ID.',
        description_en: formDescEn || 'Relaxed coastal beach apparel from AlfaREL.ID.',
        price: Number(formPrice) || 120000,
        compareAtPrice: formComparePrice ? Number(formComparePrice) : null,
        images: finalImages,
        sizes: parsedSizes.length > 0 ? parsedSizes : ['S', 'M', 'L', 'XL'],
        colors: [],
        stockStatus: formStockStatus,
        isFeatured: false,
        isActive: true
      };

      setProducts((prev) => [newProd, ...prev]);

      if (isSupabaseConfigured()) {
        try {
          const generatedSlug = (formTitleEn || formTitleId)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);

          const dbRes = await dbCreateProduct({
            slug: generatedSlug,
            title_id: newProd.title_id,
            title_en: newProd.title_en,
            description_id: newProd.description_id,
            description_en: newProd.description_en,
            category: newProd.category,
            price: newProd.price,
            compare_at_price: newProd.compareAtPrice,
            images: newProd.images,
            available_sizes: newProd.sizes,
            stock_status: newProd.stockStatus,
            is_active: true,
            is_featured: false
          });

          if (dbRes && dbRes.id) {
            setProducts((prev) =>
              prev.map((p) => (p.id === tempId ? { ...p, id: dbRes.id } : p))
            );
            setBanner({ type: 'success', text: 'Product created successfully.' });
          }
        } catch (err) {
          console.error('Failed to create product in Supabase:', err);
          setProducts((prev) => prev.filter((p) => p.id !== tempId)); // Rollback
          setBanner({ type: 'error', text: 'Failed to create product on server. Product removed.' });
        }
      }
    }

    setIsEditingProduct(false);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const prevSettings = { ...storeSettings };
    setStoreSettings((prev) => ({
      ...prev,
      whatsappNumber: settingsWa,
      announcement_id: settingsBannerId,
      announcement_en: settingsBannerEn
    }));

    if (isSupabaseConfigured()) {
      try {
        await dbUpdateSettings({
          whatsapp_number: settingsWa,
          announcement_id: settingsBannerId,
          announcement_en: settingsBannerEn
        });
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 2000);
      } catch (err) {
        console.error('Failed to update settings in Supabase:', err);
        setStoreSettings(prevSettings);
        setBanner({ type: 'error', text: 'Failed to update store settings on server.' });
      }
    } else {
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2000);
    }
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
                placeholder="••••••••"
                disabled={isAuthenticating}
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

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isAuthenticating}
              style={{ width: '100%', padding: '0.75rem' }}
            >
              <span>{isAuthenticating ? 'Memverifikasi...' : t('admin_pin_btn')}</span>
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
        {banner && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1rem',
              backgroundColor: banner.type === 'error' ? 'var(--badge-sold-out-bg)' : 'var(--badge-ready-bg)',
              color: banner.type === 'error' ? 'var(--badge-sold-out)' : 'var(--badge-ready)',
              border: `1px solid ${banner.type === 'error' ? 'var(--badge-sold-out)' : 'var(--badge-ready)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <span>{banner.text}</span>
            <button
              onClick={() => setBanner(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
            >
              <X size={16} />
            </button>
          </div>
        )}

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
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
              onClick={() => {
                setActiveTab('orders');
                fetchOrders();
              }}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 700,
                backgroundColor: activeTab === 'orders' ? 'var(--color-primary)' : 'var(--bg-subtle)',
                color: activeTab === 'orders' ? 'var(--text-white)' : 'var(--text-secondary)'
              }}
            >
              {t('admin_orders_tab')} {orderLogs.length > 0 ? `(${orderLogs.length})` : ''}
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

        {/* TAB 3: ORDER LOGS */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                  Log Transaksi WhatsApp Checkout
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  Catatan pesanan otomatis yang dikirim pembeli via WhatsApp.
                </p>
              </div>
              <button
                onClick={fetchOrders}
                disabled={isLoadingOrders}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 0.9rem', fontSize: '0.8125rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <RefreshCw size={14} className={isLoadingOrders ? 'spin' : ''} />
                <span>{isLoadingOrders ? 'Memuat...' : 'Segarkan Data'}</span>
              </button>
            </div>

            {orderLogs.length === 0 ? (
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--bg-muted)',
                padding: '3rem 2rem',
                textAlign: 'center'
              }}>
                <ShoppingBag size={40} color="var(--text-tertiary)" style={{ margin: '0 auto 1rem', display: 'block' }} />
                <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Belum Ada Pesanan Masuk
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
                  Setiap kali pembeli menyelesaikan checkout di website dan membuka WhatsApp, data pesanan otomatis tersimpan di Supabase alfarel_order_logs.
                </p>
              </div>
            ) : (
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--bg-muted)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--bg-muted)' }}>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Kode Order</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Waktu</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Pelanggan</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Kota & Kurir</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center' }}>Item</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'right' }}>Total Tagihan</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center' }}>WhatsApp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderLogs.map((log) => {
                        const cleanPhone = (log.customer_phone || '').replace(/\D/g, '');
                        const waDirectUrl = cleanPhone ? `https://wa.me/${cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone}` : null;
                        return (
                          <tr key={log.id || log.order_code} style={{ borderBottom: '1px solid var(--bg-muted)' }}>
                            <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                              {log.order_code}
                            </td>
                            <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                              {log.created_at ? new Date(log.created_at).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                            </td>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{log.customer_name || '-'}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{log.customer_phone || '-'}</div>
                            </td>
                            <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>
                              <div>{log.city || '-'}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{log.courier || '-'}</div>
                            </td>
                            <td style={{ padding: '0.85rem 1rem', textAlign: 'center', fontWeight: 600 }}>
                              {log.items_count} pcs
                            </td>
                            <td style={{ padding: '0.85rem 1rem', textAlign: 'right', fontWeight: 700, color: 'var(--text-primary)' }}>
                              Rp {new Intl.NumberFormat('id-ID').format(log.total_amount)}
                            </td>
                            <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                              {waDirectUrl && (
                                <a
                                  href={waDirectUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-secondary"
                                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                  title="Chat Pelanggan di WhatsApp"
                                >
                                  <Phone size={12} />
                                  <span>Chat</span>
                                </a>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Deskripsi Produk (Bahasa Indonesia)
                  </label>
                  <textarea
                    rows={2}
                    value={formDescId}
                    onChange={(e) => setFormDescId(e.target.value)}
                    placeholder="Contoh: Kemeja santai dengan material katun linen premium..."
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--bg-muted)', fontFamily: 'inherit', resize: 'vertical' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Deskripsi Produk (English)
                  </label>
                  <textarea
                    rows={2}
                    value={formDescEn}
                    onChange={(e) => setFormDescEn(e.target.value)}
                    placeholder="Example: Relaxed fit shirt crafted from breathable cotton-linen..."
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--bg-muted)', fontFamily: 'inherit', resize: 'vertical' }}
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
                    URL Gambar Produk (Satu URL per baris)
                  </label>
                  <textarea
                    rows={3}
                    value={formImages}
                    onChange={(e) => setFormImages(e.target.value)}
                    placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--bg-muted)', fontFamily: 'inherit', resize: 'vertical' }}
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
