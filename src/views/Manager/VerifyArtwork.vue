<template>
    <div class="container mt-5">
      <h1>Artwork List</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="artwork in artworks" :key="artwork.id">
            <td>{{ artwork.name }}</td>
            <td><img :src="artwork.photoUrl" style="max-height: 100px;"></td>
            <td>
              <button class="btn btn-success" @click="acceptArtwork(artwork.id)" :disabled="artwork.accepted">Accept</button>
              <button class="btn btn-danger" @click="rejectArtwork(artwork.id)" :disabled="artwork.rejected">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        artworks: []
      };
    },
    mounted() {
      this.fetchArtworks();
    },
    methods: {
      fetchArtworks() {
        axios.get('/api/artworks')
          .then(response => {
            this.artworks = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      acceptArtwork(id) {
        axios.post(`/api/artworks/${id}/accept`)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
            const artwork = this.artworks.find(a => a.id === id);
            artwork.accepted = true;
          })
          .catch(error => {
            console.error(error);
          });
      },
      rejectArtwork(id) {
        axios.post(`/api/artworks/${id}/reject`)
          // eslint-disable-next-line no-unused-vars
          .then(response => {
            const artwork = this.artworks.find(a => a.id === id);
            artwork.rejected = true;
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
  