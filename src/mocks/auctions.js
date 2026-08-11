export const MOCK_AUCTIONS = [
  {
    id: 'auc-001',
    artworkId: 15,
    startPrice: 5000,
    currentBid: 6200,
    minIncrement: 200,
    reservePrice: 5500,
    startsAt: '2026-02-01T00:00:00Z',
    endsAt: '2026-12-31T23:59:59Z',
    status: 'active',
    bidHistory: [
      { id: 'bid-1', userId: 2, userName: 'Jane Collector', amount: 5200, createdAt: '2026-03-01T10:00:00Z' },
      { id: 'bid-2', userId: 2, userName: 'Jane Collector', amount: 6200, createdAt: '2026-03-05T14:00:00Z' }
    ],
    watchedBy: [2]
  },
  {
    id: 'auc-002',
    artworkId: 9,
    startPrice: 3000,
    currentBid: 3000,
    minIncrement: 100,
    reservePrice: 3500,
    startsAt: '2026-04-01T00:00:00Z',
    endsAt: '2026-11-30T23:59:59Z',
    status: 'active',
    bidHistory: [],
    watchedBy: []
  }
];
