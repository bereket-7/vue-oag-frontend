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
      </ul>
    </nav>
    <div class="content">
      <div v-if="activeTab === 'Artists'">
      <ArtistList/>
        <!-- Your My Art content goes here -->
      </div>
      <div v-else-if="activeTab === 'Customers'">
        <CustomerList/>
        <!-- Your Profile content goes here -->
      </div>
      <div v-else-if="activeTab === 'Organization'">
        <OrganizationList/>
      </div>
      <div v-else-if="activeTab === 'Managers'">
        <ManagerList/>
      </div>

      <div v-else-if="activeTab === 'Logout'">
  <button @click="showConfirmationDialog = true">Logout</button> 
  <div v-if="showConfirmationDialog" class="confirmation-dialog">
    <p>Are you sure you want to logout?</p>
    <button @click="logoutUser">Yes</button>
    <button @click="cancelLogout">No</button>
  </div>
</div>

    </div>
  </div>
</template>

<script>
import ArtistList from '@/views/Admin/ArtistList.vue'
import CustomerList from '@/views/Admin/ArtistList.vue'
import OrganizationList from '@/views/Admin/OrganizationList.vue'
import ManagerList from '@/views/Admin/OrganizationList.vue'
import axios from 'axios';
export default {
  components: { 
    ArtistList,
    CustomerList,
    OrganizationList,
    ManagerList
  },
  data() {
    return {
      activeTab: 'My Art',
      tabs: ['Artists', 'Customers', 'Organization', 'Managers', 'Logout'],
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
