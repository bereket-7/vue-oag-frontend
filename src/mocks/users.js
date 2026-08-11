import { ROLES } from '@/constants/roles';

export const MOCK_USERS = [
  { id: 1, username: 'admin', email: 'admin@kelem.art', firstName: 'Admin', lastName: 'User', role: ROLES.ADMIN, password: 'admin123' },
  { id: 2, username: 'customer', email: 'customer@kelem.art', firstName: 'Jane', lastName: 'Collector', role: ROLES.CUSTOMER, password: 'customer123', followedArtistIds: [1, 5] },
  { id: 3, username: 'artist', email: 'artist@kelem.art', firstName: 'Elena', lastName: 'Rodriguez', role: ROLES.ARTIST, password: 'artist123' },
  { id: 4, username: 'manager', email: 'manager@kelem.art', firstName: 'Michael', lastName: 'Manager', role: ROLES.MANAGER, password: 'manager123' },
  { id: 5, username: 'org', email: 'org@kelem.art', firstName: 'Gallery', lastName: 'Org', role: ROLES.ORGANIZATION, password: 'org123' }
];

export const MOCK_CREDENTIALS = {
  admin: { username: 'admin', password: 'admin123' },
  customer: { username: 'customer', password: 'customer123' },
  artist: { username: 'artist', password: 'artist123' },
  manager: { username: 'manager', password: 'manager123' },
  org: { username: 'org', password: 'org123' }
};
