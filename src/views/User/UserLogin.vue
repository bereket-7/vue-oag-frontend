<template>
  <div class="login">
    <form class="login__form">
      <h2 class="login__title">Log In</h2>
      <div class="login__input-container">
        <input type="email" placeholder="Email" class="login__input" />
        <div class="login__input-underline"></div>
      </div>
      <div class="login__input-container">
        <input type="password" placeholder="Password" class="login__input" />
        <div class="login__input-underline"></div>
      </div>
      <div class="login__input-container">
        <select class="login__input">
          <option value="admin">ARTIST</option>
          <option value="user">CUSTOMER</option>
        </select>
        <div class="login__input-underline"></div>
      </div>
      <button class="login__button">Log In</button>
      <a href="#" class="login__forgot-password">Forgot Password?</a>
    </form>
    <div class="login__signup-wrapper">
    <div class="login__signup">
      <p class="login__signup-message">Don't have an account?</p>
    <button class="login__signup-button">Sign Up</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
}
</script>

<style scoped>

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110vh;
  background-color: #f5f5f5;
  background-image: url("~@/assets/img/background.jpg");
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
  margin-bottom: 2rem;
  color: #333;
}

.login__input-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.login__input {
  width: 100%;
  padding: 1rem 0.5rem;
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
  height: 2px;
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
