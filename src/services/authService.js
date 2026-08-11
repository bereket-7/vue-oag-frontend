import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('auth');

export const authService = {
  login: (credentials) => adapter().login(credentials),
  register: (userData) => adapter().register(userData),
  logout: () => adapter().logout(),
  forgotPassword: (email) => adapter().forgotPassword(email),
  changePassword: (data) => adapter().changePassword(data)
};
