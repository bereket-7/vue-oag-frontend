<template>
  <div class="flex items-center justify-center py-20">
    <div class="text-center">
      <div class="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
      <p class="text-gray-500 dark:text-gray-400">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: 'Loading...' }
});
</script>
