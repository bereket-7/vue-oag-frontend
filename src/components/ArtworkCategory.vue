<template>
     <section id="artwork" class="p-5">
    <div class="container">
      <h2 class="text-center text-black">Categories</h2>
      <p class="lead text-center text-black mb-5">
        Artists in our Website , all are creative and exprienced
      </p>
      <div class="row text-center g-4">

        <div class="col-md">
          <div class="card bg-dark text-light">
            <div class="card-body text-center">
              <div class="h1 mb-3">
                <img class="img-fluid w-40 d-none d-sm-block" :src="require('../assets/img/face.jpg')" style="width:400px;height:300px;overflow:hidden;" alt="">
              </div>
              <h3 class="card-title mb-3">Paintings</h3>
              <p class="card-text">
                Paintings are artworks created by applying various mediums—pigments, oil paint, inks, watercolors,
              </p>
                <router-link class="btn btn-success" to="/artworks">See more</router-link>
            </div>
          </div>
        </div>

        <div class="col-md">
          <div class="card bg-dark text-light">
            <div class="card-body text-center">
              <div class="h1 mb-3">
                <img class="img-fluid w-40 d-none d-sm-block" :src="require('../assets/img/imana.jpg')" style="width:400px;height:300px;overflow:hidden;" alt="">
                <!--<i class="bi bi-person-square"></i>-->
              </div>
              <h3 class="card-title mb-3">Cultural</h3>
              <p class="card-text">
                Cultural paintings are artwork that depict the culture of a particular time or place.
              </p>
              <router-link class="btn btn-success" to="/artworks">See more</router-link>
            </div>
          </div>
        </div>

        <div class="col-md">
          <div class="card bg-dark text-light">
            <div class="card-body text-center">
              <div class="h1 mb-3">
                <img class="img-fluid w-40 d-none d-sm-block" :src="require('../assets/img/body-painting.jpg')"
                style="width:400px;height:300px;overflow:hidden;" alt="">
                <!--<i class="bi bi-people"></i>-->
              </div>
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

</style>