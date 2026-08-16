<template>
  <div class="space-y-6">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white">
      {{ $t('checkout.payment') }}
    </h2>
    <OrderSummary
      :subtotal="subtotal"
      :shipping="shipping"
      :tax="tax"
      :total="total"
    />
    <div class="border rounded-lg p-6 space-y-4">
      <BaseButton
        full-width
        size="lg"
        :loading="loading"
        @click="$emit('pay')"
      >
        <i class="fas fa-credit-card mr-2" />
        {{ isMock ? $t('checkout.placeOrder') : 'Pay with Chapa' }}
      </BaseButton>
      <p class="text-xs text-gray-500 text-center">
        {{ isMock ? 'Mock mode — no real charge will be made.' : 'You will be redirected to Chapa to complete payment in ETB.' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { isMockMode } from '@/services/adapters';
import { BaseButton } from '@/components/common';
import OrderSummary from './OrderSummary.vue';

const isMock = isMockMode();
defineProps({ loading: Boolean, subtotal: Number, shipping: Number, tax: Number, total: Number });
defineEmits(['pay']);
</script>
