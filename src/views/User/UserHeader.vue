<template>
  <nav class="fixed top-0 left-0 w-full z-50 transition-all duration-300" :class="{ 'bg-white/95 backdrop-blur-md shadow-lg': scrolled, 'bg-transparent': !scrolled }">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Brand -->
        <router-link to="/" class="brand-link group" @click="closeMenu">
          <span class="brand-kelem">KELEM</span>
          <span class="brand-sub">Online Art Gallery</span>
        </router-link>

        <!-- Desktop Nav Links -->
        <div class="hidden lg:flex items-center space-x-1">
          <div v-for="link in navLinks" :key="link.to" class="relative group">
            <router-link 
              :to="link.to" 
              class="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 relative group"
              @click="closeMenu"
            >
              {{ link.label }}
              <span class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </router-link>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center space-x-3">
          <!-- Search Button (Desktop) -->
          <button class="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 group">
            <i class="fas fa-search text-gray-600 group-hover:text-purple-600 transition-colors duration-200"></i>
          </button>

          <!-- Authenticated -->
          <template v-if="authStore.isAuthenticated">
            <!-- Cart -->
            <router-link to="/cart" class="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-100 transition-all duration-200 group" @click="closeMenu">
              <i class="fas fa-shopping-cart text-gray-600 group-hover:text-purple-600 transition-colors duration-200"></i>
              <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">{{ cartCount }}</span>
            </router-link>

            <!-- Notifications -->
            <button class="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 group relative">
              <i class="fas fa-bell text-gray-600 group-hover:text-purple-600 transition-colors duration-200"></i>
              <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <!-- User Dropdown -->
            <div class="relative" ref="dropdownRef">
              <button 
                @click="toggleDropdown" 
                class="flex items-center space-x-3 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition-all duration-200 group"
                :aria-expanded="dropdownOpen"
              >
                <div class="relative">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                    <i class="fas fa-user text-white text-sm"></i>
                  </div>
                  <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <span class="hidden xl:block text-sm font-medium text-gray-700">{{ userName }}</span>
                <i class="fas fa-chevron-down text-xs text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': dropdownOpen }"></i>
              </button>
              
              <transition name="dropdown">
                <div v-if="dropdownOpen" class="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div class="p-4 border-b border-gray-100">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                        <i class="fas fa-user text-white"></i>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-800">{{ userName }}</p>
                        <p class="text-xs text-gray-500">{{ authStore.user?.email }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-2">
                    <router-link 
                      :to="dashboardRoute" 
                      @click="closeAll" 
                      class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group"
                    >
                      <i class="fas fa-tachometer-alt text-gray-400 group-hover:text-purple-600 w-5"></i>
                      <span class="text-gray-700 group-hover:text-gray-900">Dashboard</span>
                    </router-link>
                    
                    <router-link 
                      to="/edit-account" 
                      @click="closeAll" 
                      class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group"
                    >
                      <i class="fas fa-user-cog text-gray-400 group-hover:text-purple-600 w-5"></i>
                      <span class="text-gray-700 group-hover:text-gray-900">Profile Settings</span>
                    </router-link>
                    
                    <router-link 
                      v-if="authStore.isArtist" 
                      to="/artworkUpload" 
                      @click="closeAll" 
                      class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group"
                    >
                      <i class="fas fa-upload text-gray-400 group-hover:text-purple-600 w-5"></i>
                      <span class="text-gray-700 group-hover:text-gray-900">Upload Artwork</span>
                    </router-link>
                    
                    <div class="border-t border-gray-100 my-2"></div>
                    
                    <button 
                      @click="handleLogout" 
                      class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors duration-200 group w-full"
                    >
                      <i class="fas fa-sign-out-alt text-gray-400 group-hover:text-red-600 w-5"></i>
                      <span class="text-gray-700 group-hover:text-red-600">Logout</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </template>

          <!-- Guest -->
          <template v-else>
            <router-link 
              to="/userlogin" 
              class="hidden lg:flex items-center px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Login
            </router-link>
            <router-link 
              to="/register" 
              class="flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Sign Up
            </router-link>
          </template>

          <!-- Hamburger -->
          <button 
            @click="toggleMenu" 
            :aria-expanded="menuOpen" 
            aria-label="Toggle menu"
            class="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <span class="w-5 h-0.5 bg-gray-600 transition-all duration-300" :class="{ 'rotate-45 translate-y-1.5': menuOpen }"></span>
            <span class="w-5 h-0.5 bg-gray-600 my-1 transition-all duration-300" :class="{ 'opacity-0': menuOpen }"></span>
            <span class="w-5 h-0.5 bg-gray-600 transition-all duration-300" :class="{ '-rotate-45 -translate-y-1.5': menuOpen }"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div v-if="menuOpen" class="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl">
        <div class="p-4 space-y-2">
          <div v-for="link in navLinks" :key="link.to">
            <router-link 
              :to="link.to" 
              class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group"
              @click="closeMenu"
            >
              <i class="fas fa-chevron-right text-gray-400 group-hover:text-purple-600 text-sm"></i>
              <span class="text-gray-700 group-hover:text-gray-900">{{ link.label }}</span>
            </router-link>
          </div>
        </div>
        
        <div class="border-t border-gray-100 p-4">
          <template v-if="authStore.isAuthenticated">
            <router-link :to="dashboardRoute" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group">
              <i class="fas fa-tachometer-alt text-gray-400 group-hover:text-purple-600 w-5"></i>
              <span class="text-gray-700 group-hover:text-gray-900">Dashboard</span>
            </router-link>
            <router-link to="/edit-account" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group">
              <i class="fas fa-user-cog text-gray-400 group-hover:text-purple-600 w-5"></i>
              <span class="text-gray-700 group-hover:text-gray-900">Profile</span>
            </router-link>
            <router-link v-if="authStore.isArtist" to="/artworkUpload" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group">
              <i class="fas fa-upload text-gray-400 group-hover:text-purple-600 w-5"></i>
              <span class="text-gray-700 group-hover:text-gray-900">Upload Art</span>
            </router-link>
            <router-link to="/cart" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group">
              <i class="fas fa-shopping-cart text-gray-400 group-hover:text-purple-600 w-5"></i>
              <span class="text-gray-700 group-hover:text-gray-900">Cart</span>
              <span v-if="cartCount > 0" class="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-auto">{{ cartCount }}</span>
            </router-link>
            <button @click="handleLogout" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors duration-200 group w-full">
              <i class="fas fa-sign-out-alt text-gray-400 group-hover:text-red-600 w-5"></i>
              <span class="text-gray-700 group-hover:text-red-600">Logout</span>
            </button>
          </template>
          <template v-else>
            <router-link to="/userlogin" class="flex items-center justify-center w-full px-6 py-3 text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Login
            </router-link>
            <router-link to="/register" class="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Sign Up
            </router-link>
          </template>
        </div>
      </div>
    </transition>
  </nav>

  <!-- Spacer so content doesn't hide under fixed navbar -->
  <div class="h-16 lg:h-20"></div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();

const scrolled = ref(false);
const menuOpen = ref(false);
const dropdownOpen = ref(false);
const dropdownRef = ref(null);

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/recentArtwork', label: 'New Arts' },
  { to: '/allArtwork', label: 'Gallery' },
  { to: '/contactUs', label: 'Contact' },
];

