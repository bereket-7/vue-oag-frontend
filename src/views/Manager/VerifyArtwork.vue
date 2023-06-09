<template>
  <div>
    <div v-for="artwork in artworks" :key="artwork.id" class="artwork-card">
      <img :src="getArtworkImageUrl(artwork.id)" alt="Artwork Image">
      <div class="artwork-description">
        <h3>{{ artwork.description }}</h3>
      </div>
      <div class="buttons">
        <button @click="acceptArtwork(artwork.id)">Accept</button>
        <button @click="rejectArtwork(artwork.id)">Reject</button>
      </div>
    </div>

    <div class="popup" :class="{ 'open-popup': showPopup }">
      <img src="tick.png" alt="tick">
      <h2>{{ popupMessage }}</h2>
      <button @click="closePopup()">OK</button>
    </div>
  </div>
</template>
  
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      artworks: [],
      showPopup: false,
      popupMessage: '',
    };
  },
  mounted() {
    this.fetchArtworks();
  },
  methods: {
    fetchArtworks() {
      axios.get('http://localhost:8081/artworks')
        .then(response => {
          this.artworks = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getArtworkImageUrl(artworkId) {
      return `http://localhost:8081/artworks/${artworkId}/image`;
    },
    acceptArtwork(artworkId) {
      axios.put(`http://localhost:8081/artworks/${artworkId}/accept`)
        .then(response => {
          this.showSuccessPopup(response.data);
        })
        .catch(error => {
          this.showErrorPopup(error.response.data);
        });
    },
    rejectArtwork(artworkId) {
      axios.put(`http://localhost:8081/artworks/${artworkId}/reject`)
        .then(response => {
          this.showSuccessPopup(response.data);
        })
        .catch(error => {
          this.showErrorPopup(error.response.data);
        });
    },
    showSuccessPopup(message) {
      this.popupMessage = message;
      this.showPopup = true;
    },
    showErrorPopup(message) {
      this.popupMessage = message;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      this.popupMessage = '';
    },
  },
};
</script>

<style scoped>
.artwork-card {
  width: 300px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.artwork-card img {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.artwork-description h3 {
  margin: 0;
}

.buttons button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #04AA6D;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>