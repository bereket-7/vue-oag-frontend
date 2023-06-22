<template>
  <div>
    <h2>Vote for Competitor</h2>
    <div v-if="competition && competitor">
      <h3>Competition: {{ competition.competitionTitle }}</h3>
      <h4>Competitor: {{ competitor.firstName }} {{ competitor.lastName }}</h4>
      <button @click="vote">Vote</button>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      competition: null,
      competitor: null,
      message: '',
    };
  },
  methods: {
    async getCompetitionAndCompetitor() {
      try {
        const response = await axios.get('/api/competition-competitor-data');
        this.competition = response.data.competition;
        this.competitor = response.data.competitor;
      } catch (error) {
        console.error(error);
      }
    },
    async vote() {
      try {
        await axios.post('/api/competitors/vote', {
          competitionId: this.competition.id,
          competitorId: this.competitor.id,
        });
        this.message = 'Thank you for voting!';
      } catch (error) {
        this.message = error.response.data;
      }
    },
  },
  mounted() {
    this.getCompetitionAndCompetitor();
  },
};
</script>

