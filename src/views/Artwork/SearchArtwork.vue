<template>
    <div>
      <input type="text" v-model="keyword" @input="searchArtwork" placeholder="Search artwork" />
      <ul>
        <li v-for="result in searchResults" :key="result.id">{{ result.artworkName }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        keyword: '',
        searchResults: [],
      };
    },
    methods: {
      searchArtwork() {
        axios.get(`/artworks/autocomplete?keyword=${this.keyword}`)
          .then((response) => {
            this.searchResults = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
  </script>
  