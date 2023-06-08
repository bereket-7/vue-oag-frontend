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
      <input type="email" placeholder="Email" id="email" v-model="email" required>
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>
    <div>
      <input type="tel" id="phone" placeholder="Phone" v-model="phone" required>
      <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
    </div>
    <div>
      <input type="text" id="address" placeholder="Address" v-model="address" required>
      <span v-if="errors.address" class="error">{{ errors.address }}</span>
    </div>
    <div>
      <input type="number" id="age" placeholder="Age" v-model="age" required>
      <span v-if="errors.age" class="error">{{ errors.age }}</span>
    </div>


    <div class="col-md-6 mb-4">
      <div class="form-check form-check-inline">
        <input v-model="sex" class="form-check-input" type="radio" name="sex" id="female" value="female" checked />
        <label class="form-check-label" for="female">Female</label>
      </div>

      <div class="form-check form-check-inline">
        <input class="form-check-input" v-model="sex" type="radio" name="sex" id="male" value="male" />
        <label class="form-check-label" for="male">Male</label>
      </div>
      <span v-if="errors.sex" class="error">{{ errors.sex }}</span>
    </div>
    <!--
      <div>
      <label for="password">Profile Photo</label>
      <input name="image" accept="image/png, image/jpeg" type="file" id="image"  placeholder="Upload photo" @change="onFileChange" required>
      <span v-if="errors.image" class="error">{{ errors.image }}</span>
    </div>
-->
    <div>
      <label for="roles">Select Role</label>
      <select v-model="roles" class="form-select" id="role" required>
        <option value="CUSTOMER">CUSTOMER</option>
        <option value="ARTIST">ARTIST</option>
      </select>
    </div>

    <div>
      <input type="text" placeholder="Username" id="username" v-model="username" required>
      <span v-if="errors.username" class="error">{{ errors.username }}</span>
    </div>
    <div>
      <input type="password" id="password" placeholder="Password" v-model="password" required>
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
    </div>
    <div>
      <input type="password" id="confirmPassword" placeholder="Confirm Password" v-model="confirmPassword" required>
      <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
    </div>
    <p v-if="passwordError">{{ passwordError }}</p>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <button type="submit">submit</button>
    <br>
  </form>
  <FooterView />
</template>

<script>
import FooterView from '@/components/FooterView.vue'
import axios from 'axios'

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      sex: '',
      age: '',
      username: '',
      password: '',
      confirmPassword: '',
      errors: {},
      passwordError: '',
      errorMessage: ''
    }
  },
  components: {
    FooterView
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:8081/api/v1/registration', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phone: this.phone,
          address: this.address,
          sex: this.sex,
          age: this.age,
          username: this.username,
          password: this.password,
          roles: [this.roles]

        })
        this.$router.push('/signupSuccess')
      } catch (error) {
        this.errorMessage = error.response.data.message
      }
    },
    submitForm() {
      this.errors = {}
      if (!this.validateForm()) {
        return
      }
      this.register()
    },
    validateForm() {
      this.errors = {}
      const ethiopiaCode = '+251'
      if (!this.firstname) {
        this.errors.firstname = 'First name is required.'
      }
      if (!this.lastname) {
        this.errors.lastname = 'Last name is required.'
      }
      if (!this.email) {
        this.errors.email = 'Email is required.'
      } else if (!this.validEmail(this.email)) {
        this.errors.email = 'Please enter a valid email address.'
      }
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
      if (!this.address) {
        this.errors.address = 'Address is required.'
      }
      if (!this.age) {
        this.errors.age = 'Age is required.'
      }
      if (!this.sex) {
        this.errors.sex = 'Gender is required.'
      }
      if (!this.username) {
        this.errors.username = 'Username is required.'
      }
      if (!this.password) {
        this.errors.password = 'Password is required.'
      }
      if (!this.roles) {
        this.errors.roles = 'Role is is required.'
      }
      if (this.age < 18) {
        this.errors.age = 'You must be at least 18 years old to register.'
      }
      if (!this.confirmPassword) {
        this.errors.confirmPassword = 'Please confirm your password.'
      }
      if (this.password !== this.confirmPassword) {
        this.passwordError = 'Passwords do not match.'
      }

      if (this.password.length < 6) {
        this.passwordError = 'Password should be at least 6 characters long.'
        return
      }
      return Object.keys(this.errors).length === 0
    },
    validEmail(email) {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return emailRegex.test(String(email).toLowerCase())
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
  margin-top: 120px;
}

form>div {
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
  font-weight: bold;
}

input[type='file'] {
  padding: 0;
  font-size: 1rem;
  font-weight: bold;
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