<template>
    <div>
      <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= selected }" @click="select(i)">
        <i class="fa fa-star"></i>
      </span>
    </div>
  </template>

<script>
export default {
  name: 'RateArtwork',
  data() {
    return {
      selected: 0
    };
  },
  methods: {
    select(index) {
      this.selected = index;
      // Call the API to save the rating
      fetch('https://your-api-url.com/rate-artwork', {
        method: 'POST',
        body: JSON.stringify({ rating: index }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }
  }
};
</script>

<style scoped>
.star {
  display: inline-block;
  color: #f5c518;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.2s;
}
.star:hover {
  color: #ffc107;
}
.filled {
  color: #ffc107;
}
</style>

