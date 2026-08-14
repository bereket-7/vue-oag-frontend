import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { getDashboardRouteForRole } from '@/constants/routes';
import { ROLES } from '@/constants/roles';
import { isTokenExpired } from '@/utils/security';

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue') },
  { path: '/allArtwork', name: 'AllArtwork', component: () => import('../views/Artwork/AllArtwork.vue') },
  { path: '/artworkList', name: 'ArtworkList', component: () => import('../views/Artwork/ArtworkList.MODERN.vue') },
  { path: '/recentArtwork', name: 'RecentArtwork', component: () => import('../views/Artwork/RecentArtWork.vue') },
  { path: '/artworks/:id', name: 'ArtworkDetail', component: () => import('../views/Artwork/ArtworkDetail.MODERN.vue') },
  { path: '/artworks/:id/certificate', name: 'ArtworkCertificate', component: () => import('../views/artworks/CertificateView.vue') },
  { path: '/artists/:slug', name: 'ArtistProfile', component: () => import('../views/artists/ArtistProfile.vue') },
  { path: '/search', name: 'Search', component: () => import('../views/search/SearchResults.vue') },
  { path: '/collections', name: 'Collections', component: () => import('../views/collections/CollectionList.vue') },
  { path: '/collections/:slug', name: 'Collection', component: () => import('../views/collections/CollectionPage.vue') },
  { path: '/about', name: 'About', component: () => import('../components/AboutUs.vue') },
  { path: '/contactUs', name: 'ContactUs', component: () => import('../views/ContactUs.MODERN.vue') },
  { path: '/FAQs', name: 'FAQs', component: () => import('../views/User/FAQs.MODERN.vue') },
  { path: '/userLogin', name: 'UserLogin', component: () => import('../views/User/UserLogin.MODERN.vue'), meta: { guestOnly: true }, alias: '/userlogin' },
  { path: '/register', name: 'RegisterUser', component: () => import('../views/User/RegisterUser.MODERN.vue'), meta: { guestOnly: true } },
  { path: '/forgotPassword', name: 'ForgotPassword', component: () => import('../components/ForgotPassword.vue'), meta: { guestOnly: true } },
  { path: '/activateAccount', name: 'ConfirmRegistration', component: () => import('../views/User/ConfirmRegistration.vue') },
  { path: '/signupSuccess', name: 'SignupSuccess', component: () => import('../views/User/SignupSuccess.vue') },
  { path: '/cart', name: 'Cart', component: () => import('../components/cart/ShoppingCart.vue'), meta: { requiresAuth: true } },
  { path: '/wishlist', name: 'WishList', component: () => import('../views/shopping/WishList.MODERN.vue'), meta: { requiresAuth: true } },
  { path: '/checkout', name: 'CheckOut', component: () => import('../views/shopping/CheckOut.vue'), meta: { requiresAuth: true } },
  { path: '/paymentSuccess', name: 'PaymentSuccess', component: () => import('../views/shopping/PaymentSuccess.vue'), meta: { requiresAuth: true } },
  { path: '/paymentError', name: 'PaymentError', component: () => import('../views/shopping/PaymentError.vue'), meta: { requiresAuth: true } },
  { path: '/payment/cancel', name: 'PaymentCancel', component: () => import('../views/shopping/PaypalFail.vue'), meta: { requiresAuth: true } },
  { path: '/account/orders', name: 'OrderHistory', component: () => import('../views/account/OrderHistory.vue'), meta: { requiresAuth: true } },
  { path: '/account/orders/:id', name: 'OrderDetail', component: () => import('../views/account/OrderDetail.vue'), meta: { requiresAuth: true } },
  { path: '/account/collection', name: 'MyCollection', component: () => import('../views/account/MyCollection.vue'), meta: { requiresAuth: true } },
  { path: '/edit-account', redirect: () => {
    const authStore = useAuthStore();
    return { path: getDashboardRouteForRole(authStore.role), query: { tab: 'profile' } };
  }, meta: { requiresAuth: true } },
  { path: '/notifications', name: 'Notifications', component: () => import('../views/User/NotificationList.MODERN.vue'), meta: { requiresAuth: true } },
  { path: '/messages', name: 'Inbox', component: () => import('../views/messages/Inbox.vue'), meta: { requiresAuth: true } },
  { path: '/messages/:threadId', name: 'MessageThread', component: () => import('../views/messages/Thread.vue'), meta: { requiresAuth: true } },
  { path: '/artworkUpload', redirect: { path: '/artistDashboard', query: { tab: 'upload' } }, meta: { requiresAuth: true, roles: [ROLES.ARTIST] } },
  { path: '/customerDashboard', name: 'CustomerDashboard', component: () => import('../views/User/CustomerDashBoard.MODERN.vue'), meta: { requiresAuth: true, roles: [ROLES.CUSTOMER] } },
  { path: '/artistDashboard', name: 'ArtistDashboard', component: () => import('../views/User/ArtistDashboard.MODERN.vue'), meta: { requiresAuth: true, roles: [ROLES.ARTIST] } },
  { path: '/managerDashboard', name: 'ManagerDashboard', component: () => import('../views/Manager/ManagerDashboard.MODERN.vue'), meta: { requiresAuth: true, roles: [ROLES.MANAGER] } },
  { path: '/adminDashboard', name: 'AdminDashboard', component: () => import('../views/Admin/AdminDashboard.MODERN.vue'), meta: { requiresAuth: true, roles: [ROLES.ADMIN] } },
  { path: '/organizationDashboard', name: 'OrganizationDashboard', component: () => import('../views/Organization/OrganizationPanel.MODERN.vue'), meta: { requiresAuth: true, roles: [ROLES.ORGANIZATION] } },
  { path: '/admin/users', name: 'AdminUsers', component: () => import('../views/admin/AdminUserList.vue'), meta: { requiresAuth: true, roles: [ROLES.ADMIN] } },
  { path: '/admin/moderation', name: 'AdminModeration', component: () => import('../views/admin/ModerationQueue.vue'), meta: { requiresAuth: true, roles: [ROLES.ADMIN, ROLES.MANAGER] } },
  { path: '/admin/analytics', name: 'AdminAnalytics', component: () => import('../views/admin/Analytics.vue'), meta: { requiresAuth: true, roles: [ROLES.ADMIN] } },
  { path: '/admin/settings', name: 'AdminSettings', component: () => import('../views/admin/Settings.vue'), meta: { requiresAuth: true, roles: [ROLES.ADMIN] } },
  { path: '/manager/verify-artwork', name: 'VerifyArtwork', component: () => import('../views/admin/VerifyArtworkPage.vue'), meta: { requiresAuth: true, roles: [ROLES.MANAGER] } },
  { path: '/manager/competitions', name: 'ManageCompetition', component: () => import('../views/Manager/ManageCompetition.vue'), meta: { requiresAuth: true, roles: [ROLES.MANAGER] } },
  { path: '/createCompetition', name: 'CreateCompetition', component: () => import('../views/Manager/CreateCompetition.vue'), meta: { requiresAuth: true, roles: [ROLES.MANAGER] } },
  { path: '/displayCompetition', name: 'DisplayCompetition', component: () => import('../views/Manager/DisplayCompetition.vue'), meta: { requiresAuth: true } },
  { path: '/registerCompetitor', name: 'RegisterCompetitor', component: () => import('../views/User/RegisterCompetitor.MODERN.vue'), meta: { requiresAuth: true, roles: [ROLES.ARTIST] } },
  { path: '/vote', name: 'VoteForArtwork', component: () => import('../views/Artwork/VoteForArtwork.vue'), meta: { requiresAuth: true } },
  { path: '/auctions', name: 'AuctionList', component: () => import('../views/auctions/AuctionList.vue') },
  { path: '/auctions/:id', name: 'AuctionDetail', component: () => import('../views/auctions/AuctionDetail.vue') },
  { path: '/manager/auctions/create', name: 'CreateAuction', component: () => import('../views/auctions/CreateAuction.vue'), meta: { requiresAuth: true, roles: [ROLES.MANAGER, ROLES.ARTIST] } },
  { path: '/eventRegister', name: 'EventRegister', component: () => import('../views/Organization/EventRegister.vue'), meta: { requiresAuth: true, roles: [ROLES.ORGANIZATION] } },
  { path: '/updateEvent', name: 'UpdateEvent', component: () => import('../views/Organization/UpdateEvent.vue'), meta: { requiresAuth: true, roles: [ROLES.ORGANIZATION] } },
  { path: '/eventDisplay', name: 'EventDisplay', component: () => import('../views/Organization/EventDisplay.MODERN.vue') },
  { path: '/registerOrganization', name: 'RegisterOrganization', component: () => import('../views/Organization/RegisterOrganization.MODERN.vue'), meta: { requiresAuth: true, roles: [ROLES.ADMIN] } },
  { path: '/displayStandard', name: 'UserStandard', component: () => import('../views/User/UserStandard.MODERN.vue') },
  { path: '/addStandard', name: 'AddStandard', component: () => import('../views/Manager/CompanyStandard.vue'), meta: { requiresAuth: true, roles: [ROLES.MANAGER] } },
  { path: '/sendNotification', name: 'SendNotification', component: () => import('../components/SendNotification.vue'), meta: { requiresAuth: true, roles: [ROLES.MANAGER] } },
  { path: '/submitReport', name: 'SubmitReport', component: () => import('../views/User/SubmitReport.vue'), meta: { requiresAuth: true } },
  { path: '/searchByCategory', name: 'SearchByCategory', component: () => import('../components/SearchArtwork.vue') },
  { path: '/notFound', name: 'NotFound', component: () => import('../components/NotFound.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/notFound' }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.token && isTokenExpired(authStore.token)) {
    authStore.clearAuth();
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next(getDashboardRouteForRole(authStore.role));
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ path: '/userLogin', query: { redirect: to.fullPath } });
  }

  if (to.meta.roles && !authStore.hasAnyRole(to.meta.roles)) {
    return next('/notFound');
  }

  next();
});

export default router;
