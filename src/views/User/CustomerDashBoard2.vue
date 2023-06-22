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
                    <div class="justify-content-between align-items-center mb-3 myaccount">
                        <h2 class="text-center">MY ACCOUNT</h2>
                        <h5 class="text-center">DASHBOARD</h5>
                    </div>
                    <div class="row">
                        <div class="row mt-2">
                        <div class="col-md-4"><router-link to="/"><button type="button" class="btn btn-outline-secondary w-100 h-10 m-1">Home</button></router-link></div>
                        <div class="col-md-4"><router-link to="/about"><button type="button" class="btn btn-outline-secondary w-100 h-10 m-1">About</button></router-link></div>
                        <div class="col-md-4"><router-link to="/contactUs"><button type="button" class="btn btn-outline-secondary w-100 h-10 m-1">Contact Us</button></router-link></div>
                         
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-4"><router-link to="/edit-account"><button type="button" class="btn btn-outline-secondary w-100 h-10 m-1">Account Detail</button></router-link></div>
                        <div class="col-md-4"><router-link to=""><button type="button" class="btn btn-outline-secondary w-100 h-10 m-1">About</button></router-link></div>
                        <div class="col-md-4"><router-link to=""><button type="button" class="btn btn-outline-secondary w-100 h-10 m-1">Contact Us</button></router-link></div>  
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-4"><router-link to=""><button type="button" class="btn btn-outline-secondary w-100 h-10 m-1">Home</button></router-link></div>
                        <div class="col-md-4"><router-link to=""><button type="button" class="btn btn-outline-secondary w-100 h-10 m-1">About</button></router-link></div>
                        <div class="col-md-4"><router-link to=""><button type="button" class="btn btn-outline-secondary w-100 h-10 m-1">Contact Us</button></router-link></div>  
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
    
    <style>
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
.myaccount{
    background-color:rgb(65, 74, 48) ;
    color: white;
}
</style>