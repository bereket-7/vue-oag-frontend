<template>
    <div class="not-found">
      <div class="not-found__content">
        <h1 class="not-found__title">404</h1>
        <p class="not-found__message">Oops! The page you are looking for could not be found.</p>
        <router-link class="not-found__link" to="/">Go back to the homepage</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  }
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  .not-found__content {
    text-align: center;
  }
  
  .not-found__title {
    font-size: 10rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: #e74c3c;
  }
  
  .not-found__message {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #2c3e50;
  }
  
  .not-found__link {
    font-size: 1.2rem;
    text-decoration: none;
    color: #3498db;
    border-bottom: 2px solid #3498db;
  }
  
  .not-found__link:hover {
    color: #2980b9;
    border-bottom: 2px solid #2980b9;
  }
  </style>
  