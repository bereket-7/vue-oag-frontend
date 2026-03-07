<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900">My Artworks</h2>
      <router-link to="/artworkUpload">
        <BaseButton variant="primary">
          <i class="fas fa-plus mr-2"></i>
          Upload New
        </BaseButton>
      </router-link>
    </div>

    <LoadingSpinner v-if="loading" size="lg" />

    <div v-else-if="artworks.length === 0" class="text-center py-12">
      <i class="fas fa-palette text-6xl text-gray-300 mb-4"></i>
      <p class="text-gray-500 mb-4">You haven't uploaded any artworks yet</p>
      <router-link to="/artworkUpload">
        <BaseButton variant="primary">Upload Your First Artwork</BaseButton>
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="artwork in artworks"
        :key="artwork.id"
        class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="relative aspect-square">
          <img
            :src="getImageUrl(artwork.id)"
            :alt="artwork.artworkName"
            class="w-full h-full object-cover"
          />
          <div class="absolute top-2 right-2 flex gap-2">
            <span :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              artwork.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            ]">
              {{ artwork.verified ? 'Verified' : 'Pending' }}
            </span>
          </div>
        </div>

        <div class="p-4">
          <h3 class="font-semibold text-gray-900 mb-2">{{ artwork.artworkName }}</h3>
          <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ artwork.artworkDescription }}</p>
          
          <div class="flex items-center justify-between mb-4">
            <span class="text-lg font-bold text-gray-900">${{ artwork.price }}</span>
            <div class="flex items-center gap-1">
              <i class="fas fa-star text-yellow-400"></i>
              <span class="text-sm text-gray-600">{{ artwork.averageRating || 0 }}</span>
            </div>
          </div>

          <div class="flex gap-2">
            <BaseButton variant="outline" size="sm" full-width @click="editArtwork(artwork)">
              <i class="fas fa-edit mr-1"></i>
              Edit
            </BaseButton>
            <BaseButton variant="danger" size="sm" @click="confirmDelete(artwork)">
              <i class="fas fa-trash"></i>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <BaseModal v-model="showDeleteModal" title="Delete Artwork" size="sm">
      <p class="text-gray-700">Are you sure you want to delete this artwork? This action cannot be undone.</p>
      
      <template #footer>
        <BaseButton variant="secondary" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" @click="handleDelete" :loading="deleting">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useArtworkStore } from '@/stores/artwork';
import { useNotification } from '@/composables/useNotification';
import { BaseButton, BaseModal, LoadingSpinner } from '@/components/common';

const router = useRouter();
const artworkStore = useArtworkStore();
const { success, error: showError } = useNotification();

const artworks = ref([]);
const loading = ref(false);
const deleting = ref(false);
const showDeleteModal = ref(false);
const selectedArtwork = ref(null);

const getImageUrl = (id) => {
  return `${process.env.VUE_APP_API_BASE_URL}/artworks/${id}/image`;
};

const fetchMyArtworks = async () => {
  loading.value = true;
  try {
    const response = await artworkStore.fetchArtworks({ myArtworks: true });
    artworks.value = response;
  } catch (err) {
    showError('Failed to load artworks');
  } finally {
    loading.value = false;
  }
};

const editArtwork = (artwork) => {
  router.push({ name: 'EditArtwork', params: { id: artwork.id } });
};

const confirmDelete = (artwork) => {
  selectedArtwork.value = artwork;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  deleting.value = true;
  try {
    await artworkStore.deleteArtwork(selectedArtwork.value.id);
    success('Artwork deleted successfully');
    showDeleteModal.value = false;
    await fetchMyArtworks();
  } catch (err) {
    showError('Failed to delete artwork');
  } finally {
    deleting.value = false;
  }
};

onMounted(() => {
  fetchMyArtworks();
});
</script>
