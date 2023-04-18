<template>
  <form @submit.prevent="submitForm">
    <div>
      <br>
      <input type="text" id="firstname" placeholder="First Name" v-model="firstname" required>
      <span v-if="errors.firstname" class="error">{{ errors.firstname }}</span>
    </div>
    <div>
      <input type="text" placeholder="Last Name" id="lastname" v-model="lastname" required>
      <span v-if="errors.lastname" class="error">{{ errors.lastname }}</span>
    </div>
    <div>
      <input type="email"  placeholder="Email" id="email" v-model="email" required>
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>
    <div>
      <input type="tel" id="phone"  placeholder="Phone" v-model="phone" required>
      <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
    </div>
    <div>
      <input type="text" id="address" placeholder="Address" v-model="address" required>
      <span v-if="errors.address" class="error">{{ errors.address }}</span>
    </div>
    <div>
      <input type="number" id="age"  placeholder="Age" v-model="age" required>
      <span v-if="errors.age" class="error">{{ errors.age }}</span>
    </div>
    <div>
      <label for="sex">Sex:</label>
      <select id="sex"  placeholder="Sex" v-model="sex" required>
        <option value="">Please select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <span v-if="errors.sex" class="error">{{ errors.sex }}</span>
    </div>
    <div>
      <label for="photo">Photo:</label>
      <input type="file" id="photo"  placeholder="Upload photo" @change="onFileChange" required>
      <span v-if="errors.photo" class="error">{{ errors.photo }}</span>
    </div>
    <div>
      <input type="text" placeholder="Username" id="username" v-model="username" required>
      <span v-if="errors.username" class="error">{{ errors.username }}</span>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
    </div>
    <button type="submit">Submit</button>
    <br>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      age: '',
      sex: '',
      photo: null,
      username:'',
      password: '',
      errors: {}
    }
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.firstname) {
        this.errors.firstname = 'First name is required.';
      }

      if (!this.lastname) {
        this.errors.lastname = 'Last name is required.';
      }

      if (!this.email) {
        this.errors.email = 'Email is required.';
      } else if (!this.validEmail(this.email)) {
        this.errors.email = 'Please enter a valid email address.';
      }

      if (!this.phone) {
        this.errors.phone = 'Phone number is required.';
      }
    }
  }
}
    </script>


<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 350px;
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
    max-width: 80%;
  }
}
</style>