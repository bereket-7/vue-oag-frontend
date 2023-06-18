<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-12">
        <div class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row">
                <div class="col-md-2 col-sm-12" v-for="(artwork, index) in displayedArtworks" :key="index">
                  <div class="artwork-card">
                    <img :src="getImageUrl(artwork.id)" :alt="artwork.title" class="img-fluid" />
                    <div class="artwork-details">
                      <h3>{{ artwork.title }}</h3>
                      <p>{{ artwork.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item" v-for="(artworkGroup, index) in artworkGroups" :key="index">
              <div class="row">
                <div class="col-md-2 col-sm-12" v-for="(artwork, index) in artworkGroup" :key="index">
                  <div class="artwork-card">
                    <img :src="getImageUrl(artwork.id)" :alt="artwork.title" class="img-fluid" />
                    <div class="artwork-details">
                      <h3>{{ artwork.title }}</h3>
                      <p>{{ artwork.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target=".carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target=".carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
  import axios from 'axios';

export default {
  name: "ArtworkCarousel",
  data() {
    return {
      artworks: [],
      displayedArtworks: [],
      artworkGroups: [],
      groupSize: 5,
      currentIndex: 0,
      sliding: true,
    };
  },
  mounted() {
    axios.get('http://localhost:8082/artworks')
      .then(response => {
        this.artworks = response.data;
        this.displayedArtworks = this.artworks.slice(0, this.groupSize);
        this.artworkGroups = this.chunkArray(this.artworks.slice(this.groupSize), this.groupSize);
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });

    setInterval(() => {
      this.next();
    }, 5000);
  },
  methods: {
    next() {
      if (this.currentIndex < this.artworkGroups.length) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.displayedArtworks = this.artworkGroups[this.currentIndex];
      this.sliding = true;
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.artworkGroups.length;
      }
      this.displayedArtworks = this.artworkGroups[this.currentIndex];
      this.sliding = true;
    },
    chunkArray(array, size) {
      return array.reduce((acc, _, i) => (i % size ? acc : [...acc, array.slice(i, i + size)]), []);
    },
    getImageUrl(artworkId) {
      return `http://localhost:8082/artworks/${artworkId}/image`;
    },
  },
};
  </script>

<style scoped>
.carousel-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.carousel-item {
  display: flex;
  justify-content: center;
}

.artwork-card {
  position: relative;
  width: 100%;
  text-align: center;
  margin: 10px;
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: transform 0.3s ease;
}

.artwork-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.artwork-card img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.artwork-details {
  margin-top: 10px;
}

@media (max-width: 576px) {
  .carousel-inner {
    flex-direction: column;
  }
  
  .carousel-item {
    align-items: center;
  }
  
  .artwork-card {
    width: 80%;
  }
}
</style> 