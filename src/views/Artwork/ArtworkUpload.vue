<template>
  <div>
<div class="form-container">
  <h1>Upload Artwork</h1>
  <form @submit.prevent="uploadArtwork">
    <div class="col">

    </div>
    <div class="row form-group">
      <label for="artworkName">Artwork Name:</label>
      <input type="text" id="artworkName" v-model="artworkName" required>
    </div>
    <div class="row form-group">
      <label for="price">Price:</label>
      <input type="number" id="price" v-model="price" required>
    </div>
     <div class="row form-group">
      <label for="size">Size:</label>
      <input type="text" id="size" v-model="size" required>
    </div>
    <div class="row form-group">
      <label for="artworkDescription" class="form-group">Artwork Description:</label>
      <textarea id="artworkDescription" v-model="artworkDescription" required></textarea>
      </div>
      <div class="row form-group">
        <label for="artworkCategory">Artwork Category:</label>
    <select name="dog-names" id="artworkCategory" v-model="artworkCategory" required> 
        <option value="Painting">Painting</option> 
        <option value="Sculpture">Sculpture</option> 
        <option value="Mixed-Art">Mixed Art</option> 
    </select>
  
    </div>
    <div class="row form-group">
      <label for="image">Image:</label>
      <input type="file" id="image" ref="imageInput" @change="handleImageChange" accept="image/*" required>
    </div>
    <div class="form-group">
        <button type="submit" class="btn-submit">Upload</button>
      </div>

    </form>

    <div class="container">
      <div class="popup" :class="{ 'open-popup': isPopupOpen }">
        <h2>Thank You</h2>
        <p>You have Successfully submitted your Artwork for approval.</p>
        <button type="button" @click="closePopup">OK</button>
      </div>
      </div>

    </div>
    </div>

</template>

<style scoped>
  .form-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
    }
  .row{
    margin:10px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .btn-submit {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .btn-submit:hover {
    background-color: #45a049;
  }
    
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.5); */
  z-index: 999;
  pointer-events: none;
}

.popup {
  background-color: #fff;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.open-popup {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
} 
</style>

<script>
import api from '@/utils/api';
import { isAuthenticated } from '@/utils/auth';

export default {
  data() {
    return {
      artworkName: '',
      price: 0,
      size: '',
      artworkDescription: '',
      artworkCategory: '',
      image: null,
      isLoading: false,
      errorMessage: '',
      isPopupOpen: false,
    };
  },

  methods: {
    async uploadArtwork() {
      this.isLoading = true;
      this.errorMessage = '';

      const formData = new FormData();
      formData.append('artworkName', this.artworkName);
      formData.append('price', this.price);
      formData.append('size', this.size);
      formData.append('artworkDescription', this.artworkDescription);
      formData.append('artworkCategory', this.artworkCategory);
      formData.append('image', this.image);

      if (isAuthenticated()) {
        try {
         await api.post('artworks/saveArtwork', formData);
          this.showSuccessPopup();
        } catch (error) {
          console.error(error);
          this.errorMessage = 'Error uploading artwork. Please try again.';
        } finally {
          this.isLoading = false;
        }
      } else {
        this.errorMessage = 'You need to be logged in to upload artwork.';
        this.isLoading = false;
      }
    },

    handleImageChange(event) {
      const file = event.target.files[0];
      this.image = file;
    },

    showSuccessPopup() {
      this.isPopupOpen = true;
    },

    closePopup() {
      this.isPopupOpen = false;
    },
  },
};
</script>
