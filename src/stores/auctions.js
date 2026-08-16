import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auctionService } from '@/services/auctionService';

export const useAuctionStore = defineStore('auctions', () => {
  const auctions = ref([]);
  const currentAuction = ref(null);
  const loading = ref(false);

  const fetchAuctions = async () => {
    loading.value = true;
    try {
      auctions.value = await auctionService.getAll();
      return auctions.value;
    } finally {
      loading.value = false;
    }
  };

  const fetchAuctionById = async (id) => {
    loading.value = true;
    try {
      currentAuction.value = await auctionService.getById(id);
      return currentAuction.value;
    } finally {
      loading.value = false;
    }
  };

  const createAuction = async (data) => {
    const auction = await auctionService.create(data);
    auctions.value.unshift(auction);
    return auction;
  };

  const placeBid = async (auctionId, amount) => {
    currentAuction.value = await auctionService.placeBid(auctionId, amount);
    const idx = auctions.value.findIndex((a) => a.id === auctionId);
    if (idx !== -1) auctions.value[idx] = currentAuction.value;
    return currentAuction.value;
  };

  const watchAuction = async (auctionId) => {
    return auctionService.watch(auctionId);
  };

  const unwatchAuction = async (auctionId) => {
    return auctionService.unwatch(auctionId);
  };

  return { auctions, currentAuction, loading, fetchAuctions, fetchAuctionById, createAuction, placeBid, watchAuction, unwatchAuction };
});
