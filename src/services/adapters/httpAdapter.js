import api from '@/services/api';
import {
  unwrapEnvelope,
  isOtpEnvelope,
  asList,
  mapUserInfo
} from '@/utils/unwrap';
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

function wrap(method, { mapper, list = false } = {}) {
  return async (...args) => {
    const response = await method(...args);
    let data = unwrapEnvelope(response?.data);
    if (list) data = asList(data);
    if (data == null || !mapper) return data;
    if (Array.isArray(data)) return data.map(mapper);
    return mapper(data);
  };
}

function catalogParams(params = {}) {
  const query = {};
  if (params.page != null) query.page = params.page;
  if (params.size != null) query.size = params.size;
  const category = params.artworkCategory || params.category;
  if (category) query.artworkCategory = category;
  const minPrice = params.minPrice ?? params.priceMin;
  const maxPrice = params.maxPrice ?? params.priceMax;
  if (minPrice != null && minPrice !== '') query.minPrice = minPrice;
  if (maxPrice != null && maxPrice !== '') query.maxPrice = maxPrice;
  const sortBy = params.sortBy || (params.sort && params.sort !== 'default' ? params.sort : undefined);
  if (sortBy) query.sortBy = sortBy;
  const artworkName = params.artworkName || params.q || params.search;
  if (artworkName) query.artworkName = artworkName;
  return query;
}

async function parseAuthResponse(response, username) {
  const payload = response?.data;
  const content = unwrapEnvelope(payload);
  if (isOtpEnvelope(payload, content)) {
    return { requiresOtp: true, message: payload?.message, username };
  }
  return mapUserInfo(content);
}

