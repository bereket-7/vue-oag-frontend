<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <h3 class="text-lg font-semibold mb-4">
      Reviews
    </h3>
    <ReviewForm
      v-if="authStore.isAuthenticated"
      :artwork-id="artworkId"
      @submitted="loadReviews"
    />
    <div class="space-y-4 mt-4">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="border-b pb-4"
      >
        <div class="flex items-center gap-2 mb-1">
          <span class="font-medium">{{ review.userName }}</span>
          <span class="text-yellow-400 text-sm">{{ '★'.repeat(review.rating) }}</span>
        </div>
        <p class="text-gray-600 text-sm">
          {{ review.comment }}
        </p>
      </div>
      <EmptyState
        v-if="!reviews.length"
        title="No reviews yet"
        message="Be the first to review this artwork."
        icon="fas fa-star"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useReviewStore } from '@/stores/reviews';
import { useAuthStore } from '@/stores/auth';
import { EmptyState } from '@/components/common';
import ReviewForm from './ReviewForm.vue';

const props = defineProps({ artworkId: { type: [Number, String], required: true } });
const reviewStore = useReviewStore();
const authStore = useAuthStore();
const { reviews } = storeToRefs(reviewStore);

const loadReviews = () => reviewStore.fetchByArtwork(props.artworkId);
onMounted(loadReviews);
</script>
