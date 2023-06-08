<template>
  <div class="container">
    <h2 class="text-center text-black">Categories</h2>
    <p class="lead text-center text-black mb-5">
        Main collections in our Gallery
      </p>
    <div class="row justify-content-center">
       <div class="col-md-4">
        <div class="card shadow" style="width: 23rem; height: 28rem;">
            <div class="inner">
                <img src="@/assets/img/abstract-landscape-bold.jpg" class="card-img-top" alt="Mixed Art">
            </div>
  <div class="card-body text-center">
    <h5 class="card-title">Paintings</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <router-link class="btn btn-success" to="">View Collections</router-link>
  </div>
</div>
        </div> 
       <div class="col-md-4">
        <div class="card shadow" style="width: 23rem; height: 28rem;">
            <div class="inner">
                <img src="@/assets/img/acry.jpg" class="card-img-top" alt="Sculpture">
            </div>
  <div class="card-body text-center">
    <h5 class="card-title">Sculpture</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <router-link class="btn btn-success" to="">View Collections</router-link>
  </div>
</div>
        </div> 
       <div class="col-md-4">
        <div class="card shadow" style="width: 23rem; height: 28rem;">
            <div class="inner">
                <img src="@/assets/img/art.jpg" class="card-img-top" alt="Mixed Art">
            </div>
  <div class="card-body text-center">
    <h5 class="card-title">Mixed Art</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <router-link class="btn btn-success" to="">View Collections</router-link>
  </div>
</div>
        </div>  
    </div>
    </div>  
</template>

<script>
export default{


}

</script>

<style scoped>
.container{
    margin-top: 3%;
} 
.inner{
    overflow: hidden;
}
.inner img{
  transition: all 1.5s ease;  
}

.inner:hover img{
    transform: scale(1.5) ;
}

</style>