# KELEM Implementation Guide

## Mock Mode

Set `VUE_APP_USE_MOCK=true` in `.env.development` to use mock adapters.
Set `VUE_APP_USE_MOCK=false` to use live HTTP API.

## Mock Credentials

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

## API Swap Instructions

1. Implement `httpAdapter[resource]` methods matching mock responses
2. Add response mappers in `src/utils/normalizers.js` if needed
3. Set `VUE_APP_USE_MOCK=false`
4. Test each resource independently
