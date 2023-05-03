<template>
  <br>
  <div class="form-container">
    <h1>Create Event</h1>
    <hr class="mx-n3">
    <br>
    <form>
      <div>
        <label for="eventName">Event Name</label>
        <input type="text" id="eventName" v-model="eventName">
      </div>
      <div>
        <label for="eventDescription">Event Description</label>
        <input type="text" id="eventDescription" v-model="eventDescription">
      </div>
      <div>
        <label for="eventDate">Event Date</label>
        <input type="text" id="eventDate" v-model="eventDate">
      </div>
      <div>
        <label for="location">Location</label>
        <input type="text" id="location" v-model="location">
      </div>
      <div>
        <label for="capacity">Capacity</label>
        <input type="text" id="capacity" v-model="capacity">
      </div>
      <div>
        <label for="ticketPrice">Ticket Price</label>
        <input type="number" id="ticketPrice" v-model="ticketPrice">
      </div>
      <div>
      <label for="eventPhoto">Event Photo</label>
      <input type="file" id="eventPhoto" @change="handleFileUpload" accept="image/*">
      </div>
      <br>
      <hr class="mx-n3">
      <button type="submit" @click.prevent="submitForm">Submit</button>
    </form>
  </div>
  <br><br>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateEvent',
  data() {
    return {
      event: {
        eventName: '',
        eventDescription: '',
        eventDate: '',
        location: '',
        capacity: '',
        ticketPrice: 0,
        fileData: null
      } 
    }
  },
  methods: {
    handleFileUpload(event) {
  this.event.fileData = event.target.files[0];
},
    async submitForm() {
      const formData = new FormData();
      formData.append('eventName', this.eventName);
      formData.append('image', this.event.fileData);
      formData.append('eventDate', this.eventDate);
      formData.append('capacity', this.capacity);
      formData.append('ticketPrice', Number(this.event.ticketPrice));
      formData.append('location', this.location);
      formData.append('eventDescription', this.eventDescription);

      try {
        const response = await axios.post('http://localhost:8081/event/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log(response);
        alert('Event uploaded successfully!');
        this.event.eventName = '';
    this.event.eventDescription = '';
    this.event.eventDate = '';
    this.event.location = '';
    this.event.capacity = '';
    this.event.ticketPrice = 0;
    this.event.fileData = null;
      } catch (error) {
        // Handle any errors from the client (network errors, timeouts, etc.)
        console.error(error);
        alert('An error occurred while uploading the event.');
      }
    }
  }
}
</script>



<style scoped>

  /* Container styles */
.form-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

/* Input styles */
input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* Button styles */
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

/* Hover effect on form container */
.form-container:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

/* Responsive styles */
@media screen and (max-width: 600px) {
  .form-container {
    max-width: 100%;
  }
}

</style>