<template>
  <div class="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
    <div class="flex justify-between">
      <span>Subtotal</span><span>{{ formatPrice(subtotal) }}</span>
    </div>
    <div class="flex justify-between">
      <span>Shipping</span><span>{{ formatPrice(shipping) }}</span>
    </div>
    <div class="flex justify-between">
      <span>Tax</span><span>{{ formatPrice(tax) }}</span>
    </div>
    <div class="flex justify-between font-bold text-lg pt-2 border-t">
      <span>Total</span><span>{{ formatPrice(total) }}</span>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from '@/utils/currency';
defineProps({ subtotal: Number, shipping: Number, tax: Number, total: Number });
</script>
