<template>
  <!-- <div id="app">
    <HeaderView></HeaderView>
    <div class="main-content">
      <DashboardView/>
    </div>
  </div> -->
  <HeaderView/>
  <DashboardView/>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue';
import DashboardView from '@/views/DashboardView.vue'
export default {
  components:{
    HeaderView,DashboardView
  }
}
</script>

<style scoped>
.main-content{
padding: 105px 25px 0 25px;
margin-left: 337px;
z-index: -1;
min-height: 600px;
background-color: #f1fdf3;
}
@media only screen and (max-width: 768px) {
  .main-content{
      margin-left: 0;    
  }
}
</style>