<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8 max-w-lg">
      <h1 class="text-2xl font-bold mb-6">Create Auction</h1>
      <form @submit.prevent="submit" class="bg-white rounded-xl shadow-md p-8 space-y-4">
        <BaseInput v-model="form.artworkId" label="Artwork ID" type="number" required />
        <BaseInput v-model="form.startPrice" label="Starting Price" type="number" required />
        <BaseInput v-model="form.minIncrement" label="Min Bid Increment" type="number" required />
        <BaseInput v-model="form.endsAt" label="End Date" type="datetime-local" required />
        <BaseButton type="submit" :loading="loading">Create Auction</BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuctionStore } from '@/stores/auctions';
import { useNotification } from '@/composables/useNotification';
import { BaseInput, BaseButton } from '@/components/common';

const router = useRouter();
const auctionStore = useAuctionStore();
const { success } = useNotification();
const loading = ref(false);
const form = ref({ artworkId: '', startPrice: 1000, minIncrement: 50, endsAt: '' });

const submit = async () => {
  loading.value = true;
  const auction = await auctionStore.createAuction({
    artworkId: Number(form.value.artworkId),
    startPrice: Number(form.value.startPrice),
    currentBid: Number(form.value.startPrice),
    minIncrement: Number(form.value.minIncrement),
    startsAt: new Date().toISOString(),
    endsAt: new Date(form.value.endsAt).toISOString()
  });
  success('Auction created!');
  router.push(`/auctions/${auction.id}`);
  loading.value = false;
};
</script>
