<template>
  <div class="dashboard">
    <nav class="sidebar">
      <div class="sidebar-header">
        <h3>Artist Dashboard</h3>
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
      <div v-if="activeTab === 'My Art'">
        <MyArt />
      </div>
      <div v-else-if="activeTab === 'Profile'">
        <ProfileSetting />
      </div>
      <div v-else-if="activeTab === 'Competition'">
        <DisplayCompetition />
      </div>
      <div v-else-if="activeTab === 'Upload Artwork'">
        <ArtworkUpload />
      </div>
      <div v-else-if="activeTab === 'Change Password'">
        <AboutUs />
      </div>
      <div v-else-if="activeTab === 'Events'">
        <EventDisplay />
      </div>
      <div v-else-if="activeTab === 'Notification'">
        <NotificationList />
      </div>
  
      <div v-else-if="activeTab === 'Standard'">
        <UserStandard />
      </div>
    </div>
  </div>
</template>

<script>
import NotificationList from '@/views/User/NotificationList.vue'
import AboutUs from '@/components/AboutUs.vue';
import EventDisplay from '@/views/Organization/EventDisplay.vue'
import ProfileSetting from '@/views/User/ProfileSetting.vue'
import MyArt from '@/views/Artwork/MyArt.vue';
import ArtworkUpload from '@/views/Artwork/ArtworkUpload.vue';
import DisplayCompetition from '@/views/Manager/DisplayCompetition.vue';
import UserStandard from '@/views/User/UserStandard.vue';

import axios from 'axios';

export default {
  components: {
    AboutUs,
    ArtworkUpload,
    MyArt,
    DisplayCompetition,
    ProfileSetting,
    EventDisplay,
    UserStandard,
    NotificationList
  },
  data() {
    return {
      activeTab: 'Profile',
      tabs: ['My Art', 'Profile', 'Competition', 'Change Password', 'Upload Artwork', 'Events','Notification', 'Standard'],
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
  