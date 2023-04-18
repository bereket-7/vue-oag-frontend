<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="firstname">First Name:</label>
      <input type="text" id="firstname" v-model="firstname" required>
      <span v-if="errors.firstname" class="error">{{ errors.firstname }}</span>
    </div>
    <div>
      <label for="lastname">Last Name:</label>
      <input type="text" id="lastname" v-model="lastname" required>
      <span v-if="errors.lastname" class="error">{{ errors.lastname }}</span>
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>
    <div>
      <label for="phone">Phone:</label>
      <input type="tel" id="phone" v-model="phone" required>
      <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
    </div>
    <div>
      <label for="address">Address:</label>
      <input type="text" id="address" v-model="address" required>
      <span v-if="errors.address" class="error">{{ errors.address }}</span>
    </div>
    <div>
      <label for="age">Age:</label>
      <input type="number" id="age" v-model="age" required>
      <span v-if="errors.age" class="error">{{ errors.age }}</span>
    </div>
    <div>
      <label for="sex">Sex:</label>
      <select id="sex" v-model="sex" required>
        <option value="">Please select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <span v-if="errors.sex" class="error">{{ errors.sex }}</span>
    </div>
    <div>
      <label for="photo">Photo:</label>
      <input type="file" id="photo" @change="onFileChange" required>
      <span v-if="errors.photo" class="error">{{ errors.photo }}</span>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
<script>
export default {
  name: 'RegisterUser',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      age: '',
      sex: '',
      photo: null,
      password: ''
    }
  },
  computed: {
    validEmail() {
      // regular expression for email validation
      const emailRegex = /\S+@\S+\.\S+/
      return emailRegex.test(this.email)
    }
  },
  methods: {
    onFileChange(event) {
      this.photo = event.target.files[0];
    },
    submitForm() {
      if (!this.firstName || !this.lastName || !this.email || !this.validEmail || !this.phone || !this.address || !this.age || !this.sex || !this.photo || !this.password) {
        alert('Please fill out all required fields.')
      } else {
        // submit form data to backend
      }
    }
  }
}
</script>

<style scoped>

form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
}

form > div {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input,
select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

input[type='file'] {
  padding: 0;
  font-size: 1rem;
}

button {
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #3e8e41;
}

.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

@media only screen and (max-width: 768px) {
  form {
    max-width: 100%;
  }
}


</style>