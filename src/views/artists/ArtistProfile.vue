<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <PageLoader v-if="loading" />
    <div
      v-else-if="artist"
      class="container mx-auto px-4 py-8"
    >
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div class="h-48 bg-gradient-to-r from-purple-600 to-indigo-600" />
        <div class="px-8 pb-8 -mt-16">
          <img
            :src="artist.avatar"
            :alt="artist.name"
            class="w-32 h-32 rounded-full border-4 border-white object-cover"
          >
          <div class="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 class="text-3xl font-bold">
                {{ artist.name }} <span
                  v-if="artist.verified"
                  class="text-blue-500 text-lg"
                ><i class="fas fa-check-circle" /></span>
              </h1>
              <p class="text-purple-600">
                {{ artist.specialty }}
              </p>
              <p class="text-gray-600 mt-2 max-w-2xl">
                {{ artist.bio }}
              </p>
            </div>
            <BaseButton
              v-if="authStore.isAuthenticated"
              :variant="isFollowing ? 'outline' : 'primary'"
              @click="toggleFollow"
            >
              {{ isFollowing ? 'Following' : 'Follow' }}
            </BaseButton>
          </div>
        </div>
      </div>
      <h2 class="text-2xl font-bold mb-6">
        Portfolio
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ArtworkCard
          v-for="item in artist.artworks"
          :key="item.id"
          :artwork="item"
          @view-details="$router.push(`/artworks/${item.id}`)"
        />
      </div>
    </div>
    <ErrorState
      v-else
      message="Artist not found"
      :retry="false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArtistStore } from '@/stores/artists';
import { useAuthStore } from '@/stores/auth';
import { usePageMeta } from '@/composables/usePageMeta';
import { useNotification } from '@/composables/useNotification';
import { BaseButton, PageLoader, ErrorState } from '@/components/common';
import ArtworkCard from '@/components/artwork/ArtworkCard.vue';

const route = useRoute();
const artistStore = useArtistStore();
const authStore = useAuthStore();
const { setMeta } = usePageMeta();
const { success } = useNotification();
const loading = ref(true);

const artist = computed(() => artistStore.currentArtist);
const isFollowing = computed(() => artistStore.followedArtists.some((a) => a.id === artist.value?.id));

const toggleFollow = async () => {
  if (isFollowing.value) {
    await artistStore.unfollowArtist(artist.value.id);
  } else {
    await artistStore.followArtist(artist.value.id, authStore.user?.id);
    success('Now following artist!');
  }
};

onMounted(async () => {
  await artistStore.fetchArtistBySlug(route.params.slug);
  setMeta({ pageTitle: artistStore.currentArtist?.name });
  loading.value = false;
});
</script>
