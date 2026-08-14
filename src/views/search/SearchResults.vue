<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        Search Results
      </h1>
      <div class="flex flex-wrap gap-4 mb-6">
        <input
          v-model="filters.q"
          placeholder="Search..."
          class="flex-1 min-w-[200px] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          @keyup.enter="search"
        >
        <select
          v-model="filters.category"
          class="border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        >
          <option value="">
            All Categories
          </option>
          <option
            v-for="cat in categories"
            :key="cat"
            :value="cat"
          >
            {{ cat }}
          </option>
        </select>
        <select
          v-model="filters.sort"
          class="border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        >
          <option value="default">
            Default
          </option>
          <option value="price-asc">
            Price: Low to High
          </option>
          <option value="price-desc">
            Price: High to Low
          </option>
          <option value="rating">
            Top Rated
          </option>
          <option value="newest">
            Newest
          </option>
        </select>
        <BaseButton @click="search">
          Search
        </BaseButton>
      </div>
      <PageLoader v-if="loading" />
      <div
        v-else
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <ArtworkCard
          v-for="item in artworks"
          :key="item.id"
          :artwork="item"
          show-actions
          @view-details="$router.push(`/artworks/${item.id}`)"
          @add-to-cart="addToCart(item)"
        />
      </div>
      <EmptyState
        v-if="!loading && !artworks.length"
        title="No results"
        message="Try adjusting your filters."
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useArtworkStore } from '@/stores/artwork';
import { useCartStore } from '@/stores/cart';
import { BaseButton, PageLoader, EmptyState } from '@/components/common';
import ArtworkCard from '@/components/artwork/ArtworkCard.vue';

const route = useRoute();
const router = useRouter();
const artworkStore = useArtworkStore();
const cartStore = useCartStore();
const { artworks, loading } = storeToRefs(artworkStore);

const filters = ref({ q: route.query.q || '', category: route.query.category || '', sort: route.query.sort || 'default', minPrice: route.query.minPrice || '', maxPrice: route.query.maxPrice || '' });
const categories = ['Painting', 'Sculpture', 'Mixed Art', 'Digital Art'];

const search = async () => {
  router.replace({ query: { ...filters.value } });
  await artworkStore.fetchArtworks(filters.value);
};

const addToCart = async (item) => { await cartStore.addToCart(item); };

watch(() => route.query, () => search(), { deep: true });
onMounted(search);
</script>
