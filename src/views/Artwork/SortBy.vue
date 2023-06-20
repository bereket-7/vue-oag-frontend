<template>
  <div>
    <select v-model="selectedSortOption" @change="fetchSortedArtworks">
      <option value="">Sort By</option>
      <option value="rating">Rating</option>
      <option value="priceLowToHigh">Price: Low to High</option>
      <option value="priceHighToLow">Price: High to Low</option>
      <option value="latest">Latest</option>
    </select>

    <div class="artwork-gallery">
      <div v-for="artwork in sortedArtworks" :key="artwork.id" class="artwork-card">
        <div class="artwork-image">
          <img :src="getArtworkImageUrl(artwork.id)" alt="Artwork Image" />
        </div>
        <div class="artwork-details">
          <h3><b>{{ artwork.artworkName }}</b></h3>
          <p><b>Price: {{ artwork.price }}</b></p>
          <p>Category: {{ artwork.artworkCategory }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedSortOption: '',
      sortedArtworks: [],
    };
  },
  methods: {
    fetchSortedArtworks() {
      if (this.selectedSortOption) {
        axios
          .get(`http://localhost:8082/artworks/sort?sortOption=${this.selectedSortOption}`)
          .then(response => {
            this.sortedArtworks = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.sortedArtworks = [];
      }
    },
    getArtworkImageUrl(artworkId) {
      return `http://localhost:8082/artworks/${artworkId}/image`;
    },
  },
};
</script>

<style scoped>
.artwork-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.artwork-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.artwork-card:hover {
  transform: translateY(-3px);
}

.artwork-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}

.artwork-details {
  margin-top: 0.5rem;
}

select {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 767px) {
  .artwork-gallery {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
