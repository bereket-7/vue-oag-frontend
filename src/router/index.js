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
    component: () => import('../views/Manager/CreateCompetition.vue')
  },
  {
    path: '/registerCompetitor',
    name: 'RegisterCompetitor',
    component: () => import('../views/User/RegisterCompetitor.vue')
  },
  {
    path: '/checkout',
    name: 'CheckOut',
    component: () => import('../views/shopping/CheckOut.vue')
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: () => import('../views/shopping/ShoppingCart.vue')
  },
  {
    path: '/wishlist',
    name: 'WishList',
    component: () => import('../views/shopping/WishList.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/User/LoginPage.vue')
  },
  {
    path: '/signupSuccess',
    name: 'SignupSuccess',
    component: () => import('../views/User/SignupSuccess.vue')
  },
  {
    path: '/register',
    name: 'RegisterUser',
    component: () => import('../views/User/RegisterUser.vue')
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
    component: () => import(/* webpackChunkName: "about" */ '../components/AboutUs.vue')
  },
  {
    path: '/addStandard',
    name: 'AddStandard',
    component: () => import('../views/Manager/AddStandard.vue')
  },
  {
    path: '/verifyArtwork',
    name: 'VerifyArtwork',
    component: () => import('../views/Manager/VerifyArtwork.vue')
  },
  {
    path: '/vote',
    name: 'VoteForArtwork',
    component: () => import('../views/Artwork/VoteForArtwork.vue')
  },
  {
    path: '/userList',
    name: 'UserList',
    component: () => import('../views/Admin/UserList.vue')
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
  }, 

  {
    path: '/userLogin',
    name: 'UserLogin',
    component: () => import('../views/User/UserLogin.vue')
  },
  {
    path: '/submitReport',
    name: 'SubmitReport',
    component: () => import('../views/User/SubmitReport.vue')
  },
  {
    path: '/userReport',
    name: 'UserReport',
    component: () => import('../views/Manager/UserReport.vue')
  },
  {
    path: '/artworkList',
    name: 'ArtworkList',
    component: () => import('../views/Artwork/ArtworkList.vue')
  },
  {
    path: '/artworkDetail',
    name: 'ArtworkDetail',
    component: () => import('../components/ArtworkDetail.vue')
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
  },
  {
    path: '/FAQs',
    name: 'FAQs',
    component: () => import('../views/User/FAQs.vue')
  },
  {
    path: '/UserHeader',
    name: 'UserHeader',
    component: () => import('../views/User/UserHeader.vue')
  },
  


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
