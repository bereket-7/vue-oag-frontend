<template>
    <div>
      <h2>Artworks</h2>
      <ul>
        <li v-for="artwork in artworks" :key="artwork.id">
          <h3>{{ artwork.title }}</h3>
          <b><p>{{ artwork.description }}</p></b>
          <img :src="artwork.imageUrl" :alt="artwork.title" />
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        artworks: [],
      };
    },
  };
  </script>
  