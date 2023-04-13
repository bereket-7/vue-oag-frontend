<template>
    <div class="container">
      <h1>Standards List</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="standard in standards" v-bind:key="standard.id">
            <td>{{ standard.id }}</td>
            <td>{{ standard.standardDescription}}</td>
            <td>{{ standard.standardType}}</td>
            <td>
              <!-- Edit button -->
              <button
                type="button"
                class="btn btn-primary"
                @click="editStandard(standard)"
              >
                Edit
              </button>
  
              <!-- Delete button -->
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
  
      <!-- Modal for editing a standard -->
      <div class="modal fade" id="editModal" tabindex="-1" role="dialog">
        ...
      </div>
  
      <!-- Modal for deleting a standard -->
      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog">
        ...
      </div>
  
    </div>  
  </template>
  
  <script>

  import StandardService from '../services/StandardService';

  export default {
    name: 'ShowStandard',
    data() {
      return {
        standards: [],
        editedStandard: null,
        deletedStandard: null
      }
    },
    mounted() {
      // Fetch standards from API
      this.fetchStandards();
    },
    methods: {
        getStandards(){
            StandardService.getStandards().then((response) => {
                this.standards = response.data;   
            });
        },
    }
  }
  </script>