<template>
  <form @submit.prevent="submitPayment">
    <div>
      <label for="price">Price:</label>
      <input type="number" id="price" v-model="order.price" required>
    </div>
    <div>
      <label for="currency">Currency:</label>
      <input type="text" id="currency" v-model="order.currency" required>
    </div>
    <div>
      <label for="method">Payment Method:</label>
      <input type="text" id="method" v-model="order.method" required>
    </div>
    <div>
      <label for="intent">Payment Intent:</label>
      <input type="text" id="intent" v-model="order.intent" required>
    </div>
    <div>
      <label for="description">Description:</label>
      <input type="text" id="description" v-model="order.description" required>
    </div>
    <button type="submit">Pay Now</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      order: {
        price: '',
        currency: '',
        method: '',
        intent: '',
        description: ''
      }
    };
  },
  methods: {
    submitPayment() {
      axios.post('/pay', this.order)
        .then(response => {
          const approvalUrl = this.getApprovalUrl(response.data);
          if (approvalUrl) {
            window.location.href = approvalUrl;
          } else {
            console.error('Approval URL not found in the response.');
          }
        })
        .catch(error => {
          console.error('Payment request failed:', error);
        });
    },
    getApprovalUrl(paymentData) {
      for (const link of paymentData.links) {
        if (link.rel === 'approval_url') {
          return link.href;
        }
      }
      return null;
    }
  }
};
</script>

<style scoped>
/* Add your component's styles here */
</style>
