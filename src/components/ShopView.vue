<template>
    <div class="container my-5">
      <div class="row">
        <div class="col-md-12">
          <div class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="row">
                  <div class="col-md-2 col-sm-12" v-for="(artwork, index) in displayedArtworks" :key="index">
                    <img :src="artwork.image" alt="artwork.title" class="img-fluid" />
                  </div>
                </div>
              </div>
              <div class="carousel-item" v-for="(artworkGroup, index) in artworkGroups" :key="index">
                <div class="row">
                  <div class="col-md-2 col-sm-12" v-for="(artwork, index) in artworkGroup" :key="index">
                    <img :src="artwork.image" alt="artwork.title" class="img-fluid" />
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
  import artworks from "@/assets/artworks.json";
  
  export default {
    name: "ArtworkCarousel",
    data() {
      return {
        artworks: artworks,
        displayedArtworks: [],
        artworkGroups: [],
        groupSize: 5,
        currentIndex: 0,
        sliding: true,
      };
    },
    mounted() {
      this.displayedArtworks = this.artworks.slice(0, this.groupSize);
      this.artworkGroups = this.chunkArray(this.artworks.slice(this.groupSize), this.groupSize);
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
    },
  };
  </script>
  
  <style scoped>
  .carousel-inner {
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  
  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 50%;
    z-index: 5;
    display: inline-block;
  }
  
  .carousel-control-prev {

  }
</style>  