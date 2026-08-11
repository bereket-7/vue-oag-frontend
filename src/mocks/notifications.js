export const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Order Shipped', message: 'Your order #ord-002 has been shipped.', type: 'success', read: false, createdAt: '2026-01-12T11:00:00Z' },
  { id: 2, title: 'New Artwork', message: 'Elena Rodriguez uploaded a new piece.', type: 'info', read: true, createdAt: '2026-01-08T09:00:00Z' },
  { id: 3, title: 'Auction Update', message: 'You have been outbid on Fractured Light.', type: 'warning', read: false, createdAt: '2026-03-06T08:00:00Z' }
];

export const MOCK_MESSAGES = [
  { id: 1, threadId: 'thread-1', senderId: 2, senderName: 'Jane Collector', body: 'Is this piece still available?', createdAt: '2026-02-10T10:00:00Z', read: true },
  { id: 2, threadId: 'thread-1', senderId: 3, senderName: 'Elena Rodriguez', body: 'Yes, it is available for purchase!', createdAt: '2026-02-10T11:00:00Z', read: false }
];

export const MOCK_REVIEWS = [
  { id: 1, artworkId: 1, userId: 2, userName: 'Jane Collector', rating: 5, comment: 'Absolutely stunning piece. The colors are mesmerizing.', createdAt: '2025-12-01T10:00:00Z' },
  { id: 2, artworkId: 1, userId: 2, userName: 'Art Lover', rating: 4, comment: 'Beautiful work, fast shipping.', createdAt: '2025-11-15T14:00:00Z' }
];

export const MOCK_COLLECTIONS = [
  { id: 1, slug: 'emerging-artists', title: 'Emerging Artists', description: 'Discover rising talent in contemporary art.', artworkIds: [1, 3, 10, 11], imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80' },
  { id: 2, slug: 'under-2000', title: 'Under $2,000', description: 'Exceptional art at accessible prices.', artworkIds: [3, 7, 10, 11, 14], imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80' },
  { id: 3, slug: 'sculpture-masters', title: 'Sculpture Masters', description: 'Three-dimensional works of exceptional craft.', artworkIds: [4, 8, 12, 15], imageUrl: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&q=80' }
];

export const MOCK_OFFERS = [];

export const MOCK_MODERATION_QUEUE = [
  { id: 'mod-1', type: 'artwork', title: 'Sunset Over Nile', artist: 'New Artist', status: 'pending', submittedAt: '2026-03-01T10:00:00Z' },
  { id: 'mod-2', type: 'report', title: 'Inappropriate content report', user: 'customer', status: 'pending', submittedAt: '2026-03-02T14:00:00Z' },
  { id: 'mod-3', type: 'event', title: 'Emerging Artists Showcase', organization: 'Gallery Org', status: 'pending', submittedAt: '2026-03-03T09:00:00Z' }
];
