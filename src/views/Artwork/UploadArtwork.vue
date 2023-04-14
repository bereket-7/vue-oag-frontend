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
                <h6 for="artwork-name" class="mb-0">Artwork Name</h6>
              </div>
              <div class="col-md-9 pe-5">
                <input  id="artwork-name" v-model="artworkName" type="text" placeholder="Abstract child face" class="form-control form-control-lg" />
              </div>
            </div>

            <div class="row align-items-center pt-4 pb-3">
                <div class="col-md-3 ps-5">
                    <h6 for="artwork-category" class="mb-0">Artwork Category</h6>
                </div>
              <div class="col-md-9 pe-5">
                <select id="artwork-category" placeholder="sculpture" v-model="artworkName" name="artwork-category"  class="form-select form-control-lg" >
                <option value="painting">Painting</option>
                <option value="sculpture">Sculpture</option>
                <option value="photography">Photography</option>
                <option value="mixed-media">Mixed Media</option>
                </select>
                </div>
            </div>

            <div class="row align-items-center pt-4 pb-3">
              <div class="col-md-3 ps-5">
                <h6 for="artist-name" class="mb-0">Artist Name</h6>
              </div>
              <div class="col-md-9 pe-5">
                <input  id="artist-name" v-model="artistName" placeholder="Bereket" type="text" class="form-control form-control-lg" />
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
                <h6 class="mb-0">Description</h6>
              </div>
              <div class="col-md-9 pe-5">
                <textarea class="form-control" rows="3" placeholder="Short description about the artwork, only if it needs"></textarea>
              </div>
            </div>

            <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">
                <h6 for="artwork-photo" class="mb-0">Artwork Photo</h6>
              </div>
              <div class="col-md-9 pe-5">
                <input class="form-control form-control-lg" id="artwork-photo" type="file" 
                 @change="handlePhotoUpload" />
                <div class="small text-muted mt-2">Upload Artwork Photo file. Max file
                  size 10 MB</div>
              </div>
            </div>

            <div class="row align-items-center pt-4 pb-3">
              <div class="col-md-3 ps-5">
                <h6 for="create-date" class="mb-0">Date</h6>
              </div>
              <div class="col-md-9 pe-5">
                <input  type="date" class="form-control form- 
                  control-lg" id="create-date" v-model="createDate" />
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
  export default {
    data() {
      return {
        artistName: '',
        size: '',
        status: '',
        artworkPhoto: null,
        createDate: '',
      };
    },
    methods: {
      handlePhotoUpload(event) {
        this.artworkPhoto = event.target.files[0];
      },
      async submitForm() {
        const formData = new FormData();
        formData.append('artistName', this.artistName);
        formData.append('size', this.size);
        formData.append('status', this.status);
        formData.append('artworkPhoto', this.artworkPhoto);
        formData.append('createDate', this.createDate);
        const response = await fetch('/api/register-artwork', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        // reset form data
        this.artistName = '';
        this.size = '';
        this.status = '';
        this.artworkPhoto = null;
        this.createDate = '';
      },
    },
  };
  </script>
  