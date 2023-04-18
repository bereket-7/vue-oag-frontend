<template>
  <form>
    <label for="firstname">First Name</label>
    <input type="text" id="firstname" v-model="firstName" />
    <span v-if="!firstName" class="error">Please enter your first name.</span>

    <label for="lastname">Last Name</label>
    <input type="text" id="lastname" v-model="lastName" />
    <span v-if="!lastName" class="error">Please enter your last name.</span>

    <label for="email">Email</label>
    <input type="email" id="email" v-model="email" />
    <span v-if="!email || !validEmail" class="error">Please enter a valid email address.</span>

    <label for="phone">Phone</label>
    <input type="text" id="phone" v-model="phone" />
    <span v-if="!phone" class="error">Please enter your phone number.</span>

    <label for="address">Address</label>
    <input type="text" id="address" v-model="address" />
    <span v-if="!address" class="error">Please enter your address.</span>

    <label for="age">Age</label>
    <input type="number" id="age" v-model="age" />
    <span v-if="!age" class="error">Please enter your age.</span>

    <label for="sex">Sex</label>
    <select id="sex" v-model="sex">
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
    <span v-if="!sex" class="error">Please select your gender.</span>

    <label for="photo">Photo</label>
    <input type="file" id="photo"  @change="onFileChange" />
    <span v-if="!photo" class="error">Please upload a photo.</span>

    <label for="password">Password</label>
    <input type="password" id="password" v-model="password" />
    <span v-if="!password" class="error">Please enter a password.</span>

    <button type="submit" @click.prevent="submitForm">Submit</button>
  </form>
</template>

<script>
export default {
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
