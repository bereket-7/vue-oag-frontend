<template>
    <div class="create-order">
      <h2>Create Order</h2>
      <form @submit.prevent="createOrder" class="order-form">
        <label for="cartId">Cart ID:</label>
        <input type="text" v-model="cartId" required><br>
        <label for="firstName">First Name:</label>
        <input type="text" v-model="firstName" required><br>
        <label for="lastName">Last Name:</label>
        <input type="text" v-model="lastName" required><br>
        <label for="phone">Phone:</label>
        <input type="text" v-model="phone" required><br>
        <label for="address">Address:</label>
        <input type="text" v-model="address" required><br>
        <button type="submit" class="submit-button">Create Order</button>
      </form>
      <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    </div>
  </template>
  
  <style scoped>
  .create-order {
    text-align: center;
    margin: 20px;
  }
  
  .order-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    padding: 8px;
    margin-bottom: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  .success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #4CAF50;
  color: #fff;
  text-align: center;
}
.error-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #f44336;
  color: #fff;
  text-align: center;
}
  
  @media (max-width: 600px) {
    .order-form {
      max-width: 300px;
    }
  }
  </style>
  

  <script>
import axios from 'axios';

export default {
  data() {
    return {
      cartId: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      successMessage: null,
      errorMessage: null
    };
  },
  methods: {
    createOrder() {
      const payload = {
        cartId: this.cartId,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        address: this.address,
      };

      axios.post('http://localhost:8082/api/order/create', payload)
        .then(response => {
          console.log(response.data);
          this.successMessage = "Order created successfully.";
        })
        .catch(error => {
          console.error(error); 
          this.errorMessage = "Error creating order. Please try again."; 
        });
    },
  },
};
</script>