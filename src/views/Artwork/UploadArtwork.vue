<template>
<div class="registration-form">
<form class="vh-200">
  <div class="container h-150">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-9">

        <h1 class="text-success mb-4">Upload Artwork</h1>

        <div class="card">
          <div class="card-body bg-light">

            <div class="row align-items-center pt-4 pb-3">
              <div class="col-md-3 ps-5">
                <h6 for="artworkName" class="mb-0">Artwork Name</h6>
              </div>
              <div class="col-md-9 pe-5">
                <input  id="artworkName" v-model="artworkName" type="text" placeholder="Abstract child face" class="form-control form-control-lg" />
              </div>
            </div>

            <div class="row align-items-center pt-4 pb-3">
                <div class="col-md-3 ps-5">
                    <h6 for=" artworkCategory" class="mb-0">Artwork Category</h6>
                </div>
              <div class="col-md-9 pe-5">
                <select id=" artworkCategory" v-model="artworkCategory" name=" artworkCategory"  class="form-select form-control-lg" >
                <option value="painting">Painting</option>
                <option value="sculpture">Sculpture</option>
                <option value="photography">Photography</option>
                <option value="mixed-media">Mixed Media</option>
                </select>
                </div>
            </div>

            <div class="row align-items-center pt-4 pb-3">
              <div class="col-md-3 ps-5">
                <h6 for="size" class="mb-0">Size</h6>
              </div>
              <div class="col-md-9 pe-5">
                <input  id="size" v-model="size" type="text" placeholder="100cm x 120cm" class="form-control form-control-lg" />
              </div>
            </div>

            <hr class="mx-n3">

            <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">
                <h6 class="mb-0" for=" artworkDescription">Description</h6>
              </div>
              <div class="col-md-9 pe-5">
                <textarea class="form-control" v-model="artworkDescription" rows="3" placeholder="Short description about the artwork, only if it needs"></textarea>
              </div>
            </div>

            <div class="row align-items-center pt-4 pb-3">
              <div class="col-md-3 ps-5">
                <h6 for="price" class="mb-0">Price</h6>
              </div>
              <div class="col-md-9 pe-5">
                <input  id="price" v-model="artistId" type="number" placeholder="Enter Price" class="form-control form-control-md" />
              </div>
            </div>

            
            <div class="row align-items-center pt-4 pb-3">
              <div class="col-md-3 ps-5">
                <h6 for="artistId" class="mb-0">artist Id</h6>
              </div>
              <div class="col-md-9 pe-5">
                <input  id="artistId" v-model="price" type="number" placeholder="Enter id" class="form-control form-control-md" />
              </div>
            </div>

            <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">
                <h6 for="artworkPhoto" class="mb-0">Artwork Photo</h6>
              </div>
              <div class="col-md-9 pe-5">
                <input class="form-control form-control-lg" id="artworkPhoto" type="file" 
                 @change="onFileChange" />
                <div class="small text-muted mt-2">Upload Artwork Photo file. Max file
                  size 10 MB</div>
              </div>
            </div>

            <div class="row align-items-center pt-4 pb-3">
              <div class="col-md-3 ps-5">
                <h6 for="createDate" class="mb-0">Date</h6>
              </div>
              <div class="col-md-9 pe-5">
                <input  type="date" class="form-control form- 
                  control-lg" id="createDate" v-model="createDate" />
              </div>
            </div>
    
            <hr class="mx-n3">

            <div class="px-5 py-4">
              <button type="submit" @click.prevent="submitForm" class="btn btn-success btn-lg">Submit Artwork</button>
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
          alert('Standard uploaded successfully!');
      } catch (error) {
        // Handle any errors from the client (network errors, timeouts, etc.)
        console.error(error);
        alert('An error occurred while uploading the artwork.');
      }
    }
  }
};

  </script>
  