<template>
   <div class="form-container">
    <h2>Apply for Competition</h2>
    <form @submit.prevent="registerCompetitor" enctype="multipart/form-data">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" v-model="competitor.firstName" name="firstName" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" v-model="competitor.lastName" name="lastName" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="tel" v-model="competitor.phone" name="phone" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="competitor.email" name="email" required />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="competitor.category" required>
          <option value="painting">Painting</option>
          <option value="sculpture">Sculpture</option>
          <option value="photography">Photography</option>
        </select>
      </div>
      <div class="form-group">
        <label for="artDescription">Artwork Description</label>
        <textarea v-model="competitor.artDescription" name="artDescription" required></textarea>
      </div>

      <div class="form-group">
        <label for="artworkPhoto">Upload Artwork Photo</label>
        <input type="file" id="artworkPhoto" @change="handleFileUpload" name="image" accept=".jpg,.jpeg,.png" required />
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Artwork Preview">
        </div>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary">Register</button>
        <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      </div>
    </form>
    <div v-if="message" class="success-message">{{ message }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterCompetitor",
  data() {
    return {
      competitor: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        category: "",
        artDescription: "",
        artworkPhoto: null,
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.competitor.artworkPhoto = event.target.files[0];
    },
    async registerCompetitor() {
      const formData = new FormData();
      formData.append("firstName", this.competitor.firstName);
      formData.append("lastName", this.competitor.lastName);
      formData.append("phone", this.competitor.phone);
      formData.append("email", this.competitor.email);
      formData.append("category", this.competitor.category);
      formData.append("artDescription", this.competitor.artDescription);
      formData.append("image", this.competitor.artworkPhoto);

      try {
        await axios.post("http://localhost:8081/competitor/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Competitor registered successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to register competitor.");
      }
    },
  },
};
</script>

<style scoped>
/* Form Styles */

form {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f2f2f2;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

form h2 {
  margin-top: 0;
}

form label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

form input[type="text"],
form input[type="email"],
form input[type="tel"],
form select,
form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
}

form select {
  appearance: none;
  padding-right: 1.5rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000'%3E%3Cpath d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5rem;
}

form textarea {
  height: 10rem;
}

form input[type="submit"] {
  background-color: #008080;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

form input[type="submit"]:hover {
  background-color: #006666;
}

/* Media Queries */

@media only screen and (max-width: 600px) {
  form {
    padding: 1rem;
  }
  
  form input[type="text"],
  form input[type="email"],
  form input[type="tel"],
  form select,
  form textarea {
    font-size: 0.9rem;
  }
  
  form input[type="submit"] {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
}

</style>
