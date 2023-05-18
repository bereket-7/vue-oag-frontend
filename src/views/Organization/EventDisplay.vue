<template>
  <div id="app">
    <h1>Event Image</h1>
    <img v-if="eventImage" :src="dataURL" style="width: 100px; height: 100px" />
    <p v-else>No image found</p>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';

new Vue({
  el: '#app',
  data() {
    return {
      eventImage: null,
    };
  },
  mounted() {
    axios.get('http://localhost:8081/event/2').then((response) => {
      this.eventImage = response.data;
      this.dataURL = 'data:image/png;base64,' + btoa(this.eventImage);
    }).catch((error) => {
      console.log(error);
    });
  },
});
</script>


