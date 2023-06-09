<template>
    <div class="artwork-gallery">
      <div v-for="artwork in artworks" :key="artwork.id" class="artwork-card">
        <div class="artwork-image-container">
          <img :src="artwork.imageUrl" :alt="artwork.name" class="artwork-image">
        </div>
        <div class="artwork-details">
          <h3 class="artwork-title">{{ artwork.name }}</h3>
          <p class="artist-name">{{ artwork.artistName }}</p>
          <p class="artwork-category">{{ artwork.category }}</p>
          <p class="vote-count">Votes: {{ artwork.voteCount }}</p>
          <button @click="vote(artwork.id)" class="vote-button">Vote</button>
        </div>
      </div>
    </div>

    <FooterView />
</template>


<style scoped>
.artwork-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 100px;
}

.artwork-card {
  display: flex;
  flex-direction: row;
  margin: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.artwork-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.artwork-image {
  max-width: 100%;
  height: auto;
}

.artwork-details {
  padding: 10px;
}

.artwork-title {
  font-size: 18px;
  margin-top: 0;
}

.artist-name,
.artwork-category,
.vote-count {
  margin: 5px 0;
}

.vote-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

/* Responsive styles */
@media (min-width: 768px) {

  .artwork-image-container {
    flex-basis: 40%;
  }
  .artwork-card {
    position: relative;
    flex-direction: column;
  }

  .vote-button {
    align-self: flex-end;
    position: relative;
    right: 10px;
    bottom: 10px;
    float: right;
  }

  .artwork-details {
    flex-basis: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
@media screen and (max-width: 300px) {
  .vote-button {
    align-self: flex-end;
    position: relative;
    right: 10px;
    bottom: 10px;
    float: right;
  }

  .artwork-details {
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

}
</style>


<script>
export default {
  data() {
    return {
      artworks: [
        {
          id: 1,
          imageUrl: "https://via.placeholder.com/400x200",
          name: "Artwork 1",
          artistName: "Artist 1",
          category: "Category 1",
          voteCount: 10
        },
        {
          id: 2,
          imageUrl: "https://via.placeholder.com/400x200",
          name: "Artwork 2",
          artistName: "Artist 2",
          category: "Category 2",
          voteCount: 5
        },
        {
          id: 2,
          imageUrl: "https://via.placeholder.com/400x200",
          name: "Artwork 2",
          artistName: "Artist 2",
          category: "Category 2",
          voteCount: 5
        },
        {
          id: 2,
          imageUrl: "https://via.placeholder.com/400x200",
          name: "Artwork 2",
          artistName: "Artist 2",
          category: "Category 2",
          voteCount: 5
        },
        {
          id: 2,
          imageUrl: "https://via.placeholder.com/400x200",
          name: "Artwork 2",
          artistName: "Artist 2",
          category: "Category 2",
          voteCount: 5
        },
        {
          id: 3,
          imageUrl: "https://via.placeholder.com/400x200",
          name: "Artwork 3",
          artistName: "Artist 3",
          category: "Category 3",
          voteCount: 8
        }
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