<template>
  <br><br>
  <div class="form-container">
    <h1>Sign-up</h1>
    <hr class="mx-n3">
    <br>
    <form @submit.prevent="registerOrganization">
      <input type="text" placeholder="Name" v-model="firstname" required />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>

      <input type="email"  placeholder="Email" v-model="email" required />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>

      <input type="tel" placeholder="Phone" v-model="phone" required />
      <span v-if="errors.phone" class="error">{{ errors.phone }}</span>

      <input type="text" v-model="address" placeholder="Address" required />
     
      <input type="password" placeholder="Password" v-model="password" required />
      <span v-if="errors.password" class="error">{{ errors.password }}</span>

      <input type="password" placeholder="Confirm Password" v-model="confirmPassword" required />
      <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword}}</span>

      <p v-if="passwordError">{{ passwordError }}</p>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <br>
      <hr class="mx-n5">
      <button type="submit">Register</button>
    </form>
    <br>
  </div>
  <br><br>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterOrganization',
  data() {
    return {
      name:'',
      email: '',
      phone: '',
      address: '',
      password: '',
      errors: {},
      confirmPassword: '',
      passwordError: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:8082/api/v1/registration/register', {
          firstname:this.firstname,
          email: this.email,
          phone: this.phone,
          address: this.address,
          password: this.password,
        });
        this.$router.push('/signupSuccess');
      } catch (error) {
        this.errorMessage = error.response.data.message;
      }
    },
    registerOrganization() {
      this.errors = {};
      if (!this.validateForm()) {
        return;
      }
      this.register();
    },
    validateForm() {
      this.errors = {};
      if (!this.email) {
        this.errors.email = 'Email is required.';
      }else if (!this.validEmail(this.email)) {
    this.errors.email = 'Please enter a valid email address.';
  }
  if (!this.phone) {
  this.errors.phone = 'Phone number is required.';
} else if (!/^(\+251)?(09|07)\d{8}$/.test(this.phone)) {
  this.errors.phone = 'Invalid phone number format.';
}

      if (!this.address) {
        this.errors.address = 'Address is required.';
      }
      if (!this.password) {
        this.errors.password = 'Password is required.';
      }
      if (!this.confirmPassword) {
        this.errors.confirmPassword = 'Please confirm your password.';
      }
      if (this.password !== this.confirmPassword) {
        this.passwordError = 'Passwords do not match.';
        return false; 
      }

      if (this.password.length < 6) {
        this.passwordError = 'Password should be at least 6 characters long.';
        return false;
      }

      return Object.keys(this.errors).length === 0;
    },
    validEmail(email) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
}
  }
};
</script>

<style scoped>
  .form-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    margin-top: 70px;
  }

  input[type="text"],
  input[type="tel"],
  input[type="email"],
  input[type="password"] {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
 
  h1 {
    color:#3498db;

  }
  button[type="submit"] {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button[type="submit"]:hover {
    background-color: #2980b9;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 600px) {
    .form-container {
      max-width: 100%;
    }
  }

</style>