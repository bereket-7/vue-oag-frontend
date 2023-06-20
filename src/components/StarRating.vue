<template>
    <div class="star-rating">
      <span v-for="star in stars" :key="star" @click="selectRating(star)">
        <i :class="starClass(star)" />
      </span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      rating: {
        type: Number,
        default: 0,
      },
      editable: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        stars: [1, 2, 3, 4, 5],
        selectedRating: this.rating,
      };
    },
    methods: {
      selectRating(star) {
        if (this.editable) {
          this.selectedRating = star;
          this.$emit('rating-selected', this.selectedRating);
        }
      },
      starClass(star) {
        return {
          'fa-solid fa-star': star <= this.selectedRating,
          'fa-regular fa-star': star > this.selectedRating,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .star-rating {
    display: inline-block;
  }
  
  .star-rating span {
    cursor: pointer;
  }
  
  .star-rating i {
    font-size: 1.2rem;
    color: gold;
  }
  </style>
  