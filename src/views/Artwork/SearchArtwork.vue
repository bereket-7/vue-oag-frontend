<template>
  <div class="container">
    <div class="search-section">
      <input
        v-model="keyword"
        type="text"
        placeholder="Enter keyword"
        class="search-input"
      >
      <button
        class="search-button"
        @click="searchArtwork"
      >
        Search
      </button>
    </div>

    <div
      v-if="artworkList.length === 0"
      class="no-artwork"
    >
      No artwork found.
    </div>

    <div
      v-else
      class="image-gallery"
    >
      <div
        v-for="artwork in artworkList"
        :key="artwork.id"
        class="gallery-item"
      >
        <img
          :src="artwork.imageUrl"
          alt="Artwork"
          class="artwork-image"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { artworkService } from '@/services/artworkService';

export default {
  data() {
    return {
      keyword: '',
      artworkList: [],
    };
  },
  methods: {
    searchArtwork() {
      artworkService.search(this.keyword)
      .then(data => {
        this.artworkList = data;
      })
      .catch(error => {
        console.error(error);
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #555;
}

.no-artwork {
  margin-top: 20px;
  text-align: center;
  color: #555;
  font-size: 18px;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
}

.gallery-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.artwork-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

@media screen and (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .search-input {
    width: 100%;
  }

  .image-gallery {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 10px;
  }
}
</style>
