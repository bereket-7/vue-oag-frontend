<template>
    <h1>Standards</h1>
 <table class="table table-borderless" v-for="standard in standards" :key="standard.id">
  <thead>
    <tr>
      <!-- <th scope="col">#</th> -->
    </tr>
  </thead>
  <tbody>
    <tr>
      <!-- <th scope="row">1</th> -->
      <td>{{standard.standardDescription}}</td>
    </tr>
  </tbody>
</table>   
</template>

<script>
import axios from 'axios';
export default {
   name:'UserStandard',
   components:{

   },
   data() {
      return {
        standards:[]
      }
    },
    mounted() {
    this.fetchStandard();
  },
    methods: {
    fetchStandard() {
      axios.get('http://localhost:8082/api/standard/all')
        .then(standard => {
          this.standards = standard.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

}
</script>

<style>

</style>