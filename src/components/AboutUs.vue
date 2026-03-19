<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-24">
      <div class="container mx-auto px-4">
        <div class="text-center" data-aos="fade-up">
          <h1 class="text-5xl font-bold mb-4">About Kelem Art Gallery</h1>
          <p class="text-xl opacity-90 max-w-3xl mx-auto">
            Discover a world where creativity, diversity, and passion intertwine to bring you exceptional artistic treasures
          </p>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0">
        <svg class="w-full h-16" viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 64L1440 0V64H0Z" fill="#F9FAFB"/>
        </svg>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-16">
      <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div class="order-2 lg:order-1" data-aos="fade-right">
          <div class="relative">
            <img 
              src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=900&q=80" 
              class="rounded-2xl shadow-2xl w-full" 
              alt="Kelem Art Gallery Team"
            >
            <div class="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow-xl">
              <div class="text-3xl font-bold">10+</div>
              <div class="text-sm opacity-90">Years of Excellence</div>
            </div>
          </div>
        </div>
        
        <div class="order-1 lg:order-2 space-y-6" data-aos="fade-left">
          <h2 class="text-4xl font-bold text-gray-800 mb-6">
            Welcome to <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Kelem</span>
          </h2>
          
          <div class="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              Welcome to Kelem Online Art Gallery, an exquisite treasure trove where creativity, diversity, 
              and passion intertwine to bring you an exceptional array of artistic wonders.
            </p>
            <p>
              Our mission is to champion the works of talented artists from around the world, 
              transcending geographical borders and uniting art enthusiasts through the digital landscape.
            </p>
            <p>
              Kelem Online Art Gallery is more than just a platform for buying and selling art - 
              it's a vibrant community for artists and art lovers alike.
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 pt-6">
            <router-link 
              to="/contactUs" 
              class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-center"
            >
              Get in Touch
            </router-link>
            <router-link 
              to="/artworkList" 
              class="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200 text-center"
            >
              Explore Artworks
            </router-link>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div class="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
          <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-globe text-purple-600 text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-4">Global Reach</h3>
          <p class="text-gray-600">Connecting artists and art enthusiasts from every corner of the world through our digital platform</p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
          <div class="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-palette text-indigo-600 text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-4">Diverse Collection</h3>
          <p class="text-gray-600">Curated selection of paintings, sculptures, and mixed media artworks from talented artists</p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
          <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-users text-green-600 text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-4">Artist Community</h3>
          <p class="text-gray-600">A thriving community where artists showcase their work and connect with art lovers globally</p>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-16">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div data-aos="fade-up">
            <div class="text-4xl font-bold mb-2">500+</div>
            <div class="text-purple-200">Artworks</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <div class="text-4xl font-bold mb-2">100+</div>
            <div class="text-purple-200">Artists</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <div class="text-4xl font-bold mb-2">50+</div>
            <div class="text-purple-200">Countries</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <div class="text-4xl font-bold mb-2">1000+</div>
            <div class="text-purple-200">Happy Customers</div>
          </div>
        </div>
      </div>

      <!-- Values Section -->
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-12">Our Values</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-lg" data-aos="fade-up">
            <i class="fas fa-heart text-red-500 text-3xl mb-4"></i>
            <h4 class="font-bold text-gray-800 mb-2">Passion</h4>
            <p class="text-gray-600 text-sm">Driven by love for art and creativity</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-lg" data-aos="fade-up" data-aos-delay="100">
            <i class="fas fa-lightbulb text-yellow-500 text-3xl mb-4"></i>
            <h4 class="font-bold text-gray-800 mb-2">Innovation</h4>
            <p class="text-gray-600 text-sm">Embracing new ways to showcase art</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-lg" data-aos="fade-up" data-aos-delay="200">
            <i class="fas fa-handshake text-blue-500 text-3xl mb-4"></i>
            <h4 class="font-bold text-gray-800 mb-2">Trust</h4>
            <p class="text-gray-600 text-sm">Building lasting relationships</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-lg" data-aos="fade-up" data-aos-delay="300">
            <i class="fas fa-star text-purple-500 text-3xl mb-4"></i>
            <h4 class="font-bold text-gray-800 mb-2">Excellence</h4>
            <p class="text-gray-600 text-sm">Committed to quality in everything</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center bg-gray-100 rounded-2xl p-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Join Our Art Community</h2>
        <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
          Whether you're an artist looking to showcase your work or an art enthusiast seeking to discover amazing pieces, Kelem Art Gallery welcomes you.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/register" 
            class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Join as Artist
          </router-link>
          <router-link 
            to="/artworkList" 
            class="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200"
          >
            Browse Collection
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <footer-view/>
</template>

<script>
import FooterView from './FooterView.vue'
export default {
  components: { FooterView },
  name: 'AboutUs'
}
</script>

<style scoped>
/* Modern styles are handled by Tailwind CSS classes */
/* Add any custom animations or overrides here if needed */
</style>

