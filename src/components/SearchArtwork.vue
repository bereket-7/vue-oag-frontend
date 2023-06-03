<template>
  <div>
    <label for="category">Select Category:</label>
    <select id="category" v-model="selectedCategory" @change="searchByCategory">
      <option value="">All Categories</option>
      <option value="Painting">Painting</option>
      <option value="Mixed Media">Mixed Media</option>
      <option value="Photography">Photography</option>
      <option value="Sculpture">Sculpture</option>
    </select>

    <div v-if="isLoading">Loading...</div>

    <div v-else>
      <div v-for="artwork in artworks" :key="artwork.id">
        <h3>{{ artwork.artworkName }}</h3>
        <p>{{ artwork.artworkDescription }}</p>
        <p>{{ artwork.price }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name:'SearchArtwork',
  data() {
    return {
      artworks: [],
      selectedCategory: '',
      isLoading: false,
    };
  },
  methods: {
    searchByCategory() {
      this.isLoading = true;
      let url = 'http://localhost:8081/artworks';
      if (this.selectedCategory) {
        url += '/category/' + this.selectedCategory;
      }

      axios
        .get(url)
        .then((response) => {
          this.artworks = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }

  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    font-size: 16px;
  }
  .artwork-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
    margin-top: 20px;
  }

  .artwork-card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .artwork-card h3 {
    margin-top: 0;
  }

  .artwork-card p {
    margin-bottom: 10px;
  }

  .fa-paint-brush,
  .fa-cubes,
  .fa-camera,
  .fa-sculpture {
    font-size: 24px;
    margin-right: 5px;
  }
</style>


  