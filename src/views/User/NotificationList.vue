<template>
    <div class="notifications">
      <h2>Notifications</h2>
      <ul v-if="notifications.length > 0">
        <li v-for="notification in notifications" :key="notification.id">
          <span :class="{ 'unread': !notification.read }">{{ notification.message }}</span>
        </li>
      </ul>
      <p v-else>No notifications</p>
    </div>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        notifications: [],
      };
    },
    mounted() {
      this.fetchNotifications();
    },
    methods: {
  fetchNotifications() {
    axios
      .get('http://localhost:8082/notifications')
      .then(response => {
        this.notifications = response.data;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        if (this.notifications.length === 0) {
          this.notifications = [];
        }
      });
  },
},

  };
  </script>
  
  <style scoped>
  .notifications {
    margin-top: 100px;
    padding: 20px;
  }
  
  h2 {
    margin-bottom: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  .unread {
    font-weight: bold;
  }
  </style>
  