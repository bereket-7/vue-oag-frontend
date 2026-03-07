<template>
  <UserHeader/>
  <CardSlider/>
  <ArtworkCategory/>
  <ArtworkList />
  <FooterView />
</template>

<script setup>
import ArtworkList from '@/views/Artwork/ArtworkList.vue'; 
import FooterView from '@/components/FooterView.vue';
import CardSlider from '@/components/CardSlider.vue';
import ArtworkCategory from '@/components/ArtworkCategory.vue';
</script>

<style scoped>
   .card {
  width: 18rem;
}

@media (max-width: 576px) {
  .card {
    width: 100%;
  }
}
</style>