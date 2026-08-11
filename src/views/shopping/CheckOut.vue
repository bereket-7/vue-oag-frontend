<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <CheckoutSteps :step="step" />
      <div class="mt-8 bg-white rounded-xl shadow-md p-8">
        <div v-if="step === 1">
          <h2 class="text-xl font-bold mb-4">Review Cart</h2>
          <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between py-3 border-b">
            <span>{{ item.artworkName }} × {{ item.quantity }}</span>
            <span>{{ formatPrice(item.price * item.quantity) }}</span>
          </div>
          <OrderSummary :subtotal="subtotal()" :shipping="shipping()" :tax="tax()" :total="total()" class="mt-6" />
        </div>
        <ShippingForm v-else-if="step === 2" v-model="shippingAddress" />
        <PaymentStep v-else-if="step === 3" @pay="handlePay" :loading="loading" :subtotal="subtotal()" :shipping="shipping()" :tax="tax()" :total="total()" />
        <div v-else-if="step === 4" class="text-center py-8">
          <i class="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
          <h2 class="text-2xl font-bold">Order Confirmed!</h2>
        </div>
        <div class="flex justify-between mt-8">
          <BaseButton v-if="step > 1 && step < 4" variant="outline" @click="prevStep">Back</BaseButton>
          <div v-else></div>
          <BaseButton v-if="step === 1" @click="nextStep" :disabled="!cartStore.items.length">Continue</BaseButton>
          <BaseButton v-else-if="step === 2" @click="nextStep">Continue to Payment</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useCheckout } from '@/composables/useCheckout';
import { formatPrice } from '@/utils/currency';
import { BaseButton } from '@/components/common';
import CheckoutSteps from './checkout/CheckoutSteps.vue';
import ShippingForm from './checkout/ShippingForm.vue';
import PaymentStep from './checkout/PaymentStep.vue';
import OrderSummary from './checkout/OrderSummary.vue';

const cartStore = useCartStore();
const { step, loading, shippingAddress, subtotal, shipping, tax, total, nextStep, prevStep, placeOrder } = useCheckout();

const handlePay = async () => { await placeOrder('mock'); };

onMounted(() => cartStore.fetchCart());
</script>
