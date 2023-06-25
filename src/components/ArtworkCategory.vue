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
    <img :src="require('../assets/img/painting1.jpg')" class="d-block w-100" alt="a" style="width: 100%; height: 400px;">
  </div>
  <div class="carousel-item">
    <img :src="require('../assets/img/painting2.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
  </div>
  <div class="carousel-item">
    <img :src="require('../assets/img/painting3.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
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
<div class="container" style="width:50%; margin-top: 80px; margin-right:20px">
  <h1>PAINTINGS</h1>
<p>Paintings are artworks created using various painting techniques and mediums, such as oil, acrylic, watercolor, or mixed media. Paintings are typically created on surfaces such as canvas, wood, paper, or even walls. Artists use brushes, palette knives, or other tools to apply pigmented colors onto the chosen surface, creating compositions that depict subjects ranging from landscapes and portraits to abstract forms and conceptual ideas.</p>
<div class="button">
  <router-link class="btn btn-primary" to="/artworkList">VIEW COLLECTION</router-link>
</div>
</div>
  </div>
  
<div class="content">
  <div class="container" style="width: 50%; margin-top:80px; margin-right:20px">
<h1>SCULPTURE</h1>
<p>Sculpture is the art of creating three-dimensional objects by shaping and manipulating various materials. Sculptors use techniques such as carving, modeling, casting, and assembling to bring their artistic visions to life. Sculptures can be made from materials like stone, wood, metal, clay, and even found objects.</p>
<div class="button">
  <router-link class="btn btn-primary" to="/artworkList">VIEW COLLECTION</router-link>
</div>
</div>

  <!-- Card Slider 2 -->
  <div id="carouselExampleAutoplaying" class="carousel slide float-start" data-bs-ride="carousel" style="margin-top: 20px; width: 50%;">
<div class="carousel-inner">
  <div class="carousel-item active">
    <img :src="require('../assets/img/sculpture1.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
  </div>
  <div class="carousel-item">
    <img :src="require('../assets/img/sculpture2.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
  </div>
  <div class="carousel-item">
    <img :src="require('../assets/img/sculpture3.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
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
    <img :src="require('../assets/img/mixedmedia1.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
  </div>
  <div class="carousel-item">
    <img :src="require('../assets/img/mixedmedia2.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
  </div>
  <div class="carousel-item">
    <img :src="require('../assets/img/mixedmedia3.jpg')" class="d-block w-100" alt="..." style="width: 100%; height: 400px;">
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
<div class="container" style="width: 50%; margin-top:80px; margin-right:20px">
<h1>MIXED ART</h1>
<p>Mixed media is an art form that involves the combination of different materials and techniques to create a single artwork. Artists working with mixed media explore the integration of various elements such as paint, collage, photography, found objects, textiles, and digital media.</p>
<div class="button">
  <router-link class="btn btn-primary" to="/artworkList">VIEW COLLECTION</router-link>
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
.container h3,p{
  font-family:sans-serif;
  font-size:larger;
}
.container h1{
  text-align: center;
}
.container btn{
  font-family:sans-serif;
  font-size:larger;
}
.button .btn:hover{
background-color:white;
color: black;
}

</style>