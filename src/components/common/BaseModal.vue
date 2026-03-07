<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto" @click.self="close">
        <div class="flex min-h-screen items-center justify-center p-4">
          <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>
          
          <div :class="modalClasses" @click.stop>
            <div v-if="$slots.header || title" class="flex items-center justify-between p-6 border-b border-gray-200">
              <slot name="header">
                <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
              </slot>
              <button
                v-if="closable"
                @click="close"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="p-6">
              <slot />
            </div>
            
            <div v-if="$slots.footer" class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  title: String,
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  closable: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'close']);

const modalClasses = computed(() => {
  const base = 'relative bg-white rounded-xl shadow-xl transform transition-all';
  const sizes = {
    sm: 'max-w-md w-full',
    md: 'max-w-lg w-full',
    lg: 'max-w-2xl w-full',
    xl: 'max-w-4xl w-full'
  };
  return `${base} ${sizes[props.size]}`;
});

const close = () => {
  if (props.closable) {
    emit('update:modelValue', false);
    emit('close');
  }
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
