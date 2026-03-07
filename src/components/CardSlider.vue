<template>
  <div class="hero-slider">
    <div class="hero-slide active" :style="{ backgroundImage: `url(${slides[currentSlide].image})` }">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">{{ slides[currentSlide].title }}</h1>
        <p class="hero-subtitle">{{ slides[currentSlide].subtitle }}</p>
        <router-link :to="slides[currentSlide].link" class="hero-btn">{{ slides[currentSlide].btnText }}</router-link>
      </div>
    </div>
    <div class="slider-controls">
      <button @click="prevSlide" class="slider-btn prev"><i class="fas fa-chevron-left"></i></button>
      <button @click="nextSlide" class="slider-btn next"><i class="fas fa-chevron-right"></i></button>
    </div>
    <div class="slider-dots">
      <span v-for="(slide, index) in slides" :key="index" 
            :class="['dot', { active: currentSlide === index }]"
            @click="goToSlide(index)"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentSlide = ref(0);
let autoplayInterval = null;

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600',
    title: 'Discover Extraordinary Art',
    subtitle: 'Curated collection of contemporary masterpieces',
    link: '/artworkList',
    btnText: 'Explore Gallery'
  },
  {
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1600',
    title: 'Where Art Meets Passion',
    subtitle: 'Connect with artists and collectors worldwide',
    link: '/register',
    btnText: 'Join Community'
  },
  {
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600',
    title: 'Elevate Your Space',
    subtitle: 'Find the perfect piece for your collection',
    link: '/artworkList',
    btnText: 'Shop Now'
  }
];

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

onMounted(() => {
  autoplayInterval = setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval);
});
</script>

<style scoped>
.hero-slider {
  position: relative;
  width: 100%;
  height: 85vh;
  margin-top: 70px;
  overflow: hidden;
}

.hero-slide {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 1s ease-in-out;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: slideUp 1s ease-out;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 300;
  animation: slideUp 1s ease-out 0.2s both;
}

.hero-btn {
  display: inline-block;
  padding: 15px 40px;
  background: white;
  color: #000;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  animation: slideUp 1s ease-out 0.4s both;
}

.hero-btn:hover {
  background: #000;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.slider-controls {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 3;
}

.slider-btn {
  background: rgba(255,255,255,0.2);
  border: 2px solid white;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.slider-btn:hover {
  background: white;
  color: #000;
  transform: scale(1.1);
}

.slider-dots {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 3;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: white;
  width: 40px;
  border-radius: 6px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-slider {
    height: 60vh;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .slider-controls {
    padding: 0 15px;
  }
  
  .slider-btn {
    width: 40px;
    height: 40px;
  }
}
</style>