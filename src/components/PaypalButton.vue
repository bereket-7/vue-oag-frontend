<template>
  <div class="paypal-button-container">
    <div v-if="isMockMode">
      <button class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700" @click="$emit('success')">
        Pay with PayPal (Demo)
      </button>
    </div>
    <div v-else id="paypal-button"></div>
  </div>
</template>

<script>
import { loadScript } from '@paypal/paypal-js';
import { isMockMode } from '@/services/adapters';

export default {
  name: 'PaypalButton',
  emits: ['success', 'error'],
  data() {
    return { isMockMode: isMockMode() };
  },
  mounted() {
    if (!this.isMockMode) this.initializePayPalButton();
  },
  methods: {
    async initializePayPalButton() {
      const clientId = process.env.VUE_APP_PAYPAL_CLIENT_ID;
      if (!clientId) return;
      const paypal = await loadScript({ 'client-id': clientId });
      paypal.Buttons({
        createOrder: () => fetch(`${process.env.VUE_APP_API_BASE_URL}/paypal/pay`, { method: 'POST' }).then((r) => r.json()),
        onApprove: (data) => {
          this.$emit('success', data);
          this.$router?.push('/paymentSuccess');
        },
        onError: () => this.$emit('error')
      }).render('#paypal-button');
    }
  }
};
</script>

<style scoped>
.paypal-button-container { min-height: 45px; }
</style>
