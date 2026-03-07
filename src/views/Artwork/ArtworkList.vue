<template>
  <div class="artwork-gallery-section">
    <div class="gallery-header">
      <h2 class="gallery-title">Featured Artworks</h2>
      <p class="gallery-subtitle">Handpicked masterpieces from our collection</p>
    </div>

    <div class="artwork-grid">
      <div v-for="artwork in artworks" :key="artwork.id" class="artwork-card">
        <div class="artwork-image-container">
          <img :src="artwork.imageUrl" :alt="artwork.artworkName" class="artwork-img" />
          <div class="artwork-overlay">
            <button class="icon-btn wishlist-btn" @click="addToWishlist(artwork)">
              <i class="fas fa-heart"></i>
            </button>
            <button class="quick-view-btn" @click="openModal(artwork)">
              <i class="fas fa-eye"></i> Quick View
            </button>
          </div>
        </div>
        <div class="artwork-info">
          <h3 class="artwork-name">{{ artwork.artworkName }}</h3>
          <p class="artwork-category">{{ artwork.artworkCategory }}</p>
          <div class="artwork-footer">
            <span class="artwork-price">{{ artwork.price }}</span>
            <div class="artwork-rating">
              <i class="fas fa-star"></i>
              <span>{{ artwork.averageRating }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="selectedArtwork" class="modal-backdrop" @click="closeModal">
      <div class="modal-card" @click.stop>
        <button class="modal-close" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-content-grid">
          <div class="modal-image">
            <img :src="selectedArtwork.imageUrl" :alt="selectedArtwork.artworkName" />
          </div>
          <div class="modal-details">
            <h2>{{ selectedArtwork.artworkName }}</h2>
            <p class="modal-category">{{ selectedArtwork.artworkCategory }}</p>
            <p class="modal-description">{{ selectedArtwork.artworkDescription }}</p>
            <div class="modal-specs">
              <div class="spec-item">
                <i class="fas fa-ruler-combined"></i>
                <span>{{ selectedArtwork.size }}</span>
              </div>
              <div class="spec-item">
                <i class="fas fa-star"></i>
                <span>{{ selectedArtwork.averageRating }} Rating</span>
              </div>
            </div>
            <div class="modal-price">{{ selectedArtwork.price }}</div>
            <button class="add-to-cart-btn">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useArtworkStore } from '@/stores/artwork';

const artworkStore = useArtworkStore();
const artworks = ref([]);
const selectedArtwork = ref(null);

onMounted(async () => {
  artworks.value = await artworkStore.fetchArtworks();
});

const openModal = (artwork) => {
  selectedArtwork.value = artwork;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedArtwork.value = null;
  document.body.style.overflow = 'auto';
};

const addToWishlist = (artwork) => {
  console.log('Added to wishlist:', artwork.artworkName);
  alert(`${artwork.artworkName} added to wishlist!`);
};
</script>

<style scoped>
.artwork-gallery-section {
  padding: 80px 20px;
  background: #ffffff;
}

.gallery-header {
  text-align: center;
  margin-bottom: 60px;
}

.gallery-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 15px;
}

.gallery-subtitle {
  font-size: 1.3rem;
  color: #666;
  font-weight: 300;
}

.artwork-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 35px;
  max-width: 1400px;
  margin: 0 auto;
}

.artwork-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.artwork-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.artwork-image-container {
  position: relative;
  height: 320px;
  overflow: hidden;
  background: #f5f5f5;
}

.artwork-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.artwork-card:hover .artwork-img {
  transform: scale(1.08);
}

.artwork-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.artwork-card:hover .artwork-overlay {
  opacity: 1;
}

.icon-btn {
  background: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wishlist-btn {
  color: #e74c3c;
}

.wishlist-btn:hover {
  background: #e74c3c;
  color: white;
  transform: scale(1.1);
}

.quick-view-btn {
  background: white;
  color: #000;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.quick-view-btn:hover {
  background: #000;
  color: white;
  transform: translateY(-2px);
}

.artwork-info {
  padding: 20px;
}

.artwork-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.artwork-category {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 15px;
}

.artwork-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.artwork-price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
}

.artwork-rating {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #f39c12;
  font-weight: 600;
}

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.modal-card {
  background: white;
  border-radius: 20px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 10;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: #000;
  color: white;
  transform: rotate(90deg);
}

.modal-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.modal-details h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #1a1a1a;
}

.modal-category {
  color: #888;
  font-size: 1rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.modal-description {
  color: #555;
  line-height: 1.8;
  margin-bottom: 25px;
}

.modal-specs {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.spec-item i {
  color: #3498db;
}

.modal-price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 25px;
}

.add-to-cart-btn {
  width: 100%;
  padding: 15px;
  background: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .artwork-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content-grid {
    grid-template-columns: 1fr;
    padding: 20px;
  }
  
  .gallery-title {
    font-size: 2rem;
  }
}
</style>