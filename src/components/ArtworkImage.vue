<template>
  <div>
    <img
      :src="imageURL"
      alt="Artwork Image"
    >
  </div>
</template>
  
  <script>
  import { artworkService } from '@/services/artworkService';
  
  export default {
    data() {
      return {
        imageURL: '',
      };
    },
    mounted() {
      const artworkId = 1; // Replace with the actual artwork ID
      this.getArtworkImage(artworkId);
    },
    methods: {
      async getArtworkImage(id) {
        try {
          const data = await artworkService.getImage(id);
          const base64Image = btoa(
            new Uint8Array(data).reduce(
              (acc, byte) => acc + String.fromCharCode(byte),
              ''
            )
          );
          this.imageURL = `data:image/png;base64,${base64Image}`;
        } catch (error) {
          console.error('Failed to retrieve artwork image', error);
        }
      },
    },
  };
  </script>
  