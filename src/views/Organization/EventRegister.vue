<template>
  <br><br>
  <div class="form-container">
    <h1>Create Event</h1>
    <hr class="mx-n3">
    <br><br>
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
        <label for="fileInput">Upload Image</label>
        <input type="file" id="fileInput" @change="handleFileUpload">
      </div>
      <br>
      <hr class="mx-n3">
      <button type="submit" @click.prevent="submitForm">Submit</button>
    </form>
  </div>
  <br><br>
  <footer-view />
</template>

<script>
import axios from 'axios';
import FooterView from '@/components/FooterView.vue';

export default {
  components: { FooterView },
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
    submitForm() {
      const formData = new FormData();
      formData.append('image', this.event.fileData),
      formData.append('eventName', this.event.eventName),
      formData.append('eventDescription', this.event.eventDescription),
      formData.append('eventDate', this.event.eventDate),
      formData.append('location', this.event.location),
      formData.append('capacity', this.event.capacity),
      formData.append('ticketPrice', this.event.ticketPrice),

      axios.post('http://localhost:8081/event/upload', formData)
        .then(response => {
          console.log(response.data);
          alert('Event created successfully');
          this.event.eventName = '',
          this.event.eventDescription = '',
          this.event.eventDate = '',
          this.event.location = '',
          this.event.capacity = '',
          this.event.ticketPrice = 0,
          this.event.fileData = null
        })
        .catch(error => {
          console.log(error);
          alert('Error creating event');
        });
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