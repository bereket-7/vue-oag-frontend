<template>
    <div>
      <button @click="showUpdateModal">Update Event</button>
  
      <div v-if="isUpdateModalVisible" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Update Event</h3>
            <button @click="closeUpdateModal">Close</button>
          </div>

          <div class="modal-body">
            <label for="eventName">Event Name:</label>
            <input type="text" v-model="updatedEvent.eventName" id="eventName">
            
            <label for="eventDescription">Event Description:</label>
            <textarea v-model="updatedEvent.eventDescription" id="eventDescription"></textarea>

            <label for="location">Location</label>
            <input type="text" id="location" v-model="location" required />

            <label for="ticketPrice">Ticket Price</label>
            <input type="number" id="ticketPrice" v-model="ticketPrice" />

            <label for="capacity">Capacity</label>
            <input type="number" id="capacity" v-model="capacity"/>

            <label for="eventDate">Event Date</label>
            <input type="text" placeholder="2023-10-05" id="eventDate" v-model="eventDate" required />
            <br><br>
            <button @click="updateEvent">Update</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        isUpdateModalVisible: false,
        updatedEvent: {
          eventName: '',
          eventDescription: '',
          ticketPrice: 0,
          capacity:0,
          location: ''
        }
      };
    },
    methods: {
      showUpdateModal() {
        this.isUpdateModalVisible = true;
      },
      closeUpdateModal() {
        this.isUpdateModalVisible = false;
      },
      updateEvent(eventId) {
      axios
        .put(`http://localhost:8081/events/${eventId}`, this.updatedEvent)
        .then(response => {
          this.event = response.data;
          console.log('Event updated successfully!');
        })
        .catch(error => {
          console.error('Error updating event:', error);
        })
        .finally(() => {
          this.isUpdateModalVisible = false;
        });
    }
  }
};
  </script>
  
  <style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  margin-top: 20px;
}

button {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3367d6;
}

label {
  display: block;
  margin-bottom: 10px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="text"]:focus,
textarea:focus {
  outline: none;
  border-color: #4285f4;
  box-shadow: 0 0 4px #4285f4;
}
</style>
  