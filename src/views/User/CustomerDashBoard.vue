<template>
    <div class="container-fluid rounded bg-white">
      <div class="justify-content-between align-items-center border-bottom border-top dashboard">
                        <h2 class="text-start font-weight-bold">MY ACCOUNT</h2>
                        <h6 class="text-start">DASHBOARD</h6>
                    </div>
        <div class="row">
            <div class="col-md-3 sidebar">
                <div class="d-flex flex-column align-items-center text-center p-3  user-p">
                    <img class="rounded-circle mt-5" width="150px" src="@/assets/img/bekam.jpg">
                    <span class="font-weight-bold">Bereket</span>
                </div>
                <div class="sidebar">
                    <ul class="navbar-list">
        <li class="nav-item">
          <router-link to="/" class="nav-link border-bottom text-start sideNavList">HOME</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link border-bottom  text-start sideNavList">ABOUT</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contactUs" class="nav-link border-bottom text-start sideNavList">CONTACT US</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/adminPanel" class="nav-link border-bottom text-start sideNavList">ADMIN</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/adminPanel" class="nav-link border-bottom text-start sideNavList">ACCOUNT DETAIL</router-link>
        </li>
      
        <li class="nav-item">  
    <button @click="showConfirmationDialog = true">Logout</button> 
    <div v-if="showConfirmationDialog" class="confirmation-dialog">
      <p>Are you sure you want to logout?</p>
      <button @click="logoutUser">Yes</button>
      <button @click="cancelLogout">No</button>
    </div>
 </li>
      </ul> 

                  </div>
                    
                </div>
  
            <div class="col-md-8 border-right">
              
                <div class="p-3 py-5">
                  <div class="dashboardText">
                <p>The user dashboard on an online art gallery allows you to easily navigate, discover, and engage with artworks, artists, and personalized features.</p>
              </div>
                    <div class="row">
                        <div class="row mt-2">
                        <div class="col-md-4"><router-link to="/"><button type="button" class="btn btn-outline-secondary w-100 h-1 m-1 text" style="height:70px;">Home</button></router-link></div>
                        <div class="col-md-4"><router-link to="/about"><button type="button" class="btn btn-outline-secondary w-100 h-1 m-1 text" style="height:70px;">About</button></router-link></div>
                        <div class="col-md-4"><router-link to="/contactUs"><button type="button" class="btn btn-outline-secondary w-100 h-1 m-1 text" style="height:70px;">Contact Us</button></router-link></div>
                         
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-4"><router-link to="/artworkList"><button type="button" class="btn btn-outline-secondary w-100 h-1 m-1 text" style="height:70px;">Paintings</button></router-link></div>
                        <div class="col-md-4"><router-link to="/customerDashboard"><button type="button" class="btn btn-outline-secondary w-100 h-1 m-1 text" style="height:70px;">My Account</button></router-link></div>
                        <div class="col-md-4"><router-link to="/edit-account"><button type="button" class="btn btn-outline-secondary w-100 h-10 m-1 text" style="height:70px;">Account Details</button></router-link></div>  
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-4"><router-link to=""><button type="button" class="btn btn-outline-secondary w-100 h-10 m-1 text" style="height:70px;">Wishlist</button></router-link></div>
                    </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
    <FooterView/>
    </template>
    
    <script>
      import axios from 'axios';
    import FooterView from "@/components/FooterView.vue"
    export default{
        name:'AccountDetail',
        components:{
            FooterView
        },
        data() {
      return {
        showConfirmationDialog: false,
      };
    },
    methods: {
      logoutUser() {
      axios
        .get('http://localhost:8082/api/auth/logout')
        .then(response => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userInfo');
          this.$router.push('/userLogin');
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    cancelLogout() {
      this.showConfirmationDialog = false;
    },
    },
    }
    </script>
    
    <style scoped>
    .form-control:focus {
        box-shadow: none;
        border-color: black
    }
    
    .profile-button {
        box-shadow: none;
        border: none
    }
    .profile-button:active {
        background: #682773;
        box-shadow: none
    }
    .back:hover {
        color: #682773;
        cursor: pointer
    }
    
    .labels {
        font-size: 11px
    }
    
    .add-experience:hover {
        background: #BA68C8;
        color: #fff;
        cursor: pointer;
        border: solid 1px #BA68C8
    }

    .sidebar{
        background-color: rgb(250, 250, 250);
        color:black;
    }
    .user-p img{
    width: 50%;
    border-radius: 50%;
}
.navbar-list{
    text-align: center;
    list-style-type: none;
}
.nav-item{
    margin: 5px;
    margin-bottom: 12px;
    
}
.navbar-list{
    text-decoration: none;
}
.nav-link:hover{
  color: black;
}
.dashboard{
  margin-top: 70px;
  margin-bottom:10px;
    background-color:rgb(250,250,250);
    color: black;
    
}
.dashboard h2,h6{
  color:rgb(89, 89, 89);
  margin-top: 10px;
}
.text-start{
  margin-left: 120px;
 
}
.sideNavList{
  font-family:sans-serif;
 font-size: medium;
}

.nav-link{
  color:rgb(89, 89, 89);
}
.text{
  font-size:x-large;
}
</style>