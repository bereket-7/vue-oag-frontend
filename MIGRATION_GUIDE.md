# PHASE 1 MIGRATION GUIDE

## ✅ Completed

### 1. Dependencies
- ✅ Added Pinia for state management
- ✅ Created environment configuration files

### 2. Project Structure
```
src/
├── stores/           ✅ Created
│   ├── auth.js
│   ├── artwork.js
│   ├── cart.js
│   ├── user.js
│   └── competition.js
├── services/         ✅ Created
│   ├── api.js
│   ├── authService.js
│   └── artworkService.js
├── composables/      ✅ Created
│   ├── useAuth.js
│   ├── useApi.js
│   └── useNotification.js
└── types/            ✅ Created (ready for TypeScript)
```

### 3. Core Files Updated
- ✅ main.js - Added Pinia
- ✅ router/index.js - Updated auth guard
- ✅ App.vue - Converted to Composition API
- ✅ HomeView.vue - Converted to Composition API

### 4. Example Component
- ✅ UserLogin.MODERN.vue - Fully modernized example

---

## 📋 Next Steps

### Installation
```bash
npm install
```

### Environment Setup
1. Copy `.env.example` to `.env.development`
2. Update API URLs and credentials

### Component Migration Pattern

#### OLD (Options API):
```vue
<script>
export default {
  name: 'MyComponent',
  data() {
    return {
      items: []
    }
  },
  methods: {
    fetchItems() {
      // ...
    }
  }
}
</script>
```

#### NEW (Composition API):
```vue
<script setup>
import { ref, onMounted } from 'vue';
import { useArtworkStore } from '@/stores/artwork';

const artworkStore = useArtworkStore();
const items = ref([]);

const fetchItems = async () => {
  items.value = await artworkStore.fetchArtworks();
};

onMounted(() => {
  fetchItems();
});
</script>
```

---

## 🔄 Component Migration Priority

### High Priority (Convert First):
1. ✅ UserLogin.vue → Use UserLogin.MODERN.vue as reference
2. ⏳ RegisterUser.vue
3. ⏳ ArtworkList.vue
4. ⏳ ArtworkDetail.vue
5. ⏳ CartItems.vue
6. ⏳ UserHeader.vue

### Medium Priority:
7. ⏳ ArtworkUpload.vue
8. ⏳ ProfileSetting.vue
9. ⏳ CustomerDashBoard.vue
10. ⏳ ArtistDashboard.vue

### Low Priority:
- Admin components
- Manager components
- Organization components

---

## 🎯 Using New Architecture

### Authentication
```javascript
// OLD
import { setAuthToken } from '@/utils/auth';
setAuthToken(token);

// NEW
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
authStore.setAuth(token, user, role);
```

### API Calls
```javascript
// OLD
import axios from 'axios';
const response = await axios.get('http://localhost:8082/api/artworks');

// NEW
import { artworkService } from '@/services/artworkService';
const artworks = await artworkService.getAll();
```

### Using Composables
```javascript
import { useAuth } from '@/composables/useAuth';
import { useNotification } from '@/composables/useNotification';

const { isAuthenticated, user, logout } = useAuth();
const { success, error } = useNotification();

// Show notification
success('Login successful!');
```

---

## 🚀 Quick Migration Steps

### For Each Component:

1. **Change script tag**
   ```vue
   <!-- OLD -->
   <script>
   export default { ... }
   </script>
   
   <!-- NEW -->
   <script setup>
   // imports and logic
   </script>
   ```

2. **Replace data() with ref()**
   ```javascript
   // OLD
   data() {
     return { count: 0 }
   }
   
   // NEW
   import { ref } from 'vue';
   const count = ref(0);
   ```

3. **Replace methods with functions**
   ```javascript
   // OLD
   methods: {
     increment() { this.count++ }
   }
   
   // NEW
   const increment = () => {
     count.value++;
   };
   ```

4. **Replace computed with computed()**
   ```javascript
   // OLD
   computed: {
     double() { return this.count * 2 }
   }
   
   // NEW
   import { computed } from 'vue';
   const double = computed(() => count.value * 2);
   ```

5. **Replace lifecycle hooks**
   ```javascript
   // OLD
   mounted() { this.fetchData() }
   
   // NEW
   import { onMounted } from 'vue';
   onMounted(() => {
     fetchData();
   });
   ```

6. **Use stores instead of direct API calls**
   ```javascript
   // OLD
   const response = await axios.get('/api/artworks');
   
   // NEW
   import { useArtworkStore } from '@/stores/artwork';
   const artworkStore = useArtworkStore();
   await artworkStore.fetchArtworks();
   ```

---

## 🧪 Testing the Migration

1. Start the dev server:
   ```bash
   npm run serve
   ```

2. Test authentication flow:
   - Login with different roles
   - Check token persistence
   - Test logout

3. Test artwork features:
   - Browse artworks
   - View details
   - Add to cart

4. Check console for errors

---

## 📝 Notes

- Old `utils/auth.js` can be deprecated after all components migrate
- Old `utils/api.js` replaced by `services/api.js`
- Keep both versions during migration
- Test thoroughly before removing old code

---

## 🆘 Common Issues

### Issue: "Cannot find module '@/stores/auth'"
**Solution:** Run `npm install` to ensure Pinia is installed

### Issue: "authStore is not defined"
**Solution:** Import and initialize the store:
```javascript
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
```

### Issue: "Reactive value not updating"
**Solution:** Remember to use `.value` with refs:
```javascript
const count = ref(0);
count.value++; // ✅ Correct
count++; // ❌ Wrong
```

---

## 📚 Resources

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Script Setup](https://vuejs.org/api/sfc-script-setup.html)

---

**Next Phase:** UI/UX Modernization with TailwindCSS
