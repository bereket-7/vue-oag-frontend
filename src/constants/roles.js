export const ROLES = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
  ARTIST: 'ARTIST',
  MANAGER: 'MANAGER',
  ORGANIZATION: 'ORGANIZATION'
};

export const ALL_ROLES = Object.values(ROLES);

export function normalizeRole(role) {
  if (!role) return null;
  return String(role).toUpperCase();
}

export function isRole(value, role) {
  return normalizeRole(value) === role;
}
