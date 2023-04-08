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
              <button type="button" class="btn btn-primary position-relative">
                Inbox<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  99+
                  <span class="visually-hidden">unread messages</span>
                </span>
              </button>
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
<section>
<table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
  </tbody>
</table>
</section>
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
  
  <style scoped>
  /* add custom styles here */
  </style>
  