import api from '@/services/api';

function wrap(method) {
  return async (...args) => {
    const response = await method(...args);
    return response.data !== undefined ? response.data : response;
  };
}

export const httpAdapter = {
  auth: {
    login: wrap((credentials) => api.post('/auth/login', credentials)),
    register: wrap((userData) => api.post('/auth/register', userData)),
    logout: wrap(() => api.post('/auth/logout')),
    forgotPassword: wrap((email) => api.post('/auth/forgot-password', { email })),
    confirmEmail: wrap((token) => api.get(`/auth/confirm/${token}`))
  },
  artwork: {
    getAll: wrap((params) => api.get('/artworks', { params })),
    getById: wrap((id) => api.get(`/artworks/${id}`)),
    create: wrap((data) => api.post('/artworks', data)),
    update: wrap((id, data) => api.put(`/artworks/${id}`, data)),
    delete: wrap((id) => api.delete(`/artworks/${id}`)),
    search: wrap((query) => api.get('/artworks/search', { params: { q: query } })),
    getRecent: wrap((limit) => api.get('/artworks/recent', { params: { limit } })),
    getByCategory: wrap((category) => api.get(`/artworks/category/${category}`)),
    rate: wrap((id, rating) => api.post(`/artworks/${id}/rate`, { rating })),
    getPending: wrap(() => api.get('/artworks/pending')),
    accept: wrap((id) => api.put(`/artworks/${id}/accept`)),
    reject: wrap((id) => api.put(`/artworks/${id}/reject`))
  },
  cart: {
    getAll: wrap(() => api.get('/cart')),
    add: wrap((artworkId, quantity) => api.post('/cart', { artworkId, quantity })),
    update: wrap((itemId, quantity) => api.put(`/cart/${itemId}`, { quantity })),
    remove: wrap((itemId) => api.delete(`/cart/${itemId}`)),
    clear: wrap(() => api.delete('/cart'))
  },
  wishlist: {
    getAll: wrap(() => api.get('/wishlist')),
    toggle: wrap((artwork) => api.post('/wishlist/save', artwork)),
    remove: wrap((id) => api.delete(`/wishlist/${id}`)),
    isInWishlist: wrap((artworkId) => api.get(`/wishlist/check/${artworkId}`))
  },
  order: {
    getAll: wrap(() => api.get('/orders')),
    getById: wrap((id) => api.get(`/orders/${id}`)),
    create: wrap((data) => api.post('/orders', data)),
    updateStatus: wrap((id, status) => api.put(`/orders/${id}/status`, { status }))
  },
  artist: {
    getAll: wrap(() => api.get('/artists')),
    getBySlug: wrap((slug) => api.get(`/artists/${slug}`)),
    follow: wrap((artistId) => api.post(`/artists/${artistId}/follow`)),
    unfollow: wrap((artistId) => api.delete(`/artists/${artistId}/follow`)),
    getFollowed: wrap(() => api.get('/artists/followed'))
  },
  auction: {
    getAll: wrap(() => api.get('/auctions')),
    getById: wrap((id) => api.get(`/auctions/${id}`)),
    create: wrap((data) => api.post('/auctions', data)),
    placeBid: wrap((auctionId, amount) => api.post(`/auctions/${auctionId}/bid`, { amount })),
    watch: wrap((auctionId) => api.post(`/auctions/${auctionId}/watch`)),
    unwatch: wrap((auctionId) => api.delete(`/auctions/${auctionId}/watch`))
  },
  competition: {
    getAll: wrap(() => api.get('/competitions')),
    create: wrap((data) => api.post('/competitions', data)),
    register: wrap((competitionId, artworkId) => api.post(`/competitions/${competitionId}/register`, { artworkId })),
    vote: wrap((competitionId, artworkId) => api.post(`/competitions/${competitionId}/vote`, { artworkId }))
  },
  event: {
    getAll: wrap(() => api.get('/events')),
    create: wrap((data) => api.post('/events', data)),
    update: wrap((id, data) => api.put(`/events/${id}`, data))
  },
  user: {
    getProfile: wrap(() => api.get('/user/profile')),
    updateProfile: wrap((data) => api.put('/user/profile', data)),
    getNotifications: wrap(() => api.get('/user/notifications')),
    markNotificationRead: wrap((id) => api.put(`/user/notifications/${id}/read`)),
    getAllUsers: wrap(() => api.get('/users/all')),
    deleteUser: wrap((id) => api.delete(`/users/${id}`))
  },
  message: {
    getThreads: wrap(() => api.get('/messages/threads')),
    getThread: wrap((threadId) => api.get(`/messages/threads/${threadId}`)),
    send: wrap((threadId, body) => api.post(`/messages/threads/${threadId}`, { body }))
  },
  review: {
    getByArtwork: wrap((artworkId) => api.get(`/artworks/${artworkId}/reviews`)),
    create: wrap((data) => api.post('/reviews', data))
  },
  offer: {
    getByArtwork: wrap((artworkId) => api.get(`/artworks/${artworkId}/offers`)),
    create: wrap((data) => api.post('/offers', data)),
    getPendingForArtist: wrap(() => api.get('/offers/pending'))
  },
  collection: {
    getAll: wrap(() => api.get('/collections')),
    getBySlug: wrap((slug) => api.get(`/collections/${slug}`))
  },
  moderation: {
    getQueue: wrap(() => api.get('/moderation/queue')),
    approve: wrap((id) => api.put(`/moderation/${id}/approve`)),
    reject: wrap((id) => api.put(`/moderation/${id}/reject`))
  },
  cms: {
    getConfig: wrap(() => api.get('/cms/config')),
    updateConfig: wrap((data) => api.put('/cms/config', data))
  }
};
