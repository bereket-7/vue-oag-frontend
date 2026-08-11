const STORAGE_KEYS = {
  cart: 'kelem_cart',
  wishlist: 'kelem_wishlist',
  orders: 'kelem_orders',
  offers: 'kelem_offers',
  reviews: 'kelem_reviews',
  followedArtists: 'kelem_followed_artists',
  cms: 'kelem_cms',
  auctions: 'kelem_auctions'
};

export function loadFromStorage(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export { STORAGE_KEYS };
