<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <CardSlider/>
    
    <!-- Categories Section -->
    <ArtworkCategory/>
    
    <!-- Featured Artists Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Featured <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Artists</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the talented creators behind our most captivating artworks
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(artist, index) in featuredArtists" 
            :key="artist.id"
            class="text-center group cursor-pointer"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="relative mb-4 overflow-hidden rounded-2xl">
              <img 
                :src="artist.image" 
                :alt="artist.name" 
                class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ artist.name }}</h3>
            <p class="text-gray-600 mb-3">{{ artist.specialty }}</p>
            <div class="flex justify-center space-x-3">
              <a :href="artist.social.facebook" class="text-gray-400 hover:text-blue-600 transition-colors">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a :href="artist.social.instagram" class="text-gray-400 hover:text-pink-600 transition-colors">
                <i class="fab fa-instagram"></i>
              </a>
              <a :href="artist.social.twitter" class="text-gray-400 hover:text-blue-400 transition-colors">
                <i class="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link 
            to="/register" 
            class="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <span>Become a Featured Artist</span>
            <i class="fas fa-star"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div data-aos="fade-up">
            <div class="text-5xl font-bold mb-2">500+</div>
            <div class="text-purple-200">Artworks</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <div class="text-5xl font-bold mb-2">100+</div>
            <div class="text-purple-200">Artists</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <div class="text-5xl font-bold mb-2">50+</div>
            <div class="text-purple-200">Countries</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <div class="text-5xl font-bold mb-2">1000+</div>
            <div class="text-purple-200">Happy Customers</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold text-gray-800 mb-6" data-aos="fade-up">
          Ready to Start Your Art Journey?
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Join our community of art lovers and discover pieces that speak to your soul
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
          <router-link 
            to="/artworkList" 
            class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <i class="fas fa-search mr-2"></i>
            Explore Artworks
          </router-link>
          <router-link 
            to="/register" 
            class="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
          >
            <i class="fas fa-user-plus mr-2"></i>
            Join Community
          </router-link>
        </div>
      </div>
    </section>

    <!-- Artwork List -->
    <ArtworkList />
    <FooterView />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ArtworkList from '@/views/Artwork/ArtworkList.vue'; 
import FooterView from '@/components/FooterView.vue';
import CardSlider from '@/components/CardSlider.vue';
import ArtworkCategory from '@/components/ArtworkCategory.vue';

const featuredArtists = ref([
  {
    id: 1,
    name: 'Elena Rodriguez',
    specialty: 'Abstract Paintings',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b332c3ca?w=400',
    social: {
      facebook: '#',
      instagram: '#',
      twitter: '#'
    }
  },
  {
    id: 2,
    name: 'Marcus Chen',
    specialty: 'Digital Art',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    social: {
      facebook: '#',
      instagram: '#',
      twitter: '#'
    }
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    specialty: 'Sculptures',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    social: {
      facebook: '#',
      instagram: '#',
      twitter: '#'
    }
  },
  {
    id: 4,
    name: 'James Mitchell',
    specialty: 'Mixed Media',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    social: {
      facebook: '#',
      instagram: '#',
      twitter: '#'
    }
  }
]);
</script>

<style scoped>
/* Modern home page styles */
</style>