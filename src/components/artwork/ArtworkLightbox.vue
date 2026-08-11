<template>
  <div class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" @click.self="$emit('close')" @keydown.esc="$emit('close')" tabindex="0">
    <button class="absolute top-4 right-4 text-white text-2xl" @click="$emit('close')" aria-label="Close"><i class="fas fa-times"></i></button>
    <img :src="src" :alt="alt" class="max-w-full max-h-[90vh] object-contain" />
  </div>
</template>

<script setup>
defineProps({ src: String, alt: String });
defineEmits(['close']);
</script>
