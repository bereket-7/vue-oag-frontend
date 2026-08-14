<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {{ t('checkout.title') }}
      </h1>
      <CheckoutSteps :step="step" />
      <div class="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 border border-transparent dark:border-gray-800">
        <div v-if="step === 1">
          <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {{ t('checkout.cart') }}
          </h2>
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300"
          >
            <span>{{ item.artworkName }} × {{ item.quantity }}</span>
            <span>{{ formatPrice(item.price * item.quantity) }}</span>
          </div>
          <OrderSummary
            :subtotal="subtotal()"
            :shipping="shipping()"
            :tax="tax()"
            :total="total()"
            class="mt-6"
          />
        </div>
        <ShippingForm
          v-else-if="step === 2"
          v-model="shippingAddress"
        />
        <PaymentStep
          v-else-if="step === 3"
          :loading="loading"
          :subtotal="subtotal()"
          :shipping="shipping()"
          :tax="tax()"
          :total="total()"
          @pay="handlePay"
        />
        <div
          v-else-if="step === 4"
          class="text-center py-8"
        >
          <i class="fas fa-check-circle text-5xl text-green-500 mb-4" />
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Order Confirmed!
          </h2>
        </div>
        <div class="flex justify-between mt-8">
          <BaseButton
            v-if="step > 1 && step < 4"
            variant="outline"
            @click="prevStep"
          >
            Back
          </BaseButton>
          <div v-else />
          <BaseButton
            v-if="step === 1"
            :disabled="!cartStore.items.length"
            @click="nextStep"
          >
            Continue
          </BaseButton>
          <BaseButton
            v-else-if="step === 2"
            @click="nextStep"
          >
            Continue to Payment
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCartStore } from '@/stores/cart';
import { useCheckout } from '@/composables/useCheckout';
import { formatPrice } from '@/utils/currency';
import { BaseButton } from '@/components/common';
import CheckoutSteps from './checkout/CheckoutSteps.vue';
import ShippingForm from './checkout/ShippingForm.vue';
import PaymentStep from './checkout/PaymentStep.vue';
import OrderSummary from './checkout/OrderSummary.vue';

const { t } = useI18n();
const cartStore = useCartStore();
const { step, loading, shippingAddress, subtotal, shipping, tax, total, nextStep, prevStep, placeOrder } = useCheckout();

const handlePay = async () => { await placeOrder('mock'); };

onMounted(() => cartStore.fetchCart());
</script>
