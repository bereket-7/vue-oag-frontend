<template>
<div class="registration-form">
<form>
  <div>
    <div>
      <div>

        <h1>Upload Artwork</h1>

        <div class="card">
          <div class="card-body">

            <div>
              <div>
                <h6 for="artworkName">Artwork Name</h6>
              </div>
              <div>
                <input  id="artworkName" v-model="artworkName" type="text" placeholder="Abstract child face" />
              </div>
            </div>

            <div>
                <div>
                    <h6 for=" artworkCategory">Artwork Category</h6>
                </div>
              <div>
                <select id=" artworkCategory" v-model="artworkCategory" name=" artworkCategory" >
                <option value="painting">Painting</option>
                <option value="sculpture">Sculpture</option>
                <option value="photography">Photography</option>
                <option value="mixed-media">Mixed Media</option>
                </select>
                </div>
            </div>

            <div>
              <div>
                <h6 for="size">Size</h6>
              </div>
              <div>
                <input  id="size" v-model="size" type="text" placeholder="100cm x 120cm"/>
              </div>
            </div>

            <hr class="mx-n3">

            <div>
              <div>
                <h6 class="mb-0" for=" artworkDescription">Description</h6>
              </div>
              <div>
                <textarea v-model="artworkDescription" rows="3" placeholder="Short description about the artwork, only if it needs"></textarea>
              </div>
            </div>

            <div>
              <div>
                <h6 for="price">Price</h6>
              </div>
              <div>
                <input  id="price" v-model="artistId" type="number" placeholder="Enter Price" />
              </div>
            </div>

            <div>
              <div>
                <h6 for="artistId">artist Id</h6>
              </div>
              <div>
                <input  id="artistId" v-model="price" type="number" placeholder="Enter id" />
              </div>
            </div>

            <div>
              <div>
                <h6 for="artworkPhoto">Artwork Photo</h6>
              </div>
              <div>
                <input id="artworkPhoto" type="file" 
                 @change="onFileChange" />
                <div>Upload Artwork Photo file. Max file
                  size 10 MB</div>
              </div>
            </div>

            <div>
              <div>
                <h6 for="createDate">Date</h6>
              </div>
              <div>
                <input  type="date" id="createDate" v-model="createDate" />
              </div>
            </div>
    
            <hr class="mx-n3">

            <div>
              <button type="submit" @click.prevent="submitForm">Submit Artwork</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</form>

</div>
</template>

  
<script>  
import axios from 'axios';
 export default {
  data() {
    return {
      artistName:'',
      artworkName: '',
      price: 0,
      createDate: '',
      artworkPhoto: null,
      artworkDescription: '',
      artworkCategory: ''
    };
  },
  methods: {
    onFileChange(event) {
      this.artworkPhoto = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('artworkName', this.artworkName);
      formData.append('price', this.price);
      formData.append('artistId', this.artistId);
      formData.append('createDate', this.createDate);
      formData.append('artworkPhoto', this.artworkPhoto);
      formData.append('artworkDescription', this.artworkDescription);
      formData.append('artworkCategory', this.artworkCategory);

      try {
        const response = await axios.post('http://localhost:8081/artwork/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log(response);
          alert('Artwork uploaded successfully!');
      } catch (error) {
        // Handle any errors from the client (network errors, timeouts, etc.)
        console.error(error);
        alert('An error occurred while uploading the artwork.');
      }
    }
  }
};

  </script>
  
<style scoped>
 /* Registration form container */
.registration-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f8f8f8;
  font-family: Arial, sans-serif;
}

/* Title */
.registration-form h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: dodgerblue;
}

/* Card container */
.card {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 5px;
}

/* Labels */
.card h6 {
  font-size: 14px;
  font-weight: bold;
  color:black;
  margin-bottom: 10px;
}

/* Inputs */
.card input,
.card select,
.card textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

/* Submit button */
.card button[type="submit"] {
  background-color: dodgerblue;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card button[type="submit"]:hover {
  background-color: #fff;
  color: #333;
  border: 1px solid #333;
}

/* File input */
.card input[type="file"] {
  border: none;
  padding: 0;
}

/* File input label */
.card input[type="file"] + div {
  font-size: 14px;
  color:dodgerblue;
  margin-top: 5px;
}

/* Hover effect for inputs */
.card input:hover,
.card select:hover,
.card textarea:hover {
  border-color:dodgerblue;
}

/* Hover effect for labels */
.card h6:hover {
  color: #666;
}

/* Hover effect for card */
.card:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

</style>