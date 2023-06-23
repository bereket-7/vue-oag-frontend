<template>
  <div class="event-list">
    <div v-for="event in events" :key="event.id" class="event-card">
      <div class="event-image-container">
        <img :src="getEventImageUrl(event.id)" alt="Event Image" class="event-image" />
      </div>
      <div class="event-details">
        <h1 class="event-name">{{ event.eventName }}</h1>
        <p class="event-description">{{ event.eventDescription }}</p>
        <p class="event-description">Ticket Price: {{ event.ticketPrice }}</p>
        <p class="event-description">Location: {{ event.location }}</p>
        <p class="event-description">Capacity: {{ event.capacity }}</p>
        <p class="event-description">Event Date: {{ event.eventDate }}</p>
      </div>
      <div class="button-container">
        <button type="button" class="btn btn-primary" @click="acceptEvent(event.id)" v-if="event.status === 'Pending'">Accept</button>
        <button type="button" class="btn btn-danger" @click="rejectEvent(event.id)" v-if="event.status === 'Pending'">Decline</button>
        <span v-else class="status-label">{{ event.status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default{
data(){
    return{
      events: [
        {
          id: 1,
          eventName: 'Event 1',
          eventDescription: 'Description for Event 1',
          ticketPrice: '$10',
          location: 'Location 1',
          capacity: '100',
          eventDate: '2023-07-01',
          imageUrl: 'https://via.placeholder.com/300x200',
        },
        {
          id: 2,
          eventName: 'Event 2',
          eventDescription: 'Description for Event 2',
          ticketPrice: '$15',
          location: 'Location 2',
          capacity: '150',
          eventDate: '2023-07-08',
          imageUrl: 'https://via.placeholder.com/300x200',
        },
      ],
    }
},
mounted(){
    this.fetchAllEvents();
},
methods: {
    fetchAllEvents() {
      fetch('http://localhost:8082/api/events/pending', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch events');
          }
        })
        .then(data => {
          this.events = data;
          this.fetchEventImages();
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchEventImages() {
      this.events.forEach(event => {
        fetch(`http://localhost:8082/api/events/${event.id}/image`, {
          method: 'GET',
          headers: {
            Accept: 'image/png',
          },
        })
          .then(response => {
            if (response.ok) {
              return response.blob();
            } else {
              throw new Error(`Failed to fetch image for event ${event.id}`);
            }
          })
          .then(imageBlob => {
            event.imageUrl = URL.createObjectURL(imageBlob);
          })
          .catch(error => {
            console.error(error);
          });
      });
    },
    getEventImageUrl(eventId) {
      const event = this.events.find(event => event.id === eventId);
      return event ? event.imageUrl : null;
    },
    acceptEvent(eventId) {
      fetch(`http://localhost:8082/api/events/${eventId}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error(`Failed to accept event with ID ${eventId}`);
          }
        })
        .then(data => {
          console.log(data);
          // Refresh the event list or update the event's status in the local data
        })
        .catch(error => {
          console.error(error);
        });
    },
    rejectEvent(eventId) {
      fetch(`http://localhost:8082/api/events/${eventId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error(`Failed to reject event with ID ${eventId}`);
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
}
</script>
<style scoped>
.event-list {
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.event-card {
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
}

.event-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-details {
  margin-top: 20px;
}

.event-name {
  font-size: 20px;
  font-weight: bold;
}

.event-description {
  margin-bottom: 5px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
  border: none;
}

@media screen and (max-width: 600px) {
  .event-card {
    width: 100%;
  }
}
</style>