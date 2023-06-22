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
                <form>
    <label for="Email">Email</label>
    <input type="text" id="Email" name="firstname" placeholder="Your Email">

    <label for="message">Message</label>
    <textarea id="message" name="subject" placeholder="Write something.." style="height:200px"></textarea>

    <input type="submit" value="Send">

  </form>          
    </div>
    </div>
    </div>
    </div>
    <FooterView/>
  
</template>

<script>
import FooterView from '@/components/FooterView.vue';
export default{
name:{

},
components:{
    FooterView
}
}
</script>


<style scoped>
input[type=text],textarea {
  width: 100%; 
  padding: 12px; 
  border: 1px solid #ccc; 
  border-radius: 4px; 
  box-sizing: border-box; 
  margin-top: 6px; 
  margin-bottom: 16px; 
  resize: vertical
}
input[type=submit] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
input[type=submit]:hover {
  background-color: #45a049;
}
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
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
.myaccount{
  background-color:rgb(65, 74, 48) ;
  color: white;
}
</style>