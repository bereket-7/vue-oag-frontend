import { defineStore } from 'pinia';
import { ref } from 'vue';
import { artworkService } from '@/services/artworkService';
import { asList } from '@/utils/unwrap';

export const useArtworkStore = defineStore('artwork', () => {
  const artworks = ref([]);
  const currentArtwork = ref(null);
  const loading = ref(false);
  const filters = ref({
    category: null,
    priceMin: null,
    priceMax: null,
    search: '',
    sort: 'default'
  });

  const fetchArtworks = async (params = {}) => {
    loading.value = true;
    try {
      const merged = { ...filters.value, ...params };
      artworks.value = asList(await artworkService.getAll(merged));
      return artworks.value;
    } finally {
      loading.value = false;
    }
  };

  const fetchArtworkById = async (id) => {
    loading.value = true;
    try {
      currentArtwork.value = await artworkService.getById(id);
      return currentArtwork.value;
    } finally {
      loading.value = false;
    }
  };

  const searchArtworks = async (query) => {
    loading.value = true;
    try {
      artworks.value = asList(await artworkService.search(query));
      return artworks.value;
    } finally {
      loading.value = false;
    }
  };

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters };
  };

  const clearFilters = () => {
    filters.value = { category: null, priceMin: null, priceMax: null, search: '', sort: 'default' };
  };

  return {
    artworks,
    currentArtwork,
    loading,
    filters,
    fetchArtworks,
    fetchArtworkById,
    searchArtworks,
    setFilters,
    clearFilters
  };
});
