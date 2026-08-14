<template>
  <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-transparent dark:border-gray-800">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
          {{ title }}
        </p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ value }}
        </p>
        <p
          v-if="change"
          class="text-xs text-green-600 mt-1"
        >
          {{ change }}
        </p>
      </div>
      <div :class="['w-12 h-12 rounded-lg flex items-center justify-center', colorClasses[color]]">
        <i :class="[icon, 'text-xl']" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  icon: { type: String, default: 'fas fa-chart-bar' },
  color: { type: String, default: 'blue' },
  change: { type: String, default: '' }
});

const colorClasses = {
  yellow: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400',
  blue: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
  green: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400',
  purple: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
  red: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
};
</script>
