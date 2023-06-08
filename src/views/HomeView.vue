<template>
  <UserHeader/>
  <CardSlider/>
  <ArtworkCategory/>
  <FAQs/>

  <SearchArtwork/>

  <FooterView/>
</template>

<script>

import FAQs from '@/views/User/FAQs.vue'
import SearchArtwork from '@/components/SearchArtwork.vue'
import FooterView from '@/components/FooterView.vue'
import CardSlider from '@/components/CardSlider.vue'
export default {
  name: 'HomeView',
  components: {
    FooterView,
    CardSlider,
    SearchArtwork,
    FAQs,
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