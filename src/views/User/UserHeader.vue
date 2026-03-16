<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': scrolled, 'navbar--open': menuOpen }">
    <div class="navbar__container">
      <!-- Logo -->
      <router-link to="/" class="navbar__brand" @click="closeMenu">
        <img src="@/assets/img/Kelem.png" alt="Kelem Art Gallery" />
      </router-link>

      <!-- Desktop Nav Links -->
      <ul class="navbar__links">
        <li v-for="link in navLinks" :key="link.to">
          <router-link :to="link.to" class="navbar__link" @click="closeMenu">
            {{ link.label }}
          </router-link>
        </li>
      </ul>

      <!-- Right Actions -->
      <div class="navbar__actions">
        <!-- Authenticated -->
        <template v-if="authStore.isAuthenticated">
          <router-link to="/cart" class="navbar__icon-btn" title="Cart" @click="closeMenu">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="cartCount > 0" class="navbar__badge">{{ cartCount }}</span>
          </router-link>

          <!-- User Dropdown -->
          <div class="navbar__dropdown" ref="dropdownRef">
            <button class="navbar__avatar-btn" @click="toggleDropdown" :aria-expanded="dropdownOpen">
              <i class="fas fa-user-circle"></i>
              <span class="navbar__username">{{ userName }}</span>
              <i class="fas fa-chevron-down navbar__chevron" :class="{ 'rotated': dropdownOpen }"></i>
            </button>
            <transition name="dropdown">
              <ul v-if="dropdownOpen" class="navbar__dropdown-menu">
                <li><router-link :to="dashboardRoute" @click="closeAll"><i class="fas fa-tachometer-alt"></i> Dashboard</router-link></li>
                <li><router-link to="/edit-account" @click="closeAll"><i class="fas fa-user-cog"></i> Profile</router-link></li>
                <li v-if="authStore.isArtist"><router-link to="/artworkUpload" @click="closeAll"><i class="fas fa-upload"></i> Upload Art</router-link></li>
                <li class="navbar__dropdown-divider"></li>
                <li><button class="navbar__logout-btn" @click="handleLogout"><i class="fas fa-sign-out-alt"></i> Logout</button></li>
              </ul>
            </transition>
          </div>
        </template>

        <!-- Guest -->
        <template v-else>
          <router-link to="/userlogin" class="navbar__btn navbar__btn--ghost">Login</router-link>
          <router-link to="/register" class="navbar__btn navbar__btn--primary">Sign Up</router-link>
        </template>
      </div>

      <!-- Hamburger -->
      <button class="navbar__hamburger" @click="toggleMenu" :aria-expanded="menuOpen" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div v-if="menuOpen" class="navbar__mobile">
        <ul class="navbar__mobile-links">
          <li v-for="link in navLinks" :key="link.to">
            <router-link :to="link.to" class="navbar__mobile-link" @click="closeMenu">
              {{ link.label }}
            </router-link>
          </li>
        </ul>
        <div class="navbar__mobile-actions">
          <template v-if="authStore.isAuthenticated">
            <router-link :to="dashboardRoute" class="navbar__mobile-link" @click="closeMenu">
              <i class="fas fa-tachometer-alt"></i> Dashboard
            </router-link>
            <router-link to="/edit-account" class="navbar__mobile-link" @click="closeMenu">
              <i class="fas fa-user-cog"></i> Profile
            </router-link>
            <router-link v-if="authStore.isArtist" to="/artworkUpload" class="navbar__mobile-link" @click="closeMenu">
              <i class="fas fa-upload"></i> Upload Art
            </router-link>
            <router-link to="/cart" class="navbar__mobile-link" @click="closeMenu">
              <i class="fas fa-shopping-cart"></i> Cart
              <span v-if="cartCount > 0" class="navbar__badge navbar__badge--inline">{{ cartCount }}</span>
            </router-link>
            <button class="navbar__btn navbar__btn--danger" @click="handleLogout">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </template>
          <template v-else>
            <router-link to="/userlogin" class="navbar__btn navbar__btn--ghost" @click="closeMenu">Login</router-link>
            <router-link to="/register" class="navbar__btn navbar__btn--primary" @click="closeMenu">Sign Up</router-link>
          </template>
        </div>
      </div>
    </transition>
  </nav>

  <!-- Spacer so content doesn't hide under fixed navbar -->
  <div class="navbar__spacer"></div>
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
/* ── Base ── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.navbar--scrolled {
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.navbar__spacer {
  height: 72px;
}

/* ── Container ── */
.navbar__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 72px;
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* ── Brand ── */
.navbar__brand img {
  height: 48px;
  width: auto;
  display: block;
  transition: opacity 0.2s;
}
.navbar__brand:hover img { opacity: 0.8; }

