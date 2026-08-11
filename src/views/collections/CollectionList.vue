<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Curated Collections</h1>
      <div class="grid md:grid-cols-3 gap-8">
        <router-link v-for="col in collections" :key="col.id" :to="`/collections/${col.slug}`" class="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
          <img :src="col.imageUrl" :alt="col.title" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          <div class="p-6 bg-white">
            <h2 class="text-xl font-bold mb-2">{{ col.title }}</h2>
            <p class="text-gray-600 text-sm">{{ col.description }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collectionService } from '@/services/collectionService';

const collections = ref([]);
onMounted(async () => { collections.value = await collectionService.getAll(); });
</script>
