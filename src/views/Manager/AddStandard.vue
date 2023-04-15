<template>
      <form class="vh-200">
        <div class="container h-150">
        <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-9">
          <h1 class="text-dark mb-4">Add Standard</h1>

        <div class="card">
          <div class="card-body bg-light">

        <div class="input-group flex-nowrap py-3">
          <span class="input-group-text" for="standardDescription">Standard Description</span>
          <textarea type="text" class="form-control form-control-lg" id="standardDescription" rows="3" 
          v-model="standardDescription"></textarea>
        </div>

        <div class="input-group flex-nowrap pt-2 mb-2">
                  <label class="input-group-text" for="standardType">Standard Type</label>
                  <select class="form-select" id="standardType"  v-model="standardType">
                    <option value="organizational" selected>Organizational</option>
                    <option value="artwork">Artwork</option>
                    <option value="customer">customer</option>
                  </select>
        </div>

        <hr class="mx-n3">
        <div class="px-5 py-4">   
        <button type="submit" class="btn btn-primary btn-lg" 
        @click.prevent="saveStandard()">Add</button>
        </div>
        </div>
</div>
</div>
</div>
</div>
</form>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      standardDescription: '',
      standardType: '',
    };
  },
  methods: {
    async saveStandard() {
      try {
        const response = await axios.post('http://localhost:8081/standard/add', {
          standardDescription: this.standardDescription,
          standardType: this.standardType,
        });
          console.log(response);
          this.standardDescription= '';
          this.standardType= '';
          alert('Standard uploaded successfully!');
      }
      catch (error) {
        console.error(error);
          alert('error occured while uploading!');
      }
    },
  },
};
</Script>