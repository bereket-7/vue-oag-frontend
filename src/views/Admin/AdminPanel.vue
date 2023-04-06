<template>
  <div id="app">
    <HeaderView></HeaderView>
    <div class="main-content">
      <DashboardView/>
        <router-view/>
    </div>
    <AdminFooter></AdminFooter>
  </div>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue';
import DashboardView from '@/views/DashboardView.vue'
import AdminFooter from '@/components/AdminFooter.vue';
export default {
  components:{
    HeaderView, AdminFooter,DashboardView
  }
}
</script>

<style>
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