<template>
  <div class="container">
    <div class="form-container">
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
  </form>
  </div>


  <div class="animation-container">
    <p class="animation-text">Kelem Online Art Gallery</p>
      <div class="swatch">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
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
.animation-text {
  bottom: -50px;
  transform: translateX(-50%);
  font-size: 35px;
  font-weight: bold;
  color: #067915;
  margin-top:30px;
}

.swatch {
  display: block;
  text-align: center;
  position: relative;
  margin: 100px;
}

.swatch div {
  width: 90px;
  height: 400px;
  position: absolute;
  top: 0px;
  border-radius: 5px;
  border-top: solid 2px rgba(0, 0, 0, .2);
  border-left: solid 3px rgba(255, 255, 255, .2);
  border-bottom: solid 3px rgba(0, 0, 0, .2);
  text-align:center;
  box-sizing: border-box;
  transform-origin: center 90%;
  display: inline-block;
  backface-visibility: hidden;
  margin-left: -35px;
  transform: rotate(0deg);
}

.swatch div:before {
  width: 16px;
  height: 16px;
  content: "";
  background-color: #FFFFFF;
  display: inline-block;
  border-radius: 8px;
  bottom: 10px;
  position: absolute;
  margin-left: -8px;
}

.swatch div:nth-child(1) {
  background-color: #815A8F;
  animation: swatch-purple-motion 5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
}

.swatch div:nth-child(2) {
  background-color: #6730EC;
  animation: swatch-blue-motion 5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
}

.swatch div:nth-child(3) {
  background-color: #9ED763;
  animation: swatch-green-motion 5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
}

.swatch div:nth-child(4) {
  background-color: #FBD400;
  animation: swatch-yellow-motion 5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
}

.swatch div:nth-child(5) {
  background-color: #FF9000;
  animation: swatch-orange-motion 5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
}

.swatch div:nth-child(6) {
  background-color: #F73F52;
  animation: swatch-red-motion 5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
}

@keyframes swatch-purple-motion {
  0% {
    transform: rotate(0deg);
  }
  30%,
  70% {
    transform: rotate(-65deg);
  }
  90%,
  10% {
    transform: rotate(0deg);
  }
}

@keyframes swatch-blue-motion {
  0% {
    transform: rotate(0deg);
  }
  30%,
  70% {
    transform: rotate(-40deg);
  }
  90%,
  10% {
    transform: rotate(0deg);
  }
}

@keyframes swatch-green-motion {
  0% {
    transform: rotate(0deg);
  }
  30%,
  70% {
    transform: rotate(-15deg);
  }
  90%,
  10% {
    transform: rotate(0deg);
  }
}

@keyframes swatch-yellow-motion {
  0% {
    transform: rotate(0deg);
  }
  30%,
  70% {
    transform: rotate(15deg);
  }
  90%,
  10% {
    transform: rotate(0deg);
  }
}

@keyframes swatch-orange-motion {
  0% {
    transform: rotate(0deg);
  }
  30%,
  70% {
    transform: rotate(40deg);
  }
  90%,
  10% {
    transform: rotate(0deg);
  }
}

@keyframes swatch-red-motion {
  0% {
    transform: rotate(0deg);
  }
  30%,
  70% {
    transform: rotate(65deg);
  }
  90%,
  10% {
    transform: rotate(0deg);
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 120vh;
  background: linear-gradient(to right, #f0f0f0, #ffffff);
  margin-bottom: 20px;
  margin-top: 120px;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 350px;
  margin: 0 auto;
  margin-bottom: 20px;
}

form>div {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form-container {
  max-width: 400px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  margin-right: 20px;
  margin-top: 25px;
}
.animation-container {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
  .container {
    flex-direction: column;
    align-items: center;
  }

  .form-container,
  .animation-container {
    margin-bottom: 20px; 
    overflow: hidden; 
    padding: 0 20px;
    width: 100%; 
  }
}
</style>