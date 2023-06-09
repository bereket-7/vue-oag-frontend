<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">{{ artwork.title }}</h5>
              <img :src="artwork.imageUrl" class="img-fluid mb-3" alt="">
              <p class="card-text">{{ artwork.description }}</p>
              <button class="btn btn-primary" @click="vote()">Vote {{ artwork.votes }}</button>
              <i class="fas fa-thumbs-up fa-2x ml-2"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'VoteForArtwork',
    props: ['artwork'],
    setup(props) {
      const votes = ref(props.artwork.votes);
  
      const vote = () => {
        votes.value++;
      };
  
      return {
        votes,
        vote,
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
  