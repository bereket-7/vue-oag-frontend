import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { normalizeArtwork } from '@/utils/normalizers';
import { parsePrice, formatPrice, calculateTax, calculateShipping } from '@/utils/currency';
import { unwrapEnvelope, isOtpEnvelope, asList, mapUserInfo, resolveMediaUrl } from '@/utils/unwrap';
import { normalizeRole } from '@/constants/roles';
import { getSafeInternalPath, isStrongPassword, isSafeExternalUrl } from '@/utils/security';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

vi.mock('@/router', () => ({
  default: {
    push: () => {},
    currentRoute: { value: { path: '/' } }
  }
}));

vi.mock('@/services/api', () => ({
  default: {
    interceptors: {
      request: { use() {} },
      response: { use() {} }
    }
  }
}));

vi.mock('@/services/socket', () => ({
  connectNotifications: () => null,
  disconnectNotifications: () => {},
  getSocket: () => null
}));

vi.mock('@/services/socket', () => ({
  connectNotifications: () => null,
  disconnectNotifications: () => {},
  getSocket: () => null
}));

const memory = {};
const localStorageMock = {
  getItem: (key) => (Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null),
  setItem: (key, value) => { memory[key] = String(value); },
  removeItem: (key) => { delete memory[key]; },
  clear: () => { Object.keys(memory).forEach((key) => delete memory[key]); }
};
global.localStorage = localStorageMock;

describe('normalizers', () => {
  it('normalizes legacy artwork shape', () => {
    const result = normalizeArtwork({
      id: 1,
      artworkName: 'Test Art',
      price: '$2,500',
      artist: 'Jane Doe',
      averageRating: 4.5,
      artworkCategory: 'Painting'
    });
    expect(result.title).toBe('Test Art');
    expect(result.price).toBe(2500);
    expect(result.artistName).toBe('Jane Doe');
    expect(result.rating).toBe(4.5);
  });

  it('maps imageUrls and slug from the live catalog DTO', () => {
    const result = normalizeArtwork({
      id: 9,
      artworkName: 'Lake',
      price: 1200,
      artistSlug: 'elena-rodriguez',
      imageUrls: ['/upload/images/lake.jpg'],
      status: 'ACCEPTED'
    });
    expect(result.title).toBe('Lake');
    expect(result.artistSlug).toBe('elena-rodriguez');
    expect(result.imageUrl).toContain('/upload/images/lake.jpg');
    expect(result.currency).toBe('ETB');
    expect(result.status).toBe('ACCEPTED');
  });
});

describe('unwrap', () => {
  it('returns content from a GenericResponse envelope', () => {
    expect(unwrapEnvelope({ status: 200, message: 'ok', content: { id: 1 } })).toEqual({ id: 1 });
  });

  it('returns items plus pageable when paging metadata is present', () => {
    const result = unwrapEnvelope({
      status: 200,
      message: 'ok',
      content: [{ id: 1 }],
      pageable: { totalPages: 1, totalElements: 1 }
    });
    expect(result.items).toEqual([{ id: 1 }]);
    expect(result.pageable.totalElements).toBe(1);
  });

  it('detects OTP envelopes with empty content', () => {
    expect(isOtpEnvelope({ message: 'Otp sent' }, [])).toBe(true);
    expect(isOtpEnvelope({ message: 'ok' }, { token: 'abc' })).toBe(false);
  });

  it('flattens pageable objects via asList', () => {
    expect(asList({ items: [1, 2] })).toEqual([1, 2]);
  });

  it('maps UserInfo after unwrap', () => {
    const mapped = mapUserInfo({
      uuid: 'u1',
      token: 'jwt',
      refreshToken: 'r',
      username: 'ada@email',
      fullName: 'Ada Kebede',
      avatarUrl: '/upload/images/a.jpg',
      role: 'CUSTOMER',
      permissions: ['USER_MODIFY_CART']
    });
    expect(mapped.accessToken).toBe('jwt');
    expect(mapped.user.firstName).toBe('Ada');
    expect(mapped.user.email).toBe('ada@email');
  });

  it('prefixes relative media URLs with the API origin', () => {
    expect(resolveMediaUrl('/upload/images/a.jpg')).toBe('http://localhost:8088/upload/images/a.jpg');
  });
});

describe('currency', () => {
  it('parses price strings', () => {
    expect(parsePrice('$2,500')).toBe(2500);
    expect(parsePrice(100)).toBe(100);
  });

  it('formats prices', () => {
    expect(formatPrice(2500)).toContain('2,500');
  });

  it('calculates tax', () => {
    expect(calculateTax(100)).toBe(8);
  });

  it('calculates shipping and waives it for large orders', () => {
    expect(calculateShipping(100)).toBe(25);
    expect(calculateShipping(5000)).toBe(0);
  });
});

describe('roles', () => {
  it('normalizes role casing', () => {
    expect(normalizeRole('artist')).toBe('ARTIST');
    expect(normalizeRole('ADMIN')).toBe('ADMIN');
  });
});

describe('security', () => {
  it('allows only same-origin relative paths', () => {
    expect(getSafeInternalPath('/adminDashboard')).toBe('/adminDashboard');
    expect(getSafeInternalPath('/cart?x=1')).toBe('/cart?x=1');
    expect(getSafeInternalPath('https://evil.com')).toBe('/');
    expect(getSafeInternalPath('//evil.com')).toBe('/');
    expect(getSafeInternalPath('javascript:alert(1)')).toBe('/');
  });

  it('requires a stronger password', () => {
    expect(isStrongPassword('admin123')).toBe(false);
    expect(isStrongPassword('Password1')).toBe(false);
    expect(isStrongPassword('Password1!')).toBe(true);
  });

  it('accepts only http(s) external urls', () => {
    expect(isSafeExternalUrl('https://www.paypal.com/checkout')).toBe(true);
    expect(isSafeExternalUrl('javascript:alert(1)')).toBe(false);
  });
});

function makeJwt(payload) {
  const encode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode(payload)}.sig`;
}

describe('auth store', () => {
  beforeEach(() => {
    localStorageMock.clear();
    setActivePinia(createPinia());
  });

  it('stores token and role from a JWT', () => {
    const store = useAuthStore();
    const token = makeJwt({ role: 'ARTIST', exp: Math.floor(Date.now() / 1000) + 3600 });
    store.setAuth(token, { id: 3, username: 'elena' }, 'CUSTOMER');
    expect(store.token).toBe(token);
    expect(store.role).toBe('ARTIST');
    expect(store.isAuthenticated).toBe(true);
    expect(store.isArtist).toBe(true);
    expect(store.hasRole('ARTIST')).toBe(true);
  });

  it('clears token and role on logout state reset', () => {
    const store = useAuthStore();
    const token = makeJwt({ role: 'ADMIN', exp: Math.floor(Date.now() / 1000) + 3600 });
    store.setAuth(token, { id: 1, username: 'admin' }, 'ADMIN');
    store.clearAuth();
    expect(store.token).toBeNull();
    expect(store.role).toBeNull();
    expect(store.isAuthenticated).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
  });
});

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('computes item count and total price', () => {
    const store = useCartStore();
    store.items = [
      { id: 1, price: 10, quantity: 2 },
      { id: 2, price: 5, quantity: 1 }
    ];
    expect(store.itemCount).toBe(3);
    expect(store.totalPrice).toBe(25);
  });
});

