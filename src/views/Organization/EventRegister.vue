<template>
    <div class="registration-form">
    <form @submit.prevent="submitForm" class="vh-200">
    <div class="container h-150">
    <div class="row d-flex justify-content-center align-items-center h-100">

     <div class="col-xl-9">
        <h2 class="text-info mb-4">Schedule Event</h2>

        <div class="row align-items-center pt-4 pb-3">
              <div class="col-md-3 ps-5">
                <h6 for="event-name" class="mb-0">Event Name:</h6>
              </div>
              <div class="col-md-9 pe-5">
                <input   type="text" id="event-name" v-model="eventName" required placeholder="Cultural Art musium festival" class="form-control form-control-lg" />
              </div>
            </div>

        <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">
                <h6 for="event-description" class="mb-0">Event Description:</h6>
              </div>
              <div class="col-md-9 pe-5">
                <textarea id="event-description" v-model="eventDescription" required class="form-control" rows="4" placeholder="Short description about the event"></textarea>
              </div>
        </div>


        <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">
                <h6 for="event-photo" class="mb-0">Event Photo</h6>
              </div>
              <div class="col-md-9 pe-5">
                <input class="form-control form-control-lg" type="file" id="event-photo" 
                 @change="onPhotoChange"/>
                <div class="small text-muted mt-2">Upload Photo file, If needed. Max file
                  size 20 MB</div>
              </div>
        </div>


        
        <div class="row align-items-center pt-4 pb-3">
              <div class="col-md-3 ps-5">
                <h6 for="timestamp" class="mb-0">Date</h6>
              </div>
              <div class="col-md-9 pe-5">
                <input  type="datetime-local" id="timestamp" class="form-control form- 
                  control-lg" v-model="timestamp" required />
              </div>
        </div>

        <div class="px-5 py-4">
        <button type="submit">Submit</button>
        </div>
    </div>
</div>
 </div>
</form>
</div>
  </template>
  
  <script>
  export default {
    name:'EventRegister',
    data() {
      return {
        eventName: '',
        eventDescription: '',
        photo: null,
        timestamp: ''
      };
    },
    methods: {
      onPhotoChange(event) {
        this.photo = event.target.files[0];
      },
      submitForm() {
        // Perform form submission logic here
      }
    }
  };
  </script>
  
  <style scoped>
     
     
body {
  font-family: Arial, sans-serif;
}

form {
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

input,
textarea {
  width: 100%;
  padding: 5px;
  margin: 5px 0;
}

button {
  width: 25%;
  padding: 10px;
  margin: 10px 0;
  background-color: #0b7c22;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color:rgb(220, 66, 151);
}

  /* Add any custom styles here */
  </style>
  