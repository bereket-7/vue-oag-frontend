<template>
  <section class="categories-section">
    <div class="section-header">
      <h2 class="section-title">Explore Collections</h2>
      <p class="section-subtitle">Discover art across diverse mediums and styles</p>
    </div>

    <div class="categories-grid">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <div class="category-image-wrapper">
          <img :src="category.image" :alt="category.name" class="category-image" />
          <div class="category-overlay">
            <h3 class="category-name">{{ category.name }}</h3>
            <p class="category-description">{{ category.description }}</p>
            <router-link to="/artworkList" class="category-btn">View Collection</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    id: 1,
    name: 'Paintings',
    description: 'Contemporary and classical paintings from talented artists',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800'
  },
  {
    id: 2,
    name: 'Sculptures',
    description: 'Three-dimensional artworks in various materials and forms',
    image: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800'
  },
  {
    id: 3,
    name: 'Mixed Media',
    description: 'Innovative pieces combining multiple artistic techniques',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800'
  }
];
</script>

<style scoped>
.categories-section {
  padding: 80px 20px;
  background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 15px;
}

.section-subtitle {
  font-size: 1.3rem;
  color: #666;
  font-weight: 300;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.category-card {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
}

.category-image-wrapper {
  position: relative;
  height: 450px;
  overflow: hidden;
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.category-card:hover .category-image {
  transform: scale(1.1);
}

.category-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 70%, transparent 100%);
  padding: 40px 30px;
  color: white;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.category-name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.category-description {
  font-size: 1rem;
  margin-bottom: 20px;
  opacity: 0.9;
  line-height: 1.6;
}

.category-btn {
  display: inline-block;
  padding: 12px 30px;
  background: white;
  color: #000;
  text-decoration: none;
  font-weight: 600;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.category-btn:hover {
  background: #000;
  color: white;
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .category-image-wrapper {
    height: 350px;
  }
}
</style>