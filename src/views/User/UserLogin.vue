<template>
  <div class="login">
    <form class="login__form" @submit.prevent="submitForm">
      <h2 class="login__title">Log In</h2>
      <div class="login__input-container">
        <input v-model="email" type="email" placeholder="Email" class="login__input" />
        <div class="login__input-underline"></div>
      </div>
      <div class="login__input-container">
        <input v-model="password" type="password" placeholder="Password" class="login__input" />
        <div class="login__input-underline"></div>
      </div>
      <button type="submit" class="login__button">Log In</button>
      <router-link to="/forgotPassword" class="login__forgot-password">Forgot Password?</router-link>
    </form>
    <div class="login__signup-wrapper">
    <div class="login__signup">
      <p class="login__signup-message">Don't have an account?</p>
      <router-link to="/register"><button class="login__signup-button">Sign Up</button></router-link>
    </div>
  </div>
  </div>
</template>

<script>
import { setAuthToken } from '@/utils/auth';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const submitForm = async () => {
      try {
        const response = await axios.post('http://localhost:8082/api/auth/login', {
          username: email.value,
          password: password.value,
        });
        const jwtToken = response.data.token;
        setAuthToken(jwtToken);
        
        localStorage.setItem('token', jwtToken);
        router.push('/customerDashboard'); 
      } catch (error) {
        console.log(error);
      }
    };
    return {
      email,
      password,
      submitForm,
    };
  },
};

</script>

<style scoped>

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110vh;
  background-color: #f5f5f5;
  background-size: cover;
  background-position: center center;
}

.login__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 450px;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.login__title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #0a87ee;
}

.login__input-container {
  position: relative;
  margin-bottom: 1.1rem;
}

.login__input {
  width: 100%;
  padding: 0.5rem 0.5rem;
  font-size: 1.2rem;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
}

.login__input-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 4px;
  background-color: #3498db;
  transition: width 0.2s ease-in-out;
}

.login__input:focus + .login__input-underline {
  width: 100%;
}

.login__button {
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.login__button:hover {
  background-color: #2980b9;
}

.login__forgot-password {
  margin-top: 1rem;
  font-size: 1rem;
  text-decoration: none;
  color: #3498db;
  transition: color 0.2s ease-in-out;
}

.login__forgot-password:hover {
  color: #2980b9;
}

.login__signup-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
}

.login__signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #333;
  position: relative;
  margin-top: 2rem;
}

.login__signup-message {
  margin-bottom: 0.5rem;
}

.login__signup-button {
  padding: 1rem;
  font-size: 1.2rem;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

.login__signup-button:hover {
  background-color: #2980b9;
}

@media only screen and (max-width: 600px) {
  .login__form {
    border-radius: 0;
  }

  .login__button {
    border-radius: 0;
  }

  .login__signup-button {
    border-radius: 0;
    width: 100%;
  }
}
</style>
