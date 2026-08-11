<template>
  <div class="container mx-auto px-4 py-8 mt-20">
    <h2 class="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h2>

    <LoadingSpinner v-if="loading" size="lg" />

    <div v-else-if="wishlistStore.items.length === 0" class="text-center py-12">
      <i class="fas fa-heart text-6xl text-gray-300 mb-4"></i>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
      <p class="text-gray-500 mb-6">Start adding artworks you love!</p>
      <router-link to="/allArtwork">
        <BaseButton variant="primary">Browse Artworks</BaseButton>
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="item in wishlistStore.items"
        :key="item.id"
        class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="relative aspect-square">
          <img
            :src="item.imageUrl || getImageUrl(item.artworkId)"
            :alt="item.artworkName"
            class="w-full h-full object-cover"
          />
          <button
            @click="removeFromWishlist(item.id)"
            class="absolute top-2 right-2 w-10 h-10 bg-white rounded-full shadow-md hover:bg-red-50 flex items-center justify-center"
          >
            <i class="fas fa-heart text-red-500"></i>
          </button>
        </div>

        <div class="p-4">
          <h3 class="font-semibold text-gray-900 mb-1 line-clamp-1">{{ item.artworkName }}</h3>
          <p class="text-sm text-gray-600 mb-2">by {{ item.artistName }}</p>
          <p class="text-xl font-bold text-gray-900 mb-4">{{ formatPrice(item.price) }}</p>

          <div class="flex gap-2">
            <BaseButton variant="primary" size="sm" full-width @click="addToCart(item)">
              <i class="fas fa-shopping-cart mr-1"></i>
              Add to Cart
            </BaseButton>
            <router-link :to="`/artworks/${item.artworkId}`">
              <BaseButton variant="outline" size="sm">
                <i class="fas fa-eye"></i>
              </BaseButton>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { useNotification } from '@/composables/useNotification';
import { formatPrice } from '@/utils/currency';
import { BaseButton, LoadingSpinner } from '@/components/common';

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const { success, error: showError } = useNotification();

const loading = ref(false);

const getImageUrl = (_artworkId) => 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80';

const fetchWishlist = async () => {
  loading.value = true;
  try {
    await wishlistStore.fetchWishlist();
  } catch {
    showError('Failed to load wishlist');
  } finally {
    loading.value = false;
  }
};

const removeFromWishlist = async (id) => {
  try {
    await wishlistStore.removeItem(id);
    success('Removed from wishlist');
  } catch {
    showError('Failed to remove from wishlist');
  }
};

const addToCart = async (item) => {
  try {
    await cartStore.addToCart({ id: item.artworkId, title: item.artworkName, price: item.price, imageUrl: item.imageUrl });
    success('Added to cart!');
  } catch {
    showError('Failed to add to cart');
  }
};

onMounted(() => {
  fetchWishlist();
});
</script>
