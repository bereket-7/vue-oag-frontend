<template>
  
  <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-4">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/organizationLogin">About</router-link>
        </li>
          <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Artworks
            </button>
            <ul class="dropdown-menu">
              <li class="dropdown-item"><router-link to="/artworks"> Paintings</router-link></li>
              <li class="dropdown-item"><router-link to="/artworks">Drawings</router-link></li>
              <li class="dropdown-item"><router-link to="/artworks">Sculptures</router-link></li>
            </ul>
          </div>
        <li class="nav-item">
          <router-link class="nav-link" to="/userSignUp">SignUp</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/userLogin">Login</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/artworkDetail">ShippingCart</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/contactUs">Contact</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/uploadArtwork">Submit Artwork</router-link>
        </li>
        
        <li class="nav-item">
          <router-link class="nav-link" to="/addStandard">Standard</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/showStandard">Rules</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/managerPanel">Manager</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/customerDashboard">Customer</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/artworkList">Artwork List</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  <router-view/>
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
