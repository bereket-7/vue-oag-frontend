<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-6">
        <img :src="require('@/assets/img/three.jpg')" class="img-fluid rounded" alt="Our Team">
      </div>
      <div class="col-md-6 my-4 my-md-0">
        <h1><b>About</b></h1>
        <p>Welcome to Kelem Online Art Gallery, an exquisite treasure trove where creativity, diversity, 
          and passion intertwine to bring you an exceptional array of artistic wonders. 
          Our mission is to champion the works of talented artists from around the world, 
          transcending geographical borders and uniting art enthusiasts through the digital landscape.</p>
        <p>Kelem Online Art Gallery is more than just a platform for buying and selling art - 
          it's a vibrant community for artists and art lovers alike. 
          Our goal is to serve as a dynamic, interactive space where artists have the opportunity to 
          showcase their work to a global audience, and art collectors and enthusiasts alike can discover, 
          experience, and ultimately acquire a piece of visual magic that speaks to their soul.
 </p>
        <router-link class="btn btn-primary mt-3" to="/contactUs">Get in Touch</router-link>
      </div>
    </div>
  </div>
  <footer-view/>
</template>

<script>
import FooterView from './FooterView.vue'
export default {
  components: { FooterView },
  name: 'AboutUs'
}
</script>

<style scoped>
   
   p {
  text-align: justify;
  font-weight: bold;
  font-family:Georgia, Times, 'Times New Roman', serif;
}
</style>