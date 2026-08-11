<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-600 mb-1">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-900">{{ value }}</p>
        <p v-if="change" class="text-xs text-green-600 mt-1">{{ change }}</p>
      </div>
      <div :class="['w-12 h-12 rounded-lg flex items-center justify-center', colorClasses[color]]">
        <i :class="[icon, 'text-xl']"></i>
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
  yellow: 'bg-yellow-100 text-yellow-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  red: 'bg-red-100 text-red-600'
};
</script>
