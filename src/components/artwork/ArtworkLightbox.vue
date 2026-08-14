<template>
  <div
    class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
    tabindex="0"
    @click.self="$emit('close')"
    @keydown.esc="$emit('close')"
  >
    <button
      class="absolute top-4 right-4 text-white text-2xl"
      aria-label="Close"
      @click="$emit('close')"
    >
      <i class="fas fa-times" />
    </button>
    <img
      :src="src"
      :alt="alt"
      class="max-w-full max-h-[90vh] object-contain"
    >
  </div>
</template>

<script setup>
defineProps({ src: String, alt: String });
defineEmits(['close']);
</script>
