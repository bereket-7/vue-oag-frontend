<template>
    <ManagerNavbar/>
    <verify-artwork/>
    <FooterView/>
</template>


<script>
import ManagerNavbar from '@/components/ManagerNavbar.vue'
import FooterView from '@/components/FooterView.vue'
import VerifyArtwork from './VerifyArtwork.vue'
export default {
  name: 'HomeView',
  components: {
    FooterView,
    ManagerNavbar,
    VerifyArtwork
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