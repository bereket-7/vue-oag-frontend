<template>
    <div class="container">
      <h1 class="text-center">Wishlist</h1>
      <hr>
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div v-if="wishlistItems.length === 0" class="alert alert-info">
            Your wishlist is currently empty.
          </div>
          <div v-else>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in wishlistItems" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <button class="btn btn-danger btn-sm" @click="removeItem(item.id)">
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        wishlistItems: []
      };
    },
    methods: {
      removeItem() {
        // Call your Spring Boot controller's remove item endpoint here
        // and update the wishlistItems array with the updated data
      }
    },
    mounted() {
      // Call your Spring Boot controller's get wishlist items endpoint here
      // and update the wishlistItems array with the data returned
    }
  };
  </script>
  