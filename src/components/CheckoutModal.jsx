import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { X, MessageCircle, Truck, MapPin, User, Phone, CheckCircle2 } from 'lucide-react';
import { logOrder } from '../lib/supabase';
import {
  generateOrderId,
  compileWhatsAppOrderMessage,
  buildWhatsAppUrl
} from '../lib/whatsapp';

export const CheckoutModal = ({ storeSettings }) => {
  const { lang, t } = useLanguage();
  const {
    items,
    subtotal,
    orderNote,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart
  } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [shippingZone, setShippingZone] = useState('zone1'); // zone1: 10000, zone2: 18000, zone3: 30000
  const [courier, setCourier] = useState('J&T Express');
  const [additionalNote, setAdditionalNote] = useState(orderNote || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isCheckoutOpen) {
      setAdditionalNote(orderNote || '');
    }
  }, [isCheckoutOpen, orderNote]);

  if (!isCheckoutOpen) return null;

  const shippingRates = {
    zone1: 10000,
    zone2: 18000,
    zone3: 30000
  };

  const shippingRateLabels = {
    zone1: 'Greater Jakarta (IDR 10,000)',
    zone2: 'Java Island - Outside Jakarta (IDR 18,000)',
    zone3: 'Outside Java Island (IDR 30,000)'
  };

  const currentShippingCost = shippingRates[shippingZone] || 10000;
  const grandTotal = subtotal + currentShippingCost;

  const formatPrice = (num) => new Intl.NumberFormat('en-US').format(num);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      alert('Please fill in your Full Name, WhatsApp Number, Address, and City/District.');
      return;
    }

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const rawMessage = compileWhatsAppOrderMessage({
      orderId,
      items,
      subtotal,
      shippingCost: currentShippingCost,
      shippingZoneLabel: shippingRateLabels[shippingZone] || 'Standard Shipping',
      customerName: name,
      customerPhone: phone,
      deliveryAddress: address,
      city,
      courier,
      specialNotes: additionalNote
    });

    const waRecipient = storeSettings?.whatsappNumber || '6281234567890';
    const waUrl = buildWhatsAppUrl(waRecipient, rawMessage);

    // Record order analytics asynchronously (fire and forget)
    logOrder({
      order_code: orderId,
      customer_name: name.trim(),
      customer_phone: phone.trim(),
      city: city.trim(),
      courier,
      items_count: items.reduce((s, i) => s + (i.quantity || 1), 0),
      total_amount: grandTotal
    }).catch(err => console.warn('Order logging error:', err));

    // Open WhatsApp synchronously in user gesture thread to prevent iOS Safari popup suppression
    window.open(waUrl, '_blank');

    clearCart();
    setIsSubmitting(false);
    setIsCheckoutOpen(false);
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
