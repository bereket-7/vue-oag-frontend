export const MOCK_ORDERS = [
  {
    id: 'ord-001',
    userId: 2,
    items: [{ id: 'ci-1', artworkId: 3, artworkName: 'Ethereal Bloom', price: 1800, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80' }],
    subtotal: 1800,
    shipping: 25,
    tax: 144,
    total: 1969,
    currency: 'USD',
    status: 'delivered',
    shippingAddress: { firstName: 'Jane', lastName: 'Collector', address: '123 Art St', city: 'Addis Ababa', state: 'ET', zip: '1000' },
    createdAt: '2025-06-15T10:00:00Z',
    updatedAt: '2025-06-20T14:00:00Z'
  },
  {
    id: 'ord-002',
    userId: 2,
    items: [{ id: 'ci-2', artworkId: 11, artworkName: 'Digital Reverie', price: 900, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' }],
    subtotal: 900,
    shipping: 25,
    tax: 72,
    total: 997,
    currency: 'USD',
    status: 'shipped',
    shippingAddress: { firstName: 'Jane', lastName: 'Collector', address: '123 Art St', city: 'Addis Ababa', state: 'ET', zip: '1000' },
    createdAt: '2026-01-10T09:00:00Z',
    updatedAt: '2026-01-12T11:00:00Z'
  }
];
