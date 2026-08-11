<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <PageLoader v-if="loading" />
    <div v-else-if="collection" class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-2">{{ collection.title }}</h1>
      <p class="text-gray-600 mb-8">{{ collection.description }}</p>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ArtworkCard v-for="item in collection.artworks" :key="item.id" :artwork="item" show-actions @view-details="$router.push(`/artworks/${item.id}`)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { collectionService } from '@/services/collectionService';
import { usePageMeta } from '@/composables/usePageMeta';
import { PageLoader } from '@/components/common';
import ArtworkCard from '@/components/artwork/ArtworkCard.vue';

const route = useRoute();
const { setMeta } = usePageMeta();
const collection = ref(null);
const loading = ref(true);

onMounted(async () => {
  collection.value = await collectionService.getBySlug(route.params.slug);
  setMeta({ pageTitle: collection.value?.title });
  loading.value = false;
});
</script>
