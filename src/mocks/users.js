import { ROLES } from '@/constants/roles';

export const MOCK_USERS = [
  { id: 1, username: 'admin', email: 'admin@kelem.art', firstName: 'Admin', lastName: 'User', role: ROLES.ADMIN, password: 'admin123', phone: '0911000001', address: 'Addis Ababa', status: 'active', joinedAt: '2024-01-10' },
  { id: 2, username: 'customer', email: 'customer@kelem.art', firstName: 'Jane', lastName: 'Collector', role: ROLES.CUSTOMER, password: 'customer123', phone: '0911000002', address: 'Bole, Addis Ababa', status: 'active', joinedAt: '2024-03-15', followedArtistIds: [1, 5] },
  { id: 3, username: 'artist', email: 'artist@kelem.art', firstName: 'Elena', lastName: 'Rodriguez', role: ROLES.ARTIST, password: 'artist123', phone: '0911000003', address: 'Kazanchis', status: 'active', joinedAt: '2024-02-01' },
  { id: 4, username: 'manager', email: 'manager@kelem.art', firstName: 'Michael', lastName: 'Manager', role: ROLES.MANAGER, password: 'manager123', phone: '0911000004', address: 'CMC', status: 'active', joinedAt: '2024-01-20' },
  { id: 5, username: 'org', email: 'org@kelem.art', firstName: 'Gallery', lastName: 'Org', role: ROLES.ORGANIZATION, password: 'org123', phone: '0911000005', address: 'Mexico Square', status: 'active', joinedAt: '2024-04-01' },

  { id: 6, username: 'marcus', email: 'marcus@kelem.art', firstName: 'Marcus', lastName: 'Chen', role: ROLES.ARTIST, password: 'artist123', phone: '0911223344', address: 'Piassa', status: 'active', joinedAt: '2024-05-12' },
  { id: 7, username: 'sophie', email: 'sophie@kelem.art', firstName: 'Sophie', lastName: 'Laurent', role: ROLES.ARTIST, password: 'artist123', phone: '0911334455', address: 'Sarbet', status: 'pending', joinedAt: '2025-11-02' },
  { id: 8, username: 'amara', email: 'amara@kelem.art', firstName: 'Amara', lastName: 'Diallo', role: ROLES.ARTIST, password: 'artist123', phone: '0911445566', address: 'Gerji', status: 'active', joinedAt: '2025-01-18' },
  { id: 9, username: 'yuki', email: 'yuki@kelem.art', firstName: 'Yuki', lastName: 'Tanaka', role: ROLES.ARTIST, password: 'artist123', phone: '0911556677', address: 'Old Airport', status: 'suspended', joinedAt: '2024-08-22' },

  { id: 10, username: 'david', email: 'david@mail.com', firstName: 'David', lastName: 'Bekele', role: ROLES.CUSTOMER, password: 'customer123', phone: '0911667788', address: 'Megenagna', status: 'active', joinedAt: '2025-06-10' },
  { id: 11, username: 'sara', email: 'sara@mail.com', firstName: 'Sara', lastName: 'Haile', role: ROLES.CUSTOMER, password: 'customer123', phone: '0911778899', address: 'Summit', status: 'active', joinedAt: '2025-09-03' },
  { id: 12, username: 'noah', email: 'noah@mail.com', firstName: 'Noah', lastName: 'Williams', role: ROLES.CUSTOMER, password: 'customer123', phone: '0911889900', address: 'Lebu', status: 'pending', joinedAt: '2026-01-14' },
  { id: 13, username: 'fatima', email: 'fatima@mail.com', firstName: 'Fatima', lastName: 'Al-Hassan', role: ROLES.CUSTOMER, password: 'customer123', phone: '0911990011', address: 'Ayat', status: 'active', joinedAt: '2025-12-20' },

  { id: 14, username: 'heritage', email: 'heritage@gallery.et', firstName: 'Heritage', lastName: 'Gallery', role: ROLES.ORGANIZATION, password: 'org123', phone: '0116612345', address: 'National Museum Rd', status: 'active', joinedAt: '2024-06-01' },
  { id: 15, username: 'modernart', email: 'hello@modernart.et', firstName: 'Modern', lastName: 'Arts Center', role: ROLES.ORGANIZATION, password: 'org123', phone: '0116623456', address: 'Bole Atlas', status: 'pending', joinedAt: '2026-02-08' },
  { id: 16, username: 'eastside', email: 'info@eastside.et', firstName: 'Eastside', lastName: 'Collective', role: ROLES.ORGANIZATION, password: 'org123', phone: '0116634567', address: 'CMC Michael', status: 'active', joinedAt: '2025-03-19' },

  { id: 17, username: 'lisa', email: 'lisa@kelem.art', firstName: 'Lisa', lastName: 'Tesfaye', role: ROLES.MANAGER, password: 'manager123', phone: '0912001122', address: 'Kazanchis', status: 'active', joinedAt: '2024-09-11' },
  { id: 18, username: 'kevin', email: 'kevin@kelem.art', firstName: 'Kevin', lastName: 'Owusu', role: ROLES.MANAGER, password: 'manager123', phone: '0912112233', address: 'Bole', status: 'active', joinedAt: '2025-04-05' },
];

export const MOCK_CREDENTIALS = {
  admin: { username: 'admin', password: 'admin123' },
  customer: { username: 'customer', password: 'customer123' },
  artist: { username: 'artist', password: 'artist123' },
  manager: { username: 'manager', password: 'manager123' },
  org: { username: 'org', password: 'org123' }
};
