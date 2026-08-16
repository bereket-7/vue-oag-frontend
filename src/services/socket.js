import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { isMockMode } from '@/services/adapters';

let client = null;

function notificationUrl() {
  const origin = process.env.VUE_APP_SOCKET_URL || 'http://localhost:8088';
  return `${origin.replace(/\/$/, '')}/ws/notifications`;
}

export function connectNotifications(onMessage) {
  if (isMockMode()) return null;
  disconnectNotifications();
  const token = localStorage.getItem('token');
  const url = notificationUrl();
  const handshake = token ? `${url}?token=${encodeURIComponent(token)}` : url;

  client = new Client({
    webSocketFactory: () => new SockJS(handshake),
    connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    reconnectDelay: 5000,
    onConnect: () => {
      const handler = (frame) => {
        try {
          onMessage(JSON.parse(frame.body));
        } catch {
          onMessage({ message: frame.body, type: 'info', createdAt: new Date().toISOString() });
        }
      };
      client.subscribe('/user/queue/notifications', handler);
      client.subscribe('/topic/global', handler);
    }
  });
  client.activate();
  return client;
}

export function disconnectNotifications() {
  if (client) {
    try {
      client.deactivate();
    } catch {
      /* ignore */
    }
    client = null;
  }
}

export function getSocket() {
  return client;
}
