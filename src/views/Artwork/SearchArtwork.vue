
<template>
    <div class="container">
      <div class="input-container">
        <input type="text" v-model="keyword" @input="searchArtwork" placeholder="Search artwork" />
      </div>
      <div class="results-container">
        <ul>
          <li v-for="result in searchResults" :key="result.id">{{ result.artworkName }}</li>
        </ul>
      </div>
      <div class="pagination-container">
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
  
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.input-container {
  position: relative;
  margin-bottom: 20px;
}

.input-container input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.input-container input:focus {
  border-color: #007bff;
}

.results-container ul {
  list-style: none;
  padding: 0;
}

.results-container li {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.results-container li:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.pagination-container button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-container button:hover {
  background-color: #0056b3;
}

.pagination-container span {
  font-size: 16px;
}
</style>
