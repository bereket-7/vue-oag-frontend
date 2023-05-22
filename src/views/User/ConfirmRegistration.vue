<template>
    <div>
      <h1>Registration Confirmation</h1>
      <div v-if="!confirmed">
        <p>Please enter the confirmation code you received via email:</p>
        <input v-model="confirmationCode" type="text" placeholder="Confirmation Code">
        <button @click="confirmRegistration">Confirm Registration</button>
      </div>
      <div v-else>
        <p>Registration confirmed successfully!</p>
      </div>
      <div v-if="error">
        <p>Error: {{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        confirmationCode: '',
        confirmed: false,
        error: '',
      };
    },
    methods: {
      confirmRegistration() {
        const apiUrl = 'http://localhost:8081/user/confirm-registration';
  
        const requestData = {
          email: 'email@example.com',
          confirmationCode: this.confirmationCode,
        };
  
        axios
          .post(apiUrl, requestData)
          .then(() => {
            // Registration confirmed successfully
            this.confirmed = true;
          })
          .catch((error) => {
            // Error occurred during registration confirmation
            this.error = error.response.data.message;
          });
      },
    },
  };
  </script>
  
  