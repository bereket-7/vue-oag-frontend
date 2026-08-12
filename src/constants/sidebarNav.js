import { ROLES } from './roles';
import { getDashboardRouteForRole } from './routes';

const BROWSE = [
  { key: 'home', label: 'Home', icon: 'fas fa-home', to: '/' },
  { key: 'gallery', label: 'Gallery', icon: 'fas fa-images', to: '/allArtwork' },
  { key: 'search', label: 'Search', icon: 'fas fa-search', to: '/search' },
  { key: 'collections', label: 'Collections', icon: 'fas fa-layer-group', to: '/collections' },
  { key: 'auctions', label: 'Auctions', icon: 'fas fa-gavel', to: '/auctions' },
  { key: 'contact', label: 'Contact', icon: 'fas fa-envelope', to: '/contactUs' },
];

function dashTab(role, tab, label, icon) {
  return {
    key: tab,
    label,
    icon,
    to: { path: getDashboardRouteForRole(role), query: { tab } }
  };
}

const ROLE_SECTIONS = {
  [ROLES.ARTIST]: {
    title: 'Artist Studio',
    items: [
      dashTab(ROLES.ARTIST, 'my-art', 'My Artworks', 'fas fa-palette'),
      dashTab(ROLES.ARTIST, 'upload', 'Upload Artwork', 'fas fa-cloud-upload-alt'),
      dashTab(ROLES.ARTIST, 'competition', 'Competitions', 'fas fa-trophy'),
      { key: 'apply-competition', label: 'Apply for Competition', icon: 'fas fa-paper-plane', to: '/registerCompetitor' },
      dashTab(ROLES.ARTIST, 'profile', 'Profile Settings', 'fas fa-user-cog'),
      dashTab(ROLES.ARTIST, 'password', 'Change Password', 'fas fa-lock'),
      dashTab(ROLES.ARTIST, 'events', 'Events', 'fas fa-calendar-alt'),
      dashTab(ROLES.ARTIST, 'notifications', 'Notifications', 'fas fa-bell'),
      dashTab(ROLES.ARTIST, 'standards', 'Standards', 'fas fa-book'),
    ]
  },
  [ROLES.CUSTOMER]: {
    title: 'My Account',
    items: [
      dashTab(ROLES.CUSTOMER, 'overview', 'Overview', 'fas fa-th-large'),
      dashTab(ROLES.CUSTOMER, 'profile', 'Profile Settings', 'fas fa-user-cog'),
      dashTab(ROLES.CUSTOMER, 'password', 'Change Password', 'fas fa-lock'),
      { key: 'wishlist', label: 'Wishlist', icon: 'fas fa-heart', to: '/wishlist' },
      { key: 'cart', label: 'Cart', icon: 'fas fa-shopping-cart', to: '/cart' },
      { key: 'orders', label: 'Orders', icon: 'fas fa-receipt', to: '/account/orders' },
      { key: 'collection', label: 'My Collection', icon: 'fas fa-images', to: '/account/collection' },
      { key: 'messages', label: 'Messages', icon: 'fas fa-envelope-open', to: '/messages' },
    ]
  },
  [ROLES.MANAGER]: {
    title: 'Manager',
    items: [
      { key: 'manager-home', label: 'Dashboard', icon: 'fas fa-tachometer-alt', to: '/managerDashboard' },
      { key: 'verify', label: 'Verify Artwork', icon: 'fas fa-check-circle', to: '/manager/verify-artwork' },
      { key: 'moderation', label: 'Moderation', icon: 'fas fa-flag', to: '/admin/moderation' },
      { key: 'competitions', label: 'Competitions', icon: 'fas fa-trophy', to: '/manager/competitions' },
      { key: 'profile', label: 'Profile', icon: 'fas fa-user-cog', to: '/managerDashboard' },
    ]
  },
  [ROLES.ADMIN]: {
    title: 'Administration',
    items: [
      dashTab(ROLES.ADMIN, 'overview', 'Overview', 'fas fa-tachometer-alt'),
      dashTab(ROLES.ADMIN, 'artists', 'Artists', 'fas fa-palette'),
      dashTab(ROLES.ADMIN, 'customers', 'Customers', 'fas fa-users'),
      dashTab(ROLES.ADMIN, 'organizations', 'Organizations', 'fas fa-building'),
      dashTab(ROLES.ADMIN, 'managers', 'Managers', 'fas fa-user-tie'),
      dashTab(ROLES.ADMIN, 'register-org', 'Register Org', 'fas fa-plus-circle'),
      dashTab(ROLES.ADMIN, 'contact', 'Contact Users', 'fas fa-envelope'),
      { key: 'moderation', label: 'Moderation', icon: 'fas fa-flag', to: '/admin/moderation' },
      { key: 'analytics', label: 'Analytics', icon: 'fas fa-chart-bar', to: '/admin/analytics' },
      { key: 'settings', label: 'Settings', icon: 'fas fa-cog', to: '/admin/settings' },
    ]
  },
  [ROLES.ORGANIZATION]: {
    title: 'Organization',
    items: [
      { key: 'org-home', label: 'Dashboard', icon: 'fas fa-building', to: '/organizationDashboard' },
      { key: 'events', label: 'Events', icon: 'fas fa-calendar-alt', to: '/eventDisplay' },
      { key: 'register-event', label: 'Register Event', icon: 'fas fa-plus-circle', to: '/eventRegister' },
    ]
  }
};

export function getSidebarNav(role) {
  const normalized = role?.toUpperCase();
  const account = ROLE_SECTIONS[normalized];
  return [
    { section: 'Browse', items: BROWSE },
    ...(account ? [{ section: account.title, items: account.items }] : [])
  ];
}

export function getSidebarTitle(role) {
  const titles = {
    [ROLES.ARTIST]: 'Artist Studio',
    [ROLES.CUSTOMER]: 'My Account',
    [ROLES.MANAGER]: 'Manager Panel',
    [ROLES.ADMIN]: 'Admin Panel',
    [ROLES.ORGANIZATION]: 'Organization'
  };
  return titles[role?.toUpperCase()] || 'Account';
}
