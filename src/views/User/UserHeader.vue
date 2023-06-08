<template>
  <nav class="navbar navbar-expand-lg">
    <router-link to="/" class="navbar-brand"> <img src="@/assets/img/Kelem.png" alt="Logo" width="100" height="60"></router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="main collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-list">
        <li class="nav-item">
          <router-link to="/">Home</router-link>
        </li>
      <li class="nav-item">
          <router-link to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contactUs">Contact Us</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FAQs">FAQ</router-link>
        </li>
        <li class="nav-item"><router-link to="/userlogin">Login</router-link></li>
        <li class="nav-item"><router-link to="/register">Sign up</router-link></li>
    </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center; 
}

.navbar:hover {
  background-color: #f1f1f1;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-brand img {
  transition: opacity 0.3s ease;
}

.navbar-brand:hover img {
  opacity: 0.8; 
}
.navbar-list {
  display: flex;
  align-items: center; 
  margin: 0;
  padding: 0;
  list-style: none;
}

.navbar-list li {
  margin-right: 15px;
  transition: color 0.3s ease;
}

.navbar-list li:last-child {
  margin-right: 0;
}

.navbar-list li:hover {
  color: #f70d0d; 
}
.dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown li {
  margin: 5px 0;
}

.dropdown li a {
  display: block;
}

.navbar-list li:hover .dropdown {
  display: block;
}

@media (max-width: 768px) {
  .navbar-brand {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
  }

  .navbar-brand img {
    width: 60px; 
  }
  .navbar-list {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-list li {
    margin: 10px 0;
  }

  .dropdown {
    position: static;
    box-shadow: none;
    background-color: transparent;
    padding: 0;
  }

  .dropdown li {
    margin: 0;
  }
}
</style>
