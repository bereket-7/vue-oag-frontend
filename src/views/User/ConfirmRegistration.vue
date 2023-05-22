<template>
    <div class="container">
      <h1>Registration Confirmation</h1>
      <div v-if="!confirmed">
        <p>Please enter the confirmation code you received via email:</p>
        <input v-model="confirmationCode" type="text" placeholder="Confirmation Code">
        <button class="button" @click="confirmRegistration">Confirm Registration</button>
      </div>
      <div v-else>
        <p>Registration confirmed successfully!</p>
      </div>
      <div v-if="error">
        <p class="error">Error: {{ error }}</p>
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

<style scoped>
.container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .container {
    max-width: 300px;
  }

  .button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>


  
  