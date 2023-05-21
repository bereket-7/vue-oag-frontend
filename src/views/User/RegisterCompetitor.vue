<template>
   <div class="form-container">
    <h2 style=" color:#007bff;">Apply for Competition</h2>
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
          <option value="mixed-media">Mixed Media</option>
        </select>
      </div>
      <div class="form-group">
        <label for="artDescription">Artwork Description</label>
        <textarea v-model="competitor.artDescription" name="artDescription" required></textarea>
      </div>

      <div class="form-group">
        <label for="artworkPhoto">Upload Artwork Photo</label>
        <input type="file" id="image" ref="fileInput" accept=".jpg,.jpeg,.png" required />
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary">Register</button>
        <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      </div>
    </form>

    <div id="success-modal" class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Success</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Competitor registered successfully!</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
    registerCompetitor(competitor) {
      competitor.preventDefault();
      const formData = new FormData();
      formData.append("firstName", this.competitor.firstName);
      formData.append("lastName", this.competitor.lastName);
      formData.append("phone", this.competitor.phone);
      formData.append("email", this.competitor.email);
      formData.append("category", this.competitor.category);
      formData.append("artDescription", this.competitor.artDescription);
      formData.append("image", this.competitor.artworkPhoto);

      axios
        .post('http://localhost:8081/competitors/registerCompetitor', formData)
        .then((response) => {
          console.log(response.data);
          this.$router.push('/signupSuccess');
        })
        .catch((error) => {
          console.error(error);
          this.errorMessage = 'Failed to register competitor.';
        });
    },
    validateForm() {
      this.errors = {};
      const ethiopiaCode = '+251';
      if (!this.firstname) {
        this.errors.firstname = 'First name is required.';
      }
      if (!this.lastname) {
        this.errors.lastname = 'Last name is required.';
      }
      if (!this.email) {
        this.errors.email = 'Email is required.';
      }else if (!this.validEmail(this.email)) {
    this.errors.email = 'Please enter a valid email address.';
  }
      if (!this.phone) {
        this.errors.phone = 'Phone number is required.';
      }else if (
    !(
      (this.phone.startsWith(ethiopiaCode + '9') || this.phone.startsWith(ethiopiaCode + '7')) && this.phone.length === 10
      || this.phone.startsWith(ethiopiaCode + '9') && this.phone.length === 13
      || this.phone.startsWith(ethiopiaCode + '7') && this.phone.length === 13
    )
  ) {
    this.errors.phone = 'Invalid phone number format.';
  }
      // Return true if there are no errors
      return Object.keys(this.errors).length === 0;
    },
    validEmail(email) {
  // Regular expression for email validation
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
}


  },
};
</script>


<style>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

label{
  color:#155724;
}
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="tel"],
.form-group input[type="email"],
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1.4;
  box-sizing: border-box;
}

.form-group input[type="file"] {
  display: block;

}

.image-preview {
  margin-top: 10px;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 400px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.spinner {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #007bff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .form-container {
    padding: 10px;
  }
  .form-group input[type="text"],
  .form-group input[type="tel"],
  .form-group input[type="email"],
  .form-group textarea,
  .form-group select {
    font-size: 14px;
  }
  .btn {
    font-size: 14px;
  }
}
</style>


