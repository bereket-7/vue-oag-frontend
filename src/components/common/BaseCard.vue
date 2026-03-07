<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="px-6 py-4 border-b border-gray-200">
      <slot name="header">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      </slot>
    </div>
    
    <div :class="bodyClasses">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  hoverable: {
    type: Boolean,
    default: true
  },
  padding: {
    type: String,
    default: 'normal',
    validator: (value) => ['none', 'sm', 'normal', 'lg'].includes(value)
  }
});

const cardClasses = computed(() => {
  const base = 'bg-white rounded-xl shadow-md overflow-hidden transition-shadow';
  const hover = props.hoverable ? 'hover:shadow-lg' : '';
  return `${base} ${hover}`;
});

const bodyClasses = computed(() => {
  const paddings = {
    none: '',
    sm: 'p-4',
    normal: 'p-6',
    lg: 'p-8'
  };
  return paddings[props.padding];
});
</script>
