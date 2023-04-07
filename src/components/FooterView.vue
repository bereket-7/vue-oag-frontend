<template>
  <footer class="p-5 bg-dark text-white text-center position-relative">
     <div class="container">
       <p class="lead">Copyright &copy; 2023 Sheba Online Art Gallery</p>

       <a href="#" class="position-absolute bottom-0 end-0 p-5">
         <i class="bi bi-arrow-up-circle h1"></i>
       </a>
     </div>

<!-- HTML code -->
<div class="footer-icons">
  <a href="https://www.facebook.com/" target="blank" class="social-icon" data-target="facebook"><i class="fa-brands fa-facebook" style="color:azure"></i></a>
  <a href="#" class="social-icon" data-target="twitter" ><i class="fa-brands fa-twitter"></i></a>
  <a href="#" class="social-icon" data-target="instagram" style="color:crimson"><i class="fa-brands fa-instagram"></i></a>
  <a href="#" class="social-icon" data-target="telegram" style="color:crimson"><i class="fa-brands fa-telegram"></i></a>
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

/* CSS styling */
.footer-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.social-icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;

  text-align: center;
  line-height: 40px;
  font-size: 20px;
  transition: background-color 0.3s ease;
}

.social-icon:hover {
  background-color: #333;
  cursor: pointer;
}

  </style>