<template>
  <div class="dashboard">
    <nav class="sidebar">
      <div class="sidebar-header">
        <h3>Manager Dashboard</h3>
      </div>
      <ul class="sidebar-menu">
        <li class="sidebar-menu-item" v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === tab }">
          <a @click="changeTab(tab)">{{ tab }}</a>
        </li>
        <li class="sidebar-menu-item logout">
          <button @click="showConfirmationDialog = true"><i class="fas fa-sign-out-alt"></i></button>
          <div v-if="showConfirmationDialog" class="confirmation-dialog">
            <p>Are you sure you want to logout?</p>
            <button @click="logoutUser">Yes</button>
            <button @click="cancelLogout">No</button>
          </div>
        </li>
      </ul>
    </nav>
    <div class="content">
      <div v-if="activeTab === 'Art Request'">
        <VerifyArtwork />
      </div>
      <div v-else-if="activeTab === 'Profile'">
        <ProfileSetting />
      </div>
      <div v-else-if="activeTab === 'Competition'">
        <DisplayCompetition />
      </div>
      <div v-else-if="activeTab === 'Create Competition'">
        <CreateCompetition />
      </div>
      <div v-else-if="activeTab === 'Send Notification'">
        <SendNotification />
      </div>
      <div v-else-if="activeTab === 'Manage Standard'">
        <ManageStandards />
      </div>
      <div v-else-if="activeTab === 'Event Request'">
        <EventDisplay />
      </div>
  
    
    </div>
  </div>
</template>

<script>
import EventDisplay from '@/views/Organization/EventDisplay.vue'
import ProfileSetting from '@/views/User/ProfileSetting.vue'
import DisplayCompetition from '@/views/Manager/DisplayCompetition.vue';
import VerifyArtwork from '@/views/Manager/VerifyArtwork.vue';
import ManageStandards from '@/components/ManageStandards.vue';
import SendNotification from '@/components/SendNotification.vue';
import CreateCompetition from '@/views/Manager/CreateCompetition.vue';
import axios from 'axios';

export default {
  components: {
    CreateCompetition,
    DisplayCompetition,
    ProfileSetting,
    EventDisplay,
    VerifyArtwork,
     SendNotification,
     ManageStandards
},
  data() {
    return {
      activeTab: 'Profile',
      tabs: ['Art Request', 'Profile', 'Competition', 'Verify Artwork', 'Event Request','Send Notification','Create Competition', 'Manage Standard'],
      showConfirmationDialog: false,
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
    },
    logoutUser() {
      axios
        .get('http://localhost:8082/api/logout')
        .then(response => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userInfo');
          this.$router.push('/userLogin');
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    cancelLogout() {
      this.showConfirmationDialog = false;
    },
  },
};
</script>
  













  <style scoped>
  .dashboard {
    display: flex;
    flex-direction: row;
    margin-top: 100px;
  }
  
  .sidebar {
    width: 250px;
    background-color: #333;
    color: #fff;
  }
  
  .sidebar-header {
    padding: 20px;
    background-color: #222;
  }
  
  .sidebar-header h3 {
    margin: 0;
    font-size: 20px;
  }
  
  .sidebar-menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar-menu-item {
    padding: 10px 20px;
    transition: background-color 0.3s ease;
  }
  
  .sidebar-menu-item a {
    color: #fff;
    text-decoration: none;
  }
  
  .sidebar-menu-item.active {
    background-color: #555;
  }
  .sidebar-menu-item.logout {
  position: relative;
}

.sidebar-menu-item.logout button {
  border: none;
  background: transparent;
  color: #fff;
  cursor: pointer;
  padding: 0;
}

.confirmation-dialog {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #555;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.confirmation-dialog p {
  color: #fff;
  margin: 0 0 10px;
}

.confirmation-dialog button {
  margin: 5px;
  padding: 5px 10px;
}
  
.sidebar-menu-item.logout {
  display: flex;
  transition: background-color 0.3s ease;
}

.sidebar-menu-item.logout button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #da0b0b;
  font-size: 20px;
}

.sidebar-menu-item.logout button:hover {
  color: #ccc;
}
  .content {
    flex: 1;
    padding: 20px;
  }
  
  @media screen and (max-width: 768px) {
    .dashboard {
      flex-direction: column;
    }
  
    .sidebar {
      width: 100%;
      margin-bottom: 20px;
    }
  }
  </style>
  