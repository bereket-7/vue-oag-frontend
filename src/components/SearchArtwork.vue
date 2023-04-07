<template>
    <div class="container">
      <div class="input-group mb-3">
        <input type="text" class="form-control bg-light" placeholder="Search Artwork by name" 
        v-model="searchTerm">
        <button class="btn btn-outline-primary" type="button" @click="searchArtwork">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div v-if="artworkResults.length > 0">
        <h3>Search Results:</h3>
        <ul>
          <li v-for="result in artworkResults" :key="result.id">
            {{ result.title }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No artwork found.</p>
      </div>
    </div>
  </template>

<script>
import { ref } from 'vue';

export default {
  name: 'ArtworkSearch',
  setup() {
    const searchTerm = ref('');
    const artworkResults = ref([]);

    const searchArtwork = async () => {
      const response = await fetch(`https://api.example.com/artwork?q=${searchTerm.value}`);
      const data = await response.json();
      artworkResults.value = data.results;
    };

    return {
      searchTerm,
      artworkResults,
      searchArtwork,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.btn-outline-secondary:hover {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.fa-search {
  margin-right: 10px;
}
</style>


  