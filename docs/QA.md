# KELEM QA Checklist

## Auth
- [ ] Login as admin, customer, artist, manager, org with mock credentials
- [ ] Protected routes redirect to login when unauthenticated
- [ ] Role routes block unauthorized roles
- [ ] Logout clears session

## Gallery
- [ ] Home page loads
- [ ] All Artwork gallery filters and sorts
- [ ] Artwork detail page loads at /artworks/:id
- [ ] Artist profile at /artists/:slug

## Commerce
- [ ] Add to cart updates header count
- [ ] Checkout 4-step wizard completes
- [ ] Order appears in /account/orders
- [ ] Wishlist add/remove persists

## Marketplace
- [ ] Search at /search with filters
- [ ] Collections at /collections
- [ ] Reviews on artwork detail
- [ ] Messages inbox and thread

## Auctions
- [ ] Auction list at /auctions
- [ ] Place bid on auction detail
- [ ] Watch/unwatch auction

## Admin
- [ ] Admin dashboard stats
- [ ] User list at /admin/users
- [ ] Moderation queue approve/reject
- [ ] Settings save to localStorage

## Build
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
