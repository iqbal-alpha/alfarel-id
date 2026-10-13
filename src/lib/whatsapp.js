/**
 * WhatsApp Order Generator and Text Formatter
 */

export function sanitizeText(text) {
  if (!text) return '';
  return String(text)
    .replace(/[*_~`]/g, '') // remove markdown characters that break WA format
    .replace(/\s+/g, ' ')
    .trim();
}

export function generateOrderId() {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
  // 6-digit cryptographic-safe random suffix for collision resistance
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `ALF-${dateStr}-${randomSuffix}`;
}

export function formatPriceIDR(num) {
  return new Intl.NumberFormat('en-US').format(Math.round(num || 0));
}

export function compileWhatsAppOrderMessage({
  orderId,
  items = [],
  subtotal = 0,
  shippingCost = 0,
  shippingZoneLabel = 'Standard Shipping',
  customerName = '',
  customerPhone = '',
  deliveryAddress = '',
  city = '',
  courier = 'J&T Express',
  specialNotes = ''
}) {
  const cleanName = sanitizeText(customerName) || '-';
  const cleanPhone = sanitizeText(customerPhone) || '-';
  const cleanAddress = sanitizeText(deliveryAddress) || '-';
  const cleanCity = sanitizeText(city) || '-';
  const cleanCourier = sanitizeText(courier) || 'J&T Express';
  const cleanNotes = sanitizeText(specialNotes) || '-';

  const totalItemsCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const grandTotal = (subtotal || 0) + (shippingCost || 0);

  const itemsLines = items.map((item, index) => {
    const itemTitle = sanitizeText(item.title_en || item.title_id || 'Apparel Item');
    const colorText = item.color ? ` (${sanitizeText(item.color)})` : '';
    const sizeText = item.size ? `Size: ${sanitizeText(item.size)}` : 'One Size';
    const qty = item.quantity || 1;
    const priceStr = formatPriceIDR(item.price);
    const itemTotalStr = formatPriceIDR((item.price || 0) * qty);

    return `${index + 1}. ${itemTitle}${colorText}\n   • ${sizeText}\n   • Qty: ${qty} pcs @ IDR ${priceStr} = IDR ${itemTotalStr}`;
  }).join('\n');

  return `*NEW ORDER — ALFAREL.ID*
Order ID: #${orderId}
------------------------------------------
*ORDERED ITEMS:*
${itemsLines}

------------------------------------------
*PAYMENT SUMMARY:*
• Total Items: ${totalItemsCount} pcs
• Subtotal: IDR ${formatPriceIDR(subtotal)}
• Shipping (${shippingZoneLabel}): IDR ${formatPriceIDR(shippingCost)}
• *TOTAL AMOUNT: IDR ${formatPriceIDR(grandTotal)}*

------------------------------------------
*DELIVERY DETAILS:*
• Customer Name: ${cleanName}
• WhatsApp Contact: ${cleanPhone}
• Delivery Address: ${cleanAddress}
• City / District: ${cleanCity}
• Preferred Courier: ${cleanCourier}
• Special Notes: ${cleanNotes}

Please confirm product availability and provide payment instructions (Bank Transfer / QRIS). Thank you!`;
}

export function buildWhatsAppUrl(phoneNumber, rawMessage) {
  const cleanWaNumber = (phoneNumber || '6281234567890').replace(/\D/g, '');
  const normalizedNumber = cleanWaNumber.startsWith('0')
    ? '62' + cleanWaNumber.slice(1)
    : cleanWaNumber;
  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(rawMessage)}`;
}
