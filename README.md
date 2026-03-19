<div align="center">

# ✦ KELEM Online Art Gallery

### A modern, full-featured online art gallery platform built with Vue 3

[![Vue](https://img.shields.io/badge/Vue-3.2-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Pinia](https://img.shields.io/badge/Pinia-2.1-F7D336?style=flat-square&logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-4.0-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://router.vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.2-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Axios](https://img.shields.io/badge/Axios-1.4-5A29E4?style=flat-square&logo=axios&logoColor=white)](https://axios-http.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

<br/>

> Discover, collect, and showcase extraordinary art from talented artists around the world.

<br/>

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [User Roles](#user-roles)
- [Pages & Routes](#pages--routes)
- [State Management](#state-management)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

---

## Overview

**KELEM** is a full-stack-ready Vue 3 frontend for an online art gallery platform. It connects artists, collectors, organizations, and administrators in a single cohesive experience — from browsing a curated gallery to bidding on artworks, entering competitions, and managing the platform.

The UI is built with a modern glassmorphism-inspired design system, responsive across all screen sizes, and powered by a component-driven architecture using the Vue 3 Composition API.

---

## Features

### For Everyone
- 🖼️ **Masonry Gallery** — Pinterest-style artwork grid with live search, category filters, and sort
- 🆕 **New Arts Feed** — Curated view of recently added artworks with featured card layout
- 🔍 **Quick View Modal** — Inspect artwork details, size, rating, and price without leaving the page
- ⭐ **Star Ratings** — Rate artworks directly from the gallery
- 🛒 **Shopping Cart** — Add artworks to cart and proceed to checkout
- ❤️ **Wishlist** — Save favourite pieces for later
- 💳 **PayPal Integration** — Secure payment processing via PayPal JS SDK
- 📬 **Contact & FAQ** — Contact form and frequently asked questions

### For Artists
- 📤 **Artwork Upload** — Upload and publish artworks with category, description, and pricing
- 📊 **Artist Dashboard** — Manage your portfolio and track your listings
- 🏆 **Competition Entry** — Register and compete in gallery-hosted art competitions

### For Customers
- 🧾 **Order Management** — Create and track orders
- 👤 **Profile Settings** — Update personal details, profile picture, and password
- 🔔 **Notifications** — Real-time notification feed

### For Organizations
- 📅 **Event Management** — Register, update, and display events
- 🏛️ **Organization Dashboard** — Manage your organization's presence on the platform

### For Managers
- ✅ **Artwork Verification** — Review and approve submitted artworks
- 🏆 **Competition Management** — Create, manage, and display competitions
- 📋 **Company Standards** — Define and publish platform standards
- 📩 **Contact Users** — Reach out to registered users directly
- 📊 **User Reports** — View and manage submitted user reports

### For Admins
- 👥 **User Management** — View, edit, and manage all users
- 🗂️ **Admin Dashboard** — Full platform overview and controls

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API + `<script setup>`) |
| State Management | Pinia 2 |
| Routing | Vue Router 4 |
| HTTP Client | Axios |
| CSS Framework | Tailwind CSS 3 + Bootstrap 5 |
| Icons | Font Awesome 6 |
| Payments | PayPal JS SDK |
| Real-time | Socket.IO Client |
| Build Tool | Vue CLI 5 (Webpack) |
| Linting | ESLint + eslint-plugin-vue |

---

## Project Structure

```
src/
├── assets/
│   ├── img/                  # Static images & brand assets
│   ├── style.css             # Global styles
│   └── tailwind.css          # Tailwind entry
│
├── components/
│   ├── common/               # Reusable UI: BaseButton, BaseCard, BaseInput,
│   │                         #   BaseModal, DataTable, LoadingSpinner, Toast
│   ├── admin/                # Admin-specific components
│   ├── artwork/              # ArtworkCard
│   ├── cart/                 # ShoppingCart
│   ├── layout/               # DashboardLayout
│   ├── CardSlider.vue        # Hero image slider
│   ├── ArtworkCategory.vue   # Category showcase
│   ├── FooterView.vue        # Global footer
│   └── ...
│
├── composables/
│   ├── useApi.js             # Axios wrapper composable
│   ├── useAuth.js            # Auth helpers
│   └── useNotification.js    # Toast notification composable
│
├── router/
│   └── index.js              # All routes + auth guards
│
├── services/
│   ├── api.js                # Axios instance configuration
│   ├── artworkService.js     # Artwork API calls
│   └── authService.js        # Auth API calls
│
├── stores/
│   ├── auth.js               # Authentication state (JWT, role, user)
│   ├── artwork.js            # Artwork catalogue + dummy data
│   ├── cart.js               # Shopping cart state
│   ├── competition.js        # Competition state
│   └── user.js               # User profile & notifications
│
├── utils/
│   ├── api.js                # API utility helpers
│   └── auth.js               # Token helpers (setAuthToken)
│
├── views/
│   ├── Admin/                # AdminDashboard, UserList, EditUser, etc.
│   ├── Artwork/              # ArtworkList, AllArtwork, RecentArtWork,
│   │                         #   ArtworkDetail, ArtworkUpload, MyArt, etc.
│   ├── Bidding/              # CreateBid
│   ├── Manager/              # ManagerDashboard, CreateCompetition,
│   │                         #   ManageCompetition, VerifyArtwork, etc.
│   ├── Organization/         # OrganizationPanel, EventRegister, EventDisplay
│   ├── shopping/             # CreateOrder, CheckOut, WishList, PaymentSuccess
│   ├── User/                 # UserLogin, RegisterUser, UserHeader,
│   │                         #   ArtistDashboard, CustomerDashboard, etc.
│   ├── HomeView.vue          # Landing page
│   └── ContactUs.vue         # Contact page
│
├── App.vue                   # Root component
└── main.js                   # App entry point
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 14.x
- **npm** >= 6.x
- A running backend API (default: `http://localhost:8082`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/kelem-art-gallery.git
cd kelem-art-gallery

# 2. Install dependencies
npm install

# 3. Copy environment config
cp .env.example .env.development

# 4. Start the development server
npm run serve
```

The app will be available at **http://localhost:8080**

---

## Available Scripts

```bash
# Start development server with hot-reload
npm run serve

# Build for production (outputs to /dist)
npm run build

# Lint and auto-fix source files
npm run lint
```

---

## User Roles

The platform supports five distinct roles, each with its own dashboard and permissions:

| Role | Dashboard Route | Key Capabilities |
|---|---|---|
| `CUSTOMER` | `/customerDashboard` | Browse, buy, wishlist, rate artworks |
| `ARTIST` | `/artistDashboard` | Upload artworks, enter competitions |
| `MANAGER` | `/managerDashboard` | Verify artworks, manage competitions & events |
| `ORGANIZATION` | `/organizationDashboard` | Register & manage events |
| `ADMIN` | `/adminDashboard` | Full user & platform management |

Role-based routing is handled automatically on login — users are redirected to their respective dashboard based on the JWT role claim.

---

## Pages & Routes

| Route | Page | Auth Required |
|---|---|---|
| `/` | Home | No |
| `/allArtwork` | Full Gallery (masonry) | No |
| `/artworkList` | Featured Collection | No |
| `/recentArtwork` | New Arts Feed | No |
| `/artworkDetail` | Artwork Detail | No |
| `/about` | About Us | No |
| `/contactUs` | Contact | No |
| `/FAQs` | FAQs | No |
| `/userLogin` | Sign In | No |
| `/register` | Sign Up | No |
| `/forgotPassword` | Forgot Password | No |
| `/cart` | Shopping Cart | ✓ |
| `/wishlist` | Wishlist | No |
| `/checkout` | Checkout | No |
| `/edit-account` | Profile Settings | No |
| `/artworkUpload` | Upload Artwork | ✓ |
| `/artistDashboard` | Artist Dashboard | ✓ |
| `/customerDashboard` | Customer Dashboard | No |
| `/managerDashboard` | Manager Dashboard | No |
| `/adminDashboard` | Admin Dashboard | No |
| `/organizationDashboard` | Organization Panel | No |
| `/createCompetition` | Create Competition | No |
| `/manageCompetition` | Manage Competitions | ✓ |
| `/displayCompetition` | View Competitions | No |
| `/registerCompetitor` | Enter Competition | No |
| `/vote` | Vote for Artwork | No |
| `/createBid` | Create Bid | ✓ |
| `/eventRegister` | Register Event | ✓ |
| `/eventDisplay` | View Events | No |

---

## State Management

Pinia stores handle all shared application state:

```
stores/
├── auth.js        — JWT token, user object, role, login/logout actions
├── artwork.js     — Artwork catalogue, filters, dummy data fallback
├── cart.js        — Cart items, quantities, add/remove/update actions
├── competition.js — Competition data and registration state
└── user.js        — User profile, notifications, read/unread state
```

Auth state persists across page refreshes via `localStorage` (token, user, role).

---

## Environment Variables

Copy `.env.example` to `.env.development` and configure:

```env
VUE_APP_API_BASE_URL=http://localhost:8082/api
VUE_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

## Contributing

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'feat: add your feature'`
4. Push to the branch — `git push origin feature/your-feature`
5. Open a Pull Request

Please follow the existing code style — Vue 3 Composition API with `<script setup>`, scoped CSS, and Tailwind utility classes for layout.

---

<div align="center">

Built with ❤️ for the art community

**KELEM Online Art Gallery** · Vue 3 · Pinia · Tailwind CSS

</div>
