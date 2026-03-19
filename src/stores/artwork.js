import { defineStore } from 'pinia';
import { ref } from 'vue';

// Dummy data with attractive online art images
const DUMMY_ARTWORKS = [
  {
    id: 1,
    artworkName: 'Starry Night Dreams',
    artworkDescription: 'A mesmerizing abstract piece inspired by celestial beauty and the infinite cosmos above us.',
    price: '$2,500', size: '24x36 inches', artworkCategory: 'Painting', averageRating: 4.8,
    artist: 'Elena Rodriguez', year: 2024, isNew: true,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80'
  },
  {
    id: 2,
    artworkName: 'Urban Symphony',
    artworkDescription: 'Contemporary cityscape with vibrant colors and dynamic composition capturing city life.',
    price: '$3,200', size: '30x40 inches', artworkCategory: 'Painting', averageRating: 4.9,
    artist: 'Marcus Chen', year: 2024, isNew: true,
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80'
  },
  {
    id: 3,
    artworkName: 'Ethereal Bloom',
    artworkDescription: 'Delicate floral artwork with soft pastel tones evoking spring and renewal.',
    price: '$1,800', size: '20x30 inches', artworkCategory: 'Painting', averageRating: 4.7,
    artist: 'Sophie Laurent', year: 2024, isNew: true,
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80'
  },
  {
    id: 4,
    artworkName: 'Modern Sculpture',
    artworkDescription: 'Contemporary metal sculpture with geometric forms exploring space and balance.',
    price: '$4,500', size: '18x12x24 inches', artworkCategory: 'Sculpture', averageRating: 4.6,
    artist: 'James Mitchell', year: 2023, isNew: false,
    imageUrl: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&q=80'
  },
  {
    id: 5,
    artworkName: 'Ocean Whispers',
    artworkDescription: 'Serene seascape capturing the essence of coastal tranquility at dawn.',
    price: '$2,800', size: '36x48 inches', artworkCategory: 'Painting', averageRating: 4.9,
    artist: 'Amara Diallo', year: 2024, isNew: true,
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80'
  },
  {
    id: 6,
    artworkName: 'Abstract Fusion',
    artworkDescription: 'Bold mixed media piece combining texture, color and raw emotion on canvas.',
    price: '$3,500', size: '32x44 inches', artworkCategory: 'Mixed Art', averageRating: 4.8,
    artist: 'Yuki Tanaka', year: 2024, isNew: true,
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80'
  },
  {
    id: 7,
    artworkName: 'Golden Hour',
    artworkDescription: 'Warm landscape painting capturing the fleeting magic of sunset over rolling hills.',
    price: '$2,200', size: '24x32 inches', artworkCategory: 'Painting', averageRating: 4.7,
    artist: 'Lena Müller', year: 2023, isNew: false,
    imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80'
  },
  {
    id: 8,
    artworkName: 'Minimalist Form',
    artworkDescription: 'Clean lines and elegant simplicity in sculptural form — less is more.',
    price: '$3,800', size: '15x10x20 inches', artworkCategory: 'Sculpture', averageRating: 4.5,
    artist: 'Carlos Vega', year: 2023, isNew: false,
    imageUrl: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80'
  },
  {
    id: 9,
    artworkName: 'Crimson Tide',
    artworkDescription: 'Powerful expressionist work in deep reds and blacks, raw and visceral.',
    price: '$4,100', size: '40x50 inches', artworkCategory: 'Painting', averageRating: 4.9,
    artist: 'Fatima Al-Hassan', year: 2024, isNew: true,
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80'
  },
  {
    id: 10,
    artworkName: 'Whispers of Light',
    artworkDescription: 'Impressionist study of light filtering through ancient forest canopy.',
    price: '$1,950', size: '18x24 inches', artworkCategory: 'Painting', averageRating: 4.6,
    artist: 'Noah Williams', year: 2024, isNew: true,
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80'
  },
  {
    id: 11,
    artworkName: 'Digital Reverie',
    artworkDescription: 'Surreal digital art print exploring the boundary between dreams and reality.',
    price: '$900', size: '20x28 inches', artworkCategory: 'Digital Art', averageRating: 4.7,
    artist: 'Priya Sharma', year: 2024, isNew: true,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
  },
  {
    id: 12,
    artworkName: 'Terra Firma',
    artworkDescription: 'Earthy ceramic sculpture celebrating the raw beauty of natural materials.',
    price: '$2,600', size: '12x8x16 inches', artworkCategory: 'Sculpture', averageRating: 4.8,
    artist: 'Kwame Asante', year: 2023, isNew: false,
    imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80'
  },
  {
    id: 13,
    artworkName: 'Neon Genesis',
    artworkDescription: 'Vibrant mixed media work fusing street art energy with fine art technique.',
    price: '$3,100', size: '36x36 inches', artworkCategory: 'Mixed Art', averageRating: 4.9,
    artist: 'Zara Okonkwo', year: 2024, isNew: true,
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80'
  },
  {
    id: 14,
    artworkName: 'Silent Garden',
    artworkDescription: 'Meditative watercolor capturing the stillness of a Japanese zen garden.',
    price: '$1,600', size: '16x20 inches', artworkCategory: 'Painting', averageRating: 4.5,
    artist: 'Hana Kobayashi', year: 2024, isNew: true,
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80'
  },
  {
    id: 15,
    artworkName: 'Fractured Light',
    artworkDescription: 'Glass and steel installation exploring how light transforms space.',
    price: '$6,200', size: '24x24x36 inches', artworkCategory: 'Sculpture', averageRating: 4.9,
    artist: 'Ivan Petrov', year: 2024, isNew: true,
    imageUrl: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=800&q=80'
  },
  {
    id: 16,
    artworkName: 'Ancestral Echoes',
    artworkDescription: 'Rich tapestry of cultural symbols woven into a powerful visual narrative.',
    price: '$2,900', size: '28x40 inches', artworkCategory: 'Mixed Art', averageRating: 4.8,
    artist: 'Amara Diallo', year: 2023, isNew: false,
    imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80'
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
