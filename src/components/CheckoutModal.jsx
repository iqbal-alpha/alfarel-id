import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { X, MessageCircle, Truck, MapPin, User, Phone, CheckCircle2 } from 'lucide-react';

export const CheckoutModal = ({ storeSettings }) => {
  const { lang, t } = useLanguage();
  const {
    items,
    subtotal,
    orderNote,
    isCheckoutOpen,
    setIsCheckoutOpen
  } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [shippingZone, setShippingZone] = useState('zone1'); // zone1: 10000, zone2: 18000, zone3: 30000
  const [courier, setCourier] = useState('J&T Express');
  const [additionalNote, setAdditionalNote] = useState(orderNote || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const shippingRates = {
    zone1: 10000,
    zone2: 18000,
    zone3: 30000
  };

  const shippingRateLabels = {
    zone1: lang === 'en' ? 'Greater Jakarta (IDR 10,000)' : 'Jabodetabek (Rp 10.000)',
    zone2: lang === 'en' ? 'Java Island - Outside Jakarta (IDR 18,000)' : 'Pulau Jawa - Luar Jabodetabek (Rp 18.000)',
    zone3: lang === 'en' ? 'Outside Java Island (IDR 30,000)' : 'Luar Pulau Jawa (Rp 30.000)'
  };

  const currentShippingCost = shippingRates[shippingZone] || 10000;
  const grandTotal = subtotal + currentShippingCost;

  const formatPrice = (num) => new Intl.NumberFormat('id-ID').format(num);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !address || !city) {
      alert('Mohon lengkapi Nama, Nomor WA, Alamat, dan Kota/Kecamatan.');
      return;
    }

    setIsSubmitting(true);

    // Generate Order ID
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ALF-${dateStr}-${randomSuffix}`;

    // Compile items list string
    const itemsLines = items.map((item, index) => {
      const itemTitle = lang === 'en' ? item.title_en : item.title_id;
      const colorText = item.color ? ` (${item.color})` : '';
      return `${index + 1}. ${itemTitle}${colorText}\n   • Ukuran: ${item.size}\n   • Qty: ${item.quantity} pcs @ Rp ${formatPrice(item.price)} = Rp ${formatPrice(item.price * item.quantity)}`;
    }).join('\n');

    // Build the WhatsApp message template
    const rawMessage = `🌴 *HALO ALFAREL.ID, SAYA MAU PESAN APPAREL INI* 🌊
------------------------------------------
ID Pesanan: #${orderId}

📋 *DAFTAR ITEM BELANJA:*
${itemsLines}

------------------------------------------
📦 *Total Item:* ${items.reduce((s, i) => s + i.quantity, 0)} pcs
💰 *Subtotal Produk:* Rp ${formatPrice(subtotal)}
🚚 *Ongkos Kirim (${shippingRateLabels[shippingZone]}):* Rp ${formatPrice(currentShippingCost)}
💳 *TOTAL PEMBAYARAN:* Rp ${formatPrice(grandTotal)}

📍 *DATA PENGIRIMAN:*
• Nama Penerima: ${name}
• No. WhatsApp: ${phone}
• Alamat: ${address}
• Kecamatan/Kota: ${city}
• Ekspedisi Favorit: ${courier}
• Catatan: ${additionalNote || '-'}

Mohon konfirmasi pesanan dan nomor rekening / QRIS pembayaran ya kak. Terima kasih! 🤙`;

    const cleanWaNumber = (storeSettings?.whatsappNumber || '6281234567890').replace(/\D/g, '');
    const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(rawMessage)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(waUrl, '_blank');
      setIsCheckoutOpen(false);
    }, 400);
  };

  return (
    <div className="overlay" onClick={() => setIsCheckoutOpen(false)} style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 140
    }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '94vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          padding: '1.75rem 1.5rem',
          position: 'relative',
          animation: 'slideUp 250ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            padding: '0.35rem',
            borderRadius: '50%',
            color: 'var(--text-secondary)'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.25rem', paddingRight: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
            <MessageCircle size={20} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              WhatsApp Fast Checkout
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 800,
            color: 'var(--text-primary)'
          }}>
            {t('modal_checkout_title')}
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            {t('modal_checkout_subtitle')}
          </p>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {/* Name & Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                {t('form_name')} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Arya Pratama"
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
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                {t('form_phone')} *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="081234567890"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--bg-muted)',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>

          {/* Full Address */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
              {t('form_address')} *
            </label>
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t('form_address_hint')}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--bg-muted)',
                fontSize: '0.875rem',
                resize: 'none'
              }}
            />
          </div>

          {/* District & City */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
              {t('form_city')} *
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Denpasar Selatan, Kota Denpasar - Bali"
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--bg-muted)',
                fontSize: '0.875rem'
              }}
            />
          </div>

          {/* Flat Shipping Zone Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              {t('form_shipping_zone')} *
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {Object.keys(shippingRates).map((zoneKey) => {
                const isSelected = shippingZone === zoneKey;
                return (
                  <label
                    key={zoneKey}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid',
                      borderColor: isSelected ? 'var(--color-primary)' : 'var(--bg-muted)',
                      backgroundColor: isSelected ? 'var(--color-seafoam-light)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? 'var(--color-primary)' : 'var(--text-secondary)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="radio"
                        name="shippingZone"
                        value={zoneKey}
                        checked={isSelected}
                        onChange={() => setShippingZone(zoneKey)}
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                      <span>{shippingRateLabels[zoneKey]}</span>
                    </div>
                    <span className="price-nums" style={{ fontWeight: 700 }}>
                      Rp {formatPrice(shippingRates[zoneKey])}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Courier Preference */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
              {t('form_courier')}
            </label>
            <select
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--bg-muted)',
                backgroundColor: 'var(--bg-surface)',
                fontSize: '0.875rem'
              }}
            >
              <option value="J&T Express">J&T Express</option>
              <option value="JNE Reguler">JNE Reguler</option>
              <option value="SiCepat Ekspres">SiCepat Ekspres</option>
              <option value="GoSend / Grab Instant">GoSend / Grab Instant</option>
            </select>
          </div>

          {/* Additional Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
              {t('form_note')}
            </label>
            <input
              type="text"
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
              placeholder="Contoh: Tolong bungkus rapi / minta foto resi"
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--bg-muted)',
                fontSize: '0.875rem'
              }}
            />
          </div>

          {/* Pricing Calculation Summary Box */}
          <div style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px dashed var(--bg-muted)',
            marginTop: '0.4rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
              <span>{t('calc_subtotal')}</span>
              <span className="price-nums" style={{ fontWeight: 600 }}>
                {t('currency')} {formatPrice(subtotal)}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              <span>{t('calc_shipping')}</span>
              <span className="price-nums" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                {t('currency')} {formatPrice(currentShippingCost)}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingTop: '0.5rem',
              borderTop: '1px solid var(--bg-muted)'
            }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('calc_grand_total')}
              </span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-primary)'
              }} className="price-nums">
                {t('currency')} {formatPrice(grandTotal)}
              </span>
            </div>
          </div>

          {/* Action Trigger */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-whatsapp"
            style={{
              padding: '0.9rem',
              fontSize: '1rem',
              fontWeight: 700,
              width: '100%',
              marginTop: '0.5rem'
            }}
          >
            <MessageCircle size={20} />
            <span>{isSubmitting ? 'Membuka WhatsApp...' : t('btn_send_wa')}</span>
          </button>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textAlign: 'center' }}>
            {t('wa_direct_hint')}
          </p>
        </form>
      </div>
    </div>
  );
};
