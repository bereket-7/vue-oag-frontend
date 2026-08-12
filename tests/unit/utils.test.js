import { describe, it, expect } from 'vitest';
import { normalizeArtwork } from '@/utils/normalizers';
import { parsePrice, formatPrice, calculateTax } from '@/utils/currency';
import { normalizeRole } from '@/constants/roles';
import { getSafeInternalPath, isStrongPassword, isSafeExternalUrl } from '@/utils/security';

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
    expect(isStrongPassword('Password1')).toBe(true);
  });

  it('accepts only http(s) external urls', () => {
    expect(isSafeExternalUrl('https://www.paypal.com/checkout')).toBe(true);
    expect(isSafeExternalUrl('javascript:alert(1)')).toBe(false);
  });
});
