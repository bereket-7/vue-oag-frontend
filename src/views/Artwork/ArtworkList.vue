<template>
    <search-artwork/>
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