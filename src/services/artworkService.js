import api from './api';

export const artworkService = {
  getAll: (params) => api.get('/artworks', { params }),
  getById: (id) => api.get(`/artworks/${id}`),
  create: (data) => api.post('/artworks', data),
  update: (id, data) => api.put(`/artworks/${id}`, data),
  delete: (id) => api.delete(`/artworks/${id}`),
  upload: (formData) => api.post('/artworks/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  rate: (id, rating) => api.post(`/artworks/${id}/rate`, { rating }),
  getByCategory: (category) => api.get(`/artworks/category/${category}`),
  search: (query) => api.get('/artworks/search', { params: { q: query } }),
  getRecent: (limit = 10) => api.get('/artworks/recent', { params: { limit } })
};
