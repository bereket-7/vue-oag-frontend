<template>
  <div
    v-if="artwork"
    class="min-h-screen bg-white pt-20 p-8 max-w-3xl mx-auto text-left"
  >
    <div class="border-4 border-double border-gray-800 p-12">
      <h1 class="text-center text-2xl font-serif mb-8 tracking-widest">
        CERTIFICATE OF AUTHENTICITY
      </h1>
      <p class="mb-4">
        This certifies that the artwork:
      </p>
      <p class="text-xl font-bold mb-2">
        {{ artwork.title }}
      </p>
      <p class="mb-4">
        by <strong>{{ artwork.artistName }}</strong>
      </p>
      <p class="mb-4">
        is an authentic original work verified by KELEM Online Art Gallery.
      </p>
      <div class="grid grid-cols-2 gap-4 mt-8 text-sm">
        <div><span class="text-gray-500">Verification ID:</span> KELEM-{{ artwork.id }}-{{ year }}</div>
        <div><span class="text-gray-500">Date:</span> {{ date }}</div>
        <div><span class="text-gray-500">Medium:</span> {{ artwork.medium || artwork.category }}</div>
        <div><span class="text-gray-500">Dimensions:</span> {{ artwork.size }}</div>
      </div>
      <div class="mt-12 pt-8 border-t text-center text-gray-500 text-sm">
        KELEM Online Art Gallery · kelem.art
      </div>
    </div>
    <button
      class="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg"
      @click="printCert"
    >
      Print Certificate
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArtworkStore } from '@/stores/artwork';

const route = useRoute();
const artworkStore = useArtworkStore();
const artwork = computed(() => artworkStore.currentArtwork);
const date = new Date().toLocaleDateString();
const year = new Date().getFullYear();

onMounted(() => artworkStore.fetchArtworkById(route.params.id));
const printCert = () => window.print();
</script>
