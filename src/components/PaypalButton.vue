<template>
    <div class="paypal-button-container">
      <div id="paypal-button"></div>
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  
  export default {
    mounted() {
      onMounted(() => {
        this.initializePayPalButton();
      });
    },
    methods: {
      initializePayPalButton() {
        window.paypal
          .Buttons({
            createOrder: () => {
              return fetch('http://localhost:8082/paypal/pay', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ price: 10, currency: 'USD' }),
              })
                .then((res) => res.json())
                .then((data) => data.id);
            },
            onApprove: (data) => {
              return fetch('http://localhost:8080/paypal/success', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                params: { paymentId: data.orderID, payerId: data.payerID },
              })
                .then((res) => res.text())
                .then((result) => {
                  console.log(result);
                  this.$router.push('/paymentSuccess');
                })
                .catch((error) => {
                  console.error(error);
                  this.$router.push('/paymentError');
                });
            },
          })
          .render('#paypal-button');
      },
    },
  };
  </script>
  
  <style scoped>
  .paypal-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  #paypal-button {
    width: 200px;
    height: 50px;
  }
  </style>
  