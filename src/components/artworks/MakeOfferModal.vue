<template>
  <BaseModal
    :model-value="true"
    title="Make an Offer"
    @close="$emit('close')"
  >
    <form
      class="space-y-4"
      @submit.prevent="submit"
    >
      <p class="text-gray-600">
        Offer for <strong>{{ artwork.title }}</strong> (listed at {{ formatPrice(artwork.price) }})
      </p>
      <BaseInput
        v-model="amount"
        type="number"
        label="Your Offer (USD)"
        required
      />
      <BaseInput
        v-model="message"
        label="Message (optional)"
      />
      <div class="flex gap-3 justify-end">
        <BaseButton
          variant="outline"
          @click="$emit('close')"
        >
          Cancel
        </BaseButton>
        <BaseButton
          type="submit"
          :loading="loading"
        >
          Submit Offer
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue';
import { useOfferStore } from '@/stores/offers';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/composables/useNotification';
import { formatPrice } from '@/utils/currency';
import { BaseModal, BaseButton, BaseInput } from '@/components/common';

const props = defineProps({ artwork: Object });
defineEmits(['close']);
const offerStore = useOfferStore();
const authStore = useAuthStore();
const { success } = useNotification();
const amount = ref('');
const message = ref('');
const loading = ref(false);

const submit = async () => {
  loading.value = true;
  await offerStore.createOffer({
    artworkId: props.artwork.id,
    userId: authStore.user?.id,
    amount: Number(amount.value),
    message: message.value
  });
  success('Offer submitted!');
  loading.value = false;
};
</script>
