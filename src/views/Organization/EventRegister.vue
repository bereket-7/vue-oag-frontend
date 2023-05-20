<template>
  <div>
    <h2>Create Event</h2>
    <form @submit="saveEvent" enctype="multipart/form-data">
      <div>
        <label for="eventName">Event Name:</label>
        <input type="text" id="eventName" v-model="eventName" required />
      </div>
      <div>
        <label for="ticketPrice">Ticket Price:</label>
        <input type="number" id="ticketPrice" v-model="ticketPrice" required />
      </div>
      <div>
        <label for="capacity">Capacity:</label>
        <input type="number" id="capacity" v-model="capacity" required />
      </div>
      <div>
        <label for="eventDescription">Event Description:</label>
        <textarea id="eventDescription" v-model="eventDescription" required></textarea>
      </div>
      <div>
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="location" required />
      </div>
      <div>
        <label for="eventDate">Event Date:</label>
        <input id="eventDate" v-model="eventDate" required />
      </div>
      <div>
        <label for="image">Image:</label>
        <input type="file" id="image" ref="fileInput" required />
      </div>
      <button type="submit">Create Event</button>
    </form>
  </div>
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
        .post('http://localhost:8081/event/saveEvent', formData)
        .then((response) => {
          console.log(response.data);

          // Add your logic here for handling a successful event creation
        })
        .catch((error) => {
          console.error(error);
          this.errorMessage = 'An error occurred while creating the event.';
        });
    },
  },
};
</script>