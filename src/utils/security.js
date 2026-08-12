const MOCK_TOKEN_PREFIX = 'mock-jwt-';

export function parseStoredJson(raw, fallback = null) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/** Same-origin relative path only. Rejects //evil.com, javascript:, https://... */
export function getSafeInternalPath(value, fallback = '/') {
  if (typeof value !== 'string') return fallback;
  const path = value.trim();
  if (!path.startsWith('/')) return fallback;
  if (path.startsWith('//')) return fallback;
  if (path.includes('\\')) return fallback;
  if (/[\s<>'"]/.test(path)) return fallback;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(path)) return fallback;
  return path;
}

export function isSafeExternalUrl(url) {
  if (typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function isMockToken(token) {
  return typeof token === 'string' && token.startsWith(MOCK_TOKEN_PREFIX);
}

/** Decode JWT payload without verifying signature (UI hint only). */
export function decodeJwtPayload(token) {
  if (!token || typeof token !== 'string' || token.split('.').length !== 3) return null;
  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  if (!token) return true;
  if (isMockToken(token)) return false;
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return false;
  return payload.exp * 1000 <= Date.now();
}

export function roleFromToken(token) {
  if (!token) return null;
  if (isMockToken(token)) {
    const id = Number(token.slice(MOCK_TOKEN_PREFIX.length));
    const roles = { 1: 'ADMIN', 2: 'CUSTOMER', 3: 'ARTIST', 4: 'MANAGER', 5: 'ORGANIZATION' };
    return roles[id] || null;
  }
  const payload = decodeJwtPayload(token);
  const raw = payload?.role || payload?.roles?.[0] || payload?.authorities?.[0];
  return raw ? String(raw).toUpperCase().replace(/^ROLE_/, '') : null;
}

export function isStrongPassword(password) {
  if (typeof password !== 'string' || password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  return true;
}

export const PASSWORD_HINT = 'At least 8 characters, with upper, lower, and a number';
