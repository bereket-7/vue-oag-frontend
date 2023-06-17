<template>
    <div>
      <h1>Error</h1>
      <p>Sorry, an error occurred during the payment process.</p>
      <p>Please try again later or contact customer support.</p>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      // You can perform any additional error handling or logging here
      console.error('Payment error occurred');
    }
  };
  </script>
  