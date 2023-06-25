<template>
  <UserHeader/>
  <CardSlider/>
  <ArtworkCategory/>
  <ShopView />
  <FooterView/>
</template>

<script>
import FooterView from '@/components/FooterView.vue'
import CardSlider from '@/components/CardSlider.vue'
import ArtworkCategory from '@/components/ArtworkCategory.vue';
import ShopView from '@/components/ShopView.vue';
export default {
  name: 'HomeView',
  components: {
    FooterView,
    CardSlider,
    ArtworkCategory,
    ShopView
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