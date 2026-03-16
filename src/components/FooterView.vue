<template>
  <footer class="bg-gray-900 text-white">
    <!-- Main Footer Content -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-white mb-4 relative">
            Quick Links
            <span class="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></span>
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                <i class="fas fa-chevron-right text-xs mr-2 text-purple-400 group-hover:text-purple-300"></i>
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                <i class="fas fa-chevron-right text-xs mr-2 text-purple-400 group-hover:text-purple-300"></i>
                About
              </router-link>
            </li>
            <li>
              <router-link to="/contactUs" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                <i class="fas fa-chevron-right text-xs mr-2 text-purple-400 group-hover:text-purple-300"></i>
                Contact Us
              </router-link>
            </li>
            <li>
              <router-link to="/register" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                <i class="fas fa-chevron-right text-xs mr-2 text-purple-400 group-hover:text-purple-300"></i>
                Sign Up
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-white mb-4 relative">
            Categories
            <span class="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></span>
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/artworkList" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                <i class="fas fa-palette text-xs mr-2 text-purple-400 group-hover:text-purple-300"></i>
                Paintings
              </router-link>
            </li>
            <li>
              <router-link to="/artworkList" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                <i class="fas fa-cube text-xs mr-2 text-purple-400 group-hover:text-purple-300"></i>
                Sculpture
              </router-link>
            </li>
            <li>
              <router-link to="/artworkList" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                <i class="fas fa-brush text-xs mr-2 text-purple-400 group-hover:text-purple-300"></i>
                Mixed Art
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-white mb-4 relative">
            Resources
            <span class="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></span>
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/FAQs" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                <i class="fas fa-question-circle text-xs mr-2 text-purple-400 group-hover:text-purple-300"></i>
                FAQs
              </router-link>
            </li>
            <li>
              <router-link to="/standards" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                <i class="fas fa-shield-alt text-xs mr-2 text-purple-400 group-hover:text-purple-300"></i>
                Privacy Policy
              </router-link>
            </li>
            <li>
              <router-link to="/standards" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                <i class="fas fa-file-contract text-xs mr-2 text-purple-400 group-hover:text-purple-300"></i>
                Terms and Conditions
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Follow Us -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-white mb-4 relative">
            Follow Us
            <span class="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></span>
          </h3>
          <p class="text-gray-300 mb-4">Connect with us on social media for updates and featured artworks</p>
          <div class="flex space-x-3">
            <a 
              href="https://www.facebook.com/profile.php?id=100092538513954&mibextid=ZbWKwL" 
              class="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transform hover:scale-110 transition-all duration-200 shadow-lg"
              target="_blank"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a 
              href="https://instagram.com/kelem_arts?igshid=ZDdkNTZiNTM=" 
              class="bg-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-700 transform hover:scale-110 transition-all duration-200 shadow-lg"
              target="_blank"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a 
              href="#" 
              class="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-sky-600 transform hover:scale-110 transition-all duration-200 shadow-lg"
              target="_blank"
              aria-label="Twitter"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a 
              href="#" 
              class="bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-800 transform hover:scale-110 transition-all duration-200 shadow-lg"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Newsletter Section -->
    <div class="border-t border-gray-800">
      <div class="container mx-auto px-4 py-8">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-white mb-2">Stay Updated</h3>
          <p class="text-gray-300 mb-6">Subscribe to our newsletter for the latest artworks and exclusive offers</p>
          <div class="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
            >
            <button class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="border-t border-gray-800">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-400 text-sm mb-4 md:mb-0">
            © {{ currentYear }} Kelem Online Art Gallery. All rights reserved.
          </div>
          <div class="flex space-x-6 text-sm">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">Accessibility</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">Sitemap</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
  <script>
export default {
  name: 'FooterView',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

    

<style scoped>
/* Modern styles are handled by Tailwind CSS classes */
/* Add any custom animations or overrides here if needed */
</style>