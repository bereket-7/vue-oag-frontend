<template>
    <div class="event-list">
    <div v-for="event in events" :key="event.id" class="event-card" >
      <div class="event-image-container" >
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
      <button type="button" class="btn btn-primary">Accept</button>
      <button type="button" class="btn btn-danger">Decline</button>
    </div>
  </div>
</template>

<script>
export default{
data(){
    return{
        events:[]
    }
},
mounted(){
    this.fetchAllEvents();
},
methods: {
    fetchAllEvents() {
      fetch('http://localhost:8081/events', {
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
        fetch(`http://localhost:8081/events/${event.id}/image`, {
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
  },
}

</script>

<style>

</style>