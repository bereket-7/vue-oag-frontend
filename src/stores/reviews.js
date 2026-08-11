import { defineStore } from 'pinia';
import { ref } from 'vue';
import { reviewService } from '@/services/reviewService';

export const useReviewStore = defineStore('reviews', () => {
  const reviews = ref([]);
  const loading = ref(false);

  const fetchByArtwork = async (artworkId) => {
    loading.value = true;
    try {
      reviews.value = await reviewService.getByArtwork(artworkId);
      return reviews.value;
    } finally {
      loading.value = false;
    }
  };

  const createReview = async (data) => {
    const review = await reviewService.create(data);
    reviews.value.unshift(review);
    return review;
  };

  return { reviews, loading, fetchByArtwork, createReview };
});
