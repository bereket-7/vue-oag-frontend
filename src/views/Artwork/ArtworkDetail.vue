<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <PageLoader
      v-if="loading"
      message="Loading artwork..."
    />
    <ErrorState
      v-else-if="error"
      :message="error"
      @retry="loadArtwork"
    />

    <div
      v-else-if="artwork"
      class="container mx-auto px-4 py-8"
    >
      <nav class="mb-6 text-sm text-gray-500">
        <router-link
          to="/"
          class="hover:text-purple-600"
        >
          Home
        </router-link>
        <span class="mx-2">/</span>
        <router-link
          to="/allArtwork"
          class="hover:text-purple-600"
        >
          Gallery
        </router-link>
        <span class="mx-2">/</span>
        <span class="text-gray-900">{{ artwork.title }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white rounded-xl shadow-md p-6">
          <img
            :src="artwork.imageUrl"
            :alt="artwork.title"
            class="w-full h-auto rounded-lg cursor-zoom-in"
            loading="lazy"
            @click="showLightbox = true"
          >
          <ArtworkLightbox
            v-if="showLightbox"
            :src="artwork.imageUrl"
            :alt="artwork.title"
            @close="showLightbox = false"
          />
          <div class="mt-4 flex gap-2">
            <BaseButton
              variant="outline"
              full-width
              @click="toggleWishlist"
            >
              <i :class="inWishlist ? 'fas fa-heart text-red-500' : 'far fa-heart'" />
              {{ inWishlist ? 'In Wishlist' : 'Add to Wishlist' }}
            </BaseButton>
            <BaseButton
              variant="outline"
              @click="shareArtwork"
            >
              <i class="fas fa-share-alt" />
            </BaseButton>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-start justify-between mb-4">
              <h1 class="text-3xl font-bold text-gray-900">
                {{ artwork.title }}
              </h1>
              <span
                v-if="artwork.verified"
                class="text-blue-500"
                title="Verified"
              ><i class="fas fa-check-circle" /></span>
            </div>
            <router-link
              v-if="artwork.artistSlug"
              :to="`/artists/${artwork.artistSlug}`"
              class="text-purple-600 hover:underline mb-4 block"
            >
              by {{ artwork.artistName }}
            </router-link>
            <p
              v-else
              class="text-gray-600 mb-4"
            >
              by {{ artwork.artistName }}
            </p>

            <StarRating
              :rating="artwork.rating"
              :editable="isAuthenticated"
              @rating-selected="submitRating"
            />
            <p class="text-gray-700 leading-relaxed my-6">
              {{ artwork.description }}
            </p>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Price</span><span class="text-2xl font-bold">{{ formatPrice(artwork.price) }}</span>
              </div>
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Category</span><span>{{ artwork.category }}</span>
              </div>
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Size</span><span>{{ artwork.size || 'N/A' }}</span>
              </div>
            </div>

            <div class="flex gap-3 flex-wrap">
              <BaseButton
                variant="primary"
                full-width
                :loading="addingToCart"
                @click="addToCart"
              >
                <i class="fas fa-shopping-cart mr-2" />Add to Cart
              </BaseButton>
              <BaseButton
                v-if="artwork.allowOffers"
                variant="outline"
                @click="showOfferModal = true"
              >
                Make an Offer
              </BaseButton>
              <router-link
                :to="`/artworks/${artwork.id}/certificate`"
                class="text-sm text-purple-600 hover:underline"
              >
                View Certificate
              </router-link>
            </div>
          </div>

          <ReviewList :artwork-id="artwork.id" />
        </div>
      </div>

      <SimilarArtworks
        :artwork="artwork"
        class="mt-12"
      />
    </div>

    <MakeOfferModal
      v-if="showOfferModal && artwork"
      :artwork="artwork"
      @close="showOfferModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArtworkStore } from '@/stores/artwork';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/composables/useNotification';
import { usePageMeta } from '@/composables/usePageMeta';
import { formatPrice } from '@/utils/currency';
import { artworkService } from '@/services/artworkService';
import { BaseButton, PageLoader, ErrorState } from '@/components/common';
import StarRating from '@/components/StarRating.vue';
import ArtworkLightbox from '@/components/artwork/ArtworkLightbox.vue';
import SimilarArtworks from '@/components/artwork/SimilarArtworks.vue';
import ReviewList from '@/components/reviews/ReviewList.vue';
import MakeOfferModal from '@/components/artworks/MakeOfferModal.vue';

const route = useRoute();
const artworkStore = useArtworkStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();
const { success, error: showError } = useNotification();
const { setMeta } = usePageMeta();

const loading = ref(true);
const error = ref(null);
const addingToCart = ref(false);
const showLightbox = ref(false);
const showOfferModal = ref(false);

const artwork = computed(() => artworkStore.currentArtwork);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const inWishlist = computed(() => wishlistStore.isInWishlist(route.params.id));

const loadArtwork = async () => {
  loading.value = true;
  error.value = null;
  try {
    await artworkStore.fetchArtworkById(route.params.id);
    setMeta({ pageTitle: artworkStore.currentArtwork?.title, pageDescription: artworkStore.currentArtwork?.description?.slice(0, 160) });
    if (authStore.isAuthenticated) await wishlistStore.fetchWishlist();
  } catch (e) {
    error.value = e.message || 'Failed to load artwork';
  } finally {
    loading.value = false;
  }
};

const addToCart = async () => {
  if (!isAuthenticated.value) return showError('Please login to add to cart');
  addingToCart.value = true;
  try {
    await cartStore.addToCart(artwork.value);
    success('Added to cart!');
  } catch { showError('Failed to add to cart'); }
  finally { addingToCart.value = false; }
};

const toggleWishlist = async () => {
  if (!isAuthenticated.value) return showError('Please login');
  await wishlistStore.toggleItem(artwork.value);
  success(inWishlist.value ? 'Removed from wishlist' : 'Added to wishlist!');
};

const submitRating = async (rating) => {
  await artworkService.rate(artwork.value.id, rating);
  success('Rating submitted!');
};

const shareArtwork = () => {
  navigator.clipboard?.writeText(window.location.href);
  success('Link copied!');
};

onMounted(loadArtwork);
</script>
