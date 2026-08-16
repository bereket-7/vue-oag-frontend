# KELEM Implementation Guide

## Mock Mode

Set `VUE_APP_USE_MOCK=true` in `.env.development` to use mock adapters.
Set `VUE_APP_USE_MOCK=false` in `.env.production` (required for production builds).

## Mock Credentials (local development only)

Never show these on the login page or ship them in a production build.

| Role | Username | Password |
|---|---|---|
| Admin | admin | admin123 |
| Customer | customer | customer123 |
| Artist | artist | artist123 |
| Manager | manager | manager123 |
| Organization | org | org123 |

## Normalized Artwork Fields

| Field | Type | Notes |
|---|---|---|
| id | number | |
| title | string | was artworkName |
| price | number | was "$2,500" string |
| artistName | string | was artist |
| rating | number | was averageRating |
| category | string | was artworkCategory |

## Phase Checklist

- [x] Phase 0: Constants, models, mocks, adapters
- [x] Phase 1: Auth unification, router, MODERN views
- [x] Phase 2: Commerce stores and checkout
- [x] Phase 3: Marketplace features
- [x] Phase 4: Auctions
- [x] Phase 5: Admin/manager ops
- [x] Phase 6: Growth and production readiness

## API contract (frozen v1.0)

Canonical paths, DTOs, and mappings: [`../../online-art-gallery-springboot/docs/api-contract.md`](../../online-art-gallery-springboot/docs/api-contract.md).

Frontend unwrap, env, and adapter signatures: [`api-contract.md`](./api-contract.md).

Live mode:

```env
VUE_APP_USE_MOCK=false
VUE_APP_API_BASE_URL=http://localhost:8088/api/v1
VUE_APP_SOCKET_URL=http://localhost:8088
```

`httpAdapter` must unwrap `GenericResponse.content`, call Chapa `POST /checkout` (not PayPal), and use STOMP at `/ws/notifications`. See contract section F for every current adapter path → canonical path.

## API Swap Instructions

1. Implement `httpAdapter[resource]` methods against the frozen contract (not ad-hoc backend URLs)
2. Unwrap `{ status, message, content }` in `httpAdapter.wrap()`; keep mock responses unwrapped
3. Add response mappers in `src/utils/normalizers.js` using contract field aliases
4. Set `VUE_APP_USE_MOCK=false`
5. Test each resource independently against `http://localhost:8088/v3/api-docs`
