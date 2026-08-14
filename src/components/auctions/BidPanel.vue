<template>
  <form
    class="flex gap-3"
    @submit.prevent="placeBid"
  >
    <BaseInput
      v-model="amount"
      type="number"
      :placeholder="`Min ${minBid}`"
      class="flex-1"
    />
    <BaseButton
      type="submit"
      :loading="loading"
    >
      Place Bid
    </BaseButton>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuctionStore } from '@/stores/auctions';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/composables/useNotification';
import { BaseInput, BaseButton } from '@/components/common';

const props = defineProps({ auction: Object });
const emit = defineEmits(['bid-placed']);
const auctionStore = useAuctionStore();
const authStore = useAuthStore();
const { success, error: showError } = useNotification();
const amount = ref('');
const loading = ref(false);

const minBid = computed(() => props.auction.currentBid + props.auction.minIncrement);

const placeBid = async () => {
  loading.value = true;
  try {
    await auctionStore.placeBid(props.auction.id, authStore.user?.id, authStore.user?.firstName || 'Bidder', Number(amount.value));
    success('Bid placed!');
    emit('bid-placed');
  } catch (e) { showError(e.message); }
  finally { loading.value = false; }
};
</script>
