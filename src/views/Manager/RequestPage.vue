<template>
    <div>
      <h1>Requests</h1>
  
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Artwork</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(request, index) in requests" :key="request.id">
            <td>{{ index + 1 }}</td>
            <td>{{ request.user }}</td>
            <td>{{ request.artwork }}</td>
            <td>
              <button class="btn btn-success" @click="acceptRequest(request.id)">
                Accept
              </button>
              <button class="btn btn-danger" @click="rejectRequest(request.id)">
                Reject
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'RequestPage',
    data() {
      return {
        requests: [
          {
            id: 1,
            user: 'John Doe',
            artwork: 'Mona Lisa',
          },
          {
            id: 2,
            user: 'Jane Smith',
            artwork: 'Starry Night',
          },
        ],
      }
    },
    methods: {
      acceptRequest() {
        // perform accept request action here
      },
      rejectRequest() {
        // perform reject request action here
      },
    },
    })
  </script>