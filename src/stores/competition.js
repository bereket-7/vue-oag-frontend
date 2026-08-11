import { defineStore } from 'pinia';
import { ref } from 'vue';
import { competitionService } from '@/services/competitionService';

export const useCompetitionStore = defineStore('competition', () => {
  const competitions = ref([]);
  const currentCompetition = ref(null);
  const loading = ref(false);

  const fetchCompetitions = async () => {
    loading.value = true;
    try {
      competitions.value = await competitionService.getAll();
      return competitions.value;
    } finally {
      loading.value = false;
    }
  };

  const createCompetition = async (data) => {
    const comp = await competitionService.create(data);
    competitions.value.unshift(comp);
    return comp;
  };

  const registerForCompetition = async (competitionId, artworkId) => {
    return competitionService.register(competitionId, artworkId);
  };

  const voteForArtwork = async (competitionId, artworkId) => {
    return competitionService.vote(competitionId, artworkId);
  };

  return { competitions, currentCompetition, loading, fetchCompetitions, createCompetition, registerForCompetition, voteForArtwork };
});
