import { createRouter, createWebHistory } from 'vue-router'
//import { router } from './router'; 
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
    component: () => import('../views/Organization/EventRegister.vue'),
    meta: {
      requiresAuth: true
    }
  },


  
  {
    path: '/updateEvent',
    name: 'updateEvent',
    component: () => import('../views/Organization/UpdateEvent.vue')
  },
  {
    path: '/eventDisplay',
    name: 'eventDisplay',
    component: () => import('../views/Organization/EventDisplay.vue')
  },
  {
    path: '/eventRequest',
    name: 'EventRequest',
    component: () => import('../views/Manager/EventRequest.vue')
  },
  {
    path: '/createCompetition',
    name: 'CreateCompetition',
    component: () => import('../views/Manager/CreateCompetition.vue')
  },
  {
    path: '/createBid',
    name: 'CreateBid',
    component: () => import('../views/Bidding/CreateBid.vue')
  },
  {
    path: '/registerCompetitor',
    name: 'RegisterCompetitor',
    component: () => import('../views/User/RegisterCompetitor.vue')
  },
  {
    path: '/displayCompetitor',
    name: 'RegisterCompetitor',
    component: () => import('../views/Manager/DisplayCompetitor.vue')
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
    path: '/paymentSuccess',
    name: 'PaypalSuccess',
    component: () => import('../views/shopping/PaypalSuccess.vue')
  },
  {
    path: '/paymentError',
    name: 'PaypalEror',
    component: () => import('../views/shopping/PaymentError.vue')
  },
  {
    path: '/wishlist',
    name: 'WishList',
    component: () => import('../views/shopping/WishList.vue')
  },
  {
    path: '/myaccount',
    name: 'myprofile',
    component: () => import('../components/MyAccount.vue')
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
  {
    path: '/activateAccount',
    name: 'ConfirmRegistration',
    component: () => import('../views/User/ConfirmRegistration.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../components/AboutUs.vue')
  },
  {
    path: '/shopView',
    name: 'ShopView',
    component: () => import(/* webpackChunkName: "about" */ '../components/ShopView.vue')
  },
  {
    path: '/searchByCategory',
    name: 'SearchArtwork',
    component: () => import(/* webpackChunkName: "about" */ '../components/SearchArtwork.vue')
  },
  {
    path: '/notFound',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "about" */ '../components/NotFound.vue')
  },
  {
    path: '/addStandard',
    name: 'AddStandard',
    component: () => import('../views/Manager/CompanyStandard.vue')
  },
  {
    path: '/displayStandard',
    name: 'UserStandard',
    component: () => import('../views/User/UserStandard.vue')
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
    path: '/paypal',
    name: 'PaypalPayment',
    component: () => import('../views/shopping/PaypalPayment.vue')
  },
  {
    path: '/success',
    name: 'PaypalSuccess',
    component: () => import('../views/shopping/PaypalSuccess.vue')
  },
  {
    path: '/cancel',
    name: 'PaypalFail',
    component: () => import('../views/shopping/PaypalFail.vue')
  },
  {
    path: '/userList',
    name: 'UserList',
    component: () => import('../views/Admin/UserList.vue')
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
    component: () => import('../views/Organization/RegisterOrganization.vue')
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
    path: '/FAQs',
    name: 'FAQs',
    component: () => import('../views/User/FAQs.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router