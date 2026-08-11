import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { cartService } from '@/services/cartService';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  const loading = ref(false);

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0));

  const fetchCart = async () => {
    loading.value = true;
    try {
      items.value = await cartService.getAll();
    } finally {
      loading.value = false;
    }
  };

  const addToCart = async (artwork, quantity = 1) => {
    await cartService.add(artwork.id, quantity);
    await fetchCart();
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }
    await cartService.update(itemId, quantity);
    await fetchCart();
  };

  const removeFromCart = async (itemId) => {
    await cartService.remove(itemId);
    await fetchCart();
  };

  const clearCart = async () => {
    await cartService.clear();
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
