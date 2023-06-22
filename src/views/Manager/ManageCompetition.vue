<template>
    <div class="container-fluid rounded bg-white mt-5">
        <div class="row">
            <div class="col-md-3 border-right sidebar">
                <div class="d-flex flex-column align-items-center text-center p-3  user-p">
                    <img class="rounded-circle mt-5" width="150px" src="@/assets/img/bekam.jpg">
                    <span class="font-weight-bold">Bereket</span>
                </div>
                <div class="sidebar">
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
            </div>
            <div class="col-md-8 border-right">
                <div class="p-3 py-5">
                    <div class="justify-content-between align-items-center mb-3">
                        <h4 class="text-center">MANAGE COMPETITION</h4>
                    </div>
                    <div class="row">
                        <div class="row mt-3">
                        <div class="col-md-4 mb-3">
                            <div class="card">
                            <img class="card-img-top" src="@/assets/img/abstract-landscape-bold.jpg" alt="Card image cap" height="300" >
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <router-link to=""><button class="btn btn-primary m-2">Edit</button></router-link>
                                <router-link to=""><button class="btn btn-danger m-2">Delete</button></router-link>
                            </div>
                        </div>
                
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card">
                            <img class="card-img-top" src="@/assets/img/acry.jpg" alt="Card image cap" height="300">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <router-link to=""><button class="btn btn-primary m-2">Edit</button></router-link>
                                <router-link to=""><button class="btn btn-danger m-2">Delete</button></router-link>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-4 mb-2">
                            <div class="card">
                            <img class="card-img-top" src="@/assets/img/art.jpg" alt="Card image cap" height="300">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <router-link to=""><button class="btn btn-primary m-2">Edit</button></router-link>
                                <router-link to=""><button class="btn btn-danger m-2">Delete</button></router-link>
                            </div>
                        </div>
                
                        </div>
                         
                    </div>
  
                    </div>
  
                </div>
            </div>
        </div>
    </div>
    <FooterView/>
    </template>
    
    <script>
    import FooterView from "@/components/FooterView.vue"
    export default{
        name:'AccountDetail',
        components:{
            FooterView
        }
    }
    </script>
    
    <style scoped>

    .btn{
        align-items: center;
    }
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
        background-color: #f1f1f1;
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
  }
  .navbar-list{
    text-decoration: none;
  }
  .nav-item:hover{
    background-color: rgb(74, 73, 72);
  color: white;
  }
  </style>