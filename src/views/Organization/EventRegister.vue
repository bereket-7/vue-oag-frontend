<template>
  <div>
    <form>
      <div>
        <label for="eventName">Event Name:</label>
        <input type="text" id="eventName" v-model="eventData.eventName" />
      </div>
      <div>
        <label for="eventDescription">Event Description:</label>
        <input type="text" id="eventDescription" v-model="eventData.eventDescription" />
      </div>
      <div>
        <label for="eventDate">Event Date:</label>
        <input type="date" id="eventDate" v-model="eventData.eventDate" />
      </div>
      <div>
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="eventData.location" />
      </div>
      <div>
        <label for="capacity">Capacity:</label>
        <input type="text" id="capacity" v-model="eventData.capacity" />
      </div>
      <div>
        <label for="ticketPrice">Ticket Price:</label>
        <input type="number" id="ticketPrice" v-model="eventData.ticketPrice" />
      </div>
      <div>
        <input type="file" name="image" ref="fileInput" @change="handleFileUpload" />
      </div>
      <div>
        <button type="button" @click="submitForm">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      eventData: {
        eventName: '',
        eventDescription: '',
        eventDate: '',
        location: '',
        capacity: '',
        ticketPrice: '',
        eventphoto: '' // this property is not needed in the form
      },
      fileData: null
    };
  },
  methods: {
    handleFileUpload() {
      this.fileData = this.$refs.fileInput.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('image', this.fileData);
      formData.append('event', JSON.stringify(this.eventData));

      try {
        const response = await axios.post('http://localhost:8081/event/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        // handle response as needed
      } catch (error) {
        console.error(error);
        // handle error as needed
      }
    }
  }
};
</script>
