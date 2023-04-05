<template>
    <section class="vh-200" style="background-color: #eee;">
      <div class="container h-200">
        <br>
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style="border-radius: 25px;">
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
    
                    <form class="mx-1 mx-md-4">
    
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input type="text" class="form-control" placeholder="First Name" id="firstName" v-model="formData.firstName" :class="{ 'is-invalid': formErrors.firstName }">
                        </div>
                        <div v-if="formErrors.firstName" class="invalid-feedback">{{ formErrors.firstName }}</div>
                      </div>
    
                      
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input type="text" id="lastName" placeholder="Last Name" v-model="formData.lastName" :class="{ 'is-invalid': formErrors.lastName }" class="form-control" />
                          <div v-if="formErrors.lastName" class="invalid-feedback">{{ formErrors.lastName }}</div>
                        </div>
                      </div>

                      
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input type="email" id="email" placeholder="Email" v-model="formData.email" :class="{ 'is-invalid': formErrors.email }" class="form-control" />
                          <div v-if="formErrors.email" class="invalid-feedback">{{ formErrors.email }}</div>
                        </div>
                      </div>


                      
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-phone fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input type="text" id="phone" v-model="formData.phone" :class="{ 'is-invalid': formErrors.phone }" placeholder="Phone" class="form-control" />
                          <div v-if="formErrors.phone" class="invalid-feedback">{{ formErrors.phone }} </div>
                        </div>
                      </div>
    
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-map-marker fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input type="text" id="address" v-model="formData.name" :class="{ 'is-invalid': formErrors.address }" placeholder="Address" class="form-control" />
                          <div v-if="formErrors.address" class="invalid-feedback">{{ formErrors.address }}</div>
                        </div>
                      </div>
    
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input type="email" id="username" v-model="formData.username" :class="{ 'is-invalid': formErrors.username }" placeholder="Username" class="form-control" />
                          <div v-if="formErrors.username" class="invalid-feedback">{{ formErrors.username }}</div>
                        </div>
                      </div>
    
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input type="password" id="password" v-model="formData.password" :class="{ 'is-invalid': formErrors.password }" placeholder="Password" class="form-control" />
                          <div v-if="formErrors.password" class="invalid-feedback">{{ formErrors.password }}</div>
                        </div>
                      </div>
    
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input type="password" id="confirmPassword" v-model="formData.confirmPassword" :class="{ 'is-invalid': formErrors.confirmPassword }" placeholder="Confirm Password" class="form-control" />
                          <div v-if="formErrors.confirmPassword" class="invalid-feedback">{{ formErrors.confirmPassword }}</div>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <div class="form-outline flex-fill mb-0">
                          <input type="number" id="age" v-model="formData.age" :class="{ 'is-invalid':  
                           formErrors.age }" placeholder="Age" class="form-control" 
                           name="age" min="15" 
                           />
                           <div v-if="formErrors.age" class="invalid-feedback">{{ formErrors.age }}     
                           </div>
                        </div>
                      </div>
            

                      <div class="col-md-6 mb-4">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="sex" 
                           id="femaleGender"
                            value="option1" checked />
                          <label class="form-check-label" for="female">Female</label>
                        </div>

                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="sex" 
                           id="maleGender"
                            value="option2" />
                          <label class="form-check-label" for="male">Male</label>
                        </div>
                      </div>

                      <div class="row">
                <div class="col-12">

                  <select class="select form-control-md">
                    <option value="1" disabled>Select Role</option>
                    <option value="2">Customer</option>
                    <option value="3">Artist</option>
                  </select>
                </div>
              </div>
                            
                      <div class="form-check d-flex justify-content-center mb-5">
                        <input class="form-check-input me-2" type="checkbox" value="" 
                         id="form2Example3c" />
                        <label class="form-check-label" for="form2Example3">
                          I agree all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>
    
                      <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-3">
                        <button type="submit" class="btn btn-success btn-lg">Register</button>
                      </div>
                
                    </form>
                    <router-link to="/login">already have an account</router-link>
                    </div>
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
    
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      class="img-fluid" alt=" image">
    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br>
      </div>
    </section>  
    </template>
    
    <script>

    export default {
      name:'UserSignUp',
        component:{
        },
      data() {
        return {
          formData: {
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            email: '',
            username: '',
            confirmPassword: '',
            password: '',
            age: ''
          },
          formErrors: {}
        }
      },
      methods: {
        validateForm() {
          this.formErrors = {}
          if (!this.formData.firstName) {
            this.formErrors.firstName = 'First Name is required'
          }
          if (!this.formData.lastName) {
            this.formErrors.lastName = 'Last Name is required'
          }
          if (!this.formData.address) {
            this.formErrors.address = 'Address is required'
          }
          if (!this.formData.phone) {
            this.formErrors.phone = 'Phone is required'
          }
          if (!this.formData.email) {
            this.formErrors.email = 'Email is required'
          } else if (!this.validateEmail(this.formData.email)) {
            this.formErrors.email = 'Invalid email address'
          }
          if (!this.formData.username) {
            this.formErrors.username = 'Username is required'
          }
          if (!this.formData.password) {
            this.formErrors.password = 'Password is required'
          }
          if (!this.formData.confirmPassword) {
            this.formErrors.confirmPassword = 'Confirm Password is required'
          }
        },
        submitForm() {
          this.validateForm()
          if (Object.keys(this.formErrors).length === 0) {
            // Submit form logic goes here
          }
        },
        validateEmail(email) {
          // Regular expression to validate email format
          const re = /\S+@\S+\.\S+/
          return re.test(email)}}}
       
    </script>
    
    <style>

@media (min-width: 1025px) {
.h-custom {
height: 100vh !important;
}
}

    </style>