/* ── Desktop Links ── */
.navbar__links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;
}

.navbar__link {
  position: relative;
  padding: 0.4rem 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 2px;
  transition: transform 0.25s ease;
}

.navbar__link:hover,
.navbar__link.router-link-active {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.07);
}

.navbar__link.router-link-exact-active::after {
  transform: translateX(-50%) scaleX(1);
}

/* ── Actions ── */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
}

/* ── Icon Button (cart) ── */
.navbar__icon-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  color: #374151;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.navbar__icon-btn:hover {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

/* ── Badge ── */
.navbar__badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ef4444;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  line-height: 1;
}
.navbar__badge--inline {
  position: static;
  margin-left: 6px;
}

/* ── Buttons ── */
.navbar__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1.1rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.navbar__btn--ghost {
  color: #374151;
  background: transparent;
  border: 1.5px solid #d1d5db;
}
.navbar__btn--ghost:hover {
  border-color: #6366f1;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.05);
}

.navbar__btn--primary {
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.35);
}
.navbar__btn--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.45);
}

.navbar__btn--danger {
  color: #fff;
  background: #ef4444;
  width: 100%;
  justify-content: center;
  margin-top: 0.5rem;
}
.navbar__btn--danger:hover { background: #dc2626; }

/* ── User Dropdown ── */
.navbar__dropdown {
  position: relative;
}

.navbar__avatar-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: rgba(99, 102, 241, 0.08);
  border: 1.5px solid rgba(99, 102, 241, 0.2);
  border-radius: 10px;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.navbar__avatar-btn:hover {
  background: rgba(99, 102, 241, 0.14);
  border-color: #6366f1;
  color: #6366f1;
}
.navbar__avatar-btn .fa-user-circle { font-size: 1.2rem; color: #6366f1; }

.navbar__username {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.navbar__chevron {
  font-size: 0.7rem;
  transition: transform 0.25s;
}
.navbar__chevron.rotated { transform: rotate(180deg); }

.navbar__dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 200px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  padding: 0.5rem;
  list-style: none;
  margin: 0;
  z-index: 200;
}

.navbar__dropdown-menu li a,
.navbar__dropdown-menu li button {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.55rem 0.85rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  text-align: left;
}
.navbar__dropdown-menu li a:hover,
.navbar__dropdown-menu li button:hover {
  background: rgba(99, 102, 241, 0.08);
  color: #6366f1;
}
.navbar__dropdown-menu li a i,
.navbar__dropdown-menu li button i {
  width: 16px;
  text-align: center;
  color: #9ca3af;
}

.navbar__dropdown-divider {
  height: 1px;
  background: #f3f4f6;
  margin: 0.35rem 0.5rem;
}

.navbar__logout-btn { color: #ef4444 !important; }
.navbar__logout-btn i { color: #ef4444 !important; }
.navbar__logout-btn:hover { background: rgba(239,68,68,0.08) !important; }

/* ── Hamburger ── */
.navbar__hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
  margin-left: auto;
}
.navbar__hamburger:hover { background: rgba(99,102,241,0.08); }
.navbar__hamburger span {
  display: block;
  height: 2px;
  background: #374151;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Hamburger → X animation */
.navbar--open .navbar__hamburger span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.navbar--open .navbar__hamburger span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.navbar--open .navbar__hamburger span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Mobile Menu ── */
.navbar__mobile {
  border-top: 1px solid rgba(0,0,0,0.06);
  background: rgba(255,255,255,0.98);
  padding: 1rem 1.5rem 1.5rem;
}

.navbar__mobile-links {
  list-style: none;
  margin: 0 0 1rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.navbar__mobile-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 0.85rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}
.navbar__mobile-link:hover,
.navbar__mobile-link.router-link-active {
  background: rgba(99,102,241,0.08);
  color: #6366f1;
}

.navbar__mobile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

/* ── Transitions ── */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .navbar__links,
  .navbar__actions {
    display: none;
  }
  .navbar__hamburger {
    display: flex;
  }
  .navbar__container {
    gap: 0;
  }
}
</style>
