<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="scrolled
      ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg dark:shadow-gray-950/50'
      : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm lg:bg-transparent lg:dark:bg-transparent'"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Brand -->
        <router-link
          to="/"
          class="brand-link group"
          @click="closeMenu"
        >
          <span class="brand-kelem">KELEM</span>
          <span class="brand-sub dark:!text-gray-500">Online Art Gallery</span>
        </router-link>

        <!-- Desktop Nav Links -->
        <div class="hidden lg:flex items-center space-x-1">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all duration-200 relative group"
            @click="closeMenu"
          >
            {{ link.label }}
            <span class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:w-full group-hover:left-0" />
          </router-link>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          <!-- Dark mode toggle -->
          <button
            type="button"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <i :class="isDark ? 'fas fa-sun text-amber-400' : 'fas fa-moon text-gray-600 dark:text-gray-300'" />
          </button>

          <!-- Search Button -->
          <button
            type="button"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-all duration-200 group"
            aria-label="Search"
            @click="searchOpen = true"
          >
            <i class="fas fa-search text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200" />
          </button>

          <!-- Authenticated -->
          <template v-if="authStore.isAuthenticated">
            <router-link
              to="/cart"
              class="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-all duration-200 group"
              @click="closeMenu"
            >
              <i class="fas fa-shopping-cart text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200" />
              <span
                v-if="cartCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >{{ cartCount }}</span>
            </router-link>

            <div
              ref="notifRef"
              class="relative"
            >
              <button
                type="button"
                class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group relative"
                aria-label="Notifications"
                :aria-expanded="notifOpen"
                @click="toggleNotifications"
              >
                <i class="fas fa-bell text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200" />
                <span
                  v-if="unreadCount > 0"
                  class="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {{ unreadCount > 9 ? '9+' : unreadCount }}
                </span>
              </button>

              <transition name="dropdown">
                <div
                  v-if="notifOpen"
                  class="absolute top-full right-0 mt-2 w-[22rem] max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                >
                  <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <h3 class="font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                    <button
                      v-if="unreadCount > 0"
                      type="button"
                      class="text-xs font-medium text-purple-600 dark:text-purple-400 hover:underline"
                      @click="markAllRead"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div class="max-h-80 overflow-y-auto">
                    <p
                      v-if="notifLoading"
                      class="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      Loading...
                    </p>
                    <p
                      v-else-if="!notifications.length"
                      class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No notifications yet
                    </p>
                    <button
                      v-for="item in notifications.slice(0, 8)"
                      v-else
                      :key="item.id"
                      type="button"
                      class="w-full text-left px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0"
                      :class="{ 'bg-purple-50/60 dark:bg-purple-900/10': !item.read }"
                      @click="openNotification(item)"
                    >
                      <div class="flex gap-3">
                        <div
                          class="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                          :class="notifIconClass(item.type)"
                        >
                          <i
                            :class="notifIcon(item.type)"
                            class="text-sm"
                          />
                        </div>
                        <div class="min-w-0 flex-1">
                          <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {{ item.title }}
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
                            {{ item.message }}
                          </p>
                          <p class="text-[11px] text-gray-400 mt-1">
                            {{ formatNotifTime(item.createdAt) }}
                          </p>
                        </div>
                        <span
                          v-if="!item.read"
                          class="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0"
                        />
                      </div>
                    </button>
                  </div>

                  <router-link
                    to="/notifications"
                    class="block text-center px-4 py-3 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 border-t border-gray-100 dark:border-gray-700"
                    @click="closeAll"
                  >
                    View all notifications
                  </router-link>
                </div>
              </transition>
            </div>

            <!-- User Dropdown -->
            <div
              ref="dropdownRef"
              class="relative"
            >
              <button
                type="button"
                class="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-900/50 dark:hover:to-indigo-900/50 transition-all duration-200"
                :aria-expanded="dropdownOpen"
                @click="toggleDropdown"
              >
                <div class="relative">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                    <i class="fas fa-user text-white text-sm" />
                  </div>
                  <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                </div>
                <span class="hidden xl:block text-sm font-medium text-gray-700 dark:text-gray-200">{{ userName }}</span>
                <i
                  class="fas fa-chevron-down text-xs text-gray-500 dark:text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': dropdownOpen }"
                />
              </button>

              <transition name="dropdown">
                <div
                  v-if="dropdownOpen"
                  class="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  <div class="p-4 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                        <i class="fas fa-user text-white" />
                      </div>
                      <div class="min-w-0">
                        <p class="font-semibold text-gray-800 dark:text-white truncate">
                          {{ userName }}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {{ authStore.user?.email }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="p-2">
                    <router-link
                      :to="dashboardRoute"
                      class="dropdown-link"
                      @click="closeAll"
                    >
                      <i class="fas fa-tachometer-alt w-5" />
                      <span>Dashboard</span>
                    </router-link>
                    <router-link
                      :to="profileRoute"
                      class="dropdown-link"
                      @click="closeAll"
                    >
                      <i class="fas fa-user-cog w-5" />
                      <span>Profile Settings</span>
                    </router-link>
                    <router-link
                      v-if="authStore.isArtist"
                      :to="uploadRoute"
                      class="dropdown-link"
                      @click="closeAll"
                    >
                      <i class="fas fa-upload w-5" />
                      <span>Upload Artwork</span>
                    </router-link>
                    <div class="border-t border-gray-100 dark:border-gray-700 my-2" />
                    <button
                      type="button"
                      class="dropdown-link text-red-600 dark:text-red-400 hover:!bg-red-50 dark:hover:!bg-red-900/20 w-full"
                      @click="handleLogout"
                    >
                      <i class="fas fa-sign-out-alt w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </template>

          <!-- Guest -->
          <template v-else>
            <router-link
              to="/userLogin"
              class="hidden lg:flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-200"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="hidden sm:flex items-center px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-purple-500/20 text-sm"
            >
              Sign Up
            </router-link>
          </template>

          <!-- Hamburger -->
          <button
            type="button"
            class="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :aria-expanded="menuOpen"
            aria-label="Toggle menu"
            @click="toggleMenu"
          >
            <span
              class="w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300"
              :class="{ 'rotate-45 translate-y-1.5': menuOpen }"
            />
            <span
              class="w-5 h-0.5 bg-gray-600 dark:bg-gray-300 my-1 transition-all duration-300"
              :class="{ 'opacity-0': menuOpen }"
            />
            <span
              class="w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300"
              :class="{ '-rotate-45 -translate-y-1.5': menuOpen }"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div
        v-if="menuOpen"
        class="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-xl"
      >
        <div class="p-4 space-y-1">
          <button
            type="button"
            class="mobile-link w-full text-left"
            @click="openSearchFromMobile"
          >
            <i class="fas fa-search w-5 text-purple-500" />
            <span>Search</span>
          </button>
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="mobile-link"
            @click="closeMenu"
          >
            <i class="fas fa-chevron-right text-xs text-gray-400" />
            <span>{{ link.label }}</span>
          </router-link>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-800 p-4 space-y-1">
          <template v-if="authStore.isAuthenticated">
            <router-link
              :to="dashboardRoute"
              class="mobile-link"
              @click="closeMenu"
            >
              <i class="fas fa-tachometer-alt w-5" />
              <span>Dashboard</span>
            </router-link>
            <router-link
              :to="profileRoute"
              class="mobile-link"
              @click="closeMenu"
            >
              <i class="fas fa-user-cog w-5" />
              <span>Profile</span>
            </router-link>
            <router-link
              v-if="authStore.isArtist"
              :to="uploadRoute"
              class="mobile-link"
              @click="closeMenu"
            >
              <i class="fas fa-upload w-5" />
              <span>Upload Art</span>
            </router-link>
            <router-link
              to="/notifications"
              class="mobile-link"
              @click="closeMenu"
            >
              <i class="fas fa-bell w-5" />
              <span>Notifications</span>
              <span
                v-if="unreadCount > 0"
                class="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-auto"
              >{{ unreadCount }}</span>
            </router-link>
            <router-link
              to="/cart"
              class="mobile-link"
              @click="closeMenu"
            >
              <i class="fas fa-shopping-cart w-5" />
              <span>Cart</span>
              <span
                v-if="cartCount > 0"
                class="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-auto"
              >{{ cartCount }}</span>
            </router-link>
            <button
              type="button"
              class="mobile-link w-full text-red-600 dark:text-red-400"
              @click="handleLogout"
            >
              <i class="fas fa-sign-out-alt w-5" />
              <span>Logout</span>
            </button>
          </template>
          <template v-else>
            <router-link
              to="/userLogin"
              class="mobile-link justify-center font-semibold"
              @click="closeMenu"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="flex items-center justify-center w-full px-6 py-3 mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl"
              @click="closeMenu"
            >
              Sign Up
            </router-link>
          </template>
        </div>
      </div>
    </transition>

    <SearchOverlay v-model:open="searchOpen" />
  </nav>

  <div class="h-16 lg:h-20" />
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { useTheme } from '@/composables/useTheme';
import SearchOverlay from '@/components/common/SearchOverlay.vue';

const authStore = useAuthStore();
const cartStore = useCartStore();
const userStore = useUserStore();
const router = useRouter();
const { isDark, toggleTheme } = useTheme();

const scrolled = ref(false);
const menuOpen = ref(false);
const dropdownOpen = ref(false);
const notifOpen = ref(false);
const notifLoading = ref(false);
const searchOpen = ref(false);
const dropdownRef = ref(null);
const notifRef = ref(null);

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/allArtwork', label: 'Gallery' },
  { to: '/search', label: 'Search' },
  { to: '/collections', label: 'Collections' },
  { to: '/auctions', label: 'Auctions' },
  { to: '/contactUs', label: 'Contact' },
];

