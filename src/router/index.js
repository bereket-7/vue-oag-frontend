import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/eventRegister',
    name: 'eventRegister',
    component: () => import('../views/Organization/EventRegister.vue')
  },
  {
    path: '/createCompetition',
    name: 'CreateCompetition',
    component: () => import('../views/Competition/CreateCompetition.vue')
  },
  {
    path: '/registerCompetitor',
    name: 'RegisterCompetitor',
    component: () => import('../views/Competition/RegisterCompetitor.vue')
  },
  /*{
    path: '/',
    name: 'DashboardView',
    // component: Dashboard
    component: () => import('../views/DashboardView.vue')
  },*/
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/addStandard',
    name: 'AddStandard',
    component: () => import('../views/Manager/AddStandard.vue')
  },
  {
    path: '/addStandard',
    name: 'AddStandard',
    component: () => import('../views/Manager/AddStandard.vue')
  },
  {
    path: '/requestPage',
    name: 'RequestPage',
    component: () => import('../views/Manager/RequestPage.vue')
  },
  {
    path: '/managerPanel',
    name: 'ManagerPanel',
    component: () => import('../views/Manager/ManagerPanel.vue')
  },
  {
    path: '/showStandard',
    name: 'ShowStandard',
    component: () => import('../views/Manager/ShowStandards.vue')
  },
  {
    path: '/contactUser',
    name: 'ContactUser',
    component: () => import('../views/Manager/ContactUser.vue')
  },
  {
    path: '/userSignUp',
    name: 'UserSignUp',
    component: () => import('../views/User/UserSignUp.vue')
  }, {
    path: '/customerDashboard',
    name: 'CustomerDashboard',
    component: () => import('../views/User/CustomerDashboard.vue')
  },

  {
    path: '/userLogin',
    name: 'UserLogin',
    component: () => import('../views/User/UserLogin.vue')
  },
  {
    path: '/artworkList',
    name: 'ArtworkList',
    component: () => import('../views/Artwork/ArtworkList.vue')
  },
  {
    path: '/registerOrganization',
    name: 'RegisterOrganization',
    component: () => import('../views/User/RegisterOrganization.vue')
  },
  {
    path: '/contactUs',
    name: 'ContactUs',
    component: () => import('../views/ContactUs.vue')
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: () => import('../components/ForgotPassword.vue')
  }, {
    path: '/organizationLogin',
    name: 'OrganizationLogin',
    component: () => import('../views/Organization/OrganizationLogin.vue')
  },
  {
    path: '/uploadArtwork',
    name: 'UploadArtwork',
    component: () => import('../views/Artwork/UploadArtwork.vue')
  },
  {
    path: '/artworkDetail',
    name: 'Artworkdetail',
    component: () => import('../components/ArtworkDetail.vue')
  },
  {
    path: '/logout',
    name: 'LogOut',
    component: () => import('../components/LogOut.vue')
  },
  {
    path: '/adminPanel',
    name: 'AdminPanel',
    component: () => import('../views/Admin/AdminPanel.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
