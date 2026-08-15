<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
    <PageHeader
      title="Manage competitions"
      subtitle="Review open challenges and create a new one"
      eyebrow="Manager"
    >
      <template #actions>
        <router-link
          to="/createCompetition"
          class="kelem-btn"
        >
          <i class="fas fa-plus mr-2" />
          New competition
        </router-link>
      </template>
    </PageHeader>

    <div
      v-if="loading"
      class="text-center py-16 text-gray-500 dark:text-gray-400"
    >
      Loading competitions...
    </div>
    <div
      v-else-if="competitions.length === 0"
      class="page-card p-10 text-center text-gray-500 dark:text-gray-400"
    >
      No competitions yet.
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <article
        v-for="competition in competitions"
        :key="competition.id"
        class="page-card overflow-hidden"
      >
        <img
          :src="competition.imageUrl || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80'"
          :alt="competition.title"
          class="w-full h-44 object-cover"
        >
        <div class="p-5 space-y-2">
          <div class="flex items-center justify-between gap-2">
            <h2 class="font-bold text-gray-900 dark:text-white">
              {{ competition.title }}
            </h2>
            <span class="badge bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
              {{ competition.status || 'active' }}
            </span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
            {{ competition.description }}
          </p>
          <p class="text-xs text-gray-400">
            {{ competition.entries || 0 }} entries
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { competitionService } from '@/services/competitionService';
import { PageHeader } from '@/components/common';

const competitions = ref([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    competitions.value = await competitionService.getAll();
  } finally {
    loading.value = false;
  }
});
</script>
