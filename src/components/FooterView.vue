<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><router-link to="/" >Home</router-link></li>
            <li><router-link to="/about" >About</router-link></li>
            <li><router-link to="/contactUs" >Contact Us</router-link></li>
            <li><router-link to="/register" >Sign Up</router-link></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Categories</h4>
          <ul>
            <li><router-link to="" >Ethiopian Cultural</router-link></li>
            <li><router-link to="" >Acyclic</router-link></li>
            <li><router-link to="" >Abstract</router-link></li>
            <li><router-link to="" >Oil</router-link></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Others</h4>
          <ul>
            <li><router-link to="/FAQs">FAQs</router-link></li>
            <li><router-link to="/standards">Privacy Policy</router-link></li>
            <li><router-link to="/standards">Terms and Conditions</router-link></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Follow us</h4>
          <div class="social-links">
            <router-link to="" ><i class="fab fa-facebook-f"></i></router-link>
            <router-link to="" ><i class="fab fa-twitter"></i></router-link>
            <router-link to="" ><i class="fab fa-instagram"></i></router-link>
            <router-link to="" ><i class="fab fa-linkedin-in"></i></router-link>
          </div>
        </div>
      </div>
    </div>

  </footer>
</template>
  <script>
  export default {
    name: 'FooterView',

function() {
  ('.social-icon').click(function() {
    var target = (this).data('target');
    window.open('https://' + target + '.com', '_blank');
  });
}
}
</script>

    

<style scoped>

body{
	line-height: 1.5;
	font-family: 'Poppins', sans-serif;
}
*{
	margin:0;
	padding:0;
	box-sizing: border-box;
}
.container{
	max-width: 1170px;
	margin:auto;
}
.row{
	display: flex;
	flex-wrap: wrap;
}
ul{
	list-style: none;
}
.footer{
	background-color: #24262b;
    padding: 50px 0;
}
.footer-col{
   width: 25%;
   padding: 0 15px;
}
.footer-col h4{
	font-size: 18px;
	color: #ffffff;
	text-transform: capitalize;
	margin-bottom: 35px;
	font-weight: 500;
	position: relative;
}
.footer-col h4::before{
	content: '';
	position: absolute;
	left:0;
	bottom: -10px;
	background-color: #e91e63;
	height: 2px;
	box-sizing: border-box;
	width: 50px;
}
.footer-col ul li:not(:last-child){
	margin-bottom: 10px;
}
.footer-col ul li a{
	font-size: 16px;
	text-transform: capitalize;
	color: #ffffff;
	text-decoration: none;
	font-weight: 300;
	color: #bbbbbb;
	display: block;
	transition: all 0.3s ease;
}
.footer-col ul li a:hover{
	color: #ffffff;
	padding-left: 8px;
}
.footer-col .social-links a{
	display: inline-block;
	height: 40px;
	width: 40px;
	background-color: rgba(255,255,255,0.2);
	margin:0 10px 10px 0;
	text-align: center;
	line-height: 40px;
	border-radius: 50%;
	color: #ffffff;
	transition: all 0.5s ease;
}
.footer-col .social-links a:hover{
	color: #24262b;
	background-color: #ffffff;
}

@media(max-width: 767px){
  .footer-col{
    width: 50%;
    margin-bottom: 30px;
}
}
@media(max-width: 574px){
  .footer-col{
    width: 100%;
}
}
  </style>