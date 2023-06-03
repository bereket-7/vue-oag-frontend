<template>
    <div class="form-container">
      <h1>Create Bid Art</h1>
      <form @submit="saveBidArt" enctype="multipart/form-data">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" placeholder="Enter the title" required />
        </div>
        <div class="form-group">
          <label for="initialAmount">Initial Amount:</label>
          <input type="number" id="initialAmount" v-model="initialAmount" placeholder="Enter the initial amount" required />
        </div>
        <div class="form-group">
          <label for="artist">Artist:</label>
          <input type="text" id="artist" v-model="artist" placeholder="Enter the artist's name" required />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" v-model="description" placeholder="Enter a description" required></textarea>
        </div>
        <div class="form-group">
          <label for="bidEndTime">Bid End Time:</label>
          <input type="datetime-local" id="bidEndTime" v-model="bidEndTime" required />
        </div>
        <div class="form-group">
          <label for="startingTime">Starting Time:</label>
          <input type="datetime-local" id="startingTime" v-model="startingTime" required />
        </div>
        <div class="form-group">
          <label for="image">Image:</label>
          <input type="file" id="image" ref="fileInput" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CreateBid',
    data() {
      return {
        title: '',
        initialAmount: 0,
        artist: '',
        description: '',
        bidEndTime: '',
        startingTime: '',
      };
    },
    methods: {
      saveBidArt(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('initialAmount', this.initialAmount);
        formData.append('artist', this.artist);
        formData.append('description', this.description);
        formData.append('bidEndTime', this.bidEndTime);
        formData.append('startingTime', this.startingTime);
        formData.append('image', this.$refs.fileInput.files[0]);
  
        axios
          .post('http://localhost:8081/saveBidArt', formData)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
  </script>
  