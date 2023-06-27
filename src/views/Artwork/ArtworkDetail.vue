
<template>
    <div>
      <h1>Artwork Details</h1>
      <div v-if="artwork">
        <ArtworkImage :artworkId="artwork.id" />
        <div>
          <h2>{{ artwork.artworkName }}</h2>
          <p>{{ artwork.artworkDescription }}</p>
          <p>{{ artwork.artworkCategory }}</p>
          <p>{{ artwork.price }}</p>
          <p>{{ artwork.size }}</p>
          <p>{{ artwork.username }}</p>
        </div>
      </div>
      <div v-else>
        <p>No artwork found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import ArtworkImage from './components/ArtworkImage.vue';
  
  export default {
    components: {
      ArtworkImage
    },
    setup() {
      const artworkId = ref(1); // Replace with the actual artwork ID you want to fetch
      const artwork = ref(null);
  
      onMounted(async () => {
        await fetchArtworkDetails();
      });
  
      const fetchArtworkDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8082/api/artworks`);
          const artworkDetails = await response.json();
  
          if (artworkDetails.length > 0) {
            artwork.value = artworkDetails[0];
          }
        } catch (error) {
          console.error('Error fetching artwork details:', error);
        }
      };
  
      return {
        artworkId,
        artwork
      };
    }
  };
  </script>
  