<template>
    <div class="forgot-password">
      <form class="forgot-password__form">
        <h2 class="forgot-password__title">Forgot Password</h2>
        <div v-if="!showResetForm" class="forgot-password__input-container">
          <p>Enter your email address to receive verification</p>
          <input type="email" placeholder="Email" v-model="email" class="forgot-password__input" />
          <div class="forgot-password__input-underline"></div>
          <br><br>
          <button @click="requestPasswordReset" class="forgot-password__button">Submit</button>
        </div>
        <div v-else>
      <p>Enter your new password:</p>
      <input type="password" v-model="newPassword" placeholder="New Password">
      <button @click="resetPassword">Reset Password</button>
    </div>
    <p v-if="message">{{ message }}</p>
      </form>
    </div>
</template>



<script>
import axios from 'axios';
export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      newPassword: '',
      showResetForm: false,
      message: '',
      token: ''
    };
  },
  methods: {
    requestPasswordReset() {
      axios
        .post('/api/users/password/request', {
          email: this.email
        })
        .then(() => {
          this.message = 'Password reset email sent.';
          this.showResetForm = true;
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    },
    resetPassword() {
      axios
        .post('/api/users/password/reset', {
          token: this.token,
          newPassword: this.newPassword
        })
        .then(() => {
          this.message = 'Password reset successfully.';
          this.showResetForm = false;
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    }
  }
};
</script>


  
  <style scoped>
  .forgot-password {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  background-color: #f5f5f5;
  background-image: url("~@/assets/img/buetyback.png");
  background-size: cover;
  background-position: center center;
}

.forgot-password__form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  align-items: center;
  padding: 2rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.forgot-password__title {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.forgot-password__input-container {
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
}

.forgot-password__input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid #ccc;
  background-color: transparent;
}

.forgot-password__input:focus {
  outline: none;
  border-bottom-color: #4caf50;
}

.forgot-password__input-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background-color: #4caf50;
  transition: width 0.3s;
}

.forgot-password__input:focus + .forgot-password__input-underline {
  width: 100%;
}

.forgot-password__button {
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.forgot-password__button:hover {
  background-color: #3e8e41;
}

@media screen and (max-width: 768px) {
  .forgot-password__form {
    width: 90%;
  }
}

  </style>
  