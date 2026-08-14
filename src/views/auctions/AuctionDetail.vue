<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <PageLoader v-if="loading" />
    <div
      v-else-if="auction"
      class="container mx-auto px-4 py-8"
    >
      <div class="grid lg:grid-cols-2 gap-8">
        <img
          :src="auction.artwork?.imageUrl"
          :alt="auction.artwork?.title"
          class="w-full rounded-xl shadow-md"
        >
        <div class="space-y-6">
          <h1 class="text-3xl font-bold">
            {{ auction.artwork?.title }}
          </h1>
          <AuctionCountdown :ends-at="auction.endsAt" />
          <p class="text-3xl font-bold text-purple-600">
            Current Bid: {{ formatPrice(auction.currentBid) }}
          </p>
          <BidPanel
            :auction="auction"
            @bid-placed="refresh"
          />
          <BidHistory :bids="auction.bidHistory" />
          <BaseButton
            variant="outline"
            @click="toggleWatch"
          >
            {{ isWatching ? 'Unwatch' : 'Watch Auction' }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuctionStore } from '@/stores/auctions';
import { useAuthStore } from '@/stores/auth';
import { formatPrice } from '@/utils/currency';
import { PageLoader, BaseButton } from '@/components/common';
import AuctionCountdown from '@/components/auctions/AuctionCountdown.vue';
import BidPanel from '@/components/auctions/BidPanel.vue';
import BidHistory from '@/components/auctions/BidHistory.vue';

const route = useRoute();
const auctionStore = useAuctionStore();
const authStore = useAuthStore();
const { currentAuction: auction, loading } = storeToRefs(auctionStore);

const isWatching = computed(() => auction.value?.watchedBy?.includes(authStore.user?.id));

const refresh = () => auctionStore.fetchAuctionById(route.params.id);
const toggleWatch = async () => {
  if (isWatching.value) await auctionStore.unwatchAuction(route.params.id, authStore.user?.id);
  else await auctionStore.watchAuction(route.params.id, authStore.user?.id);
  refresh();
};

onMounted(refresh);
</script>
