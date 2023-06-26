<template>
    <form class="password-change-form" @submit="changePassword">
      <div class="form-group">
        <label for="oldPassword">Old Password</label>
        <input type="password" id="oldPassword" v-model="oldPassword" required>
      </div>
      <div class="form-group">
        <label for="newPassword">New Password</label>
        <input type="password" id="newPassword" v-model="newPassword" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <button type="submit" class="btn-submit">Change Password</button>
    </form>
</template>
  
  <style scoped>
  .password-change-form {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn-submit {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-submit:hover {
    background-color: #45a049;
  }
  </style>
  
  <script>
import { isAuthenticated } from '@/utils/auth';
import api from '@/utils/api';

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  },
  methods: {
    async changePassword() {
      if (!isAuthenticated()) {
        return;
      }

      try {
        const response = await api.post('users/password/change', {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword
        });
        console.log(response.data); 
      } catch (error) {
        console.error(error.response.data); 
      }
    }
  }
};
</script>
