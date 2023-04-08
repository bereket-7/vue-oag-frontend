<template>
<div class="row row-cols-3 row-cols-md-2 g-4">
    <div class="col-md-3">
    <div class="card">
      <img src="" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Artwork name</h5>
        <p class="card-text">Artwork Category</p>
        <p class="card-text">price</p>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card">
      <img src="" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Artwork name</h5>
        <p class="card-text">Artwork Category</p>
        <p class="card-text">price</p>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card">
      <img src="" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Artwork name</h5>
        <p class="card-text">Artwork Category</p>
        <p class="card-text">price</p>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card">
      <img src="" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Artwork name</h5>
        <p class="card-text">Artwork Category</p>
        <p class="card-text">price</p>
      </div>
    </div>
  </div>
</div>
<div class="col-md-3 ps-3">
    <label for="priceRange" class="form-label">price range</label>
<input type="range" class="form-range" min="0" max="5" id="priceRange">

</div>

<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled">
      <a class="page-link">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">4</a></li>
    <li class="page-item"><a class="page-link" href="#">5</a></li>
    <li class="page-item"><a class="page-link" href="#">6</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
 
</template>

<script>
export default {
    name:'ArtworkList',
    setup() {
        
    },
}
</script>