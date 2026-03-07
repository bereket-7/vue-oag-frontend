<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        
        <div class="flex gap-3">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          
          <button
            v-if="showAddButton"
            @click="$emit('add')"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i class="fas fa-plus mr-2"></i>
            Add New
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ column.label }}
            </th>
            <th v-if="showActions" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="loading">
            <td :colspan="columns.length + (showActions ? 1 : 0)" class="px-6 py-12 text-center">
              <LoadingSpinner size="md" />
            </td>
          </tr>
          <tr v-else-if="filteredData.length === 0">
            <td :colspan="columns.length + (showActions ? 1 : 0)" class="px-6 py-12 text-center text-gray-500">
              No data found
            </td>
          </tr>
          <tr
            v-else
            v-for="row in paginatedData"
            :key="row.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              <slot :name="`cell-${column.key}`" :row="row">
                {{ row[column.key] }}
              </slot>
            </td>
            <td v-if="showActions" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <slot name="actions" :row="row">
                <button
                  @click="$emit('edit', row)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="$emit('delete', row)"
                  class="text-red-600 hover:text-red-900"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredData.length }} results
      </div>
      
      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-3 py-1 border rounded-lg',
            currentPage === page
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ page }}
        </button>
        
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { LoadingSpinner } from '@/components/common';

const props = defineProps({
  title: String,
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    default: () => []
  },
  loading: Boolean,
  showActions: {
    type: Boolean,
    default: true
  },
  showAddButton: {
    type: Boolean,
    default: true
  },
  perPage: {
    type: Number,
    default: 10
  }
});

defineEmits(['add', 'edit', 'delete']);

const searchQuery = ref('');
const currentPage = ref(1);

const filteredData = computed(() => {
  if (!searchQuery.value) return props.data;
  
  const query = searchQuery.value.toLowerCase();
  return props.data.filter(row =>
    props.columns.some(col =>
      String(row[col.key]).toLowerCase().includes(query)
    )
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / props.perPage)
);

const startIndex = computed(() =>
  (currentPage.value - 1) * props.perPage
);

const endIndex = computed(() =>
  Math.min(startIndex.value + props.perPage, filteredData.value.length)
);

const paginatedData = computed(() =>
  filteredData.value.slice(startIndex.value, endIndex.value)
);

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});
</script>
