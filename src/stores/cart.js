import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/services/api';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  const loading = ref(false);

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0));

  const fetchCart = async () => {
    loading.value = true;
    try {
      const response = await api.get('/cart');
      items.value = response.data;
    } finally {
      loading.value = false;
    }
  };

  const addToCart = async (artwork, quantity = 1) => {
    const existingItem = items.value.find(item => item.artworkId === artwork.id);
    
    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + quantity);
    } else {
      const response = await api.post('/cart', { artworkId: artwork.id, quantity });
      items.value.push(response.data);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }
    
    const response = await api.put(`/cart/${itemId}`, { quantity });
    const index = items.value.findIndex(item => item.id === itemId);
    if (index !== -1) items.value[index] = response.data;
  };

  const removeFromCart = async (itemId) => {
    await api.delete(`/cart/${itemId}`);
    items.value = items.value.filter(item => item.id !== itemId);
  };

  const clearCart = async () => {
    await api.delete('/cart');
    items.value = [];
  };

  return {
    items,
    loading,
    itemCount,
    totalPrice,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };
});
