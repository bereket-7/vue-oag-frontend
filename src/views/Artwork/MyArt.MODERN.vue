<template>
  <div>
    <PageHeader title="My Artworks" subtitle="Manage your portfolio and track verification status" eyebrow="Portfolio">
      <template #actions>
        <button type="button" class="btn-primary" @click="$emit('upload')">
          <i class="fas fa-plus mr-2" />Upload New
        </button>
      </template>
    </PageHeader>

    <PageLoader v-if="loading" />

    <EmptyState
      v-else-if="!artworks.length"
      title="No artworks yet"
      message="Start building your portfolio by uploading your first piece."
      icon="fas fa-palette"
    >
      <button type="button" class="btn-primary mt-4" @click="$emit('upload')">
        Upload Your First Artwork
      </button>
    </EmptyState>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="artwork in artworks"
        :key="artwork.id"
        class="artwork-card group"
      >
        <div class="relative aspect-[4/3] overflow-hidden">
          <img
            :src="artwork.imageUrl || artwork.image || `https://picsum.photos/seed/${artwork.id}/600/450`"
            :alt="artwork.title || artwork.artworkName"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span
            class="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-sm"
            :class="statusClass(artwork)"
          >
            {{ statusLabel(artwork) }}
          </span>
        </div>

        <div class="p-5">
          <h3 class="font-bold text-gray-900 dark:text-white mb-1 truncate">{{ artwork.title || artwork.artworkName }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{{ artwork.description || artwork.artworkDescription }}</p>

          <div class="flex items-center justify-between mb-4">
            <span class="text-lg font-bold text-purple-600 dark:text-purple-400">${{ formatPrice(artwork.price) }}</span>
            <div class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <i class="fas fa-star text-amber-400" />
              {{ artwork.rating || artwork.averageRating || '—' }}
            </div>
          </div>

          <div class="flex gap-2">
            <button type="button" class="btn-outline flex-1" @click="viewArtwork(artwork)">
              <i class="fas fa-eye mr-1.5" />View
            </button>
            <button type="button" class="btn-danger-icon" aria-label="Delete" @click="confirmDelete(artwork)">
              <i class="fas fa-trash" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <BaseModal v-model="showDeleteModal" title="Delete Artwork" size="sm">
      <p class="text-gray-700 dark:text-gray-300">Are you sure you want to delete <strong>{{ selectedArtwork?.title || selectedArtwork?.artworkName }}</strong>? This cannot be undone.</p>
      <template #footer>
        <BaseButton variant="secondary" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" :loading="deleting" @click="handleDelete">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { artworkService } from '@/services/artworkService';
import { useNotification } from '@/composables/useNotification';
import { BaseButton, BaseModal, PageLoader, EmptyState, PageHeader } from '@/components/common';

defineEmits(['upload']);

const router = useRouter();
const { success, error: showError } = useNotification();

const artworks = ref([]);
const loading = ref(false);
const deleting = ref(false);
const showDeleteModal = ref(false);
const selectedArtwork = ref(null);

const formatPrice = (price) => {
  if (typeof price === 'number') return price.toLocaleString();
  return String(price || '0').replace(/[^0-9.]/g, '');
};

const statusLabel = (artwork) => {
  if (artwork.status === 'published' || artwork.verified) return 'Verified';
  if (artwork.status === 'rejected') return 'Rejected';
  return 'Pending';
};

const statusClass = (artwork) => {
  if (artwork.status === 'published' || artwork.verified) return 'bg-green-500/90 text-white';
  if (artwork.status === 'rejected') return 'bg-red-500/90 text-white';
  return 'bg-amber-500/90 text-white';
};

const fetchMyArtworks = async () => {
  loading.value = true;
  try {
    artworks.value = await artworkService.getAll({ myArtworks: true });
  } catch {
    artworks.value = await artworkService.getAll({});
  } finally {
    loading.value = false;
  }
};

const viewArtwork = (artwork) => router.push(`/artworks/${artwork.id}`);

const confirmDelete = (artwork) => {
  selectedArtwork.value = artwork;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  deleting.value = true;
  try {
    await artworkService.delete(selectedArtwork.value.id);
    success('Artwork deleted');
    showDeleteModal.value = false;
    await fetchMyArtworks();
  } catch {
    showError('Failed to delete artwork');
  } finally {
    deleting.value = false;
  }
};

onMounted(fetchMyArtworks);
</script>

<style scoped>
.artwork-card { @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300; }
.btn-primary { @apply inline-flex items-center px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/20 transition-all text-sm; }
.btn-outline { @apply inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all; }
.btn-danger-icon { @apply inline-flex items-center justify-center w-10 h-10 rounded-xl text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all; }
</style>
