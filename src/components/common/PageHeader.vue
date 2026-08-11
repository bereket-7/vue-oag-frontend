<template>
  <div class="mb-8">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p v-if="eyebrow" class="text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">{{ eyebrow }}</p>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{{ title }}</h1>
        <p v-if="subtitle" class="mt-1 text-gray-500 dark:text-gray-400">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="flex flex-wrap gap-2 shrink-0">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: String,
  eyebrow: String
});
</script>
