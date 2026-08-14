<template>
  <div class="paypal-button-container">
    <div v-if="isMockMode">
      <button
        type="button"
        class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        @click="$emit('success')"
      >
        Pay with PayPal (Demo)
      </button>
    </div>
    <div
      v-else-if="!clientId"
      class="text-sm text-gray-500 dark:text-gray-400"
    >
      PayPal is not configured.
    </div>
    <div
      v-else
      id="paypal-button"
    />
  </div>
</template>

<script>
import { loadScript } from '@paypal/paypal-js';
import { isMockMode } from '@/services/adapters';
import api from '@/services/api';

export default {
  name: 'PaypalButton',
  emits: ['success', 'error'],
  data() {
    return {
      isMockMode: isMockMode(),
      clientId: process.env.VUE_APP_PAYPAL_CLIENT_ID || ''
    };
  },
  mounted() {
    if (!this.isMockMode && this.clientId) this.initializePayPalButton();
  },
  methods: {
    async initializePayPalButton() {
      try {
        const paypal = await loadScript({ 'client-id': this.clientId });
        paypal.Buttons({
          createOrder: async () => {
            const { data } = await api.post('/paypal/pay');
            return data.id || data.orderId;
          },
          onApprove: async (details) => {
            const { data } = await api.post('/paypal/capture', { orderId: details.orderID });
            if (!data?.success && !data?.id) {
              this.$emit('error');
              return;
            }
            this.$emit('success', data);
            this.$router?.push('/paymentSuccess');
          },
          onError: () => this.$emit('error')
        }).render('#paypal-button');
      } catch {
        this.$emit('error');
      }
    }
  }
};
</script>

<style scoped>
.paypal-button-container { min-height: 45px; }
</style>
