<template>
  <div>
    <PageHeader
      title="Art Competitions"
      subtitle="Enter your work and compete for recognition and prizes"
      eyebrow="Compete"
    />

    <PageLoader v-if="loading" />

    <EmptyState
      v-else-if="!competitions.length"
      title="No active competitions"
      message="Check back soon for upcoming art challenges."
      icon="fas fa-trophy"
    />

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        v-for="comp in competitions"
        :key="comp.id"
        class="comp-card"
      >
        <div class="flex items-start justify-between gap-4 mb-4">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30">
            <i class="fas fa-trophy text-white text-lg" />
          </div>
          <span
            class="px-3 py-1 text-xs font-semibold rounded-full capitalize"
            :class="comp.status === 'active'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'"
          >
            {{ comp.status }}
          </span>
        </div>

        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ comp.title }}</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">{{ comp.description }}</p>

        <div class="grid grid-cols-2 gap-3 mb-5">
          <div class="stat-pill">
            <i class="fas fa-users text-purple-500 mb-1" />
            <p class="text-xs text-gray-500 dark:text-gray-400">Entries</p>
            <p class="font-bold text-gray-900 dark:text-white">{{ comp.entries || 0 }}</p>
          </div>
          <div class="stat-pill">
            <i class="fas fa-calendar text-purple-500 mb-1" />
            <p class="text-xs text-gray-500 dark:text-gray-400">Deadline</p>
            <p class="font-bold text-gray-900 dark:text-white text-sm">{{ formatDate(comp.endDate) }}</p>
          </div>
        </div>

        <router-link
          v-if="comp.status === 'active'"
          to="/registerCompetitor"
          class="btn-apply"
        >
          <i class="fas fa-paper-plane mr-2" />Apply Now
        </router-link>
        <p v-else class="text-sm text-gray-500 dark:text-gray-400 italic">Registration opens {{ formatDate(comp.startDate) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { competitionService } from '@/services/competitionService';
import { PageHeader, PageLoader, EmptyState } from '@/components/common';

defineProps({
  embedded: { type: Boolean, default: false }
});

const competitions = ref([]);
const loading = ref(true);

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

onMounted(async () => {
  try {
    competitions.value = await competitionService.getAll();
  } catch {
    competitions.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.comp-card { @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-lg hover:shadow-purple-500/5 transition-all; }
.stat-pill { @apply bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center; }
.btn-apply { @apply inline-flex items-center justify-center w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/20 transition-all text-sm; }
</style>
