# KELEM QA Checklist

Contract (frozen v1.0): [api-contract.md](./api-contract.md). Live checks assume `VUE_APP_API_BASE_URL=http://localhost:8088/api/v1` and the compatibility matrix in the backend contract.

Mark each item **mock** (VUE_APP_USE_MOCK=true) and **live** (false, Spring on :8088).

## Auth
- [ ] **mock / live** Login as admin, customer, artist, manager, org
- [ ] **live** Login OTP step then `POST /auth/login/verify`
- [ ] **live** Register CUSTOMER or ARTIST then `/activateAccount` OTP
- [ ] **live** Forgot/reset password with OTP
- [ ] **mock / live** Protected routes redirect to login when unauthenticated
- [ ] **mock / live** Role routes block unauthorized roles
- [ ] **mock / live** Logout clears session (and refresh token)

## Gallery
- [ ] **mock / live** Home page loads without login
- [ ] **mock / live** All Artwork gallery filters and sorts (public GET)
- [ ] **mock / live** Artwork detail page loads at /artworks/:id
- [ ] **mock / live** Artist profile at /artists/:slug
- [ ] **live** Images resolve from `{origin}{imageUrls[0]}` not `/artworks/{id}/image`

## Commerce
- [ ] **mock / live** Add to cart updates header count
- [ ] **mock** Checkout 4-step wizard place-order (no charge)
- [ ] **live** Checkout `POST /checkout` redirects to Chapa `checkOutUrl`
- [ ] **live** Success/cancel at `/paymentSuccess`, `/paymentError`, `/payment/cancel`
- [ ] **mock / live** Order appears in /account/orders
- [ ] **mock / live** Wishlist add/remove persists

## Marketplace
- [ ] **mock / live** Search at /search with filters
- [ ] **mock / live** Collections at /collections
- [ ] **mock / live** Reviews on artwork detail
- [ ] **mock / live** Messages inbox and thread

## Auctions
- [ ] **mock / live** Auction list at /auctions
- [ ] **mock / live** Place bid on auction detail (`placeBid(id, amount)`)
- [ ] **mock / live** Watch/unwatch auction

## Admin
- [ ] **mock / live** Admin dashboard stats
- [ ] **mock / live** User list at /admin/users
- [ ] **mock / live** Moderation queue approve/reject
- [ ] **mock** Settings save to localStorage
- [ ] **live** STOMP notifications on `/ws/notifications`

## Build
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] `npm test` passes
