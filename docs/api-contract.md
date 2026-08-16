# KELEM API contract (frontend)

**Version:** 1.0 (frozen)  
**Canonical document:** [`online-art-gallery-springboot/docs/api-contract.md`](../../online-art-gallery-springboot/docs/api-contract.md)

This file is the Vue-side pointer. Do not fork path lists here. Change the backend contract first, then this unwrap/env section if needed.

Live OpenAPI (when the server is up): `http://localhost:8088/v3/api-docs` · Swagger UI: `http://localhost:8088/swagger-ui.html`.

---

## Env (live mode)

```env
VUE_APP_USE_MOCK=false
VUE_APP_API_BASE_URL=http://localhost:8088/api/v1
VUE_APP_SOCKET_URL=http://localhost:8088
```

Production: `VUE_APP_API_BASE_URL=https://api.example.com/api/v1` (must include `/api/v1`).  
There is no PayPal client id in this contract. Checkout uses Chapa via `POST /checkout`.

Realtime: STOMP/SockJS at `{VUE_APP_SOCKET_URL}/ws/notifications` — not Socket.IO.

---

## Unwrap rules

Every live response is:

```json
{ "status": 200, "message": "…", "content": {} }
```

Pageable responses also include `pageable`: `{ totalPages, totalElements, numberOfElements, last, first, empty }`.

`httpAdapter.wrap()` must:

1. Read Axios `response.data`.
2. If `data` has `content`, return `content` for stores/views (mock-shaped).
3. If `pageable` is present, return `{ items: content, pageable, message, status }` **or** return `content` as the array and attach paging on a well-known helper — pick one and use it everywhere. Recommended: return `content` (the array) for list calls that ignore paging; for gallery search use the object form.
4. Mock adapter continues to return unwrapped domain objects (never the envelope).

Auth store mapping after unwrap of `UserInfo`:

- `token` → `accessToken` / `authStore.token`
- `refreshToken` stored for `/auth/token/refresh`
- `username`, `fullName`, `avatarUrl`, `permissions`
- `role` from `UserInfo.role` or JWT claim `role` / `roles[0]` / `authorities[0]` with `ROLE_` stripped

Login OTP: if `message` indicates OTP and `content` is empty, call `POST /auth/login/verify` — do not treat that body as a session.

---

## Adapter signatures (must match mock)

- `user.getProfile()` / `user.updateProfile(data)`
- `auction.placeBid(auctionId, amount)`
- `message.send(threadId, body)`
- `offer.getPendingForArtist()`
- `order.getAll()`
- `auth.login` / `auth.verifyLogin` / `auth.register` / `auth.verifyRegister`
- `checkout.initiate(orderRequest)` — not `payment.paypalPay`

Normalizer aliases (`src/utils/normalizers.js`): `artworkName` → `title`, `imageUrls[0]` → `imageUrl`, `firstname` → `firstName` on orders. Full table: canonical contract [Field aliases](../../online-art-gallery-springboot/docs/api-contract.md#field-aliases).

---

## Compatibility (frontend)

See [G. Compatibility matrix](../../online-art-gallery-springboot/docs/api-contract.md#g-compatibility-matrix) in the canonical doc. QA checklist: [QA.md](./QA.md).

PRs that add HTTP paths must link a section of the backend contract (B–E). No PayPal, no Socket.IO, no `/api` without `v1`.
