<template>
  <br><br>
  <div class="form-container">
    <h1>Organization Signup</h1>
    <hr class="mx-n3">
    <br>
    <form @submit.prevent="registerOrganization">
      <label>Name:</label>
      <input type="text" v-model="name" required />
      <label>Email:</label>
      <input type="email" v-model="email" required />
      <label>Phone:</label>
      <input type="text" v-model="phone" required />
      <label>Address:</label>
      <input type="text" v-model="address" required />
      <label>Password:</label>
      <input type="password" v-model="password" required />
      <hr class="mx-n5">
      <button type="submit">Register</button>
    </form>
    <br><br>
  </div>
  <br><br>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'RegisterOrganization',
  setup() {
    const name = ref('');
    const email = ref('');
    const phone = ref('');
    const address = ref('');
    const password = ref('');

    const registerOrganization = () => {
      const organization = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        password: password.value
      };

      axios.post('http://localhost:8081/organization/add', organization)
        .then(response => {
          console.log(response.data);
          alert("successfully registered");
          this.organization = {
        name: '',
        email: '',
        phone: '',
        address: '',
        password:''
      };

        })
        .catch(error => {
          console.log(error);
          // handle error
        });
    };

    return { name, email, phone, address, password, registerOrganization };
  }
};
</script>

<style scoped>
  /* Form container */
  .form-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  /* Form inputs */
  input[type="text"],
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

  /* Form button */
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

  /* Form label */
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }


  /* Media queries for responsiveness */
  @media screen and (max-width: 600px) {
    .form-container {
      max-width: 100%;
    }
  }

</style>