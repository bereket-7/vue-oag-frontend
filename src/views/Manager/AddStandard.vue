<template>
  <div class="container">
    <div class="row">

      <div class="col-lg-6">
        <div class="image-container">
          <img :src="require('@/assets/img/quality2.png')" alt="Standards">
        </div>
      </div>



      <div class="col-lg-6">
        <form>
          <div>
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-xl-9">
                <h1 class="text-dark mb-4">Add Standard</h1>
                <div class="card">
                  <div class="card-body bg-light">
                    <div class="input-group flex-nowrap py-3">
                      <span class="input-group-text" for="standardDescription">Standard Description</span>
                      <textarea type="text" class="form-control form-control-lg" id="standardDescription" rows="3" v-model="standardDescription"></textarea>
                    </div>
                    <div class="input-group flex-nowrap pt-2 mb-2">
                      <label class="input-group-text" for="standardType">Standard Type</label>
                      <select class="form-select" id="standardType" v-model="standardType">
                        <option value="organizational" selected>Organizational</option>
                        <option value="artwork">Artwork</option>
                        <option value="customer">Customer</option>
                      </select>
                    </div>
                    <hr class="mx-n3">
                    <div class="px-5 py-4">
                      <button type="submit" class="btn btn-primary btn-lg" @click.prevent="saveStandard()">Add</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer-view/>
</template>

<style scoped>
.container {
  padding-top: 50px;
  margin-top: 50px;
  margin-bottom: 40px;
}

.image-container {
  width:300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
}

@media (max-width: 767px) {
  .container {
    padding-top: 0;
  }

  .row {
    flex-direction: column-reverse;
  }

  .col-lg-6 {
    padding: 15px;
  }
}
</style>



<script>
import FooterView from "@/components/FooterView.vue"
import axios from 'axios';

export default {
  components: {
    FooterView
  },
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