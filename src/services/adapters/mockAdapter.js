import { delay } from '@/mocks/mockDelay';
import { RAW_ARTWORKS } from '@/mocks/artworks';
import { MOCK_USERS } from '@/mocks/users';
import { MOCK_ARTISTS } from '@/mocks/artists';
import { MOCK_ORDERS } from '@/mocks/orders';
import { MOCK_AUCTIONS } from '@/mocks/auctions';
import { MOCK_COMPETITIONS, MOCK_EVENTS } from '@/mocks/competitions';
import { MOCK_NOTIFICATIONS, MOCK_MESSAGES, MOCK_REVIEWS, MOCK_COLLECTIONS, MOCK_OFFERS, MOCK_MODERATION_QUEUE } from '@/mocks/notifications';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/mocks/storage';
import {
  normalizeArtwork,
  normalizeUser,
  normalizeCartItem,
  normalizeWishlistItem,
  normalizeOrder,
  normalizeArtist,
  normalizeAuction,
  normalizeNotification,
  normalizeMessage,
  normalizeReview
} from '@/utils/normalizers';
import { calculateShipping, calculateTax } from '@/utils/currency';

let artworks = RAW_ARTWORKS.map(normalizeArtwork);
let orders = [...MOCK_ORDERS];
let auctions = MOCK_AUCTIONS.map((a) => normalizeAuction({ ...a, artwork: artworks.find((art) => art.id === a.artworkId) }));
let reviews = [...MOCK_REVIEWS];
let offers = [...MOCK_OFFERS];
let competitions = [...MOCK_COMPETITIONS];
let events = [...MOCK_EVENTS];
let notifications = [...MOCK_NOTIFICATIONS];
let messages = [...MOCK_MESSAGES];
let moderationQueue = [...MOCK_MODERATION_QUEUE];

function getCart() {
  return loadFromStorage(STORAGE_KEYS.cart, []);
}

function getWishlist() {
  return loadFromStorage(STORAGE_KEYS.wishlist, []);
}

