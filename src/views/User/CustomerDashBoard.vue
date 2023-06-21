<template>
  <div class="container-fluid">
<div class="flex-container">

    
       <div class="sidebar">
    <div class="user-p">
    <img src="@/assets/img/bekam.jpg" alt="">
    <h4>Bereket</h4>
    </div>
    <ul class="navbar-list">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contactUs" class="nav-link">Contact Us</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/adminPanel" class="nav-link">Admin</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/adminPanel" class="nav-link">Account Detail</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/adminPanel" class="nav-link">Logout</router-link>
        </li>
      </ul> 
</div>  
<div class="main-content container text-center">
  <div class="title">
      <h1>MY ACCOUNT</h1>
      <h5>DASHBOARD</h5>
    </div>
  <div class="row">
    <div class="col-6 col-md-4">
     <button><router-link to="" class="item">Home</router-link></button>
    </div>
    <div class="col-6 col-md-4">
     <button><router-link to="" class="item">About</router-link></button>
    </div>
    <div class="col-6 col-md-4">
      <button><router-link to="" class="item">Contact</router-link></button>
    </div>
  </div>
  <div class="row">
    <div class="col-6 col-md-4">
     <button><router-link to="" class="item">address</router-link></button>
    </div>
    <div class="col-6 col-md-4">
     <button><router-link to="" class="item">About</router-link></button>
    </div>
    <div class="col-6 col-md-4">
      <button><router-link to="" class="item">Contact</router-link></button>
    </div>
  </div>
  <div class="row">
    <div class="col-6 col-md-4">
     <button><router-link to="" class="item">Home</router-link></button>
    </div>
    <div class="col-6 col-md-4">
     <button><router-link to="" class="item">About</router-link></button>
    </div>
    <div class="col-6 col-md-4">
      <button><router-link to="" class="item">Contact</router-link></button>
    </div>
  </div>
  </div>
</div> 
  </div>
    

<Footerview></Footerview>
</template>



<script>
import Footerview from '@/components/FooterView.vue'
export default{
    name:'customerDashboard',
    components:{
        Footerview
    }
}

</script>

<style scoped>
.flex-container {
    display: flex;
}

.title{
  background-color: rgb(95, 96, 107);
  color:white;
}


.sidebar{
    margin: 0;
    padding-top: 80px;
    width: 25%;
    background-color: #f1f1f1;
    height: 100%;
    overflow: auto; 
}
.user-p{
    text-align: center;
    padding-left:0;
    padding-top: 15px;
}
.user-p img{
    width: 50%;
    border-radius: 50%;
}
.main-content{
     margin-top: 100px;
    margin-left: 100px;
    margin-right: 100px;
    
    /* padding-left: 30%;
    padding-top:10%;
    width: 75%; */
}
.item{
  padding-left: 60px;
  padding-right: 60px;
  /* padding-top: 50px;
  padding-bottom: 50px; */
}

.row{
  margin-top:20px;
  margin-bottom: 20px;
}

.item:hover{
  background-color: rgb(74, 73, 72);
  color: white;
}
.nav-item{
    margin:5px;
    align-content: center;
}
.navbar-list{
    align-content: center;
    margin-top: 30px;
}
.nav-item{
    align-items: center;
}
.nav-link{
    display: block;
  color: black;
  padding: 0;
  text-decoration: none;
  text-align: center;
}
.nav-link:hover{
    background-color: rgb(74, 73, 72);
    color:white;
}
@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .nav-item {float: left;}
}

@media screen and (max-width: 400px) {
  .nav-item{
    text-align: center;
    float: none;
  }
  }
</style>