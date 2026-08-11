import { io } from 'socket.io-client';
import { isMockMode } from '@/services/adapters';

let socket = null;

export function getSocket() {
  if (isMockMode()) return null;
  if (!socket) {
    socket = io(process.env.VUE_APP_SOCKET_URL || 'http://localhost:8082', {
      autoConnect: false,
      auth: { token: localStorage.getItem('token') }
    });
  }
  return socket;
}

export function connectSocket() {
  const s = getSocket();
  if (s && !s.connected) s.connect();
  return s;
}

export function disconnectSocket() {
  if (socket?.connected) socket.disconnect();
}
