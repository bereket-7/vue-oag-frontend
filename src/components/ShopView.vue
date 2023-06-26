<template>
  <div class="artwork-gallery">
    <div class="carousel-container">
      <div class="carousel">
        <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }">
          <div class="carousel-slide" v-for="artwork in slicedArtworks" :key="artwork.id">
            <div class="artwork-card">
              <div class="artwork-image">
                <img :src="getArtworkImageUrl(artwork.id)" alt="Artwork Image" />
                <button class="wishlist-button" @click="addToWishlist(artwork)">
                  <i class="fas fa-heart"></i>
                </button>
              </div>
              <div class="artwork-details">
                <h3><b>{{ artwork.artworkName }}</b></h3>
                <p><b>Price: {{ artwork.price }}</b></p>
                <p>Category: {{ artwork.artworkCategory }}</p>
                <button class="btn btn-primary quick-view" @click="openModal(artwork)">Quick View</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-controls">
        <button class="carousel-control" @click="prevArtworks" :disabled="currentIndex === 0">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="carousel-control" @click="nextArtworks" :disabled="currentIndex >= artworks.length - visibleSlides">
          <i class="fas fa-chevron-right"></i>
        </button>
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
            <button type="button" class="btn btn-danger" @click="addToCart(selectedArtwork.id)">Add to Cart</button>
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
      currentIndex: 0,
      slideWidth: 300,
      visibleSlides: 3,
    };
  },
  computed: {
    slicedArtworks() {
      return this.artworks.slice(this.currentIndex, this.currentIndex + this.visibleSlides);
    },
  },
  mounted() {
    this.fetchArtworks();
    this.slideWidth = this.getSlideWidth();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
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
      api.get('/artworks')
        .then(response => {
          this.artworks = response.data;
          this.slicedArtworks = this.artworks.slice(0, this.visibleSlides);
        })
        .catch(error => {
          console.log(error);
        });
    },
    prevArtworks() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextArtworks() {
      if (this.currentIndex < this.artworks.length - this.visibleSlides) {
        this.currentIndex++;
      }
    },
    getArtworkImageUrl(artworkId) {
      return `http://localhost:8082/api/artworks/${artworkId}/image`;
    },
    submitRating(rating) {
      const artworkId = this.selectedArtwork.id;
      if (!isAuthenticated()) {
        router.push('/userLogin');
        return;
      }
      api
        .post(`/rating/artworks/${artworkId}/rate`, { rating })
        .then((response) => {
          console.log(response);
          console.log('Rating submitted successfully!');
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addToWishlist(artwork) {
      if (!isAuthenticated()) {
        router.push('/userLogin');
        return;
      }
      api
        .post('/wishlist/save', artwork)
        .then((response) => {
          console.log(response.data);
          alert('Wishlist saved successfully.');
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addToCart(artworkId) {
  if (!isAuthenticated()) {
    router.push('/userLogin');
    return;
  }
  const quantity = 1;
  api
    .post('cart/add', { artworkId, quantity })
    .then((response) => {
      console.log(response.data);
      alert('Item added to cart successfully.');
    })
    .catch((error) => {
      console.error(error);
    });
},
    getSlideWidth() {
      const carouselContainer = document.querySelector('.carousel-container');
      const artworkCard = document.querySelector('.artwork-card');
      if (carouselContainer && artworkCard) {
        const containerWidth = carouselContainer.offsetWidth;
        const cardMargin = parseInt(getComputedStyle(artworkCard).marginRight);
        return (containerWidth / this.visibleSlides) - (cardMargin * 2);
      }
      return 0;
    },
    handleResize() {
      this.slideWidth = this.getSlideWidth();
    },
  },
  watch: {
    currentIndex(newIndex) {
      this.slicedArtworks = this.artworks.slice(newIndex, newIndex + this.visibleSlides);
    }
  }
};
</script>
<style scoped>
.artwork-gallery {
  margin-top: 100px;
}

.carousel-container {
  position: relative;
  overflow: hidden;
}

.carousel {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.carousel-track {
  display: flex;
}

.carousel-slide {
  flex: 0 0 auto;
  margin-right: 15px; /* Adjust the margin between slides */
  width: 100%;
}

.artwork-card {
  width: 300px; /* Adjust the width of each card */
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;
  background-color: #f9f9f9;
  text-align: center;
}

.artwork-card:hover {
  transform: scale(1.2);
}

.artwork-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.5s ease;
  object-fit: cover;
}

.artwork-image {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
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
  padding: 0;
}

.rating-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.rating-stars {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.rating-star {
  font-size: 24px;
  color: gold;
  cursor: pointer;
  transition: color 0.3s ease;
}

.rating-star:hover,
.rating-star.active {
  color: orange;
}

.rating-comment textarea {
  width: 100%;
  height: 100px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-footer button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-footer button:hover {
  background-color: #0056b3;
}
</style>






<!-- <style scoped>
/* .artwork-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 100px;
} */
.artwork-gallery {
  position: relative;
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
}
.carousel-container {
  position: relative;
  overflow: hidden;
}

.carousel {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.carousel-track {
  display: flex;
}

.carousel-slide {
  flex: 0 0 auto;
  margin-right: 15px; /* Adjust the margin between slides */
  width: 100%;
}

.artwork-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}

.artwork-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.artwork-details {
  margin-top: 10px;
}

.quick-view {
  margin-top: 10px;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.carousel-control {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin: 0 10px;
  padding: 0;
}


.carousel-controls {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.carousel-control {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin: 0 10px;
  padding: 0;
}

.artwork-card {
  width: 400px;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}

.artwork-card:hover {
  transform: scale(1.2);
}

.artwork-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.5s ease;
  object-fit: cover;
}
.artwork-image {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
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
</style> -->
