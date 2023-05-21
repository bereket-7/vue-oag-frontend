<template>
	<div class="container">
    <search-artwork/>
		<h1 class="text-center my-5">Artwork Collections</h1>
		<div class="row row-cols-1 row-cols-md-3 g-4">

			<div class="col">
				<div class="card">
          <img class="card-img-top" :src="require('@/assets/img/three.jpg')" style="width:410px;height:300px;" alt="">
					<div class="card-body">
            <h5 class="card-title">Artwork name</h5>
            <p class="card-text">Artwork Category</p>
            <p class="card-text">price</p>
						<a href="#" class="btn btn-primary quick-view" data-bs-toggle="modal" data-bs-target="#exampleModal">Quick View</a>
					</div>
				</div>
			</div>

			<div class="col">
				<div class="card">
					<img :src="require('@/assets/img/lion.jpg')" class="card-img-top" style="width:410px;height:300px;" alt="...">
					<div class="card-body">
            <h5 class="card-title">Artwork name</h5>
            <p class="card-text">Artwork Category</p>
            <p class="card-text">price</p>
						<a href="#" class="btn btn-primary quick-view" data-bs-toggle="modal" data-bs-target="#exampleModal">Quick View</a>
					</div>
				</div>
			</div>

			<div class="col">
				<div class="card">
					<img :src="require('@/assets/img/kesht.jpg')" style="width:410px;height:300px;" class="card-img-top" alt="...">
					<div class="card-body">
            <h5 class="card-title">Artwork name</h5>
            <p class="card-text">Artwork Category</p>
            <p class="card-text">price</p>
						<a href="#" class="btn btn-primary quick-view" data-bs-toggle="modal" data-bs-target="#exampleModal">Quick View</a>
					</div>
				</div>
			</div>

		</div>
    <br><br><br>


    <div class="row row-cols-1 row-cols-md-3 g-4">
			<div class="col">
				<div class="card">
          <img class="card-img-top" :src="require('@/assets/img/acry.jpg')" style="width:410px;height:300px;" alt="">
					<div class="card-body">
            <h5 class="card-title">Artwork name</h5>
            <p class="card-text">Artwork Category</p>
            <p class="card-text">price</p>
						<a href="#" class="btn btn-primary quick-view" data-bs-toggle="modal" data-bs-target="#exampleModal">Quick View</a>
					</div>
				</div>
			</div>

	<div v-for="artwork in artworks" :key="artwork.id" class="col">
      <div class="card">
		<img :src="artwork.artworkPhoto" style="width:410px;height:300px;" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{ artwork.artworkName }}</h5>
          <p class="card-text">{{ artwork.artworkCategory }}</p>
          <p class="card-text">{{ artwork.price }}</p>
          <a class="btn btn-primary quick-view" data-bs-toggle="modal" data-bs-target="#exampleModal">Quick View</a>
        </div>
      </div>
    </div>
    

			<div class="col">
				<div class="card">
					<img :src="require('@/assets/img/two.jpg')" class="card-img-top" style="width:410px;height:300px;" alt="...">
					<div class="card-body">
            <h5 class="card-title">Artwork name</h5>
            <p class="card-text">Artwork Category</p>
            <p class="card-text">price</p>
						<a href="#" class="btn btn-primary quick-view" data-bs-toggle="modal" data-bs-target="#exampleModal">Quick View</a>
					</div>
				</div>
			</div>

			<div class="col">
				<div class="card">
					<img :src="require('@/assets/img/pickock.jpg')" style="width:410px;height:300px;" class="card-img-top" alt="...">
					<div class="card-body">
            <h5 class="card-title">Artwork name</h5>
            <p class="card-text">Artwork Category</p>
            <p class="card-text">price</p>
						<a class="btn btn-primary quick-view" data-bs-toggle="modal" data-bs-target="#exampleModal">Quick View</a>
					</div>
				</div>
			</div>

		</div>
	</div>

<!-- Modal -->
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
            <img :src="require('@/assets/img/two.jpg')" style="width:410px;height:300px;" class="img-fluid" alt="...">
          </div>

          <div class="col-md-6">
            <h5><b>Name:</b></h5>
            <hr class="mx-n3">
            <h5>Category:</h5>
            <h5>Description:</h5>
            <h5>Price:</h5>
            <h5>size:</h5>
            <hr class="mx-n3">
            <button type="button" class="btn btn-danger">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<nav aria-label="Page navigation">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled">
      <a class="page-link">Previous</a>
    </li>
    <li class="page-item" ><a class="page-link" href="#">1</a></li>
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


<div class="artwork-list">
    <div v-for="event in events" :key="event.id" class="artwork-card">
      <div class="artwork-image-container">
        <img :src="getEventImageUrl(event.id)" alt="Artwork Image" class="artwork-image" />
      </div>
      <div class="artwork-details">
        <h1 class="event-name">{{ artwork.artworkName }}</h1>
        <p class="event-description">{{ artwork.artworkCategory }}</p>
        <p class="event-description">Price: {{ artwork.price }}</p>
        <p class="event-description">Size: {{ artwork.size }}</p>
        <p class="event-description">Decription: {{ artwork.artworkDescription }}</p>
      </div>
    </div>
  </div>

<footer-view/>
</template>


<script>
import FooterView from '@/components/FooterView.vue'
import SearchArtwork from '@/components/SearchArtwork.vue'
export default {
  components: { FooterView, SearchArtwork },
	name:'ArtworkList',
  data() {
    return {
      artworks: [],
    };
  },
  mounted() {
    this.fetchAllArtworks();
  },
  methods: {
    fetchAllArtworks() {
      fetch('http://localhost:8081/artworks', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch artworks');
          }
        })
        .then(data => {
          this.events = data;
          this.fetchArtworkImages();
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchArtworkImages() {
      this.artworks.forEach(artwork => {
        fetch(`http://localhost:8081/artworks/${artwork.id}/image`, {
          method: 'GET',
          headers: {
            Accept: 'image/png',
          },
        })
          .then(response => {
            if (response.ok) {
              return response.blob();
            } else {
              throw new Error(`Failed to fetch image for artwork ${artwork.id}`);
            }
          })
          .then(imageBlob => {
            artwork.imageUrl = URL.createObjectURL(imageBlob);
          })
          .catch(error => {
            console.error(error);
          });
      });
    },
    getEventImageUrl(artworkId) {
      const artwork = this.artworks.find(artwork => artwork.id === artworkId);
      return artwork ? artwork.imageUrl : null;
    },
  },
};
</script>








<style scoped>
		.card-img-top {
			transition: transform 0.5s ease;
		}

		.card:hover .card-img-top {
			transform: scale(1.2);
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

		.card:hover .quick-view {
			display: block;
		}
	</style>