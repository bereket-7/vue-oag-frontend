<template>
  <div class="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl">
    <div class="relative aspect-square overflow-hidden bg-gray-200">
      <img
        :src="artwork.imageUrl || '/placeholder.jpg'"
        :alt="artwork.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        @error="handleImageError"
      />
      
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p class="text-sm line-clamp-2">{{ artwork.description }}</p>
        </div>
      </div>
      
      <div class="absolute top-2 right-2 flex gap-2">
        <button
          v-if="showWishlist"
          @click.prevent="toggleWishlist"
          class="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <svg class="w-5 h-5" :class="isInWishlist ? 'text-red-500 fill-current' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
    
    <div class="p-4">
      <div class="flex items-start justify-between mb-2">
        <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{ artwork.title }}</h3>
        <span v-if="artwork.verified" class="flex-shrink-0 ml-2">
          <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>
      
      <p class="text-sm text-gray-600 mb-2">by {{ artwork.artistName || 'Unknown Artist' }}</p>
      
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-gray-900">${{ artwork.price }}</span>
        
        <div v-if="artwork.rating" class="flex items-center gap-1">
          <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-sm text-gray-600">{{ artwork.rating }}</span>
        </div>
      </div>
      
      <div v-if="showActions" class="mt-4 flex gap-2">
        <button
          @click="$emit('add-to-cart', artwork)"
          class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Add to Cart
        </button>
        <button
          @click="$emit('view-details', artwork)"
          class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          View
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  artwork: {
    type: Object,
    required: true
  },
  showWishlist: {
    type: Boolean,
    default: true
  },
  showActions: {
    type: Boolean,
    default: true
  }
});

defineEmits(['add-to-cart', 'view-details', 'toggle-wishlist']);

const isInWishlist = ref(false);

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
};

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value;
  // Emit event to parent
};
</script>
