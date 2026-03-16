import { defineStore } from 'pinia';
import { ref } from 'vue';

// Dummy data with attractive online art images
const DUMMY_ARTWORKS = [
  {
    id: 1,
    artworkName: 'Starry Night Dreams',
    artworkDescription: 'A mesmerizing abstract piece inspired by celestial beauty',
    price: '$2,500',
    size: '24x36 inches',
    artworkCategory: 'Painting',
    averageRating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800'
  },
  {
    id: 2,
    artworkName: 'Urban Symphony',
    artworkDescription: 'Contemporary cityscape with vibrant colors and dynamic composition',
    price: '$3,200',
    size: '30x40 inches',
    artworkCategory: 'Painting',
    averageRating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800'
  },
  {
    id: 3,
    artworkName: 'Ethereal Bloom',
    artworkDescription: 'Delicate floral artwork with soft pastel tones',
    price: '$1,800',
    size: '20x30 inches',
    artworkCategory: 'Painting',
    averageRating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800'
  },
  {
    id: 4,
    artworkName: 'Modern Sculpture',
    artworkDescription: 'Contemporary metal sculpture with geometric forms',
    price: '$4,500',
    size: '18x12x24 inches',
    artworkCategory: 'Sculpture',
    averageRating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800'
  },
  {
    id: 5,
    artworkName: 'Ocean Whispers',
    artworkDescription: 'Serene seascape capturing the essence of coastal tranquility',
    price: '$2,800',
    size: '36x48 inches',
    artworkCategory: 'Painting',
    averageRating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800'
  },
  {
    id: 6,
    artworkName: 'Abstract Fusion',
    artworkDescription: 'Bold mixed media piece combining texture and color',
    price: '$3,500',
    size: '32x44 inches',
    artworkCategory: 'Mixed Art',
    averageRating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800'
  },
  {
    id: 7,
    artworkName: 'Golden Hour',
    artworkDescription: 'Warm landscape painting capturing sunset magic',
    price: '$2,200',
    size: '24x32 inches',
    artworkCategory: 'Painting',
    averageRating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800'
  },
  {
    id: 8,
    artworkName: 'Minimalist Form',
    artworkDescription: 'Clean lines and elegant simplicity in sculptural form',
    price: '$3,800',
    size: '15x10x20 inches',
    artworkCategory: 'Sculpture',
    averageRating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800'
  }
];

export const useArtworkStore = defineStore('artwork', () => {
  const artworks = ref([...DUMMY_ARTWORKS]);
  const currentArtwork = ref(null);
  const loading = ref(false);
  const filters = ref({
    category: null,
    priceMin: null,
    priceMax: null,
    search: ''
  });

  const fetchArtworks = async () => {
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 300));
    artworks.value = [...DUMMY_ARTWORKS];
    loading.value = false;
    return artworks.value;
  };

  const fetchArtworkById = async (id) => {
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 200));
    currentArtwork.value = DUMMY_ARTWORKS.find(a => a.id === id);
    loading.value = false;
    return currentArtwork.value;
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
    setFilters,
    clearFilters
  };
});
