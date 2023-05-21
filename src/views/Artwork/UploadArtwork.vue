<template>
<div class="registration-form">
  <form @submit="saveArtwork" enctype="multipart/form-data">
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
                <input  id="price" v-model="price" type="number" placeholder="Enter Price" />
              </div>
            </div>

            <div>
              <div>
                <h6 for="artworkPhoto">Artwork Photo</h6>
              </div>
              <div>
                <input type="file" id="image" ref="fileInput" required />
                <div>Upload Artwork Photo file. Max file size 10 MB</div>
              </div>
            </div>

            <!-- <div>
              <div>
                <h6 for="createDate">Date</h6>
              </div>
              <div>
                <input type="text" placeholder="2023-10-05" id="eventDate" v-model="createDate" required />
              </div>
            </div> -->
    
            <hr class="mx-n3">

            <div>
              <button type="submit">Submit Artwork</button>
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
      artworkName: '',
      price: 0,
      artworkDescription: '',
      artworkCategory: ''
    };
  },
  methods: {
    saveArtwork(artwork) {
      artwork.preventDefault();
      const formData = new FormData();
      formData.append('artworkName', this.artworkName);
      formData.append('price', this.price);
      formData.append('artworkCategory', this.artworkCategory);
      formData.append('artworkDescription', this.artworkDescription);
      formData.append('size', this.size);
      formData.append('image', this.$refs.fileInput.files[0]);

      axios
        .post('http://localhost:8081/artworks/saveArtwork', formData)
        .then((response) => {
          console.log(response.data);
          this.$router.push('/signupSuccess');
        })
        .catch((error) => {
          console.error(error);
          this.errorMessage = 'An error occurred while uploading artwork.';
        });
    },
  },
    };
</script>
  


<style scoped>
.registration-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f8f8f8;
  font-family: Arial, sans-serif;
}
.registration-form h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: dodgerblue;
}
.card {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 5px;
}
.card h6 {
  font-size: 14px;
  font-weight: bold;
  color:black;
  margin-bottom: 10px;
}

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
.card input[type="file"] {
  border: none;
  padding: 0;
}
.card input[type="file"] + div {
  font-size: 14px;
  color:dodgerblue;
  margin-top: 5px;
}
.card input:hover,
.card select:hover,
.card textarea:hover {
  border-color:dodgerblue;
}
.card h6:hover {
  color: #666;
}
.card:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

</style>