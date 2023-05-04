<template>
    <div class="forgot-password">
      <form class="forgot-password__form">
        <h2 class="forgot-password__title">Forgot Password</h2>
        <div class="forgot-password__input-container">
          <input type="email" placeholder="Email" class="forgot-password__input" />
          <div class="forgot-password__input-underline"></div>
        </div>
        <button class="forgot-password__button">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ForgotPassword',
    data() {
      return {
        email: ''
      }
    },
    methods: {
      onSubmit() {
        // Here you can make an API call to reset the user's password
        // using this.email as the user's email address
        // and then show a success message or redirect the user to another page
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  