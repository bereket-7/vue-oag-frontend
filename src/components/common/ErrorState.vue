<template>
  <div class="text-center py-12">
    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
      <i class="fas fa-exclamation-triangle text-2xl text-red-500"></i>
    </div>
    <h3 class="text-lg font-medium text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-gray-500 mb-6">{{ message }}</p>
    <button v-if="retry" @click="$emit('retry')" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
      Try Again
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Something went wrong' },
  message: { type: String, default: 'Please try again later.' },
  retry: { type: Boolean, default: true }
});
defineEmits(['retry']);
</script>
