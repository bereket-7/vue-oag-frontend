<template>
  <div class="standards-table">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="standard in standards" :key="standard.id">
          <td>{{ standard.id }}</td>
          <td>{{ standard.standardDescription }}</td>
          <td>{{ standard.standardType }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      standards: [],
    };
  },
  mounted() {
    this.fetchStandards();
  },
  methods: {
    fetchStandards() {
      axios
        .get('http://localhost:8082/api/standards')
        .then(response => {
          this.standards = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};

</script>

<style scoped>
.standards-table {
  margin-top: 20px;
}
</style>
