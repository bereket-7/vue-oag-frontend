<template>
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2000" style="margin-top: 85px;">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
          <img :src="require('../assets/img/slide1.jpg')" class="overlay-image" alt="Hot Air Balloons" style="width: 100%; height: 450px; opacity: 1;">
        <div class="carousel-caption d-none d-md-block firstSlide">
        <h1 style="font-size: 100px;">KELEM</h1>
        <h3 style="font-size: 50px;" >ONLINE ART GALLERY</h3>
        <router-link to="/register" class="btn btn-outline-light">JOIN OUR COMMUNITY</router-link>
      </div>
      </div>
      <div class="carousel-item">
        <img :src="require('../assets/img/slide2.jpg')" style="width: 100%; height: 450px; opacity: 1;">
        <div class="carousel-caption d-none d-md-block">
          <div class="card" style="width: 20rem;">
  <div class="card-body">
    <h4 class="card-title">Kelem Online Art Gallery</h4>
    <p class="card-text">An online art gallery, where pixels become masterpieces.</p>
    <router-link class="btn btn-outline-light" to="/artworkList">SHOP NOW</router-link>
  </div>
</div>
        
      </div>
      </div>
      <div class="carousel-item">
        <img :src="require('../assets/img/slide3.jpg')" style="width: 100%; height: 450px; opacity: 1;">
        <div class="carousel-caption d-none d-md-block">
      </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>


<script>
export default {
  name: 'CardSlider',
  components: {
  },
  methods: {
  }
}
</script>

<style>
.carousel-caption{
  margin-bottom: 100px;
}
.firstSlide h1{
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.card{
  margin-left: 650px;
  background-color:#1c1c1c ;
}
</style>