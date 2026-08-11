import { defineStore } from 'pinia';
import { ref } from 'vue';
import { artistService } from '@/services/artistService';

export const useArtistStore = defineStore('artists', () => {
  const artists = ref([]);
  const currentArtist = ref(null);
  const followedArtists = ref([]);
  const loading = ref(false);

  const fetchArtists = async () => {
    loading.value = true;
    try {
      artists.value = await artistService.getAll();
      return artists.value;
    } finally {
      loading.value = false;
    }
  };

  const fetchArtistBySlug = async (slug) => {
    loading.value = true;
    try {
      currentArtist.value = await artistService.getBySlug(slug);
      return currentArtist.value;
    } finally {
      loading.value = false;
    }
  };

  const followArtist = async (artistId, userId) => {
    followedArtists.value = await artistService.follow(artistId, userId);
  };

  const unfollowArtist = async (artistId) => {
    followedArtists.value = await artistService.unfollow(artistId);
  };

  const fetchFollowed = async () => {
    followedArtists.value = await artistService.getFollowed();
  };

  return { artists, currentArtist, followedArtists, loading, fetchArtists, fetchArtistBySlug, followArtist, unfollowArtist, fetchFollowed };
});
