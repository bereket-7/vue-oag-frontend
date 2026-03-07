<template>
  <div class="container mx-auto px-4 py-8 mt-20">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900">Discover Artworks</h2>
      <p class="text-gray-600 mt-2">Explore our curated collection</p>
    </div>

    <LoadingSpinner v-if="loading" size="lg" text="Loading artworks..." />

    <div v-else-if="artworks.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">No artworks found</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ArtworkCard
        v-for="artwork in artworks"
        :key="artwork.id"
        :artwork="formatArtwork(artwork)"
        @add-to-cart="handleAddToCart"
        @view-details="openModal"
        @toggle-wishlist="handleWishlist"
      />
    </div>

    <BaseModal v-model="showModal" :title="selectedArtwork?.artworkName" size="lg">
      <div v-if="selectedArtwork" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            :src="getArtworkImageUrl(selectedArtwork.id)"
            :alt="selectedArtwork.artworkName"
            class="w-full h-auto rounded-lg"
          />
        </div>
        
        <div class="space-y-4">
          <p class="text-gray-700">{{ selectedArtwork.artworkDescription }}</p>
          
          <div class="space-y-2">
            <p class="text-2xl font-bold text-gray-900">${{ selectedArtwork.price }}</p>
            <p class="text-gray-600">Size: {{ selectedArtwork.size }}</p>
            <p class="text-gray-600">Category: {{ selectedArtwork.artworkCategory }}</p>
          </div>

          <div class="border-t pt-4">
            <StarRating
              :rating="selectedArtwork.averageRating"
              :editable="true"
              @rating-selected="submitRating"
            />
          </div>

          <div class="flex gap-3 pt-4">
            <BaseButton variant="primary" full-width @click="handleAddToCart(selectedArtwork)">
              Add to Cart
            </BaseButton>
            <BaseButton variant="outline" @click="handleWishlist(selectedArtwork)">
              <i class="fas fa-heart"></i>
            </BaseButton>
          </div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useArtworkStore } from '@/stores/artwork';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/composables/useNotification';
import api from '@/services/api';
import ArtworkCard from '@/components/artwork/ArtworkCard.vue';
import StarRating from '@/components/StarRating.vue';
import { BaseModal, BaseButton, LoadingSpinner } from '@/components/common';

const router = useRouter();
const artworkStore = useArtworkStore();
const authStore = useAuthStore();
const { success, error: showError } = useNotification();

const loading = ref(false);
const showModal = ref(false);
const selectedArtwork = ref(null);

const artworks = computed(() => artworkStore.artworks);

const fetchArtworks = async () => {
  loading.value = true;
  try {
    await artworkStore.fetchArtworks();
  } catch (err) {
    showError('Failed to load artworks');
  } finally {
    loading.value = false;
  }
};

const formatArtwork = (artwork) => ({
  id: artwork.id,
  title: artwork.artworkName,
  description: artwork.artworkDescription,
  price: artwork.price,
  imageUrl: getArtworkImageUrl(artwork.id),
  artistName: artwork.artistName || 'Unknown Artist',
  rating: artwork.averageRating,
  verified: artwork.verified
});

const getArtworkImageUrl = (artworkId) => {
  return `${process.env.VUE_APP_API_BASE_URL}/artworks/${artworkId}/image`;
};

const openModal = (artwork) => {
  selectedArtwork.value = artworks.value.find(a => a.id === artwork.id);
  showModal.value = true;
};

const handleAddToCart = async (artwork) => {
  if (!authStore.isAuthenticated) {
    showError('Please login to add items to cart');
    router.push('/userLogin');
    return;
  }

  try {
    // Add to cart logic here
    success('Added to cart!');
  } catch (err) {
    showError('Failed to add to cart');
  }
};

const handleWishlist = async (artwork) => {
  if (!authStore.isAuthenticated) {
    showError('Please login to add to wishlist');
    router.push('/userLogin');
    return;
  }

  try {
    await api.post('/wishlist/save', artwork);
    success('Added to wishlist!');
  } catch (err) {
    showError('Failed to add to wishlist');
  }
};

const submitRating = async (rating) => {
  if (!authStore.isAuthenticated) {
    showError('Please login to rate artworks');
    return;
  }

  try {
    await api.post(`/rating/artworks/${selectedArtwork.value.id}/rate`, { rating });
    success('Rating submitted!');
    await fetchArtworks();
  } catch (err) {
    showError('Failed to submit rating');
  }
};

onMounted(() => {
  fetchArtworks();
});
</script>