const userName = computed(() => {
  const u = authStore.user;
  if (!u) return '';
  return u.firstName || u.username || u.email?.split('@')[0] || 'Account';
});

const cartCount = computed(() => cartStore.itemCount ?? 0);

const dashboardRoute = computed(() => {
  if (authStore.isAdmin) return '/adminDashboard';
  if (authStore.isManager) return '/managerDashboard';
  if (authStore.isArtist) return '/artistDashboard';
  if (authStore.isOrganization) return '/organizationDashboard';
  return '/customerDashboard';
});

function toggleMenu() { menuOpen.value = !menuOpen.value; }
function closeMenu() { menuOpen.value = false; }
function toggleDropdown() { dropdownOpen.value = !dropdownOpen.value; }
function closeAll() { menuOpen.value = false; dropdownOpen.value = false; }

async function handleLogout() {
  closeAll();
  authStore.logout();
  router.push('/userlogin');
}

function handleScroll() {
  scrolled.value = window.scrollY > 20;
}

function handleClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Modern styles are handled by Tailwind CSS classes */

/* ── Brand ── */
.brand-link {
  display: flex;
  flex-direction: column;
  line-height: 1;
  text-decoration: none;
  gap: 2px;
}
.brand-kelem {
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: opacity 0.2s;
}
.brand-link:hover .brand-kelem { opacity: 0.85; }
.brand-sub {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #9ca3af;
  -webkit-text-fill-color: #9ca3af;
  transition: color 0.2s;
}
.brand-link:hover .brand-sub { color: #6366f1; -webkit-text-fill-color: #6366f1; }
/* Add any custom animations or overrides here if needed */

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
