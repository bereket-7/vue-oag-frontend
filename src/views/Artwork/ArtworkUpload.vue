<template>
    <div class="artwork-upload">
      <h2>Upload Artwork</h2>
      <form @submit.prevent="uploadArtwork" class="upload-form">
        <div class="form-group">
          <label for="artworkName">Artwork Name</label>
          <input type="text" id="artworkName" v-model="artworkName" required>
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" id="price" v-model="price" required>
        </div>
        <div class="form-group">
          <label for="size">Size</label>
          <input type="text" id="size" v-model="size" required>
        </div>
        <div class="form-group">
          <label for="artworkDescription">Artwork Description</label>
          <textarea id="artworkDescription" v-model="artworkDescription" required></textarea>
        </div>
        <div class="form-group">
          <label for="artworkCategory">Artwork Category</label>
          <input type="text" id="artworkCategory" v-model="artworkCategory" required>
        </div>
        <div class="form-group file-upload">
          <label for="image">Image</label>
          <input type="file" id="image" @change="handleImageUpload" required>
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        artworkName: '',
        price: 0,
        size: '',
        artworkDescription: '',
        artworkCategory: '',
        image: null,
      };
    },
    methods: {
      handleImageUpload(event) {
        this.image = event.target.files[0];
      },
      uploadArtwork() {
        const formData = new FormData();
        formData.append('artworkName', this.artworkName);
        formData.append('price', this.price);
        formData.append('size', this.size);
        formData.append('artworkDescription', this.artworkDescription);
        formData.append('artworkCategory', this.artworkCategory);
        formData.append('image', this.image);
  
        axios
          .post('http://localhost:8082/api/artworks/saveArtwork', formData)
          .then(response => {
            console.log(response.data);
            // Handle success response
          })
          .catch(error => {
            console.error(error);
            // Handle error response
          });
      },
    },
  };
  </script>
  

  <style scoped>
.artwork-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.upload-form {
  width: 100%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #4285f4;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #2a75e1;
}

.file-upload {
  display: flex;
  align-items: center;
}

.file-upload label {
  padding: 10px 20px;
  background-color: #4285f4;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.file-upload label:hover {
  background-color: #2a75e1;
}

.file-upload input[type="file"] {
  display: none;
}
</style>