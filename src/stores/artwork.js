import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/services/api';

export const useArtworkStore = defineStore('artwork', () => {
  const artworks = ref([]);
  const currentArtwork = ref(null);
  const loading = ref(false);
  const filters = ref({
    category: null,
    priceMin: null,
    priceMax: null,
    search: ''
  });

  const fetchArtworks = async (params = {}) => {
    loading.value = true;
    try {
      const response = await api.get('/artworks', { params: { ...filters.value, ...params } });
      artworks.value = response.data;
      return response.data;
    } finally {
      loading.value = false;
    }
  };

  const fetchArtworkById = async (id) => {
    loading.value = true;
    try {
      const response = await api.get(`/artworks/${id}`);
      currentArtwork.value = response.data;
      return response.data;
    } finally {
      loading.value = false;
    }
  };

  const createArtwork = async (artworkData) => {
    const response = await api.post('/artworks', artworkData);
    artworks.value.unshift(response.data);
    return response.data;
  };

  const updateArtwork = async (id, artworkData) => {
    const response = await api.put(`/artworks/${id}`, artworkData);
    const index = artworks.value.findIndex(a => a.id === id);
    if (index !== -1) artworks.value[index] = response.data;
    return response.data;
  };

  const deleteArtwork = async (id) => {
    await api.delete(`/artworks/${id}`);
    artworks.value = artworks.value.filter(a => a.id !== id);
  };

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters };
  };

  const clearFilters = () => {
    filters.value = {
      category: null,
      priceMin: null,
      priceMax: null,
      search: ''
    };
  };

  return {
    artworks,
    currentArtwork,
    loading,
    filters,
    fetchArtworks,
    fetchArtworkById,
    createArtwork,
    updateArtwork,
    deleteArtwork,
    setFilters,
    clearFilters
  };
});
