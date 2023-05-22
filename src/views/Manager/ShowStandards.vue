<template>
  <div class="container">
    <h1>Standards List</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="standard in standards" :key="standard.id">
          <td>{{ standard.id }}</td>
          <td>{{ standard.standardDescription}}</td>
          <td>{{ standard.standardType }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="editStandard(standard)"
            >
              Edit
            </button>

            <button
              type="button"
              class="btn btn-danger"
              @click="deleteStandard(standard)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="editModal" tabindex="-1" role="dialog">
      ...
    </div>

    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog">
      ...
    </div>

  </div>  
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      standards: [],
      editedStandard: null,
      deletedStandard: null
    }
  },
  mounted() {
    this.fetchStandards();
  },
  methods: {
    fetchStandards() {
      // Call API to get standards
      axios.get('http://localhost:8081/standard/all')
        .then(response => {
          this.standards = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    editStandard(standard) {
      this.editedStandard = standard;
      // eslint-disable-next-line no-undef
      $('#editModal').modal('show');
    },
    deleteStandard(standard) {
      this.deletedStandard = standard;
      // eslint-disable-next-line no-undef
      $('#deleteModal').modal('show');
    },
    confirmDelete() {
      // Call API to delete standard
      axios.delete(`/api/standards/${this.deletedStandard.id}`)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          // Remove deleted standard from list
          const index = this.standards.indexOf(this.deletedStandard);
          if (index !== -1) {
            this.standards.splice(index, 1);
          }
          // eslint-disable-next-line no-undef
          $('#deleteModal').modal('hide');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}

</script>