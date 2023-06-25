<template>
  <div class="title">
      <h1>Categories</h1>
  <h3>Main Categories in Our Gallery</h3>
  </div>
  
  <div class="container-fluid">
      <div class="content">
      <!-- Card Slider 1 -->
      <div id="carouselExampleAutoplaying" class="carousel slide float-end" data-bs-ride="carousel" style="margin-top: 20px; width: 50%;">
<div class="carousel-inner">
  <div class="carousel-item active">
    <img :src="require('../assets/img/acry.jpg')" class="d-block w-100" alt="a" style="width: 100%; height: 400px;">
  </div>
  <div class="carousel-item">
    <img :src="require('../assets/img/art-landscape.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
  </div>
  <div class="carousel-item">
    <img :src="require('../assets/img/art.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
  </div>
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div> 
<div class="container" style="width:50%; margin-top: 100px;">
  <h3>Paintings</h3>
<p>Painting is a two-dimensional visual art form that involves applying pigments, colors</p>
<div class="button">
  <router-link class="btn btn-primary" to="">View Collection</router-link>
</div>
</div>
  </div>
  
<div class="content">
  <div class="container" style="width: 50%; margin-top:100px;">
<h3>Paintings</h3>
<p>Painting is a two-dimensional visual art form that involves applying pigments, colors</p>
<div class="button">
  <router-link class="btn btn-primary" to="">View Collection</router-link>
</div>
</div>

  <!-- Card Slider 2 -->
  <div id="carouselExampleAutoplaying" class="carousel slide float-start" data-bs-ride="carousel" style="margin-top: 20px; width: 50%;">
<div class="carousel-inner">
  <div class="carousel-item active">
    <img :src="require('../assets/img/background.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
  </div>
  <div class="carousel-item">
    <img :src="require('../assets/img/background4.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
  </div>
  <div class="carousel-item">
    <img :src="require('../assets/img/colorful-landscape.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
  </div>
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div> 
</div>


<div class="content">
  <!-- Card Slider 3 -->
  
  <div id="carouselExampleAutoplaying" class="carousel slide float-start" data-bs-ride="carousel" style="margin-top: 20px; width: 50%;">
<div class="carousel-inner">
  <div class="carousel-item active">
    <img :src="require('../assets/img/dog.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
  </div>
  <div class="carousel-item">
    <img :src="require('../assets/img/face.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
  </div>
  <div class="carousel-item">
    <img :src="require('../assets/img/girl4.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
  </div>
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div> 
<div class="container" style="width: 50%; margin-top:100px;">
<h3>Paintings</h3>
<p>Painting is a two-dimensional visual art form that involves applying pigments, colors</p>
<div class="button">
  <router-link class="btn btn-primary" to="">View Collection</router-link>
</div>

</div>

</div>
  </div>
  

</template>

<script>
export default {
name: 'CardSlider2',
components: {
},
methods: {
}
}
</script>

<style>
.content{
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
h3{
  text-align: center;
}
.container{
  margin-left: 40px;
}
.title{
  margin-top: 20px;
}
.title h1{
  text-align: center;
}
.button{
 text-align: center;
}

</style>