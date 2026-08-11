import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('user');

export const userService = {
  getProfile: (userId) => adapter().getProfile(userId),
  updateProfile: (userId, data) => adapter().updateProfile(userId, data),
  getNotifications: () => adapter().getNotifications(),
  markNotificationRead: (id) => adapter().markNotificationRead(id),
  getAllUsers: () => adapter().getAllUsers(),
  deleteUser: (id) => adapter().deleteUser(id)
};
