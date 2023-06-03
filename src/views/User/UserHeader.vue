<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="@/assets/img/Kelem.png" alt="Logo" width="60" height="40">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="main collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
         <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/contactus">Contact Us</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Sculpture</a></li>
            <li><a class="dropdown-item" href="#">Abstract</a></li>
            <li><a class="dropdown-item" href="#">Oil</a></li>
          </ul>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
        <li class="nav-link">
          <router-link class="nav-link" to="/userlogin">Login</router-link>
          </li>
        <li class="nav-link">
          <router-link class="nav-link" to="/register">Register</router-link>
          </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
   name:'UserHeader',
   components:{

   } 
}
</script>

<style >


</style>