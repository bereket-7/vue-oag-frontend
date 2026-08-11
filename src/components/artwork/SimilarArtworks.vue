<template>
  <section v-if="similar.length" class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">Similar Artworks</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <ArtworkCard v-for="item in similar" :key="item.id" :artwork="item" @view-details="goToDetail(item)" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { artworkService } from '@/services/artworkService';
import ArtworkCard from '@/components/artwork/ArtworkCard.vue';

const props = defineProps({ artwork: { type: Object, required: true } });
const router = useRouter();
const similar = ref([]);

const loadSimilar = async () => {
  const all = await artworkService.getAll({ category: props.artwork.category });
  similar.value = all.filter((a) => a.id !== props.artwork.id).slice(0, 4);
};

const goToDetail = (item) => router.push(`/artworks/${item.id}`);

watch(() => props.artwork, loadSimilar, { immediate: true });
onMounted(loadSimilar);
</script>
