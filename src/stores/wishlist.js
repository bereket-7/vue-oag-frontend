import { defineStore } from 'pinia';
import { ref } from 'vue';
import { wishlistService } from '@/services/wishlistService';

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([]);
  const loading = ref(false);

  const fetchWishlist = async () => {
    loading.value = true;
    try {
      items.value = await wishlistService.getAll();
    } finally {
      loading.value = false;
    }
  };

  const toggleItem = async (artwork) => {
    items.value = await wishlistService.toggle(artwork);
    return items.value;
  };

  const removeItem = async (id) => {
    items.value = await wishlistService.remove(id);
  };

  const isInWishlist = (artworkId) => {
    return items.value.some((item) => item.artworkId === Number(artworkId));
  };

  return { items, loading, fetchWishlist, toggleItem, removeItem, isInWishlist };
});
