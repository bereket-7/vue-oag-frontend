import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('user');

export const userService = {
  getProfile: () => adapter().getProfile(),
  updateProfile: (data) => adapter().updateProfile(data),
  getNotifications: () => adapter().getNotifications(),
  markNotificationRead: (id) => adapter().markNotificationRead(id),
  getAllUsers: () => adapter().getAllUsers(),
  deleteUser: (id) => adapter().deleteUser(id),
  getByRole: (role) => adapter().getByRole(role),
  deleteMany: (ids) => adapter().deleteMany(ids),
  uploadPhoto: (formData) => adapter().uploadPhoto(formData),
  getPhoto: () => adapter().getPhoto(),
  sendNotification: (data) => adapter().sendNotification(data)
};
