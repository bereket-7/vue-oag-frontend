<template>
  <div class="text-center py-12">
    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
      <i :class="[icon, 'text-2xl text-gray-400']"></i>
    </div>
    <h3 class="text-lg font-medium text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-gray-500 mb-6 max-w-sm mx-auto">{{ message }}</p>
    <slot name="action" />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Nothing here yet' },
  message: { type: String, default: 'Check back later for updates.' },
  icon: { type: String, default: 'fas fa-inbox' }
});
</script>
