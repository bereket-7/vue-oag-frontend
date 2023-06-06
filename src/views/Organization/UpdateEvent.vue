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
  
            <button @click="updateEvent">Update</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
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
      updateEvent() {
        // Call your API or perform the necessary logic to update the event
        // Access the updatedEvent data to send the updated values
  
        // After updating, close the modal
        this.isUpdateModalVisible = false;
      }
    }
  };
  </script>
  
  <style>
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
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-body {
    margin-top: 20px;
  }
  
  /* Add your own custom styles as needed */
  </style>
  