import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('auth');

export const authService = {
  login: (credentials) => adapter().login(credentials),
  verifyLogin: (data) => adapter().verifyLogin(data),
  register: (userData) => adapter().register(userData),
  verifyRegister: (data) => adapter().verifyRegister(data),
  logout: () => adapter().logout(),
  forgotPassword: (email) => adapter().forgotPassword(email),
  resetPassword: (data) => adapter().resetPassword(data),
  changePassword: (data) => adapter().changePassword(data),
  confirmRegistration: (data) => adapter().confirmRegistration(data),
  refreshToken: (token) => adapter().refreshToken(token)
};