const userName = computed(() => {
  const u = authStore.user;
  if (!u) return '';
  return u.firstName || u.username || u.email?.split('@')[0] || 'Account';
});

const cartCount = computed(() => cartStore.itemCount ?? 0);
const notifications = computed(() => userStore.notifications || []);
const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length);

const dashboardRoute = computed(() => {
  if (authStore.isAdmin) return '/adminDashboard';
  if (authStore.isManager) return '/managerDashboard';
  if (authStore.isArtist) return '/artistDashboard';
  if (authStore.isOrganization) return '/organizationDashboard';
  return '/customerDashboard';
});

const profileRoute = computed(() => ({
  path: dashboardRoute.value,
  query: { tab: 'profile' }
}));

const uploadRoute = computed(() => ({
  path: '/artistDashboard',
  query: { tab: 'upload' }
}));

function toggleMenu() { menuOpen.value = !menuOpen.value; }
function closeMenu() { menuOpen.value = false; }
function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
  notifOpen.value = false;
}
async function toggleNotifications() {
  dropdownOpen.value = false;
  notifOpen.value = !notifOpen.value;
  if (notifOpen.value && !notifications.value.length) {
    notifLoading.value = true;
    try {
      await userStore.fetchNotifications();
    } finally {
      notifLoading.value = false;
    }
  }
}
function closeAll() {
  menuOpen.value = false;
  dropdownOpen.value = false;
  notifOpen.value = false;
}

