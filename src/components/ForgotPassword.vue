<template>
    <div class="forgot-password">
      <form class="forgot-password__form">
        <h2 class="forgot-password__title">Forgot Password</h2>
        <div v-if="!showResetForm" class="forgot-password__input-container">
          <p>Enter your email address to receive verification</p>
          <input type="email" placeholder="Email" v-model="email" class="forgot-password__input" />
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
}

.forgot-password__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.forgot-password__title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333333;
}

.forgot-password__input-container {
  margin-bottom: 20px;
}

.forgot-password__input {
  width: 100%;
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
}

.forgot-password__input-underline {
  width: 100%;
  height: 2px;
  background-color: #007bff;
}

.forgot-password__button {
  width: 100%;
  padding: 12px;
  background-color:  #3498db;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.forgot-password__button:hover {
  background-color: #0056b3;
}

.forgot-password__message {
  margin-top: 10px;
}

.forgot-password__message p {
  font-size: 14px;
  color: #555555;
}

@media screen and (max-width: 480px) {
  .forgot-password__form {
    padding: 16px;
  }
  
  .forgot-password__title {
    font-size: 20px;
  }
  
  .forgot-password__input {
    padding: 10px;
    font-size: 12px;
  }
  
  .forgot-password__button {
    padding: 10px;
    font-size: 14px;
  }
}
</style>
  