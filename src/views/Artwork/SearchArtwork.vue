<template>
    <div>
      <input type="text" v-model="keyword" @input="searchArtwork" placeholder="Search artwork" />
      <ul>
        <li v-for="result in searchResults" :key="result.id">{{ result.artworkName }}</li>
      </ul>
      <div>
        <button :disabled="currentPage === 0" @click="previousPage">Previous</button>
        <span>{{ currentPage + 1 }} / {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages - 1" @click="nextPage">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        keyword: '',
        searchResults: [],
        currentPage: 0,
        totalPages: 0,
      };
    },
    methods: {
      searchArtwork() {
        axios.get(`/artworks/search?keyword=${this.keyword}&page=${this.currentPage}`)
          .then((response) => {
            this.searchResults = response.data;
            this.totalPages = response.headers['x-total-pages'];
          })
          .catch((error) => {
            console.error(error);
          });
      },
      previousPage() {
        this.currentPage--;
        this.searchArtwork();
      },
      nextPage() {
        this.currentPage++;
        this.searchArtwork();
      },
    },
  };
  </script>
  
  