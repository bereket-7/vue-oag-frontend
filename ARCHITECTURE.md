# 🎨 Online Art Gallery - Modern Architecture

## 🏗️ Architecture Overview

This project has been modernized with:
- ✅ **Vue 3 Composition API** with `<script setup>`
- ✅ **Pinia** for state management
- ✅ **Centralized API services**
- ✅ **Reusable composables**
- ✅ **Environment-based configuration**

---

## 📁 Project Structure

```
src/
├── assets/              # Static assets (images, styles)
├── components/          # Reusable UI components
│   ├── common/         # Generic components (buttons, cards, etc.)
│   ├── artwork/        # Artwork-specific components
│   ├── cart/           # Shopping cart components
│   └── layout/         # Layout components (header, footer)
├── composables/         # Reusable composition functions
│   ├── useAuth.js      # Authentication logic
│   ├── useApi.js       # API call wrapper
│   └── useNotification.js  # Toast notifications
├── router/              # Vue Router configuration
├── services/            # API service layer
│   ├── api.js          # Axios instance with interceptors
│   ├── authService.js  # Authentication endpoints
│   └── artworkService.js  # Artwork endpoints
├── stores/              # Pinia stores (state management)
│   ├── auth.js         # Authentication state
│   ├── artwork.js      # Artwork state
│   ├── cart.js         # Shopping cart state
│   ├── user.js         # User profile state
│   └── competition.js  # Competition state
├── types/               # TypeScript types (future)
├── utils/               # Utility functions
├── views/               # Page components
│   ├── home/
│   ├── artwork/
│   ├── user/
│   ├── admin/
│   ├── manager/
│   └── organization/
├── App.vue              # Root component
└── main.js              # Application entry point
```

---

## 🔧 Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
```bash
# Copy example env file
cp .env.example .env.development

# Edit with your values
VUE_APP_API_BASE_URL=http://localhost:8082/api
VUE_APP_SOCKET_URL=http://localhost:8082
VUE_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### 3. Run Development Server
```bash
npm run serve
```

### 4. Build for Production
```bash
npm run build
```

---

## 🎯 Key Concepts

### 1. Pinia Stores (State Management)

**Auth Store** (`stores/auth.js`)
```javascript
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Check authentication
if (authStore.isAuthenticated) {
  console.log('User:', authStore.user);
}

// Login
await authStore.login({ username, password });

// Logout
authStore.logout();
```

**Artwork Store** (`stores/artwork.js`)
```javascript
import { useArtworkStore } from '@/stores/artwork';

const artworkStore = useArtworkStore();

// Fetch artworks
await artworkStore.fetchArtworks();

// Access artworks
const artworks = artworkStore.artworks;

// Set filters
artworkStore.setFilters({ category: 'painting', priceMax: 1000 });
```

### 2. API Services

**Centralized API calls** (`services/`)
```javascript
import { artworkService } from '@/services/artworkService';

// Get all artworks
const artworks = await artworkService.getAll();

// Get by ID
const artwork = await artworkService.getById(123);

// Create new
const newArtwork = await artworkService.create(artworkData);
```

### 3. Composables (Reusable Logic)

**useAuth** - Authentication helper
```javascript
import { useAuth } from '@/composables/useAuth';

const { isAuthenticated, user, login, logout, isArtist } = useAuth();

if (isArtist.value) {
  // Show artist features
}
```

**useApi** - API call wrapper with loading/error states
```javascript
import { useApi } from '@/composables/useApi';
import { artworkService } from '@/services/artworkService';

const { data, loading, error, execute } = useApi(artworkService.getAll);

await execute();

if (loading.value) {
  // Show loading spinner
}

if (error.value) {
  // Show error message
}
```

**useNotification** - Toast notifications
```javascript
import { useNotification } from '@/composables/useNotification';

const { success, error, warning, info } = useNotification();

success('Artwork uploaded successfully!');
error('Failed to save changes');
```

---

## 📝 Component Examples

### Composition API Component

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="artwork in artworks" :key="artwork.id">
        {{ artwork.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useArtworkStore } from '@/stores/artwork';

const artworkStore = useArtworkStore();
const title = ref('Art Gallery');
const loading = ref(false);

const artworks = computed(() => artworkStore.artworks);

onMounted(async () => {
  loading.value = true;
  await artworkStore.fetchArtworks();
  loading.value = false;
});
</script>
```

---

## 🔐 Authentication Flow

1. User submits login form
2. `authService.login()` sends credentials to API
3. API returns token + user data
4. `authStore.setAuth()` saves to store + localStorage
5. Router redirects based on user role
6. All subsequent API calls include token (via interceptor)

---

## 🛣️ Routing & Guards

**Protected Routes**
```javascript
{
  path: '/artistDashboard',
  component: ArtistDashboard,
  meta: { requiresAuth: true }  // Requires authentication
}
```

**Route Guard** (in `router/index.js`)
```javascript
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/userLogin');
  } else {
    next();
  }
});
```

---

## 🎨 Styling

Currently using **Bootstrap 5** (will migrate to TailwindCSS in Phase 2)

---

## 🧪 Testing (Coming in Phase 5)

- Unit tests with Vitest
- E2E tests with Cypress
- Component tests with Vue Test Utils

---

## 📦 Available Scripts

```bash
npm run serve      # Start development server
npm run build      # Build for production
npm run lint       # Lint and fix files
```

---

## 🚀 Next Steps

- [ ] Migrate remaining components to Composition API
- [ ] Add TypeScript support
- [ ] Implement TailwindCSS
- [ ] Add testing suite
- [ ] Implement PWA features

---

## 📚 Documentation

- [Migration Guide](./MIGRATION_GUIDE.md)
- [Vue 3 Docs](https://vuejs.org/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Vue Router Docs](https://router.vuejs.org/)

---

## 🤝 Contributing

1. Follow Composition API patterns
2. Use Pinia stores for state
3. Use services for API calls
4. Create composables for reusable logic
5. Add proper error handling

---

**Happy Coding! 🎨**
