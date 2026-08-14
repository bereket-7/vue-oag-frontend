<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">
        Live Auctions
      </h1>
      <PageLoader v-if="loading" />
      <div
        v-else
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <router-link
          v-for="auction in auctions"
          :key="auction.id"
          :to="`/auctions/${auction.id}`"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            :src="auction.artwork?.imageUrl"
            :alt="auction.artwork?.title"
            class="w-full h-48 object-cover"
            loading="lazy"
          >
          <div class="p-6">
            <h2 class="font-bold text-lg mb-1">
              {{ auction.artwork?.title }}
            </h2>
            <AuctionCountdown :ends-at="auction.endsAt" />
            <p class="text-2xl font-bold text-purple-600 mt-2">
              {{ formatPrice(auction.currentBid) }}
            </p>
            <span
              :class="statusBadge(auction.status)"
              class="inline-block mt-2 px-2 py-1 rounded text-xs"
            >{{ auction.status }}</span>
          </div>
        </router-link>
      </div>
      <EmptyState
        v-if="!loading && !auctions.length"
        title="No active auctions"
        message="Check back soon for new auctions."
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuctionStore } from '@/stores/auctions';
import { formatPrice } from '@/utils/currency';
import { PageLoader, EmptyState } from '@/components/common';
import AuctionCountdown from '@/components/auctions/AuctionCountdown.vue';

const auctionStore = useAuctionStore();
const { auctions, loading } = storeToRefs(auctionStore);
const statusBadge = (s) => ({ active: 'bg-green-100 text-green-700', ended: 'bg-gray-100 text-gray-700' }[s] || 'bg-blue-100 text-blue-700');
onMounted(() => auctionStore.fetchAuctions());
</script>
