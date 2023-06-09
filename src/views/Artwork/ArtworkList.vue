<template>
  <div class="artwork-gallery">
    <div v-for="artwork in artworks" :key="artwork.id" class="artwork-card">
      <div class="artwork-image">
        <img :src="getArtworkImageUrl(artwork.id)" alt="Artwork Image" style="width: 410px; height: 300px;" />
        <button class="wishlist-button" @click="addToWishlist(artwork)">
              <i class="fas fa-heart"></i></button>
      </div>
      <div class="artwork-details">
        <h3><b>{{ artwork.artworkName }}</b></h3>
        <p><b>Price: {{ artwork.price }}</b></p>
        <p>Category: {{ artwork.artworkCategory }}</p>
        <button class="btn btn-primary quick-view" @click="openModal(artwork)">Quick View</button>
      </div>
    </div>

    <div v-if="selectedArtwork" class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ selectedArtwork.artworkName }}</h3>
          <button class="btn btn-close" @click="closeModal"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body">
          <div class="artwork-image">
            <img :src="getArtworkImageUrl(selectedArtwork.id)" alt="Artwork Image" style="width: 400px; height: 300px;" />
          </div>
          <div class="artwork-details">
            <p>{{ selectedArtwork.artworkDescription }}</p>
            <p>Price: {{ selectedArtwork.price }}</p>
            <p>Size: {{ selectedArtwork.size }}</p>
            <p><b>Category: {{ selectedArtwork.artworkCategory }}</b></p>
            <hr class="mx-n3">
            <button type="button" class="btn btn-danger">Add to Cart</button>
            <StarRating :rating="selectedArtwork.averageRating" :editable="true" @rating-selected="submitRating" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import api from '@/utils/api';
import { isAuthenticated } from '@/utils/auth';
import axios from 'axios';
import StarRating from '@/components/StarRating'; 
import router from '@/router';

export default {
  components: {
    StarRating, 
  },
  data() {
    return {
      artworks: [],
      selectedArtwork: null,
    };
  },
  mounted() {
    this.fetchArtworks();
  },
  methods: {
    openModal(artwork) {
      this.selectedArtwork = artwork;
      document.body.classList.add('modal-open');
    },
    closeModal() {
      this.selectedArtwork = null;
      document.body.classList.remove('modal-open');
    },
    fetchArtworks() {
      axios.get('http://localhost:8082/api/artworks')
        .then(response => {
          this.artworks = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getArtworkImageUrl(artworkId) {
      return `http://localhost:8082/api/artworks/${artworkId}/image`;
    },
    submitRating(rating) {
      const artworkId = this.selectedArtwork.id;
      axios.post(`http://localhost:8082/api/rating/artworks/${artworkId}/rate`, { rating })
        .then(response => {
          console.log(response);
          console.log('Rating submitted successfully!');
        })
        .catch(error => {
          console.error('Failed to submit rating:', error);
        });
    },
    addToWishlist(artwork) {
      if (!isAuthenticated()) {
        router.push('/userLogin');
        return;
      }
      api.post('http://localhost:8082/api/wishlist/save', artwork)
        .then(response => {
          console.log(response.data);
          alert('Wishlist saved successfully.');
        })
        .catch(error => {
          console.error(error);
          alert('Error saving wishlist.');
        });
    },
  },
};
</script>



<style scoped>
.artwork-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 100px;
}

.artwork-card {
  width: 400px;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;
}

.artwork-card:hover {
  transform: scale(1.2);
}

.artwork-image {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.artwork-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.artwork-card:hover .artwork-image img {
  transform: scale(1.1);
}

.artwork-details {
  margin-top: 10px;
  text-align: center;
}

.artwork-details h3 {
  font-size: 18px;
  margin-bottom: 5px;
}

.artwork-details p {
  margin: 5px 0;
}

.wishlist-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: transparent;
  border: none;
  color: darkred;
  font-size: 20px;
}

.wishlist-button:hover {
  color: red;
}

.quick-view {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: rgba(11, 61, 168, 0.8);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: none;
}

.artwork-card:hover .quick-view {
  display: block;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  max-width: 800px;
  width: 90%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.modal-header h3 {
  font-size: 24px;
  margin: 0;
}

.modal-header .btn-close {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
}

.modal-body {
  display: flex;
}

.modal-body .artwork-image {
  flex: 1;
}

.modal-body .artwork-details {
  flex: 1;
}

.modal-body img {
  max-width: 100%;
  height: auto;
}

.btn-close {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  color: #333;
}

.btn-close:hover {
  color: #ff0000;
}

@media screen and (max-width: 768px) {
  .artwork-card {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
