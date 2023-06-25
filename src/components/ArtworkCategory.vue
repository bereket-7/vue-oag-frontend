<template>
  <div class="container">
    <h2 class="text-center text-black">Categories</h2>
    <p class="lead text-center text-black mb-5">Main categories in our Gallery</p>
    <div class="row justify-content-center">

      <div class="col-md-4">
        <div class="card shadow">
          <div class="inner">
            <img src="@/assets/img/two.jpg" class="card-img card-img-top" alt="Mixed Art">
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">Paintings</h5>
            <p class="card-text">Painting is a two-dimensional visual art form that involves applying pigments, colors.</p>
            <router-link class="btn-collection" to="/artworkList">View Collections</router-link>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow">
          <div class="inner">
            <img src="@/assets/img/three.jpg" class="card-img card-img-top" alt="Sculpture">
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">Sculpture</h5>
            <p class="card-text">Sculpture is a three-dimensional art form that involves shaping, constructing objects in various materials.</p>
            <router-link class="btn-collection" to="/artworkList">View Collections</router-link>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow">
          <div class="inner">
            <img src="@/assets/img/art.jpg" class="card-img card-img-top" alt="Mixed Art">
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">Mixed Art</h5>
            <p class="card-text">Mixed media refers to an art form that incorporates multiple materials into a single artwork.</p>
            <router-link class="btn-collection" to="/artworkList">View Collections</router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<style scoped>
.container {
  margin-top: 3%;
  margin-bottom: 3%;
}

.inner {
  overflow: hidden;
}

.inner img {
  transition: all 1.5s ease;
}

.inner:hover img {
  transform: scale(1.5);
}
h5{
  font-weight: bold;
}
.card-img {
  height: 300px;
  object-fit: cover;
}

@media screen and (max-width: 768px) {
  .col-md-4 {
    width: 100%;
  }
  .container {
  margin-top: 3%;
  margin-bottom: 3%;
}
  .card {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    margin-right: 2%;
    margin-left: 2%;
  }
}

@media screen and (max-width: 330px) {
  .card {
    width: 100%;
    height: auto;
    margin-right: 2%;
    margin-left: 2%;
    margin-bottom: 20px;
  }
}

.btn-collection {
  background-color: #04AA6D;
  color: white;
  padding: 10px 20px;
  border: none;
  text-decoration: none;
  transition: background-color 0.3s;
}

.btn-collection:hover {
  background-color: #057454;
}
</style>


<script>
export default{

}

</script>