export const httpAdapter = {
  auth: {
    async login(credentials) {
      const username = credentials.username || credentials.email;
      const response = await api.post('/auth/login', {
        username,
        password: credentials.password,
        channel: credentials.channel || 'EMAIL'
      });
      return parseAuthResponse(response, username);
    },
    async verifyLogin(data) {
      const response = await api.post('/auth/login/verify', {
        otp: data.otp,
        username: data.username,
        phone: data.phone || null,
        rememberMe: !!data.rememberMe,
        resendOtp: !!data.resendOtp,
        medium: data.medium || 'EMAIL'
      });
      return parseAuthResponse(response, data.username);
    },
    register: wrap((userData) => api.post('/auth/register', {
      firstName: userData.firstName || userData.firstname,
      lastName: userData.lastName || userData.lastname,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      phone: userData.phone,
      channel: userData.channel || 'EMAIL',
      role: userData.role || 'CUSTOMER',
      sex: userData.sex,
      age: userData.age != null && userData.age !== '' ? Number(userData.age) : undefined
    })),
    async verifyRegister(data) {
      const response = await api.post('/auth/register/verify', {
        otp: data.otp || data.confirmationCode,
        username: data.username || data.email,
        phone: data.phone || null,
        rememberMe: false,
        resendOtp: !!data.resendOtp,
        medium: data.medium || 'EMAIL'
      });
      return unwrapEnvelope(response.data);
    },
    logout: wrap(() => api.post('/auth/logout')),
    forgotPassword: wrap((email) => api.post('/auth/password/forgot', { email })),
    resetPassword: wrap((data) => api.post('/auth/password/reset', {
      otp: data.otp,
      email: data.email,
      password: data.password || data.newPassword,
      confirmPassword: data.confirmPassword || data.password || data.newPassword
    })),
    changePassword: wrap((data) => api.post('/auth/password/change', {
      currentPassword: data.currentPassword,
      password: data.password || data.newPassword,
      confirmPassword: data.confirmPassword || data.password || data.newPassword
    })),
    confirmRegistration: (data) => httpAdapter.auth.verifyRegister(data),
    confirmEmail: (data) => httpAdapter.auth.verifyRegister(typeof data === 'string' ? { otp: data } : data),
    refreshToken: wrap((refreshToken) => api.post('/auth/token/refresh', { refreshToken }))
  },
  artwork: {
    getAll: wrap((params) => api.get('/artworks', { params: catalogParams(params) }), { mapper: normalizeArtwork, list: true }),
    getById: wrap((id) => api.get(`/artworks/${id}`), { mapper: normalizeArtwork }),
    create: wrap((data) => api.post('/artworks', data), { mapper: normalizeArtwork }),
    update: wrap((id, data) => api.patch(`/artworks/${id}`, data), { mapper: normalizeArtwork }),
    delete: wrap((id) => api.delete(`/artworks/${id}`)),
    search: wrap((query) => api.get('/artworks/search', { params: { artworkName: query } }), { mapper: normalizeArtwork, list: true }),
    getRecent: wrap((limit) => api.get('/artworks/recent', { params: limit ? { size: limit } : undefined }), { mapper: normalizeArtwork, list: true }),
    getByCategory: wrap((category) => api.get('/artworks', { params: { artworkCategory: category } }), { mapper: normalizeArtwork, list: true }),
    rate: wrap((id, rating) => api.post('/ratings', { artworkId: id, ratingValue: rating })),
    getPending: wrap(() => api.get('/moderation/queue'), { mapper: normalizeArtwork, list: true }),
    accept: wrap((id) => api.put(`/moderation/${id}/approve`)),
    reject: wrap((id, reason) => api.put(`/moderation/${id}/reject`, { rejectionReason: reason || 'Rejected' })),
    getByPriceRange: wrap((minPrice, maxPrice) => api.get('/artworks', { params: { minPrice, maxPrice } }), { mapper: normalizeArtwork, list: true }),
    sort: wrap((sortOption) => api.get('/artworks', { params: { sortBy: sortOption } }), { mapper: normalizeArtwork, list: true })
  },
  cart: {
    getAll: wrap(() => api.get('/cart'), { mapper: normalizeCartItem, list: true }),
    add: wrap((artworkId, quantity = 1) => api.post('/cart', { artworkId, quantity }), { mapper: normalizeCartItem, list: true }),
    update: wrap((itemId, quantity) => api.patch(`/cart/${itemId}`, { quantity }), { mapper: normalizeCartItem, list: true }),
    remove: wrap((itemId) => api.delete(`/cart/${itemId}`), { mapper: normalizeCartItem, list: true }),
    clear: wrap(() => api.delete('/cart'), { list: true })
  },
  wishlist: {
    getAll: wrap(() => api.get('/wishlist'), { mapper: normalizeWishlistItem, list: true }),
    async toggle(artwork) {
      const artworkId = artwork?.id ?? artwork;
      const check = unwrapEnvelope((await api.get(`/wishlist/check/${artworkId}`)).data);
      if (check?.inWishlist) {
        await api.delete(`/wishlist/${check.id}`);
      } else {
        await api.post(`/wishlist/${artworkId}`);
      }
      const list = unwrapEnvelope((await api.get('/wishlist')).data);
      return asList(list).map(normalizeWishlistItem);
    },
    remove: wrap((id) => api.delete(`/wishlist/${id}`), { mapper: normalizeWishlistItem, list: true }),
    async isInWishlist(artworkId) {
      const data = unwrapEnvelope((await api.get(`/wishlist/check/${artworkId}`)).data);
      return !!(data?.inWishlist);
    }
  },
  order: {
    getAll: wrap(() => api.get('/orders'), { mapper: normalizeOrder, list: true }),
    getById: wrap((id) => api.get(`/orders/${id}`), { mapper: normalizeOrder }),
    create: wrap((data) => api.post('/orders', data), { mapper: normalizeOrder }),
    updateStatus: wrap((id, status) => api.put(`/orders/${id}/status`, { status }), { mapper: normalizeOrder })
  },
  checkout: {
    initiate: wrap((orderRequest) => api.post('/checkout', orderRequest))
  },
  artist: {
    getAll: wrap(() => api.get('/artists'), { mapper: normalizeArtist, list: true }),
    getBySlug: wrap((slug) => api.get(`/artists/${slug}`), { mapper: normalizeArtist }),
    follow: wrap((artistId) => api.post(`/artists/${artistId}/follow`)),
    unfollow: wrap((artistId) => api.delete(`/artists/${artistId}/follow`)),
    getFollowed: wrap(() => api.get('/artists/followed'), { mapper: normalizeArtist, list: true })
  },
  auction: {
    getAll: wrap(() => api.get('/auctions'), { mapper: normalizeAuction, list: true }),
    getById: wrap((id) => api.get(`/auctions/${id}`), { mapper: normalizeAuction }),
    create: wrap((data) => api.post('/auctions', data), { mapper: normalizeAuction }),
    placeBid: wrap((auctionId, amount) => api.post(`/auctions/${auctionId}/bid`, { amount }), { mapper: normalizeAuction }),
    watch: wrap((auctionId) => api.post(`/auctions/${auctionId}/watch`)),
    unwatch: wrap((auctionId) => api.delete(`/auctions/${auctionId}/watch`))
  },
  competition: {
    getAll: wrap(() => api.get('/competitions'), { list: true }),
    create: wrap((data) => api.post('/competitions', data)),
    register: wrap((competitionId, artworkId) => api.post('/competitors/register', { competitionId, artworkId })),
    vote: wrap((competitionId, competitorId) => api.post('/competitors/vote', { competitionId, competitorId })),
    getCompetitors: wrap(() => api.get('/competition-competitor-data'), { list: true })
  },
  event: {
    getAll: wrap(() => api.get('/events'), { list: true }),
    create: wrap((data) => api.post('/events', data)),
    update: wrap((id, data) => api.put(`/events/${id}`, data)),
    getPending: wrap(() => api.get('/events', { params: { status: 'PENDING' } }), { list: true }),
    accept: wrap((id) => api.patch(`/events/change/status/${id}`, null, { params: { status: 'ACCEPTED' } })),
    reject: wrap((id) => api.patch(`/events/change/status/${id}`, null, { params: { status: 'REJECTED' } })),
    purchaseTicket: wrap((eventId) => api.post(`/event-tickets/${eventId}`))
  },
  user: {
    getProfile: wrap(() => api.get('/users/me'), { mapper: normalizeUser }),
    updateProfile: wrap((data) => api.patch('/users/me', {
      firstName: data.firstName || data.firstname,
      lastName: data.lastName || data.lastname,
      phone: data.phone,
      address: data.address,
      bio: data.bio,
      age: data.age,
      sex: data.sex
    }), { mapper: normalizeUser }),
    getNotifications: wrap(() => api.get('/users/me/notifications'), { mapper: normalizeNotification, list: true }),
    markNotificationRead: wrap((id) => api.patch(`/users/me/notifications/${id}/read`), { mapper: normalizeNotification }),
    getAllUsers: wrap(() => api.get('/admin/users/all'), { mapper: normalizeUser, list: true }),
    deleteUser: wrap((id) => api.delete(`/users/${id}`)),
    getByRole: wrap((role) => api.get('/admin/users/role', { params: { uuid: `ROLE_${String(role).toUpperCase()}` } }), { mapper: normalizeUser, list: true }),
    deleteMany: wrap((ids) => api.delete('/users', { data: { ids } })),
    uploadPhoto: wrap((formData) => api.post('/users/me/photo', formData), { mapper: normalizeUser }),
    getPhoto: wrap(() => api.get('/users/me'), { mapper: normalizeUser }),
    sendNotification: wrap((data) => api.post('/notifications/send', data))
  },
  message: {
    getThreads: wrap(() => api.get('/messages/threads'), { list: true }),
    getThread: wrap((threadId) => api.get(`/messages/threads/${threadId}`), {
      mapper: (thread) => {
        const msgs = Array.isArray(thread) ? thread : (thread?.messages || []);
        return msgs.map(normalizeMessage);
      }
    }),
    send: wrap((threadId, body) => api.post(`/messages/threads/${threadId}`, { body }), { mapper: normalizeMessage }),
    startThread: wrap((data) => api.post('/messages/threads', data))
  },
  review: {
    getByArtwork: wrap((artworkId) => api.get(`/artworks/${artworkId}/reviews`), { mapper: normalizeReview, list: true }),
    create: wrap((data) => api.post(`/artworks/${data.artworkId}/reviews`, { rating: data.rating, comment: data.comment }), { mapper: normalizeReview })
  },
  offer: {
    getByArtwork: wrap((artworkId) => api.get(`/offers/artwork/${artworkId}`), { list: true }),
    create: wrap((data) => api.post('/offers', data)),
    getPendingForArtist: wrap(() => api.get('/offers/pending'), { list: true }),
    accept: wrap((id) => api.post(`/offers/${id}/accept`))
  },
  collection: {
    getAll: wrap(() => api.get('/collections'), { list: true }),
    getBySlug: wrap((slug) => api.get(`/collections/${slug}`))
  },
  moderation: {
    getQueue: wrap(() => api.get('/moderation/queue'), { list: true }),
    approve: wrap((id) => api.put(`/moderation/${id}/approve`)),
    reject: wrap((id, reason) => api.put(`/moderation/${id}/reject`, { rejectionReason: reason || 'Rejected' }))
  },
  cms: {
    getConfig: wrap(() => api.get('/cms/config')),
    updateConfig: wrap((data) => api.put('/cms/config', data)),
    sendContact: wrap((data) => api.post('/contact', data))
  },
  report: {
    create: wrap((data) => api.post('/report/create', data)),
    getAll: wrap(() => api.get('/report/all'), { list: true })
  },
  standard: {
    getAll: wrap(() => api.get('/standards'), { list: true }),
    create: wrap((data) => api.post('/standards', data)),
    delete: wrap((id) => api.delete(`/standards/${id}`))
  }
};
