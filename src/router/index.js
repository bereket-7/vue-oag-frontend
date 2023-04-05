import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const routes = [
  //{
  //path: '/',
  //name: 'home',
  //component: HomeView
  //},
  {
    path: '/',
    name: 'DashboardView',
    // component: Dashboard
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/userSignUp',
    name: 'UserSignUp',
    component: () => import('../views/User/UserSignUp.vue')
  },
  {
    path: '/userLogin',
    name: 'UserLogin',
    component: () => import('../views/User/UserLogin.vue')
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
