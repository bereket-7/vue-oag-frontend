<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 transition-colors">
    <div class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 py-16 px-4">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      </div>
      <div class="relative max-w-3xl mx-auto text-center text-white">
        <h1 class="text-4xl sm:text-5xl font-bold mb-3">
          Art Gallery
        </h1>
        <p class="text-white/80 mb-8">
          Explore {{ artworkStore.artworks.length }} extraordinary works
        </p>
        <div class="relative max-w-xl mx-auto">
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="search"
            type="search"
            placeholder="Search by title, artist or category…"
            class="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/95 dark:bg-gray-900/90 text-gray-900 dark:text-white placeholder-gray-400 shadow-xl outline-none focus:ring-2 focus:ring-white/60"
          >
        </div>
      </div>
    </div>

    <div class="sticky top-16 z-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
            :class="activeCategory === cat
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ filteredArtworks.length }} works</span>
          <select
            v-model="sortBy"
            class="input py-1.5 text-sm w-auto"
          >
            <option value="default">
              Sort: Default
            </option>
            <option value="price-asc">
              Price: Low → High
            </option>
            <option value="price-desc">
              Price: High → Low
            </option>
            <option value="rating">
              Top Rated
            </option>
            <option value="newest">
              Newest
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-10">
      <div
        v-if="filteredArtworks.length === 0"
        class="page-card p-12 text-center text-gray-500 dark:text-gray-400"
      >
        <i class="fas fa-search text-3xl mb-3" />
        <p>No artworks match your search.</p>
        <button
          type="button"
          class="kelem-btn mt-4"
          @click="search = ''; activeCategory = 'All'"
        >
          Clear filters
        </button>
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <ArtworkCard
          v-for="artwork in filteredArtworks"
          :key="artwork.id"
          :artwork="formatArtwork(artwork)"
          @add-to-cart="addToCart"
          @view-details="openModal"
          @toggle-wishlist="handleWishlist"
        />
      </div>
    </div>

    <BaseModal
      v-model="showModal"
      :title="selectedArtwork?.artworkName || selectedArtwork?.title"
      size="lg"
    >
      <div
        v-if="selectedArtwork"
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <img
          :src="selectedArtwork.imageUrl"
          :alt="selectedArtwork.artworkName || selectedArtwork.title"
          class="w-full rounded-xl"
        >
        <div class="space-y-3">
          <p class="text-gray-600 dark:text-gray-300">
            {{ selectedArtwork.artworkDescription || selectedArtwork.description }}
          </p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ formatPrice(selectedArtwork.price) }}
          </p>
          <BaseButton
            variant="primary"
            full-width
            @click="addToCart(selectedArtwork); showModal = false"
          >
            Add to Cart
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  </div>
  <FooterView />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useArtworkStore } from '@/stores/artwork';
import { useCartStore } from '@/stores/cart';
import { useNotification } from '@/composables/useNotification';
import { parsePrice, formatPrice } from '@/utils/currency';
import { wishlistService } from '@/services/wishlistService';
import FooterView from '@/components/FooterView.vue';
import ArtworkCard from '@/components/artwork/ArtworkCard.vue';
import { BaseModal, BaseButton } from '@/components/common';

const artworkStore = useArtworkStore();
const cartStore = useCartStore();
const { success } = useNotification();

const categories = computed(() => ['All', ...new Set(artworkStore.artworks.map((a) => a.category || a.artworkCategory))]);
const activeCategory = ref('All');
const sortBy = ref('default');
const search = ref('');
const selectedArtwork = ref(null);
const showModal = ref(false);

const getTitle = (a) => a.title || a.artworkName;
const getArtist = (a) => a.artistName || a.artist;
const getCategory = (a) => a.category || a.artworkCategory;
const getPrice = (a) => (typeof a.price === 'number' ? a.price : parsePrice(a.price));
const getRating = (a) => a.rating ?? a.averageRating ?? 0;

const formatArtwork = (artwork) => ({
  ...artwork,
  title: getTitle(artwork),
  artistName: getArtist(artwork),
  rating: getRating(artwork),
  imageUrl: artwork.imageUrl
});

const filteredArtworks = computed(() => {
  let list = activeCategory.value === 'All'
    ? [...artworkStore.artworks]
    : artworkStore.artworks.filter((a) => getCategory(a) === activeCategory.value);

  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter((a) =>
      getTitle(a).toLowerCase().includes(q) ||
      getArtist(a).toLowerCase().includes(q) ||
      getCategory(a).toLowerCase().includes(q)
    );
  }

  if (sortBy.value === 'price-asc') list.sort((a, b) => getPrice(a) - getPrice(b));
  else if (sortBy.value === 'price-desc') list.sort((a, b) => getPrice(b) - getPrice(a));
  else if (sortBy.value === 'rating') list.sort((a, b) => getRating(b) - getRating(a));
  else if (sortBy.value === 'newest') list.sort((a, b) => (b.year || 0) - (a.year || 0));
  return list;
});

function openModal(artwork) {
  selectedArtwork.value = artworkStore.artworks.find((a) => a.id === artwork.id) || artwork;
  showModal.value = true;
}

async function addToCart(artwork) {
  await cartStore.addToCart(artwork);
  success(`"${getTitle(artwork)}" added to cart!`);
}

async function handleWishlist(artwork) {
  await wishlistService.toggle(artwork);
  success('Wishlist updated');
}

onMounted(() => artworkStore.fetchArtworks());
</script>
