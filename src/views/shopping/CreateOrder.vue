<template>
    <div class="create-order">
      <h2>Order</h2>
      <form @submit.prevent="createOrder" class="order-form">
        <input type="text" v-model="firstName" placeholder="First Name" required><br>
        <input type="text" v-model="lastName" placeholder="Last Name" required><br>
        <input type="text" v-model="phone" placeholder="Phone" required><br>
        <input type="text" v-model="address" placeholder="Address" required><br>
        <button type="submit" class="submit-button">Submit</button>
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
    margin-top: 100px;
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
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      successMessage: null,
      errorMessage: null
    };
  },
  methods: {
    validateForm(){
        this.errors = {}
      const ethiopiaCode = '+251'
        if (!this.phone) {
        this.errors.phone = 'Phone number is required.'
      } else if (
        !(
          (this.phone.startsWith('0' + '9') || this.phone.startsWith('0' + '7')) && this.phone.length === 10
          || this.phone.startsWith(ethiopiaCode + '9') && this.phone.length === 13
          || this.phone.startsWith(ethiopiaCode + '7') && this.phone.length === 13
        )
      ) {
        this.errors.phone = 'Invalid phone number format.'
      }
    },
    createOrder() {
      const payload = {
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