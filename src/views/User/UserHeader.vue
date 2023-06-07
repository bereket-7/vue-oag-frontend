<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <li><a href="#">Login</a></li>
      <li><a href="#">Signup</a></li>
      <li>
        <a href="#">Art Category</a>
        <ul class="dropdown">
          <li><a href="#">Painting</a></li>
          <li><a href="#">Sculpture</a></li>
          <li><a href="#">Mixed Media</a></li>
        </ul>
      </li>
      <li><a href="#">Contact Us</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">FAQ</a></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center; 
}

.navbar:hover {
  background-color: #f1f1f1;
}

.navbar-list {
  display: flex;
  align-items: center; 
  margin: 0;
  padding: 0;
  list-style: none;
}

.navbar-list li {
  margin-right: 20px;
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
