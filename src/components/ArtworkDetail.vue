<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <img :src="artwork.image" alt="Artwork Image">
      </div>
      <div class="col-md-8">
        <h3 class="title">{{ artwork.title }}</h3>
        <p>By: <span class="artist"> {{ artwork.artist }}</span></p>
        <div class="category">Category: {{ artwork.category }}</div>
        <div class="rating">
          <span v-for="i in 5" :key="i" :class="{ 'filled-star': i <= artwork.rating }">&#9733;</span>
        </div>
        <p class="price">{{ artwork.price }}</p>
      </div>
    </div>
    <button type="button" id="cart" class="btn btn-danger">Add to Cart</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      artwork: {
        title: 'Abstract Child Face',
        artist: 'Bereket',
        description: 'This is an example artwork description.',
        rating: 4,
        price: '10000 ETB',
        category: 'water color painting',
        image: require('../assets/img/face.jpg'),
      }
    }
  }
}
</script>

<style scoped>
.artwork-details {
  display: flex;
  align-items: center;
}
.artwork-image {
  cursor: pointer;
  margin-right: 1rem;
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
  margin: 0 auto;
}
#cart:hover {
  background-color: green;
}
.artist {
  font-weight: bold;
  font-size: 1.2rem;
}

</style>