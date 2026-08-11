import { ROLES } from './roles';

export const DASHBOARD_ROUTES = {
  [ROLES.ADMIN]: '/adminDashboard',
  [ROLES.CUSTOMER]: '/customerDashboard',
  [ROLES.ARTIST]: '/artistDashboard',
  [ROLES.MANAGER]: '/managerDashboard',
  [ROLES.ORGANIZATION]: '/organizationDashboard'
};

export function getDashboardRouteForRole(role) {
  return DASHBOARD_ROUTES[role] || '/';
}
