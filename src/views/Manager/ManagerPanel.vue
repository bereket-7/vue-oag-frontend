<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Admin Panel</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/requestPage" class="nav-link">Requests</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/artworks" class="nav-link">Artworks</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/profiles" class="nav-link">Profiles</router-link>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <div class="container mt-3">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'ManagerPanel',
    methods: {
      logout() {
        // perform logout action here
      },
    },
  })
  </script>
  
  <style>
  /* add custom styles here */
  </style>
  