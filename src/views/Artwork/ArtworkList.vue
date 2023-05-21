<template>
  <div>
    <div v-for="artwork in artworks" :key="artwork.id">
      <img :src="getArtworkImageUrl(artwork.id)" alt="Artwork Image" />
      <h3>{{ artwork.artworkName }}</h3>
      <p>{{ artwork.artworkDescription }}</p>
      <p>Price: {{ artwork.price }}</p>
      <p>Size: {{ artwork.size }}</p>
      <p>Category: {{ artwork.artworkCategory }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      artworks: [],
    };
  },
  mounted() {
    this.fetchArtworks();
  },
  methods: {
    fetchArtworks() {
      axios.get('http://localhost:8081/artworks')
        .then(response => {
          this.artworks = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getArtworkImageUrl(artworkId) {
      return `http://localhost:8081/artworks/${artworkId}/image`;
    },
  },
};
</script>
