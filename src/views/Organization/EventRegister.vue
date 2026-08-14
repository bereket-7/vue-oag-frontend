<template>
  <div class="form-container">
    <h1>Create Event</h1>
    <hr class="mx-n3">
    <br>
    <form
      enctype="multipart/form-data"
      @submit="saveEvent"
    >
      <div class="form-group">
        <label for="eventName">Event Name</label>
        <input
          id="eventName"
          v-model="eventName"
          type="text"
          placeholder="Enter event title"
          required
        >
      </div>
      <div class="form-group">
        <label for="ticketPrice">Ticket Price</label>
        <input
          id="ticketPrice"
          v-model="ticketPrice"
          type="number"
          placeholder="Enter price for event, if needed"
        >
      </div>
      <div class="form-group">
        <label for="capacity">Capacity</label>
        <input
          id="capacity"
          v-model="capacity"
          type="number"
          placeholder="Maximum number participant"
        >
      </div>
      <div class="form-group">
        <label for="eventDescription">Event Description</label>
        <textarea
          id="eventDescription"
          v-model="eventDescription"
          type="text"
          placeholder="Enter Short description about the event"
          required
        />
      </div>

      <div class="form-group">
        <label for="location">Location</label>
        <input
          id="location"
          v-model="location"
          type="text"
          placeholder="Jimma"
          required
        >
      </div>
      <div class="form-group">
        <label for="eventDate">Event Date</label>
        <input
          id="eventDate"
          v-model="eventDate"
          type="text"
          placeholder="2023-10-05"
          required
        >
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input
          id="image"
          ref="fileInput"
          type="file"
          required
        >
      </div>
      <br>
      <hr class="mx-n3">
      <button
        type="submit"
        class="btn btn-primary"
      >
        Submit
      </button>
    </form>
  </div>

  <div
    v-if="showSuccessPopup"
    class="popup"
  >
    <div class="popup-content">
      <p>Event created successfully!</p>
      <button
        class="btn btn-primary"
        @click="closeSuccessPopup"
      >
        OK
      </button>
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
  margin-top: 10px !important;
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
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

label {
  font-weight:600;
  text-align: left;
}
h1 {
  color:black;
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