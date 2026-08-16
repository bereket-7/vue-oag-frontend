import { describe, it, expect, vi, beforeEach } from 'vitest';

const get = vi.fn();
const post = vi.fn();
const patch = vi.fn();
const put = vi.fn();
const del = vi.fn();

vi.mock('@/services/api', () => ({
  default: {
    get: (...args) => get(...args),
    post: (...args) => post(...args),
    patch: (...args) => patch(...args),
    put: (...args) => put(...args),
    delete: (...args) => del(...args)
  }
}));

vi.mock('@/router', () => ({
  default: {
    push: () => {},
    currentRoute: { value: { path: '/' } }
  }
}));

import { httpAdapter } from '@/services/adapters/httpAdapter';

function envelope(content, extra = {}) {
  return Promise.resolve({ data: { status: 200, message: extra.message || 'ok', content, ...extra } });
}

describe('httpAdapter contract paths', () => {
  beforeEach(() => {
    get.mockReset();
    post.mockReset();
    patch.mockReset();
    put.mockReset();
    del.mockReset();
  });

  it('unwraps artwork list content', async () => {
    get.mockReturnValue(envelope([{ id: 1, artworkName: 'Lake', price: 100, imageUrls: ['/upload/images/a.jpg'] }]));
    const result = await httpAdapter.artwork.getAll();
    expect(get).toHaveBeenCalledWith('/artworks', expect.any(Object));
    expect(result[0].title).toBe('Lake');
    expect(result[0].imageUrl).toContain('/upload/images/a.jpg');
  });

  it('searches with artworkName not q', async () => {
    get.mockReturnValue(envelope([]));
    await httpAdapter.artwork.search('lake');
    expect(get).toHaveBeenCalledWith('/artworks/search', { params: { artworkName: 'lake' } });
  });

  it('posts checkout instead of paypal', async () => {
    post.mockReturnValue(envelope({ checkOutUrl: 'https://checkout.chapa.co/x', txRef: 'tx-1' }));
    const result = await httpAdapter.checkout.initiate({ firstname: 'Ada' });
    expect(post).toHaveBeenCalledWith('/checkout', { firstname: 'Ada' });
    expect(result.checkOutUrl).toContain('chapa');
  });

  it('places bids with amount JSON body', async () => {
    post.mockReturnValue(envelope({ id: 'auc-1', currentBid: 200 }));
    await httpAdapter.auction.placeBid('auc-1', 200);
    expect(post).toHaveBeenCalledWith('/auctions/auc-1/bid', { amount: 200 });
  });

  it('sends messages with body only', async () => {
    post.mockReturnValue(envelope({ id: 1, body: 'hi' }));
    await httpAdapter.message.send('t1', 'hi');
    expect(post).toHaveBeenCalledWith('/messages/threads/t1', { body: 'hi' });
  });

  it('patches cart quantity', async () => {
    patch.mockReturnValue(envelope([]));
    await httpAdapter.cart.update(3, 2);
    expect(patch).toHaveBeenCalledWith('/cart/3', { quantity: 2 });
  });

  it('loads profile from /users/me', async () => {
    get.mockReturnValue(envelope({ username: 'ada@email', firstName: 'Ada' }));
    const profile = await httpAdapter.user.getProfile();
    expect(get).toHaveBeenCalledWith('/users/me');
    expect(profile.firstName).toBe('Ada');
  });

  it('returns requiresOtp when login envelope has empty content', async () => {
    post.mockReturnValue(envelope([], { message: 'Otp sent to email' }));
    const result = await httpAdapter.auth.login({ username: 'ada@email', password: 'x' });
    expect(post).toHaveBeenCalledWith('/auth/login', expect.objectContaining({ channel: 'EMAIL' }));
    expect(result.requiresOtp).toBe(true);
  });

  it('maps UserInfo token after login verify', async () => {
    post.mockReturnValue(envelope({
      token: 'jwt',
      refreshToken: 'r',
      username: 'ada@email',
      fullName: 'Ada Kebede',
      role: 'CUSTOMER'
    }));
    const result = await httpAdapter.auth.verifyLogin({ username: 'ada@email', otp: '123456' });
    expect(post).toHaveBeenCalledWith('/auth/login/verify', expect.objectContaining({ otp: '123456', medium: 'EMAIL' }));
    expect(result.token).toBe('jwt');
    expect(result.user.firstName).toBe('Ada');
  });
});
