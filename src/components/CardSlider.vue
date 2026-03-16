<template>
  <div class="relative w-full h-screen overflow-hidden">
    <!-- Hero Slides -->
    <div class="relative h-full">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        :class="[
          'absolute inset-0 transition-all duration-1000 ease-in-out',
          currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        ]"
      >
        <div 
          class="w-full h-full bg-cover bg-center bg-no-repeat"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          
          <!-- Content -->
          <div class="relative h-full flex items-center">
            <div class="container mx-auto px-4">
              <div class="max-w-2xl">
                <h1 
                  :class="[
                    'text-5xl md:text-7xl font-bold text-white mb-6 transition-all duration-1000 delay-300',
                    currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  ]"
                >
                  {{ slide.title }}
                </h1>
                <p 
                  :class="[
                    'text-xl md:text-2xl text-white/90 mb-8 transition-all duration-1000 delay-500',
                    currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  ]"
                >
                  {{ slide.subtitle }}
                </p>
                <div 
                  :class="[
                    'flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700',
                    currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  ]"
                >
                  <router-link 
                    :to="slide.link" 
                    class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    {{ slide.btnText }}
                    <i class="fas fa-arrow-right ml-2"></i>
                  </router-link>
                  <router-link 
                    to="/about" 
                    class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Learn More
                    <i class="fas fa-info-circle ml-2"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Controls -->
    <button 
      @click="prevSlide" 
      class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
    >
      <i class="fas fa-chevron-left group-hover:scale-110 transition-transform"></i>
    </button>
    
    <button 
      @click="nextSlide" 
      class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
    >
      <i class="fas fa-chevron-right group-hover:scale-110 transition-transform"></i>
    </button>

    <!-- Slide Indicators -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
      <button 
        v-for="(slide, index) in slides" 
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'h-2 transition-all duration-300 rounded-full',
          currentSlide === index 
            ? 'w-12 bg-white' 
            : 'w-2 bg-white/50 hover:bg-white/70'
        ]"
      />
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <i class="fas fa-chevron-down text-white/60 text-xl"></i>
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
    subtitle: 'Curated collection of contemporary masterpieces from talented artists worldwide',
    link: '/artworkList',
    btnText: 'Explore Gallery'
  },
  {
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1600',
    title: 'Where Art Meets Passion',
    subtitle: 'Connect with artists and collectors in our vibrant creative community',
    link: '/register',
    btnText: 'Join Community'
  },
  {
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600',
    title: 'Elevate Your Space',
    subtitle: 'Find the perfect piece that speaks to your soul and transforms your environment',
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
  autoplayInterval = setInterval(nextSlide, 6000);
});

onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval);
});
</script>

<style scoped>
/* Modern styles are handled by Tailwind CSS classes */
/* Add any custom animations or overrides here if needed */
</style>