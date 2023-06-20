<template>
    <div class="artwork-rating">
      <h2>Rate the Artwork</h2>
      <div class="star-rating">
        <span
          v-for="star in stars"
          :key="star"
          class="star"
          :class="{ 'filled': star <= selectedRating }"
          @click="selectRating(star)"
        >
          &#9733;
        </span>
      </div>
      <button @click="submitRating">Submit Rating</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        selectedRating: 0,
        stars: [1, 2, 3, 4, 5]
      };
    },
    methods: {
  submitRating() {
    const artworkId = 123; 

    axios.post(`/api/${artworkId}/rate`, { rating: this.selectedRating })
      .then(response => {
        // Handle the success response
        console.log('Rating submitted successfully:', response.data);
        // Optionally, you can show a success message to the user or perform any other actions
      })
      .catch(error => {
        // Handle the error response
        console.error('Failed to submit rating:', error.response.data);
        // Optionally, you can show an error message to the user or perform any other actions
      });
  }
}
  };
  </script>
  
  <style  scoped>
  .star-rating {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .star {
    font-size: 24px;
    cursor: pointer;
    color: #ccc;
  }
  
  .star.filled {
    color: gold;
  }
  </style>
  