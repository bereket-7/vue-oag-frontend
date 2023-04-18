<template>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
        <img :src="require('../assets/img/abstract-landscape-bold.jpg')"   style= "width: 95%;
  height:350px;"
                alt="Hot Air Balloons">
    </div>
    <div class="carousel-item">
        <img :src="require('../assets/img/art-landscape.jpg')" style="width: 95%;
  height:350px;">
    </div>
    <div class="carousel-item">
        <img :src="require('../assets/img/colorful-landscape.jpg')" style="width: 95%;
  height:350px;">
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
// @ is an alias to /src
export default {
  name: 'CardSlider',
  components: {
  },
}
</script>