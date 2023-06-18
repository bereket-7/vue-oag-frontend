<template>
    <div>
      <button type="button" class="btn btn-danger" @click="showConfirmationDialog">Logout</button>
      <!-- Confirmation Dialog -->
      <div v-if="showDialog" class="dialog">
        <div class="dialog-content">
          <p>Are you sure you want to log out?</p>
          <button type="button" class="btn btn-success" @click="logout">Yes</button>
          <button type="button" class="btn btn-secondary" @click="hideConfirmationDialog">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LogOut',
    data() {
      return {
        showDialog: false
      }
    },
    methods: {
      showConfirmationDialog() {
        this.showDialog = true;
      },
      hideConfirmationDialog() {
        this.showDialog = false;
      },
      logout() {
        this.hideConfirmationDialog();
      }
    }
  }
  </script>
  
  <style scoped>
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dialog-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
  }
  
  .dialog-content p {
    margin: 0 0 10px;
  }
  
  .dialog-content button {
    margin: 0 5px;
  }
  </style>
  