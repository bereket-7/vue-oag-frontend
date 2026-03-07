<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 class="text-3xl font-bold text-gray-900">My Account</h2>
        <p class="text-gray-600 mt-1">Dashboard</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="text-center mb-6">
              <img
                :src="user?.profileImage || 'https://via.placeholder.com/150'"
                alt="Profile"
                class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 class="font-semibold text-gray-900">{{ user?.firstname || 'User' }}</h3>
              <p class="text-sm text-gray-600">{{ user?.email }}</p>
            </div>

            <nav class="space-y-2">
              <router-link
                v-for="item in menuItems"
                :key="item.path"
                :to="item.path"
                class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <i :class="item.icon" class="mr-3"></i>
                {{ item.label }}
              </router-link>

              <button
                @click="showLogoutDialog = true"
                class="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <i class="fas fa-sign-out-alt mr-3"></i>
                Logout
              </button>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-xl shadow-md p-8">
            <div class="mb-8">
              <p class="text-gray-700 leading-relaxed">
                The user dashboard on an online art gallery allows you to easily navigate, 
                discover, and engage with artworks, artists, and personalized features.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <router-link
                v-for="action in quickActions"
                :key="action.path"
                :to="action.path"
                class="group"
              >
                <div class="h-24 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                  <div class="text-center">
                    <i :class="action.icon" class="text-2xl text-gray-600 group-hover:text-blue-600 mb-2"></i>
                    <p class="font-medium text-gray-700 group-hover:text-blue-600">{{ action.label }}</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BaseModal v-model="showLogoutDialog" title="Confirm Logout" size="sm">
      <p class="text-gray-700">Are you sure you want to logout?</p>
      
      <template #footer>
        <BaseButton variant="secondary" @click="showLogoutDialog = false">
          Cancel
        </BaseButton>
        <BaseButton variant="danger" @click="handleLogout">
          Logout
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { BaseModal, BaseButton } from '@/components/common';

const { user, logout } = useAuth();
const showLogoutDialog = ref(false);

const menuItems = [
  { path: '/', label: 'Home', icon: 'fas fa-home' },
  { path: '/about', label: 'About', icon: 'fas fa-info-circle' },
  { path: '/contactUs', label: 'Contact Us', icon: 'fas fa-envelope' },
  { path: '/edit-account', label: 'Account Details', icon: 'fas fa-user-cog' }
];

const quickActions = [
  { path: '/', label: 'Home', icon: 'fas fa-home' },
  { path: '/about', label: 'About', icon: 'fas fa-info-circle' },
  { path: '/contactUs', label: 'Contact Us', icon: 'fas fa-envelope' },
  { path: '/artworkList', label: 'Paintings', icon: 'fas fa-palette' },
  { path: '/customerDashboard', label: 'My Account', icon: 'fas fa-user' },
  { path: '/edit-account', label: 'Account Details', icon: 'fas fa-cog' },
  { path: '/wishlist', label: 'Wishlist', icon: 'fas fa-heart' },
  { path: '/cart', label: 'Cart', icon: 'fas fa-shopping-cart' },
  { path: '/allArtwork', label: 'Browse Art', icon: 'fas fa-images' }
];

const handleLogout = () => {
  logout();
  showLogoutDialog.value = false;
};
</script>
