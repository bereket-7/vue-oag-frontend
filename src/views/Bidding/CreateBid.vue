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
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </div>
</template>
  
<script>
import axios from 'axios'

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
      errorMessage: '',
      successMessage: '',
    }
  },
  methods: {
    saveBidArt(event) {
      event.preventDefault()
      const formData = new FormData()
      formData.append('title', this.title)
      formData.append('initialAmount', this.initialAmount)
      formData.append('artist', this.artist)
      formData.append('description', this.description)
      formData.append('bidEndTime', this.bidEndTime)
      formData.append('startingTime', this.startingTime)
      formData.append('image', this.$refs.fileInput.files[0])

      axios
        .post('http://localhost:8081/bid/saveBidArt', formData)
        .then((response) => {
          console.log(response.data)
          this.successMessage = response.data
          this.errorMessage = ''
        })
        .catch((error) => {
          console.error(error)
          this.successMessage = ''
          this.errorMessage = 'An error occurred while saving the bid art.'
        })
    },
  },
};
</script>

<style>
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  input[type="text"],
  input[type="number"],
  textarea,
  button[type="submit"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    transition: border-color 0.3s ease;
    font-family: Arial, sans-serif;
  }

  input[type="text"]:hover,
  input[type="number"]:hover,
  textarea:hover,
  button[type="submit"]:hover {
    border-color: #999;
  }

  button[type="submit"] {
    background-color: #57c05a;
    color: #fff;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  button[type="submit"]:hover {
    background-color: #38913d;
  }

  .error-message {
    color: red;
    margin-top: 10px;
  }
  .success-message {
    color: green;
    margin-top: 10px;
  }
</style>

