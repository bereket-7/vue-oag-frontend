<template>

    <div class="container" data-aos="fade-up">
      <br><br>
  
    <h2>Contact</h2>
  
  
  <div class="row gy-4">
  
    <div class="col-lg-6">
  
      <div class="row row-cols-2 row-cols-md-4 g-4">


     
       
      </div>
  
    </div>
  
    <div class="col-lg-6">
      <form action="forms/contact.php" method="post" class="php-email-form">
        <div class="row gy-4">
  
          <div class="col-md-6">
            <input type="text" name="name" class="form-control" placeholder="Your Name" required>
          </div>
  
          <div class="col-md-6 ">
            <input type="email" class="form-control" name="email" placeholder="Your Email" required>
          </div>
  
          <div class="col-md-12">
            <input type="text" class="form-control" name="subject" placeholder="Subject" required>
          </div>
  
          <div class="col-md-12">
            <textarea class="form-control" name="message" rows="6" placeholder="Message" required></textarea>
          </div>
  
          <div class="col-md-12 text-center">
            <div class="error-message"></div>
  
            <button type="submit" class="btn btn-success">Send Message</button>
          </div>
        </div>
      </form>
  
    </div>
  
  </div>
  
  </div>
  
  
  </template>
  <script>
      export default {
        name: 'ContactUs',
        components: {
          
        }
      }
  </script>