import { defineStore } from 'pinia';
import { ref } from 'vue';
import { offerService } from '@/services/offerService';

export const useOfferStore = defineStore('offers', () => {
  const offers = ref([]);
  const loading = ref(false);

  const fetchByArtwork = async (artworkId) => {
    offers.value = await offerService.getByArtwork(artworkId);
    return offers.value;
  };

  const createOffer = async (data) => {
    const offer = await offerService.create(data);
    offers.value.unshift(offer);
    return offer;
  };

  const fetchPendingForArtist = async () => {
    offers.value = await offerService.getPendingForArtist();
    return offers.value;
  };

  return { offers, loading, fetchByArtwork, createOffer, fetchPendingForArtist };
});
