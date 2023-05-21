
<template>
  <div class="artwork-gallery">
    <div v-for="artwork in artworks" :key="artwork.id" class="artwork-card">
      <div class="artwork-image">
        <img :src="getArtworkImageUrl(artwork.id)" alt="Artwork Image" />
      </div>
      <div class="artwork-details">
        <h3>{{ artwork.artworkName }}</h3>
        <p>{{ artwork.artworkDescription }}</p>
        <p>Price: {{ artwork.price }}</p>
        <p>Size: {{ artwork.size }}</p>
        <p>Category: {{ artwork.artworkCategory }}</p>
        <a href="#" class="btn btn-primary quick-view" data-bs-toggle="modal" data-bs-target="#exampleModal">Quick View</a>
      </div>
    </div>
  </div>



  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Artwork Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-6">
            <img :src="getArtworkImageUrl(artwork.id)" style="width:410px;height:300px;"  alt="Artwork Image" />
          </div>
          <div class="col-md-6">
            <h5><b>Name{{ artwork.artworkName }}</b></h5>
            <hr class="mx-n3">
            <h5>Description{{ artwork.artworkDescription }}</h5>
            <h5>Price: {{ artwork.price }}</h5>
            <h5>Size: {{ artwork.size }}</h5>
            <h5>Category: {{ artwork.artworkCategory }}</h5>
            <button type="button" class="btn btn-danger">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      artworks: [],
    };
  },
  mounted() {
    this.fetchArtworks();
  },
  methods: {
    fetchArtworks() {
      axios.get('http://localhost:8081/artworks')
        .then(response => {
          this.artworks = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getArtworkImageUrl(artworkId) {
      return `http://localhost:8081/artworks/${artworkId}/image`;
    },
  },
};
</script>


<style scoped>
.artwork-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.artwork-card {
  width: 250px;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;
}

.artwork-card:hover {
  transform: scale(1.2);
}

.artwork-image {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.artwork-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.artwork-card:hover .artwork-image img {
  transform: scale(1.1);
}

.artwork-details {
  margin-top: 10px;
  text-align: center;
}

.artwork-details h3 {
  font-size: 18px;
  margin-bottom: 5px;
}

.artwork-details p {
  margin: 5px 0;
}

.quick-view {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: 20px;
			background-color: rgba(11, 61, 168, 0.8);
			border-radius: 10px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			display: none;
		}

    .artwork-card:hover .quick-view {
			display: block;
		}
@media screen and (max-width: 768px) {
  .artwork-card {
    width: 100%;
    margin: 10px 0;
  }
}
</style>