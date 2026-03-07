<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <LoadingSpinner v-if="loading" size="lg" text="Loading artwork..." fullscreen />

    <div v-else-if="artwork" class="container mx-auto px-4 py-8">
      <button @click="$router.back()" class="mb-6 text-blue-600 hover:text-blue-700 flex items-center">
        <i class="fas fa-arrow-left mr-2"></i>
        Back to Gallery
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Image Section -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <img
            :src="artworkImageUrl"
            :alt="artwork.artworkName"
            class="w-full h-auto rounded-lg"
            @error="handleImageError"
          />
          
          <div class="mt-4 flex gap-2">
            <BaseButton
              variant="outline"
              full-width
              @click="toggleWishlist"
            >
              <i :class="isInWishlist ? 'fas fa-heart text-red-500' : 'far fa-heart'"></i>
              {{ isInWishlist ? 'In Wishlist' : 'Add to Wishlist' }}
            </BaseButton>
          </div>
        </div>

        <!-- Details Section -->
        <div class="space-y-6">
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-start justify-between mb-4">
              <h1 class="text-3xl font-bold text-gray-900">{{ artwork.artworkName }}</h1>
              <span v-if="artwork.verified" class="flex-shrink-0">
                <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </span>
            </div>

            <p class="text-gray-600 mb-4">by {{ artwork.artistName || 'Unknown Artist' }}</p>

            <div class="mb-6">
              <StarRating
                :rating="artwork.averageRating || 0"
                :editable="isAuthenticated"
                @rating-selected="submitRating"
              />
            </div>

            <p class="text-gray-700 leading-relaxed mb-6">
              {{ artwork.artworkDescription || 'No description available.' }}
            </p>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Price</span>
                <span class="text-2xl font-bold text-gray-900">${{ artwork.price }}</span>
              </div>
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Category</span>
                <span class="font-medium text-gray-900">{{ artwork.artworkCategory }}</span>
              </div>
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Size</span>
                <span class="font-medium text-gray-900">{{ artwork.size || 'N/A' }}</span>
              </div>
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Medium</span>
                <span class="font-medium text-gray-900">{{ artwork.medium || 'N/A' }}</span>
              </div>
            </div>

            <div class="flex gap-3">
              <BaseButton
                variant="primary"
                size="lg"
                full-width
                @click="addToCart"
              >
                <i class="fas fa-shopping-cart mr-2"></i>
                Add to Cart
              </BaseButton>
            </div>
          </div>

          <!-- Artist Info -->
          <div v-if="artwork.artistName" class="bg-white rounded-xl shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">About the Artist</h3>
            <p class="text-gray-700">{{ artwork.artistName }}</p>
            <router-link
              :to="`/artist/${artwork.artistId}`"
              class="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
            >
              View Artist Profile →
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container mx-auto px-4 py-8 text-center">
      <p class="text-gray-500 text-lg">Artwork not found</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useArtworkStore } from '@/stores/artwork';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { useNotification } from '@/composables/useNotification';
import api from '@/services/api';
import StarRating from '@/components/StarRating.vue';
import { BaseButton, LoadingSpinner } from '@/components/common';

const route = useRoute();
const router = useRouter();
const artworkStore = useArtworkStore();
const authStore = useAuthStore();
const cartStore = useCartStore();
const { success, error: showError } = useNotification();

const loading = ref(false);
const isInWishlist = ref(false);

const artwork = computed(() => artworkStore.currentArtwork);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const artworkImageUrl = computed(() => {
  if (!artwork.value) return '';
  return `${process.env.VUE_APP_API_BASE_URL}/artworks/${artwork.value.id}/image`;
});

const fetchArtwork = async () => {
  loading.value = true;
  try {
    await artworkStore.fetchArtworkById(route.params.id || route.query.id);
  } catch (err) {
    showError('Failed to load artwork');
  } finally {
    loading.value = false;
  }
};

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
};

const addToCart = async () => {
  if (!isAuthenticated.value) {
    showError('Please login to add items to cart');
    router.push('/userLogin');
    return;
  }

  try {
    await cartStore.addToCart(artwork.value);
    success('Added to cart!');
  } catch (err) {
    showError('Failed to add to cart');
  }
};

const toggleWishlist = async () => {
  if (!isAuthenticated.value) {
    showError('Please login to add to wishlist');
    router.push('/userLogin');
    return;
  }

  try {
    await api.post('/wishlist/save', artwork.value);
    isInWishlist.value = !isInWishlist.value;
    success(isInWishlist.value ? 'Added to wishlist!' : 'Removed from wishlist!');
  } catch (err) {
    showError('Failed to update wishlist');
  }
};

const submitRating = async (rating) => {
  try {
    await api.post(`/rating/artworks/${artwork.value.id}/rate`, { rating });
    success('Rating submitted!');
    await fetchArtwork();
  } catch (err) {
    showError('Failed to submit rating');
  }
};

onMounted(() => {
  fetchArtwork();
});
</script>
