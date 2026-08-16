export function parsePrice(value) {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  const cleaned = String(value).replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

export function formatPrice(amount, currency = 'ETB') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount || 0);
}

export function calculateTax(subtotal, rate = 0.08) {
  return Math.round(subtotal * rate * 100) / 100;
}

export function calculateShipping(subtotal, baseRate = 25) {
  if (subtotal >= 5000) return 0;
  return baseRate;
}
