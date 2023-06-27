<template>
    <div>
      <img :src="imageURL" alt="Artwork Image" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
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
          const response = await axios.get(`/api/${id}/image`, {
            responseType: 'arraybuffer',
          });
          const base64Image = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
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
  