function filterArtworks(params = {}) {
  let result = [...artworks];
  if (params.category) result = result.filter((a) => a.category === params.category);
  if (params.q || params.search) {
    const q = (params.q || params.search).toLowerCase();
    result = result.filter((a) =>
      a.title.toLowerCase().includes(q) ||
      a.artistName.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
    );
  }
  if (params.minPrice) result = result.filter((a) => a.price >= Number(params.minPrice));
  if (params.maxPrice) result = result.filter((a) => a.price <= Number(params.maxPrice));
  if (params.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
  if (params.sort === 'price-desc') result.sort((a, b) => b.price - a.price);
  if (params.sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  if (params.sort === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return result;
}

export const mockAdapter = {
  auth: {
    async login(credentials) {
      await delay(400);
      const user = MOCK_USERS.find(
        (u) =>
          (u.username === credentials.username || u.email === credentials.username) &&
          u.password === credentials.password
      );
      if (!user) throw new Error('Invalid credentials');
      const { password: _pw, ...safeUser } = user;
      return {
        token: `mock-jwt-${user.id}`,
        accessToken: `mock-jwt-${user.id}`,
        user: normalizeUser(safeUser),
        role: user.role
      };
    },
    async register(userData) {
      await delay(500);
      void userData;
      return { success: true, message: 'Registration successful. Please confirm your email.' };
    },
    async logout() {
      await delay(200);
      return { success: true };
    },
    async forgotPassword() {
      await delay(300);
      return { success: true };
    },
    async confirmEmail() {
      await delay(300);
      return { success: true };
    },
    async changePassword({ currentPassword, newPassword }) {
      await delay(400);
      void currentPassword;
      void newPassword;
      return { success: true, message: 'Password updated successfully' };
    }
  },

  artwork: {
    async getAll(params) {
      await delay(300);
      return filterArtworks(params);
    },
    async getById(id) {
      await delay(200);
      const artwork = artworks.find((a) => a.id === Number(id));
      if (!artwork) throw new Error('Artwork not found');
      return artwork;
    },
    async create(data) {
      await delay(400);
      const newArtwork = normalizeArtwork({ ...data, id: artworks.length + 1, status: 'pending' });
      artworks.unshift(newArtwork);
      return newArtwork;
    },
    async update(id, data) {
      await delay(300);
      const idx = artworks.findIndex((a) => a.id === Number(id));
      if (idx === -1) throw new Error('Artwork not found');
      artworks[idx] = normalizeArtwork({ ...artworks[idx], ...data });
      return artworks[idx];
    },
    async delete(id) {
      await delay(200);
      artworks = artworks.filter((a) => a.id !== Number(id));
      return { success: true };
    },
    async search(query) {
      await delay(250);
      return filterArtworks({ q: query });
    },
    async getRecent(limit = 10) {
      await delay(200);
      return artworks.filter((a) => a.isNew).slice(0, limit);
    },
    async getByCategory(category) {
      await delay(200);
      return filterArtworks({ category });
    },
    async rate(id, rating) {
      await delay(200);
      const artwork = artworks.find((a) => a.id === Number(id));
      if (artwork) artwork.rating = rating;
      return artwork;
    },
    async getPending() {
      await delay(200);
      return artworks.filter((a) => a.status === 'pending');
    },
    async accept(id) {
      return mockAdapter.artwork.update(id, { status: 'published' });
    },
    async reject(id) {
      return mockAdapter.artwork.update(id, { status: 'rejected' });
    }
  },

  cart: {
    async getAll() {
      await delay(200);
      return getCart().map(normalizeCartItem);
    },
    async add(artworkId, quantity = 1) {
      await delay(200);
      const artwork = artworks.find((a) => a.id === Number(artworkId));
      if (!artwork) throw new Error('Artwork not found');
      const cart = getCart();
      const existing = cart.find((i) => i.artworkId === artwork.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push(normalizeCartItem({ artworkId: artwork.id, artwork, quantity }));
      }
      saveToStorage(STORAGE_KEYS.cart, cart);
      return cart.map(normalizeCartItem);
    },
    async update(itemId, quantity) {
      await delay(200);
      let cart = getCart();
      if (quantity <= 0) {
        cart = cart.filter((i) => i.id !== itemId);
      } else {
        const item = cart.find((i) => i.id === itemId);
        if (item) item.quantity = quantity;
      }
      saveToStorage(STORAGE_KEYS.cart, cart);
      return cart.map(normalizeCartItem);
    },
    async remove(itemId) {
      await delay(200);
      const cart = getCart().filter((i) => i.id !== itemId);
      saveToStorage(STORAGE_KEYS.cart, cart);
      return cart.map(normalizeCartItem);
    },
    async clear() {
      await delay(100);
      saveToStorage(STORAGE_KEYS.cart, []);
      return [];
    }
  },

  wishlist: {
    async getAll() {
      await delay(200);
      return getWishlist().map(normalizeWishlistItem);
    },
    async toggle(artwork) {
      await delay(200);
      const normalized = normalizeArtwork(artwork);
      let list = getWishlist();
      const exists = list.find((i) => i.artworkId === normalized.id);
      if (exists) {
        list = list.filter((i) => i.artworkId !== normalized.id);
      } else {
        list.push(normalizeWishlistItem({ artworkId: normalized.id, artwork: normalized }));
      }
      saveToStorage(STORAGE_KEYS.wishlist, list);
      return list.map(normalizeWishlistItem);
    },
    async remove(id) {
      await delay(200);
      const list = getWishlist().filter((i) => i.id !== id);
      saveToStorage(STORAGE_KEYS.wishlist, list);
      return list.map(normalizeWishlistItem);
    },
    async isInWishlist(artworkId) {
      return getWishlist().some((i) => i.artworkId === Number(artworkId));
    }
  },

  order: {
    async getAll(userId) {
      await delay(300);
      const stored = loadFromStorage(STORAGE_KEYS.orders, orders);
      return stored.filter((o) => !userId || o.userId === userId).map(normalizeOrder);
    },
    async getById(id) {
      await delay(200);
      const stored = loadFromStorage(STORAGE_KEYS.orders, orders);
      const order = stored.find((o) => o.id === id);
      if (!order) throw new Error('Order not found');
      return normalizeOrder(order);
    },
    async create(orderData) {
      await delay(400);
      const subtotal = orderData.items.reduce((s, i) => s + i.price * i.quantity, 0);
      const shipping = calculateShipping(subtotal);
      const tax = calculateTax(subtotal);
      const newOrder = normalizeOrder({
        id: `ord-${Date.now()}`,
        ...orderData,
        subtotal,
        shipping,
        tax,
        total: subtotal + shipping + tax,
        status: 'paid',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      const stored = loadFromStorage(STORAGE_KEYS.orders, orders);
      stored.unshift(newOrder);
      saveToStorage(STORAGE_KEYS.orders, stored);
      orders = stored;
      await mockAdapter.cart.clear();
      return newOrder;
    },
    async updateStatus(id, status) {
      await delay(200);
      const stored = loadFromStorage(STORAGE_KEYS.orders, orders);
      const order = stored.find((o) => o.id === id);
      if (order) {
        order.status = status;
        order.updatedAt = new Date().toISOString();
      }
      saveToStorage(STORAGE_KEYS.orders, stored);
      return normalizeOrder(order);
    }
  },

  artist: {
    async getAll() {
      await delay(200);
      return MOCK_ARTISTS.map(normalizeArtist);
    },
    async getBySlug(slug) {
      await delay(200);
      const artist = MOCK_ARTISTS.find((a) => a.slug === slug);
      if (!artist) throw new Error('Artist not found');
      const normalized = normalizeArtist(artist);
      normalized.artworks = artworks.filter((a) => artist.artworkIds.includes(a.id));
      return normalized;
    },
    async follow(artistId, _userId) {
      await delay(200);
      const followed = loadFromStorage(STORAGE_KEYS.followedArtists, []);
      if (!followed.includes(artistId)) followed.push(artistId);
      saveToStorage(STORAGE_KEYS.followedArtists, followed);
      return followed;
    },
    async unfollow(artistId) {
      await delay(200);
      const followed = loadFromStorage(STORAGE_KEYS.followedArtists, []).filter((id) => id !== artistId);
      saveToStorage(STORAGE_KEYS.followedArtists, followed);
      return followed;
    },
    async getFollowed() {
      await delay(200);
      const ids = loadFromStorage(STORAGE_KEYS.followedArtists, []);
      return MOCK_ARTISTS.filter((a) => ids.includes(a.id)).map(normalizeArtist);
    }
  },

  auction: {
    async getAll() {
      await delay(300);
      return auctions.map((a) => normalizeAuction({ ...a, artwork: artworks.find((art) => art.id === a.artworkId) }));
    },
    async getById(id) {
      await delay(200);
      const auction = auctions.find((a) => a.id === id);
      if (!auction) throw new Error('Auction not found');
      return normalizeAuction({ ...auction, artwork: artworks.find((art) => art.id === auction.artworkId) });
    },
    async create(data) {
      await delay(400);
      const newAuction = normalizeAuction({ id: `auc-${Date.now()}`, ...data, status: 'active', bidHistory: [], watchedBy: [] });
      auctions.unshift(newAuction);
      return newAuction;
    },
    async placeBid(auctionId, userId, userName, amount) {
      await delay(300);
      const auction = auctions.find((a) => a.id === auctionId);
      if (!auction) throw new Error('Auction not found');
      if (amount < auction.currentBid + auction.minIncrement) {
        throw new Error(`Bid must be at least ${auction.currentBid + auction.minIncrement}`);
      }
      auction.currentBid = amount;
      auction.bidHistory.unshift({ id: `bid-${Date.now()}`, userId, userName, amount, createdAt: new Date().toISOString() });
      return normalizeAuction(auction);
    },
    async watch(auctionId, userId) {
      await delay(200);
      const auction = auctions.find((a) => a.id === auctionId);
      if (auction && !auction.watchedBy.includes(userId)) auction.watchedBy.push(userId);
      return auction;
    },
    async unwatch(auctionId, userId) {
      await delay(200);
      const auction = auctions.find((a) => a.id === auctionId);
      if (auction) auction.watchedBy = auction.watchedBy.filter((id) => id !== userId);
      return auction;
    }
  },

  competition: {
    async getAll() {
      await delay(200);
      return competitions;
    },
    async create(data) {
      await delay(300);
      const comp = { id: competitions.length + 1, ...data, entries: 0, status: 'active' };
      competitions.unshift(comp);
      return comp;
    },
    async register(competitionId, artworkId) {
      await delay(300);
      void competitionId;
      void artworkId;
      return { success: true, competitionId, artworkId };
    },
    async vote(_competitionId, _artworkId) {
      await delay(200);
      void _competitionId;
      void _artworkId;
      return { success: true };
    }
  },

  event: {
    async getAll() {
      await delay(200);
      return events;
    },
    async create(data) {
      await delay(300);
      const event = { id: events.length + 1, ...data, status: 'pending' };
      events.unshift(event);
      return event;
    },
    async update(id, data) {
      await delay(300);
      const idx = events.findIndex((e) => e.id === Number(id));
      if (idx !== -1) events[idx] = { ...events[idx], ...data };
      return events[idx];
    }
  },

  user: {
    async getProfile(userId) {
      await delay(200);
      const user = MOCK_USERS.find((u) => u.id === userId);
      if (!user) throw new Error('User not found');
      const { password: _pwd, ...safe } = user;
      void _pwd;
      return normalizeUser(safe);
    },
    async updateProfile(userId, data) {
      await delay(300);
      return normalizeUser({ ...MOCK_USERS.find((u) => u.id === userId), ...data });
    },
    async getNotifications() {
      await delay(200);
      return notifications.map(normalizeNotification);
    },
    async markNotificationRead(id) {
      await delay(100);
      const n = notifications.find((notif) => notif.id === id);
      if (n) n.read = true;
      return n;
    },
    async getAllUsers() {
      await delay(300);
      return MOCK_USERS.map((u) => {
        const { password: _p, ...safe } = u;
        void _p;
        return normalizeUser(safe);
      });
    },
    async deleteUser(_id) {
      await delay(200);
      void _id;
      return { success: true };
    }
  },

  message: {
    async getThreads() {
      await delay(200);
      const threadIds = [...new Set(messages.map((m) => m.threadId))];
      return threadIds.map((threadId) => {
        const msgs = messages.filter((m) => m.threadId === threadId);
        return { threadId, lastMessage: msgs[msgs.length - 1], unread: msgs.filter((m) => !m.read).length };
      });
    },
    async getThread(threadId) {
      await delay(200);
      return messages.filter((m) => m.threadId === threadId).map(normalizeMessage);
    },
    async send(threadId, senderId, senderName, body) {
      await delay(300);
      const msg = normalizeMessage({ id: messages.length + 1, threadId, senderId, senderName, body, read: false });
      messages.push(msg);
      return msg;
    }
  },

  review: {
    async getByArtwork(artworkId) {
      await delay(200);
      return reviews.filter((r) => r.artworkId === Number(artworkId)).map(normalizeReview);
    },
    async create(data) {
      await delay(300);
      const review = normalizeReview({ id: reviews.length + 1, ...data });
      reviews.push(review);
      return review;
    }
  },

  offer: {
    async getByArtwork(artworkId) {
      await delay(200);
      return offers.filter((o) => o.artworkId === Number(artworkId));
    },
    async create(data) {
      await delay(300);
      const offer = { id: `offer-${Date.now()}`, ...data, status: 'pending', createdAt: new Date().toISOString() };
      offers.push(offer);
      saveToStorage(STORAGE_KEYS.offers, offers);
      return offer;
    },
    async getPendingForArtist(artistId) {
      await delay(200);
      const artistArtworkIds = artworks.filter((a) => a.artistId === artistId).map((a) => a.id);
      return offers.filter((o) => artistArtworkIds.includes(o.artworkId) && o.status === 'pending');
    }
  },

  collection: {
    async getAll() {
      await delay(200);
      return MOCK_COLLECTIONS;
    },
    async getBySlug(slug) {
      await delay(200);
      const collection = MOCK_COLLECTIONS.find((c) => c.slug === slug);
      if (!collection) throw new Error('Collection not found');
      return { ...collection, artworks: artworks.filter((a) => collection.artworkIds.includes(a.id)) };
    }
  },

  moderation: {
    async getQueue() {
      await delay(200);
      return moderationQueue;
    },
    async approve(id) {
      await delay(200);
      const item = moderationQueue.find((m) => m.id === id);
      if (item) item.status = 'approved';
      return item;
    },
    async reject(id) {
      await delay(200);
      const item = moderationQueue.find((m) => m.id === id);
      if (item) item.status = 'rejected';
      return item;
    }
  },

  cms: {
    async getConfig() {
      await delay(100);
      return loadFromStorage(STORAGE_KEYS.cms, {
        heroTitle: 'Discover Extraordinary Art',
        heroSubtitle: 'Curated collections from talented artists worldwide',
        commissionRate: 15,
        featuredArtistIds: [1, 2, 5]
      });
    },
    async updateConfig(data) {
      await delay(200);
      const config = { ...(await mockAdapter.cms.getConfig()), ...data };
      saveToStorage(STORAGE_KEYS.cms, config);
      return config;
    }
  }
};
