import { parsePrice } from './currency';

const ARTIST_SLUG_MAP = {
  'Elena Rodriguez': { id: 1, slug: 'elena-rodriguez' },
  'Marcus Chen': { id: 2, slug: 'marcus-chen' },
  'Sophie Laurent': { id: 3, slug: 'sophie-laurent' },
  'James Mitchell': { id: 4, slug: 'james-mitchell' },
  'Amara Diallo': { id: 5, slug: 'amara-diallo' },
  'Yuki Tanaka': { id: 6, slug: 'yuki-tanaka' },
  'Lena Müller': { id: 7, slug: 'lena-muller' },
  'Carlos Vega': { id: 8, slug: 'carlos-vega' },
  'Fatima Al-Hassan': { id: 9, slug: 'fatima-al-hassan' },
  'Noah Williams': { id: 10, slug: 'noah-williams' },
  'Priya Sharma': { id: 11, slug: 'priya-sharma' },
  'Kwame Asante': { id: 12, slug: 'kwame-asante' },
  'Zara Okonkwo': { id: 13, slug: 'zara-okonkwo' },
  'Hana Kobayashi': { id: 14, slug: 'hana-kobayashi' },
  'Ivan Petrov': { id: 15, slug: 'ivan-petrov' }
};

function resolveArtist(artistName) {
  const mapped = ARTIST_SLUG_MAP[artistName];
  return {
    artistId: mapped?.id || null,
    artistName: artistName || 'Unknown Artist',
    artistSlug: mapped?.slug || null
  };
}

export function normalizeArtwork(raw) {
  if (!raw) return null;

  const price = typeof raw.price === 'number'
    ? raw.price
    : parsePrice(raw.price);

  const artistName = raw.artistName || raw.artist || 'Unknown Artist';
  const artistInfo = resolveArtist(artistName);

  return {
    id: raw.id,
    title: raw.title || raw.artworkName || '',
    description: raw.description || raw.artworkDescription || '',
    price,
    currency: raw.currency || 'USD',
    size: raw.size || '',
    category: raw.category || raw.artworkCategory || 'Other',
    medium: raw.medium || raw.artworkCategory || 'Mixed',
    artistId: raw.artistId || artistInfo.artistId,
    artistName: artistInfo.artistName,
    artistSlug: raw.artistSlug || artistInfo.artistSlug,
    imageUrl: raw.imageUrl || '',
    rating: raw.rating ?? raw.averageRating ?? 0,
    verified: raw.verified ?? true,
    status: raw.status || 'published',
    allowOffers: raw.allowOffers ?? price >= 2000,
    isNew: raw.isNew ?? false,
    year: raw.year || new Date().getFullYear(),
    createdAt: raw.createdAt || new Date().toISOString()
  };
}

export function normalizeUser(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    username: raw.username || raw.email || '',
    email: raw.email || '',
    firstName: raw.firstName || raw.firstname || '',
    lastName: raw.lastName || raw.lastname || '',
    role: String(raw.role || '').toUpperCase(),
    avatar: raw.avatar || raw.profilePicture || null,
    phone: raw.phone || '',
    address: raw.address || '',
    status: raw.status || 'active',
    joinedAt: raw.joinedAt || raw.createdAt || null,
    followedArtistIds: raw.followedArtistIds || [],
    createdAt: raw.createdAt || raw.joinedAt || new Date().toISOString()
  };
}

export function normalizeCartItem(raw) {
  if (!raw) return null;
  const artwork = normalizeArtwork(raw.artwork || raw);
  return {
    id: raw.id || `cart-${artwork.id}`,
    artworkId: raw.artworkId || artwork.id,
    artworkName: artwork.title,
    imageUrl: artwork.imageUrl,
    price: typeof raw.price === 'number' ? raw.price : artwork.price,
    quantity: raw.quantity || 1
  };
}

export function normalizeWishlistItem(raw) {
  if (!raw) return null;
  const artwork = normalizeArtwork(raw.artwork || raw);
  return {
    id: raw.id || `wishlist-${artwork.id}`,
    artworkId: artwork.id,
    artworkName: artwork.title,
    imageUrl: artwork.imageUrl,
    price: artwork.price,
    artistName: artwork.artistName,
    addedAt: raw.addedAt || new Date().toISOString()
  };
}

export function normalizeOrder(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    userId: raw.userId,
    items: (raw.items || []).map(normalizeCartItem),
    subtotal: raw.subtotal || 0,
    shipping: raw.shipping || 0,
    tax: raw.tax || 0,
    total: raw.total || 0,
    currency: raw.currency || 'USD',
    status: raw.status || 'pending',
    shippingAddress: raw.shippingAddress || {},
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString()
  };
}

export function normalizeArtist(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    bio: raw.bio || '',
    avatar: raw.avatar || '',
    specialty: raw.specialty || '',
    socialLinks: raw.socialLinks || {},
    verified: raw.verified ?? false,
    artworkIds: raw.artworkIds || []
  };
}

export function normalizeAuction(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    artworkId: raw.artworkId,
    artwork: raw.artwork ? normalizeArtwork(raw.artwork) : null,
    startPrice: raw.startPrice || 0,
    currentBid: raw.currentBid || raw.startPrice || 0,
    minIncrement: raw.minIncrement || 50,
    reservePrice: raw.reservePrice || null,
    startsAt: raw.startsAt,
    endsAt: raw.endsAt,
    status: raw.status || 'active',
    bidHistory: raw.bidHistory || [],
    watchedBy: raw.watchedBy || []
  };
}

export function normalizeNotification(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    title: raw.title,
    message: raw.message || raw.body || '',
    type: raw.type || 'info',
    read: raw.read ?? false,
    createdAt: raw.createdAt || new Date().toISOString()
  };
}

export function normalizeMessage(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    threadId: raw.threadId,
    senderId: raw.senderId,
    senderName: raw.senderName,
    body: raw.body,
    createdAt: raw.createdAt || new Date().toISOString(),
    read: raw.read ?? false
  };
}

export function normalizeReview(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    artworkId: raw.artworkId,
    userId: raw.userId,
    userName: raw.userName || 'Anonymous',
    rating: raw.rating,
    comment: raw.comment || '',
    createdAt: raw.createdAt || new Date().toISOString()
  };
}
