<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Community Standards</h2>

    <LoadingSpinner v-if="loading" size="lg" />

    <div v-else class="space-y-6">
      <BaseCard
        v-for="standard in standards"
        :key="standard.id"
        class="hover:shadow-lg transition-shadow"
      >
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <i :class="getIcon(standard.category)" class="text-2xl text-blue-600"></i>
          </div>

          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ standard.title }}</h3>
            <p class="text-gray-700 mb-3">{{ standard.description }}</p>

            <div class="flex items-center gap-4 text-sm text-gray-500">
              <span class="flex items-center gap-1">
                <i class="fas fa-tag"></i>
                {{ standard.category }}
              </span>
              <span class="flex items-center gap-1">
                <i class="fas fa-calendar"></i>
                {{ formatDate(standard.createdAt) }}
              </span>
            </div>

            <div v-if="standard.rules && standard.rules.length > 0" class="mt-4">
              <button
                @click="toggleRules(standard.id)"
                class="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {{ expandedStandards.includes(standard.id) ? 'Hide' : 'Show' }} Rules
                <i :class="expandedStandards.includes(standard.id) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="ml-1"></i>
              </button>

              <ul v-if="expandedStandards.includes(standard.id)" class="mt-3 space-y-2">
                <li
                  v-for="(rule, index) in standard.rules"
                  :key="index"
                  class="flex items-start gap-2 text-sm text-gray-700"
                >
                  <i class="fas fa-check-circle text-green-500 mt-0.5"></i>
                  <span>{{ rule }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </BaseCard>

      <div v-if="standards.length === 0" class="text-center py-12">
        <i class="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
        <p class="text-gray-500">No standards available</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNotification } from '@/composables/useNotification';
import { BaseCard, LoadingSpinner } from '@/components/common';
import api from '@/services/api';

const { error: showError } = useNotification();

const standards = ref([]);
const loading = ref(false);
const expandedStandards = ref([]);

const getIcon = (category) => {
  const icons = {
    'Content': 'fas fa-image',
    'Behavior': 'fas fa-users',
    'Safety': 'fas fa-shield-alt',
    'Quality': 'fas fa-star',
    'Legal': 'fas fa-gavel'
  };
  return icons[category] || 'fas fa-info-circle';
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const toggleRules = (id) => {
  const index = expandedStandards.value.indexOf(id);
  if (index > -1) {
    expandedStandards.value.splice(index, 1);
  } else {
    expandedStandards.value.push(id);
  }
};

const fetchStandards = async () => {
  loading.value = true;
  try {
    const response = await api.get('/standards');
    standards.value = response.data;
  } catch (err) {
    showError('Failed to load standards');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchStandards();
});
</script>