function notifIcon(type) {
  return ({
    success: 'fas fa-check-circle',
    warning: 'fas fa-exclamation-triangle',
    error: 'fas fa-times-circle',
    message: 'fas fa-envelope'
  }[type]) || 'fas fa-info-circle';
}

function notifIconClass(type) {
  return ({
    success: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
    warning: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
    error: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
    message: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400'
  }[type]) || 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400';
}

function formatNotifTime(date) {
  if (!date) return '';
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

async function markAllRead() {
  for (const item of notifications.value) {
    if (!item.read) await userStore.markNotificationRead(item.id);
  }
}

async function openNotification(item) {
  if (!item.read) await userStore.markNotificationRead(item.id);
  closeAll();
  router.push('/notifications');
}

function openSearchFromMobile() {
  closeMenu();
  searchOpen.value = true;
}

async function handleLogout() {
  closeAll();
  authStore.logout();
  router.push('/userLogin');
}

function handleScroll() {
  scrolled.value = window.scrollY > 20;
}

function handleClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false;
  }
  if (notifRef.value && !notifRef.value.contains(e.target)) {
    notifOpen.value = false;
  }
}

function handleSearchShortcut(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    searchOpen.value = true;
  }
}

watch(
  () => authStore.isAuthenticated,
  (loggedIn) => {
    if (loggedIn) userStore.fetchNotifications().catch(() => {});
    else notifOpen.value = false;
  },
  { immediate: true }
);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleSearchShortcut);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleSearchShortcut);
});
</script>

<style scoped>
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
  transition: color 0.2s;
}
.brand-link:hover .brand-sub { color: #6366f1; }

.dropdown-link {
  @apply flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-gray-900 dark:hover:text-white transition-colors;
}
.dropdown-link i {
  @apply text-gray-400 group-hover:text-purple-600;
}

.mobile-link {
  @apply flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors;
}

.dropdown-enter-active, .dropdown-leave-active { transition: all 0.3s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-10px) scale(0.95); }
.mobile-menu-enter-active, .mobile-menu-leave-active { transition: all 0.3s ease; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
