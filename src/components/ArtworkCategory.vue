<template>
  <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Explore <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Collections</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover art across diverse mediums and styles, each piece carefully curated to inspire and transform your space
        </p>
      </div>

      <!-- Categories Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(category, index) in categories" 
          :key="category.id" 
          class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <!-- Image Container -->
          <div class="relative h-96 overflow-hidden">
            <img 
              :src="category.image" 
              :alt="category.name" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Content Overlay -->
            <div class="absolute inset-0 flex flex-col justify-end p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <i :class="getCategoryIcon(category.name)" class="text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold">{{ category.name }}</h3>
                </div>
                
                <p class="text-white/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {{ category.description }}
                </p>
                
                <router-link 
                  to="/artworkList" 
                  class="inline-flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"
                >
                  <span>View Collection</span>
                  <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
          
          <!-- Category Badge -->
          <div class="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
            {{ getArtworkCount(category.name) }} Pieces
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
        <router-link 
          to="/artworkList" 
          class="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
        >
          <span>View All Artworks</span>
          <i class="fas fa-th-large"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    id: 1,
    name: 'Paintings',
    description: 'Contemporary and classical paintings from talented artists around the world',
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

const getCategoryIcon = (categoryName) => {
  const icons = {
    'Paintings': 'fas fa-palette',
    'Sculptures': 'fas fa-cube',
    'Mixed Media': 'fas fa-brush'
  };
  return icons[categoryName] || 'fas fa-image';
};

const getArtworkCount = (categoryName) => {
  const counts = {
    'Paintings': '150+',
    'Sculptures': '80+',
    'Mixed Media': '60+'
  };
  return counts[categoryName] || '50+';
};
</script>

<style scoped>
/* Modern styles are handled by Tailwind CSS classes */
/* Add any custom animations or overrides here if needed */
</style>