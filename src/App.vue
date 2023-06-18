<template>
 <UserHeader/>
  <router-view/>
</template>

<script>
import UserHeader from '@/views/User/UserHeader.vue'
export default {
  name:'App',
  components:{
UserHeader
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<!-- <template>
  <component :is="navbarComponent" />
  <router-view />
</template>

<script>
import UserHeader from '@/views/User/UserHeader.vue'
import ManagerHeader from '@/views/Manager/ManagerHeader.vue'
import CustomerHeader from '@/views/Customer/CustomerHeader.vue'
import AdminHeader from '@/views/Admin/AdminHeader.vue'

export default {
  name: 'App',
  components: {
    UserHeader,
    ManagerHeader,
    CustomerHeader,
    AdminHeader
  },
  data() {
    return {
      navbarComponent: 'UserHeader' // Default to UserHeader component
    };
  },
  created() {
    // Get user role after login (you need to implement your own logic here)
    const userRole = 'manager'; // Replace with the actual user role

    // Update navbarComponent based on user role
    switch (userRole) {
      case 'manager':
        this.navbarComponent = 'ManagerHeader';
        break;
      case 'customer':
        this.navbarComponent = 'CustomerHeader';
        break;
      case 'admin':
        this.navbarComponent = 'AdminHeader';
        break;
      default:
        this.navbarComponent = 'UserHeader';
    }
  }
};
</script>
 -->