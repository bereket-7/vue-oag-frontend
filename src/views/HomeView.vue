<template>
  <div class="home">
  </div>
  <UserHeader/>
  <CardSlider/>
  <ArtworkCategory/>
  <FAQs/>

  <SearchArtwork/>

  <FooterView/>
</template>

<script>
// @ is an alias to /src

import FAQs from '@/views/User/FAQs.vue'
import SearchArtwork from '@/components/SearchArtwork.vue'
import FooterView from '@/components/FooterView.vue'
import CardSlider from '@/components/CardSlider.vue'
import ArtworkCategory from '@/components/ArtworkCategory.vue'
export default {
  name: 'HomeView',
  components: {
    FooterView,
    CardSlider,
    ArtworkCategory,
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