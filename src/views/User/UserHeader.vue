<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <img src="src\assets\img\logo.png" alt="Kelem Logo" class="logo">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" >Home</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/about" class="nav-link" >About</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/contactUs" class="nav-link" >Contact Us</router-link>
        </li>
        <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Category
            </button>
            <ul class="dropdown-menu">
              <li class="dropdown-item"><router-link to="/artworks"> Paintings</router-link></li>
              <li class="dropdown-item"><router-link to="/artworks">Drawings</router-link></li>
              <li class="dropdown-item"><router-link to="/artworks">Sculptures</router-link></li>
            </ul>
          </div>
      </ul>
      
    </div>
    
        <div>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link" >Register</router-link>
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

<style>
.logo{
    height: 20px;
    width: 20px;
}
</style>