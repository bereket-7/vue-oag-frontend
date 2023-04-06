<template>
    <div class="container py-4">
      <div class="row">
        <div class="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
          <div class="card">
            <div style="color:green; font-size:25px" class="card-header bg-light">
              Register Organization<br>
            </div>
            <div class="card-body vh-200">
              <form>
                <div class="input-group flex-nowrap pt-2 mb-2">
                    <span class="input-group-text" for="name" id="name">Name</span>
                  <input type="text" id="name" class="form-control form-control-md"   
                   placeholder="Organization Name" v-model="name">
                </div>

                <div class="input-group flex-nowrap pt-2 mb-2">
                    <span class="input-group-text" for="email" id="email">Email</span>
                  <input type="text" id="email" class="form-control form-control-md"   
                   placeholder="Organization Email" v-model="email">
                </div>
                
                <div class="input-group flex-nowrap pt-2 mb-2">
                    <span class="input-group-text" for="phone" id="phone">Phone</span>
                  <input type="text" class="form-control form-control-md"   
                   placeholder="Enter Phone Number" id="phone" v-model="phone">
                </div>
                <div class="input-group flex-nowrap pt-2 mb-2">
                    <span class="input-group-text" for="address" id="address">Address</span>
                  <textarea type="text" class="form-control form-control-md"   
                   placeholder="Country,Region,city," id="address" v-model="address"></textarea>
                </div>

                <div class="input-group flex-nowrap pt-2 mb-2">
                    <span class="input-group-text" for="username" id="username">Username</span>
                  <input type="text" class="form-control form-control-md"   
                   placeholder="Enter Username" id="username" v-model="username">
                </div>

                <div class="input-group flex-nowrap pt-2 mb-2">
                    <span class="input-group-text" for="password" id="password" >Password</span>
                  <input type="text" class="form-control form-control-md"   
                   placeholder="Enter Password at least 6 character"  id="password" v-model="password">
                </div>
                <div class="px-2 py-3">
                    <button type="submit"  @click.prevent="submitForm" 
                    class="btn btn-success btn-lg">Submit</button>
                </div>
            
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name:'RegisterOrganization',
    data() {
      return {
        name: "",
        email: "",
        phone: "",
        address: "",
        username: "",
        password: ""
      };
    },
    methods: {
      submitForm() {
        // submit the form data to your backend API or perform other actions here
      }
    }
  };
  </script>
  
  <style>
 /* .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .card {
    width: 100%;
    max-width: 700px;
  }*/
  
  @media screen and (min-width: 992px) {
    .card {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  </style>
  