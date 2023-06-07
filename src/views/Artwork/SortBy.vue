<template>
    <div>
      <div class="filter-container">
        <label for="sort">Sort By:</label>
        <select id="sort" v-model="selectedSort" @change="sortArtworks">
          <option value="rating">Average Rating</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="latest">Latest</option>
        </select>
      </div>
      <ul>
        <li v-for="artwork in sortedArtworks" :key="artwork.id">{{ artwork.artworkName }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedSort: 'rating',
        artworks: [],
      };
    },
    computed: {
        sortedArtworks() {
  let sortedArray = [...this.artworks];
  
  switch (this.selectedSort) {
    case 'rating':
      return sortedArray.sort((a, b) => b.averageRating - a.averageRating);
    case 'priceLowToHigh':
      return sortedArray.sort((a, b) => a.price - b.price);
    case 'priceHighToLow':
      return sortedArray.sort((a, b) => b.price - a.price);
    case 'latest':
      return sortedArray.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    default:
      return sortedArray;
  }
},
    },
    methods: {
      getSortedArtworks() {
        axios.get(`/artworks/sort?sortOption=${this.selectedSort}`)
          .then((response) => {
            this.artworks = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      sortArtworks() {
        this.getSortedArtworks();
      },
    },
    mounted() {
      this.getSortedArtworks();
    },
  };
  </script>
  
  <style scoped>
  .filter-container {
    margin-bottom: 20px;
  }
  
  .filter-container select {
    padding: 5px 10px;
    border-radius: 4px;
  }
  </style>
  
    