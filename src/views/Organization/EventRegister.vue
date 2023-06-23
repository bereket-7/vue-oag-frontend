<template>
  <div class="form-container">
    <h1>Create Event</h1>
    <hr class="mx-n3">
    <br>
    <form @submit="saveEvent" enctype="multipart/form-data">
      <div class="form-group">
        <label for="eventName">Event Name</label>
        <input type="text" id="eventName" v-model="eventName" placeholder="Enter event title" required />
      </div>
      <div class="form-group">
        <label for="ticketPrice">Ticket Price</label>
        <input type="number" id="ticketPrice" placeholder="Enter price for event, if needed" v-model="ticketPrice" />
      </div>
      <div class="form-group">
        <label for="capacity">Capacity</label>
        <input type="number" id="capacity" v-model="capacity" placeholder="Maximum number participant"/>
      </div>
      <div class="form-group">
        <label for="eventDescription">Event Description</label>
        <textarea type="text" id="eventDescription" v-model="eventDescription" placeholder="Enter Short description about the event"   required></textarea>
      </div>

      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" id="location" v-model="location" placeholder="Jimma" required />
      </div>
      <div class="form-group">
        <label for="eventDate">Event Date</label>
        <input type="text" placeholder="2023-10-05" id="eventDate" v-model="eventDate" required />
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input type="file" id="image" ref="fileInput" required />
      </div>
      <br>
      <hr class="mx-n3">
      <button type="submit">Submit</button>
    </form>
  </div>

  <div v-if="showSuccessPopup" class="popup">
    <div class="popup-content">
      <p>Event created successfully!</p>
      <button class="btn btn-primary" @click="closeSuccessPopup">OK</button>
    </div>
  </div><br><br>
</template>

<script>
import axios from 'axios';

export default {
   data() {
    return {
      eventName: '',
      ticketPrice: 0,
      capacity: 0,
      eventDescription: '',
      location: '',
      eventDate: '',
      showSuccessPopup: false,
    };
  },
  methods: {
    saveEvent(event) {
      event.preventDefault();
      const formData = new FormData();
      formData.append('eventName', this.eventName);
      formData.append('ticketPrice', this.ticketPrice);
      formData.append('capacity', this.capacity);
      formData.append('eventDescription', this.eventDescription);
      formData.append('location', this.location);
      formData.append('eventDate', this.eventDate);
      formData.append('image', this.$refs.fileInput.files[0]);
      axios
        .post('http://localhost:8081/api/events/saveEvent', formData)
        .then((response) => {
          console.log(response.data);
          this.showSuccessPopup = true; 
        })
        .catch((error) => {
          console.error(error);
          this.errorMessage = 'An error occurred while creating the event.';
        });
    },
    closeSuccessPopup() {
      this.showSuccessPopup = false; 
    },
  },
};
</script>


<style scoped>
.form-container {
  margin-top: 100px !important;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}
input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

textarea[type="text"],
textarea[type="number"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

button:hover {
  background-color: #3e8e41;
}
label {
  font-weight:600;
  text-align: left;
}
h1 {
  color:#3e8e41;
}

.form-container:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 600px) {
  .form-container {
    max-width: 100%;
  }
}
</style>