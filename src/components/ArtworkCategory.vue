<template>
     <section id="artwork" class="p-5">
    <div class="container">
      <h2 class="text-center text-black">Categories</h2>
      <p class="lead text-center text-black mb-5">
        Main collections in our Gallery
      </p>
      <div class="row row-cols-1 row-cols-md-3 g-4">


        <div class="flip-box">
  <div class="flip-box-inner">
    <div class="flip-box-front">
      <img :src="require('@/assets/img/three.jpg')" alt="Paris" style="width:400px;height:300px">
    </div>
    <div class="flip-box-back">
      <h3 class="card-title mb-3">Paintings</h3>
              <p class="card-text">
                Paintings are artworks created by applying various mediums—pigments, oil paint, inks, watercolors,
              </p>
                <router-link class="btn btn-success" to="/artworks">See more</router-link>
    </div>
  </div>
</div>

<div class="flip-box">
  <div class="flip-box-inner">
    <div class="flip-box-front">
      <img :src="require('../assets/img/sidepre.jpg')" alt="Paris" style="width:400px;height:300px">
    </div>
    <div class="flip-box-back">
      <h3 class="card-title mb-3">Paintings</h3>
              <p class="card-text">
                Paintings are artworks created by applying various mediums—pigments, oil paint, inks, watercolors,
              </p><router-link class="btn btn-success" to="/artworks">See more</router-link>
    </div>
  </div>
</div>


<div class="flip-box">
  <div class="flip-box-inner">
    <div class="flip-box-front">
      <img :src="require('../assets/img/dog.jpg')" alt="Paris" style="width:400px;height:300px">
    </div>
    <div class="flip-box-back">
      <h3 class="card-title mb-3">Artistic</h3>
              <p class="card-text">
                Artistic painting is an expression of emotions, ideas, and experiences created with visual media.
              </p>
              <router-link class="btn btn-success" to="/artworks">See more</router-link>
    </div>
  </div>
</div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ArtworkCategory',
  }
</script>

<style scoped>

.card .bg-dark .text-light:hover {
			transition: transform 0.5s ease;
		}

		.card .bg-dark .text-light:hover{
			transform: scale(1.2);
		}


    .flip-box {
  background-color: transparent;
  width: 400px;
  height: 300px;
  border: 1px solid #f1f1f1;
  perspective: 1000px;
}

.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-box:hover .flip-box-inner {
  transform: rotateY(180deg);
}

.flip-box-front, .flip-box-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-box-front {
  background-color: #bbb;
  color: black;
}

.flip-box-back {
  background-color: black;
  color: white;
  transform: rotateY(180deg);
}


</style>