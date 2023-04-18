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


                    <div class="col-md-6 mb-4" >
                        <div class="form-check form-check-inline">
                          <input v-model="sex" class="form-check-input" type="radio" name="sex" 
                           id="female"
                            value="female" checked />
                          <label class="form-check-label" for="female">Female</label>
                        </div>

                        <div class="form-check form-check-inline">
                          <input class="form-check-input" v-model="sex" type="radio" name="sex" 
                           id="male"
                            value="male" />
                          <label class="form-check-label" for="male">Male</label>
                        </div>
                        <span v-if="errors.sex" class="error">{{ errors.sex }}</span>
                      </div>

    <div>
      <label for="password">Profile Photo</label>
      <input name="image" accept="image/png, image/jpeg" type="file" id="image"  placeholder="Upload photo" @change="onFileChange" required>
      <span v-if="errors.image" class="error">{{ errors.image }}</span>
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
      <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword}}</span>
    </div>
    <p v-if="passwordError">{{ passwordError }}</p>
    <button type="submit">submit</button>
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
      confirmPassword:'',
      password: '',
      isFormValid: false,
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
      if (this.password !== '' && this.confirmPassword !== '') {
        this.isFormValid = true;
      } 
      else {
        this.isFormValid = false;
      }      
    },    
    validatePassword() {
      // Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, and one number
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      if (!regex.test(this.password)) {
        console.log('Password does not meet the requirements');
        return;
      }
      this.validateForm();
    },
    validateConfirmPassword() {
      if (this.password !== this.confirmPassword) {
        console.log('Passwords do not match');
        return;
      }
      this.validateForm();
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