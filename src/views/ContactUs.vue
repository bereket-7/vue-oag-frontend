<template>
  <div class="container" data-aos="fade-up">
    <br><br>
    <h2>Contact Us</h2>
    <div class="row gy-4">
      <div class="col-lg-6">
        <form action="forms/contact.php" method="post" class="php-email-form">
          <div class="row gy-4">
            <div class="col-md-6">
              <input type="text" name="name" class="form-control" placeholder="Your Name" required>
            </div>
            <div class="col-md-6">
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
              <button type="submit" class="btn btn-primary">Send Message</button>
            </div>
          </div>
        </form>
      </div>


<div class="col-lg-6">
  <div class="row">
    <div class="col-md-6">
      <div class="contact-info">
        <i class="fas fa-phone fa-3x" style="color:#2F7633"></i>
        <h4>Phone Number</h4>
        <p>+251943578915</p>
        <p>+251942085855</p>
      </div>
    </div>
    <div class="col-md-6">
      <div class="contact-info">
        <i class="fas fa-map-marker-alt fa-3x" style="color:#020202"></i>
        <h4>Address</h4>
        <p>Adama science and technology University(ASTU), Adama, Ethiopia</p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <div class="contact-info">
        <i class="fas fa-envelope fa-3x" style="color:#9C1E1E"></i>
        <h4>Email</h4>
        <p>kelem.oag.app@gmail.com</p>
      </div>
    </div>
    <div class="col-md-6">
      <div class="contact-info">
        <i class="fab fa-facebook-f fa-3x" style="color:#1759A6"></i>
        <h4>Follow Us</h4>
        <div class="social-links">
          <a href="#"><i class="fab fa-facebook-f fa-lg" style="color:#1759A6"></i></a>
          <a href="#"><i class="fab fa-twitter fa-lg" style="color:#2E88D7"></i></a>
          <a href="#"><i class="fab fa-instagram fa-lg" style="color:#F05523"></i></a>
        </div>
      </div>
    </div>
  </div>
</div>


    </div>
  </div>
  <footer-view/>
</template>

<script>
import FooterView from "@/components/FooterView.vue"
export default {
  name: 'ContactUs',
  components: {
    FooterView
  }
}
</script>

<style scoped>
.container {
  margin-top: 120px;
  margin-bottom: 30px;
}

.contact-info {
  text-align: center;
}

.contact-info i {
  font-size: 3rem;
  color: #333;
  margin-bottom: 10px;
  transition: color 0.3s ease-in-out;
}

.contact-info h4 {
  font-size: 18px;
  margin-bottom: 5px;
}

.contact-info p {
  margin-bottom: 20px;
}

.contact-info i.fa-phone {
  color: #FF0000;
}

.contact-info i.fa-map-marker-alt .fa-3x {
  color: #00FF00; 
}

.contact-info i.fa-envelope {
  color: #0000FF;
}

.contact-info i.fa-facebook-f {
  color: #FF00FF;
}

.contact-info i:hover {
  color: #FFA500; 
}
.social-links a {
  display: inline-block;
  margin-right: 10px;
  font-size: 20px;
  color: #333;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  transition: background-color 0.3s ease-in-out;
}
.social-links a i {
  font-size: 3rem;
  color: #333; 
  transition: color 0.3s ease-in-out;
}

.social-links a:hover i {
  color: #FF0000;
}

</style>