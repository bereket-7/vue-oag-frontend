<template>
  <div class="flex items-center justify-center mb-8">
    <div
      v-for="(label, i) in steps"
      :key="i"
      class="flex items-center"
    >
      <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold', step >= i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500']">
        {{ i + 1 }}
      </div>
      <span
        class="mx-2 text-sm hidden sm:inline"
        :class="step >= i + 1 ? 'text-purple-600 font-medium' : 'text-gray-400'"
      >{{ label }}</span>
      <div
        v-if="i < steps.length - 1"
        class="w-8 sm:w-16 h-0.5 bg-gray-200 mx-2"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

defineProps({ step: { type: Number, default: 1 } });
const { t } = useI18n();
const steps = computed(() => [t('checkout.cart'), t('checkout.shipping'), t('checkout.payment'), t('checkout.done')]);
</script>
