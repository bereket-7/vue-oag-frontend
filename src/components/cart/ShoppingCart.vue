<template>
  <div class="container mx-auto px-4 py-8 mt-20">
    <h2 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>

    <LoadingSpinner v-if="loading" size="lg" text="Loading cart..." />

    <div v-else-if="cartItems.length === 0" class="text-center py-12">
      <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
      <p class="mt-2 text-gray-500">Start adding some artworks!</p>
      <router-link to="/allArtwork">
        <BaseButton variant="primary" class="mt-6">Browse Artworks</BaseButton>
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-4">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="bg-white rounded-xl shadow-md p-6 flex gap-6"
        >
          <img
            :src="item.imageUrl"
            :alt="item.title"
            class="w-32 h-32 object-cover rounded-lg"
          />
          
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900">{{ item.title }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ item.artistName }}</p>
            <p class="text-xl font-bold text-gray-900 mt-2">${{ item.price }}</p>
            
            <div class="flex items-center gap-4 mt-4">
              <div class="flex items-center border border-gray-300 rounded-lg">
                <button
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span class="px-4 py-1 border-x border-gray-300">{{ item.quantity }}</span>
                <button
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button
                @click="removeItem(item.id)"
                class="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
          
          <div class="text-right">
            <p class="text-lg font-bold text-gray-900">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-md p-6 sticky top-24">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          
          <div class="space-y-3 mb-4">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal ({{ itemCount }} items)</span>
              <span>${{ totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${{ totalPrice.toFixed(2) }}</span>
            </div>
          </div>

          <BaseButton
            variant="primary"
            size="lg"
            full-width
            @click="proceedToCheckout"
          >
            Proceed to Checkout
          </BaseButton>

          <BaseButton
            variant="outline"
            size="md"
            full-width
            class="mt-3"
            @click="continueShopping"
          >
            Continue Shopping
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useNotification } from '@/composables/useNotification';
import { BaseButton, LoadingSpinner } from '@/components/common';

const router = useRouter();
const cartStore = useCartStore();
const { success, error: showError } = useNotification();

const loading = ref(false);

const cartItems = computed(() => cartStore.items);
const itemCount = computed(() => cartStore.itemCount);
const totalPrice = computed(() => cartStore.totalPrice);

const fetchCart = async () => {
  loading.value = true;
  try {
    await cartStore.fetchCart();
  } catch (err) {
    showError('Failed to load cart');
  } finally {
    loading.value = false;
  }
};

const updateQuantity = async (itemId, quantity) => {
  try {
    await cartStore.updateQuantity(itemId, quantity);
    success('Cart updated');
  } catch (err) {
    showError('Failed to update quantity');
  }
};

const removeItem = async (itemId) => {
  try {
    await cartStore.removeFromCart(itemId);
    success('Item removed from cart');
  } catch (err) {
    showError('Failed to remove item');
  }
};

const proceedToCheckout = () => {
  router.push('/checkout');
};

const continueShopping = () => {
  router.push('/allArtwork');
};

onMounted(() => {
  fetchCart();
});
</script>
