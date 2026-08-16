import { parsePrice } from './currency';
import { resolveMediaUrl } from './unwrap';

function firstImage(raw) {
  if (raw.imageUrl) return resolveMediaUrl(raw.imageUrl);
  if (Array.isArray(raw.imageUrls) && raw.imageUrls.length) return resolveMediaUrl(raw.imageUrls[0]);
  if (raw.image) return resolveMediaUrl(raw.image);
  return '';
}

export function normalizeArtwork(raw) {
  if (!raw) return null;

  const price = typeof raw.price === 'number'
    ? raw.price
    : parsePrice(raw.price);

  const artistName = raw.artistName || raw.artist || 'Unknown Artist';

  return {
    id: raw.id,
    slug: raw.slug || null,
    title: raw.title || raw.artworkName || '',
    artworkName: raw.artworkName || raw.title || '',
    description: raw.description || raw.artworkDescription || '',
    price,
    currency: raw.currency || 'ETB',
    size: raw.size || '',
    category: raw.category || raw.artworkCategory || 'Other',
    medium: raw.medium || raw.artworkCategory || 'Mixed',
    artistId: raw.artistId || null,
    artistName,
    artistSlug: raw.artistSlug || raw.slug || null,
    imageUrl: firstImage(raw),
    imageUrls: Array.isArray(raw.imageUrls) ? raw.imageUrls.map(resolveMediaUrl) : (raw.imageUrl ? [resolveMediaUrl(raw.imageUrl)] : []),
    rating: raw.rating ?? raw.averageRating ?? 0,
    verified: raw.verified ?? true,
    status: raw.status || 'published',
    allowOffers: raw.allowOffers ?? false,
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
    avatar: resolveMediaUrl(raw.avatar || raw.avatarUrl || raw.profilePicture || ''),
    avatarUrl: resolveMediaUrl(raw.avatarUrl || raw.avatar || raw.profilePicture || ''),
    fullName: raw.fullName || [raw.firstName || raw.firstname, raw.lastName || raw.lastname].filter(Boolean).join(' '),
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
    currency: raw.currency || 'ETB',
    status: raw.status || 'pending',
    shippingAddress: raw.shippingAddress || raw.address || {},
    firstname: raw.firstname || raw.firstName || raw.shippingAddress?.firstName,
    lastname: raw.lastname || raw.lastName || raw.shippingAddress?.lastName,
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
    avatar: resolveMediaUrl(raw.avatar || raw.avatarUrl || ''),
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
