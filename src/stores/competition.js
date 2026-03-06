import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/services/api';

export const useCompetitionStore = defineStore('competition', () => {
  const competitions = ref([]);
  const currentCompetition = ref(null);
  const loading = ref(false);

  const fetchCompetitions = async () => {
    loading.value = true;
    try {
      const response = await api.get('/competitions');
      competitions.value = response.data;
      return response.data;
    } finally {
      loading.value = false;
    }
  };

  const fetchCompetitionById = async (id) => {
    loading.value = true;
    try {
      const response = await api.get(`/competitions/${id}`);
      currentCompetition.value = response.data;
      return response.data;
    } finally {
      loading.value = false;
    }
  };

  const createCompetition = async (competitionData) => {
    const response = await api.post('/competitions', competitionData);
    competitions.value.unshift(response.data);
    return response.data;
  };

  const registerForCompetition = async (competitionId, artworkId) => {
    const response = await api.post(`/competitions/${competitionId}/register`, { artworkId });
    return response.data;
  };

  const voteForArtwork = async (competitionId, artworkId) => {
    const response = await api.post(`/competitions/${competitionId}/vote`, { artworkId });
    return response.data;
  };

  return {
    competitions,
    currentCompetition,
    loading,
    fetchCompetitions,
    fetchCompetitionById,
    createCompetition,
    registerForCompetition,
    voteForArtwork
  };
});
