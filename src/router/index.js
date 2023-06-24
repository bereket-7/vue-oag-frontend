import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/utils/auth'; 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
  path: '/customerDashboard', 
  name: 'Customer Dashboard',
  component: () => import('../views/User/CustomerDashBoard2.vue'),
  //meta: { requiresAuth: true }
},
{
  path: '/artistDashboard',
  name: 'Artist Dashboard',
  component: () => import('../views/User/ArtistPage.vue'),
  //meta: { requiresAuth: true }
},
{
  path: '/profilePicture',
  name: 'Profile Picture',
  component: () => import('../components/ProfilePicture.vue'),
  meta: { requiresAuth: true }
},

  {
    path: '/managerDashboard',
    name: 'Manager Dashboard',
    component: () => import('../views/Manager/ManagerDashboard.vue'),
    //meta: { requiresAuth: true }
  },
  {
    path: '/eventRegister',
    name: 'eventRegister',
    component: () => import('../views/Organization/EventRegister.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/updateEvent',
    name: 'updateEvent',
    component: () => import('../views/Organization/UpdateEvent.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/eventDisplay',
    name: 'eventDisplay',
    component: () => import('../views/Organization/EventDisplay.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/eventRequest',
    name: 'EventRequest',
    component: () => import('../views/Manager/EventRequest.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/createCompetition',
    name: 'CreateCompetition',
    component: () => import('../views/Manager/CreateCompetition.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/manageCompetition',
    name: 'ManageCompetition',
    component: () => import('../views/Manager/ManageCompetition.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/createBid',
    name: 'CreateBid',
    component: () => import('../views/Bidding/CreateBid.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/registerCompetitor',
    name: 'RegisterCompetitor',
    component: () => import('../views/User/RegisterCompetitor.vue'),
    meta: { requiresAuth: true }

  },
  {
    path: '/displayCompetitor',
    name: 'DisplayCompetitor',
    component: () => import('../views/Manager/DisplayCompetitor.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/checkout',
    name: 'CheckOut',
    component: () => import('../views/shopping/CheckOut.vue')
  },
  {
    path: '/cart',
    name: 'CartItems',
    component: () => import('../components/CartItems.vue'),
    meta: { requiresAuth: true }
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
    path: '/edit-account',
    name: 'AccountDetail',
    component: () => import('../views/User/ProfileSetting.vue')
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
    path: '/sendNotification',
    name: 'SendNotification',
    component: () => import('../components/SendNotification.vue')
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
    path: '/artistDashboard',
    name: 'ArtistDashboard',
    component: () => import('../views/User/ArtistDashboard.vue')
  },
  {
    path: '/recentArtwork',
    name: 'RecentArtwork',
    component: () => import('../views/Artwork/RecentArtWork.vue'),
  },
  {
    path: '/verifyArtwork',
    name: 'VerifyArtwork',
    component: () => import('../views/Manager/VerifyArtwork.vue'),
    meta: { requiresAuth: true }
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
    component: () => import('../views/Admin/UserList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/adminDashboard',
    name: 'AdminDashboard',
    component: () => import('../views/Admin/AdminDashboard.vue')
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
    path: '/displayCompetition',
    name: 'DisplayCompetition',
    component: () => import('../views/Manager/DisplayCompetition.vue')
  },
  {
    path: '/allArtwork',
    name: 'AllArtwork',
    component: () => import('../views/Artwork/AllArtwork.vue')
  },
  {
    path: '/registerOrganization',
    name: 'RegisterOrganization',
    component: () => import('../views/Organization/RegisterOrganization.vue'),
    meta: { requiresAuth: true }
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
    component: () => import('../views/Artwork/UploadArtwork.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/artworkDetail',
    name: 'Artworkdetail',
    component: () => import('../components/ArtworkDetail.vue')
  },
  {
    path: '/logout',
    name: 'LogOut',
    component: () => import('../components/LogOut.vue'),
    meta: { requiresAuth: true }
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
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ path: '/userLogin' }); 
  } else {
    next();
  }
});
export default router