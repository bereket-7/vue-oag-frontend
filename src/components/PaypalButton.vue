<template>
    <div>
      <div id="paypal-button-container"></div>
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
                .then((data) => data.id); // Return the order ID
            },
            onApprove: (data) => {
              return fetch('http://localhost:8080/paypal/success', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                params: { paymentId: data.orderID, payerId: data.payerID }, // Adjust the parameter names according to backend implementation
              })
                .then((res) => res.text())
                .then((result) => {
                  console.log(result);
                  // Redirect to success page or show a success message
                })
                .catch((error) => {
                  // Handle the error
                  console.error(error);
                  // Redirect to error page or show an error message
                });
            },
          })
          .render('#paypal-button-container');
      },
    },
  };
  </script>
  