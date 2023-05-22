<template>
    <div class="confirm-container">
        <div class="form-container">
        <div class="card">
        <h1>Activate Account</h1>
        <div v-if="!confirmed">
          <p>Please enter the confirmation code you received via email:</p>
          <form>
            <input v-model="confirmationCode" type="text" placeholder="Confirmation Code">
            <button class="button" @click="confirmRegistration">Activate</button>
          </form>
        </div>
        <div v-else>
          <p>Registration confirmed successfully!</p>
        </div>
        <div v-if="error">
          <p class="error">Error: {{ error }}</p>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        confirmationCode: '',
        confirmed: false,
        error: '',
      };
    },
    methods: {
      confirmRegistration() {
        const apiUrl = 'http://localhost:8081/user/confirm-registration';
  
        const requestData = {
          email: 'email@example.com',
          confirmationCode: this.confirmationCode,
        };
  
        axios
          .post(apiUrl, requestData)
          .then(() => {
            // successfull msg
            this.confirmed = true;
          })
          .catch((error) => {
            // Error 
            this.error = error.response.data.message;
          });
      },
    },
  };
  </script>

<style scoped>
.confirm-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  background-image: url("~@/assets/img/background.jpg");
  background-size: cover;
  background-position: center center;
}
.container {
    display: flex;
  flex-direction: column;
  width: 400px;
  max-width: 500px;
  align-items: center;
  padding: 2rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  width: 500px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .container {
    max-width: 300px;
  }

  .button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>


  
  
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
max-width: 500px;
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

/* Add your styles here */
</style>
