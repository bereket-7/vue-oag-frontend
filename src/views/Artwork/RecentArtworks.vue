<template>
    <div class="container">
      <h1>Recent Artworks</h1>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else class="artworks-container">
        <div v-for="artwork in artworks" :key="artwork.id" class="artwork-card">
          <img :src="getArtworkImageUrl(artwork.id)" alt="Artwork Image" :placeholder="artwork.imagePlaceholder" class="artwork-image">
          <div class="artwork-description">
            <h3>{{ artwork.description }}</h3>
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
        artworks: [],
        loading: true,
      };
    },
    mounted() {
      this.fetchRecentArtworks();
    },
    methods: {
      fetchRecentArtworks() {
        axios.get('http://localhost:8082/api/artworks/recent')
          .then(response => {
            this.artworks = response.data;
            this.loading = false;
          })
          .catch(error => {
            console.error(error);
            this.loading = false;
          });
      },
      getArtworkImageUrl(artworkId) {
        return `http://localhost:8082/api/artworks/${artworkId}/image`;
      },
    },
  };
  </script>


<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #3e8e41;
}

.loading {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}
.artwork-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.artwork-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.artwork-description {
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.artworks-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
}

.artwork-card {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.artwork-description {
  margin-top: 10px;
  text-align: center;
}

@media screen and (min-width: 576px) {
  .artwork-card {
    flex-direction: row;
    justify-content: space-between;
    padding: 30px;
  }

  .artwork-image {
    width: 200px;
    height: 200px;
  }

  .artwork-description {
    text-align: left;
    font-size: 24px;
  }
}

@media screen and (max-width: 600px) {
  .container {
    padding: 10px;
  }

  .artworks-container {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 10px;
  }
  }
</style>

  