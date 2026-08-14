<template>
  <div>
    <div class="slider-container">
      <label for="minPrice">Minimum Price:</label>
      <input
        id="minPrice"
        v-model="minPrice"
        type="range"
        :min="minPossiblePrice"
        :max="maxPossiblePrice"
        @input="filterArtworks"
      >
      <span>{{ minPrice }}</span>
      <br>
      <label for="maxPrice">Maximum Price:</label>
      <input
        id="maxPrice"
        v-model="maxPrice"
        type="range"
        :min="minPossiblePrice"
        :max="maxPossiblePrice"
        @input="filterArtworks"
      >
      <span>{{ maxPrice }}</span>
    </div>
    <ul>
      <li
        v-for="artwork in filteredArtworks"
        :key="artwork.id"
      >
        {{ artwork.artworkName }}
      </li>
    </ul>
  </div>
</template>


<script>
import { artworkService } from '@/services/artworkService';

export default {
  data() {
    return {
      minPrice: 0,
      maxPrice: 1000,
      minPossiblePrice: 0,
      maxPossiblePrice: 1000,
      artworks: [],
    };
  },
  computed: {
    filteredArtworks() {
      return this.artworks.filter((artwork) => {
        return artwork.price >= this.minPrice && artwork.price <= this.maxPrice;
      });
    },
  },
  mounted() {
    this.getArtworksByPriceRange();
  },
  methods: {
    getArtworksByPriceRange() {
      artworkService.getByPriceRange(this.minPrice, this.maxPrice)
        .then((data) => {
          this.artworks = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    filterArtworks() {
      this.getArtworksByPriceRange();
    },
  },
};
</script>

<style scoped>
.slider-container {
  margin-bottom: 20px;
}

.slider-container input[type="range"] {
  width: 100%;
}

.slider-container span {
  display: inline-block;
  width: 30px;
  text-align: center;
  margin-left: 10px;
}
</style>
