<template>
  <div>
    <h1>Register Organization</h1>
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
      <button type="submit">Register</button>
    </form>
  </div>
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