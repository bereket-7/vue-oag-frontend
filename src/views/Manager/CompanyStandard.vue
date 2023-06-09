<template>
    <div class="container">
      <button onclick="document.getElementById('id01').style.display='block'">Add Standard</button>
  
      <div id="id01" class="modal">
        <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal"><i class="fa-solid fa-xmark"></i></span>
        <form class="modal-content" action="/action_page.php">
          <div class="container">
            <h1 style="margin-top: 20px;">Add Standard</h1>
            <p>Please enter company standards here </p>
            <hr>
            <label for="standardDescription"><b>Standard description</b></label>
            <div class="input-group flex-nowrap py-3">
              <textarea type="text" class="form-control form-control-lg" id="standardDescription" rows="3" v-model="standardDescription" required></textarea>
            </div>
  
            <div>
              <label for="standardType"><b>Standard Type</b></label>
              <select class="form-select" id="standardType" v-model="standardType" required>
                <option value="organizational" selected>Organizational</option>
                <option value="artwork">Artwork</option>
                <option value="customer">Customer</option>
              </select>
            </div>
  
            <p style="margin-top: 60px;">This will be displayed in the company list of <a href="#" style="color:dodgerblue">policy & standards.</a></p>
  
            <div class="clearfix">
              <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn" style="float: left;">Cancel</button>
              <button type="submit" class="signup" @click.prevent="saveStandard()" style="float: right;">Submit</button>
            </div>
          </div>
        </form>
      </div>
      <footer-view/>
    </div>
  </template>
  
  

<style scoped>


* {box-sizing: border-box}
  input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}


button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 15%;
  opacity: 0.9;
}

button:hover {
  opacity:1;
}

.cancelbtn {
  /* padding: 14px 20px; */
  background-color: #f44336;
}

.cancelbtn, .signupbtn {
  float: left;
  width: 20%;
}

.container {
  padding: 16px;
  margin-top: 120px;
}

.modal {
  display: none; 
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%;
  overflow: auto; 
  background-color: #474e5d;
  padding-top: 100px;
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; 
  border: 1px solid #888;
  width: 80%; 
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}

.close:hover,
.close:focus {
  color: #f44336;
  cursor: pointer;
}


.clearfix::after {
  content: "";
  clear: both;
  display: table;
}


@media screen and (max-width: 300px) {
  .cancelbtn, .signupbtn {
    width: 100%;
  }
}

</style>



<script>
import FooterView from "@/components/FooterView.vue"
import axios from 'axios';


var modal = document.getElementById('id01');


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

export default {
  components: {
    FooterView
  },
  data() {
    return {
      standardDescription: '',
      standardType: '',
    };
  },
  methods: {
    async saveStandard() {
      try {
        const response = await axios.post('http://localhost:8081/standard/add', {
          standardDescription: this.standardDescription,
          standardType: this.standardType,
        });
          console.log(response);
          this.standardDescription= '';
          this.standardType= '';
          alert('Standard uploaded successfully!');
      }
      catch (error) {
        console.error(error);
          alert('error occured while uploading!');
      }
    },
  },
};
</Script>