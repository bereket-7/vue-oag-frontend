<template>
  <form class="vh-200">
    <div class="container h-150">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-9">
          <h1 class="text-success mb-4">Apply for Competition</h1>

          <div class="card">
            <div class="card-body bg-light">

              <div class="input-group flex-nowrap pt-2 mb-2">
                <span class="input-group-text" for="firstName" id="firstName">First Name</span>
                <input type="text" class="form-control form-control-md" placeholder="Enter First Name"
                 id="firstName" v-model="firstName" aria-label="First Name" 
                 aria- describedby="addon-wrapping">
              </div>

              <div class="input-group flex-nowrap pt-2 mb-2">
                <span class="input-group-text" for="lastName" id="lastName">Last Name</span>
                <input type="text" class="form-control form-control-md" placeholder="Enter Last Name" 
                id="lastName" v-model="lastName" aria-label="Last Name"
                  aria-describedby="addon-wrapping">
              </div>

              <div class="input-group flex-nowrap pt-2 mb-2">
                <span class="input-group-text" for="email" id="email">Email</span>
                <input type="email" class="form-control" placeholder="Email" aria-label="Email" aria- 
                 describedby="basic-addon1">
              </div>

              
              <div class="input-group flex-nowrap pt-2 mb-2">
                <span class="input-group-text" for="email" id="email">Phone Number</span>
                <input type="text" class="form-control" placeholder="Phone Number" aria-label="Phone 
                 Number" aria-describedby="basic-addon1">
              </div>

              <div class="input-group flex-nowrap pt-2 mb-2">
                <span class="input-group-text" for="competitionDescription">Art Description</span>
                <textarea type="text" class="form-control form-control-md" id="competitionDescription"
                rows="3" v-model="competitionDescription"></textarea>
              </div>

              <div class="pt-2 mb-2 input-group pt-2 mb-2">
                <label class="input-group-text" for="artworkPhoto">Artwork Photo</label>
                <input class="input-group-text form-control-lg" id="artworkPhoto" 
                for="artworkPhoto" type="file" 
                @change="handlePhotoUpload" />
                <div class="small text-muted mt-2">Upload Artwork Photo for Competition. Max file
                  size 10 MB</div>
                </div>

              <hr class="mx-n3">
              <div class="px-5 py-4">
                <button type="submit" class="btn btn-success btn-lg"
                  @click.prevent="registerCompetition()">Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </form>
</template>

<script>
export default {
  name: 'RegisterCompetitor',
  data() {
    return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        artDescription: '',
        artworkPhoto: null
    };
  },
  methods: {
    handlePhotoUpload(competitor) {
        this.artworkPhoto = competitor.target.files[0];
      },
      async  registerCompetitor(){
      // Submit the form data to the server or perform any other necessary action.
        console.log({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        artDescription: this.artDescription,
        artworkPhoto: null
      })
    },
  },
}
</script>