<template>
  <form
    class="space-y-3"
    @submit.prevent="submit"
  >
    <div class="flex gap-1">
      <button
        v-for="n in 5"
        :key="n"
        type="button"
        :class="n <= rating ? 'text-yellow-400' : 'text-gray-300'"
        @click="rating = n"
      >
        ★
      </button>
    </div>
    <textarea
      v-model="comment"
      rows="3"
      placeholder="Write a review..."
      class="w-full border rounded-lg p-3 text-sm"
      required
    />
    <BaseButton
      type="submit"
      size="sm"
      :loading="loading"
    >
      Submit Review
    </BaseButton>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useReviewStore } from '@/stores/reviews';
import { useAuthStore } from '@/stores/auth';
import { BaseButton } from '@/components/common';

const props = defineProps({ artworkId: [Number, String] });
const emit = defineEmits(['submitted']);
const reviewStore = useReviewStore();
const authStore = useAuthStore();
const rating = ref(5);
const comment = ref('');
const loading = ref(false);

const submit = async () => {
  loading.value = true;
  await reviewStore.createReview({
    artworkId: Number(props.artworkId),
    userId: authStore.user?.id,
    userName: authStore.user?.firstName || authStore.user?.username,
    rating: rating.value,
    comment: comment.value
  });
  comment.value = '';
  emit('submitted');
  loading.value = false;
};
</script>
