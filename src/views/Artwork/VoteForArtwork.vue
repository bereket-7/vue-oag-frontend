<template>
  <div>
    <h2>Vote for Competitor</h2>
    <div v-if="competition && competitor">
      <h3>Competition: {{ competition.competitionTitle }}</h3>
      <h4>Competitor: {{ competitor.firstName }} {{ competitor.lastName }}</h4>
      <button @click="vote">
        Vote
      </button>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { competitionService } from '@/services/competitionService';

export default {
  data() {
    return {
      competition: null,
      competitor: null,
      message: '',
    };
  },
  mounted() {
    this.getCompetitionAndCompetitor();
  },
  methods: {
    async getCompetitionAndCompetitor() {
      try {
        const data = await competitionService.getCompetitors();
        this.competition = data.competition;
        this.competitor = data.competitor;
      } catch (error) {
        console.error(error);
      }
    },
    async vote() {
      try {
        await competitionService.vote(this.competition.id, this.competitor.id);
        this.message = 'Thank you for voting!';
      } catch (error) {
        this.message = error.response.data;
      }
    },
  },
};
</script>

