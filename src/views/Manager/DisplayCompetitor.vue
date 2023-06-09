<template>
    <div class="artwork-gallery">
      <div v-for="artwork in artworks" :key="artwork.id" class="artwork-card">
        <img :src="artwork.imageUrl" :alt="artwork.name" class="artwork-image">
        <div class="artwork-details">
          <h3 class="artwork-title">{{ artwork.name }}</h3>
          <p class="artist-name">{{ artwork.artistName }}</p>
          <p class="artwork-category">{{ artwork.category }}</p>
          <p class="vote-count">Votes: {{ artwork.voteCount }}</p>
          <button @click="vote(artwork.id)" class="vote-button">Vote</button>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.artwork-gallery {
    margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.artwork-card {
  width: 300px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.artwork-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

.artwork-title {
  font-size: 18px;
  margin-top: 10px;
}

.artist-name {
  font-size: 16px;
  color: #666;
}

.artwork-category {
  font-size: 14px;
  color: #999;
}

.vote-count {
  font-size: 14px;
  margin-top: 10px;
}

.vote-button {
  padding: 8px 16px;
  margin-top: 10px;
  background-color: #04AA6D;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.vote-button:hover {
  opacity: 0.8;
}
</style>


<script>
export default {
  data() {
    return {
      artworks: [
        {
          id: 1,
          imageUrl: "https://via.placeholder.com/300x200",
          name: "Artwork 1",
          artistName: "Artist 1",
          category: "Category 1",
          voteCount: 10
        },
        {
          id: 2,
          imageUrl: "https://via.placeholder.com/300x200",
          name: "Artwork 2",
          artistName: "Artist 2",
          category: "Category 2",
          voteCount: 5
        },
        {
          id: 3,
          imageUrl: "https://via.placeholder.com/300x200",
          name: "Artwork 3",
          artistName: "Artist 3",
          category: "Category 3",
          voteCount: 8
        }
        // Add more artwork objects as needed
      ]
    };
  },
  methods: {
    // vote(artworkId) {
      // Logic to handle voting for the artwork with the specified ID
      // You can make an API request here to update the vote count
      // and handle any success/error responses
    // }
  },
  mounted() {
    // Fetch the artworks from the backend API
    this.fetchArtworks();
  },
  created() {
    // Any additional initialization or setup logic
  }
};
</script>