<template>
  <UserHeader/>
  <CardSlider/>
  <ArtworkCategory1/>
  <FooterView/>
</template>

<script>
import FooterView from '@/components/FooterView.vue'
import CardSlider from '@/components/CardSlider.vue'
import ArtworkCategory1 from '@/components/ArtworkCategory.vue';
export default {
  name: 'HomeView',
  components: {
    FooterView,
    CardSlider,
    ArtworkCategory1
  },
}
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