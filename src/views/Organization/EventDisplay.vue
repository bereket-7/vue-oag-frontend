<template>
  <div id="app">
    <event-image />
  </div>
</template>

<script>
import Vue from 'vue';
import EventImage from './components/EventImage.vue';

new Vue({
  el: '#app',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    EventImage,
  },
});
</script>
