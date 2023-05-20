<template>
   <br>
  <div class="form-container">
    <h1>Create Event</h1>
    <hr class="mx-n3">
    <br>
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
      <br>
      <hr class="mx-n3">
      <button type="submit">Submit</button>
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
          this.$router.push('/signupSuccess');

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

<style scoped>

.form-container {
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