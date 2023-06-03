<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <img :src="artwork.image" alt="Artwork Image" style="width:400px;height:300px;">
      </div>
      <div class="col-md-8">
        <h3 class="title">{{ artwork.title }}</h3>
        <p>By: <span class="artist"> {{ artwork.artist }}</span></p>
        <div class="category">Category: {{ artwork.category }}</div>
        <div class="rating">
          <span v-for="i in 5" :key="i" :class="{ 'filled-star': i <= artwork.rating }">&#9733;</span>
        </div>
        <p class="price">{{ artwork.price }}</p>
        <hr class="mx-n3">
        <button type="button" id="cart" class="btn btn-danger">Add to Cart</button>
        <button type="button" id="cart" class="btn btn-success">Back to Shopping</button>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name:'ArtworkDetail',
  data() {
    return {
      artwork: {
        title: 'Abstract Child Face',
        artist: 'Bereket',
        description: 'This is an example artwork description.',
        rating: 3,
        price: '10000 ETB',
        category: 'water color painting',
        image: require('../assets/img/eye.jpg'),
      }
    }
  }
}
</script>

<style scoped>

.button{
  margin-top: 10px;
}
.artwork-details {
  display: flex;
  align-items: center;
}
.artwork-image {
  cursor: pointer;
  margin-right: 1rem;
}
.artwork-image:hover{
  transform: translateY(-7px);
}
.artwork-info {
  display: none;
}
.filled-star {
  color: gold;
  cursor: pointer;
  transition: color .2s ease-out;
}
.price {
  font-weight: bold;
  font-size: 1.3rem;
}
#cart {
  display: block;
  margin: 10px auto;
}
#cart:hover {
  background-color: rgb(196, 33, 4);
}
.artist {
  font-weight: bold;
  font-size: 1.2rem;
}

@media only screen and (max-width: 768px) {
  img {
    width: 80%;
  }
}

</style>