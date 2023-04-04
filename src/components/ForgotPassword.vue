<template>
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center h-100">
  
      <div class="card text-center" style="width: 300px;">
      <div class="card-header h4 text-white bg-dark">Password Reset</div>
      <div class="card-body px-5">
          <p class="card-text ">
              Enter your email address and we'll send you an email with instructions to reset your password.
          </p>
          <div class="mb-4">
              <input type="email" class="form-control" id="recover-mail" placeholder="name@example.com">
          </div>
          <a href="#" class="btn btn-success w-100">Reset password</a>
          <div class="d-flex justify-content-between mt-3">
  
               <router-link to="/userLogin">Login</router-link>
               <router-link to="/userSignUp">SignUp</router-link>
          </div>
      </div>
  </div>
  </div>
  </div>
  </template>
  
  <script>
  export default {
      name: 'ForgotPassword',
      components: {
      
    }   
  }
  </script>
  
  <style scoped>
      .container{
              align-items:center;
              justify-content:center;
              margin-top: 150px;
          }
  </style>