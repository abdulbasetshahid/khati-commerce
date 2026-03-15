# Khati Commerce — Architecture Overview

## 1. Vision & Scope

**Goal:** A basic e-commerce application that supports product catalog, cart, checkout, and order management. Start as a **modular monolith** so we can ship fast and split into services later if needed.

### In scope (MVP)
- **Catalog:** Products with name, description, price, image, category
- **Cart:** Add/remove items, quantity, persist in session or DB
- **Checkout:** Collect shipping/payment info (simplified), place order
- **Orders:** List orders, order detail, status
- **Identity:** Simple auth (register/login) for placing orders
- **Admin:** Category & product CRUD, create manual order, change order status (see [REQUIREMENT.md](./REQUIREMENT.md))

### Out of scope (for now)
- Payment gateway integration (stub or “pay on delivery”)
- Inventory/warehouse management
- Recommendations, reviews, wishlists

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                          │
└────────────────────────────┬────────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────────┐
│                     Next.js Application                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐│
│  │   Pages /    │  │  API Routes  │  │   Shared (lib, types)    ││
│  │   UI (React) │  │  (REST/JSON) │  │   Components, hooks      ││
│  └──────┬───────┘  └──────┬───────┘  └────────────┬─────────────┘│
│         │                 │                       │              │
│         └─────────────────┼───────────────────────┘              │
│                           │                                      │
│  ┌────────────────────────▼──────────────────────────────────────┐│
│  │                    Application / Domain logic                  ││
│  │   Catalog • Cart • Checkout • Orders • Auth                    ││
│  └────────────────────────┬──────────────────────────────────────┘│
│                           │                                      │
│  ┌────────────────────────▼──────────────────────────────────────┐│
│  │                    Data access (Prisma)                        ││
│  └────────────────────────┬──────────────────────────────────────┘│
└───────────────────────────┼──────────────────────────────────────┘
                            │
┌───────────────────────────▼──────────────────────────────────────┐
│                     Database (SQLite → PostgreSQL)                │
└──────────────────────────────────────────────────────────────────┘
```

- **Single deployable:** Next.js app (SSR + API routes).
- **Layers:** UI → API → Application/Domain → Data (Prisma).
- **Database:** SQLite for local/dev; switch to PostgreSQL for production when needed.

---

## 3. Bounded Contexts (Domains)

| Context   | Responsibility              | Key entities / concepts        |
|----------|-----------------------------|---------------------------------|
| **Catalog** | Product listing, search, categories | Product, Category              |
| **Cart**    | Basket, quantities, totals  | Cart, CartItem                 |
| **Checkout**| Place order from cart       | Order, OrderItem, Address      |
| **Orders**  | Order history, status       | Order, OrderStatus             |
| **Identity**| Register, login, session, roles | User, Session, Role       |
| **Admin**   | Category/product CRUD, manual order, order status | (uses Catalog, Orders) |

We keep these as logical modules in code (folders + clear boundaries); no separate services for the basic version.

---

## 4. Tech Stack

| Layer      | Choice           | Rationale                                      |
|-----------|-------------------|-------------------------------------------------|
| **Runtime** | Node.js 20+      | LTS, good ecosystem                            |
| **Framework** | Next.js 14 (App Router) | Full-stack, SSR, API routes, good DX        |
| **Language** | TypeScript       | Type safety, refactor-friendly                 |
| **ORM**     | Prisma           | Type-safe schema, migrations, SQLite/Postgres  |
| **DB**      | SQLite (dev)     | Zero config; optional Postgres for production  |
| **Auth**    | NextAuth.js or simple JWT/session | Session-based auth for MVP          |
| **UI**      | React + CSS (e.g. Tailwind) | Fast styling, responsive             |

---

## 5. Repository Structure

```
khati-commerce/
├── docs/
│   └── ARCHITECTURE.md          # This file
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/              # Login, register
│   │   ├── (shop)/              # Catalog, product, cart, checkout
│   │   ├── api/                 # API routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/              # Shared UI
│   │   ├── ui/                  # Buttons, inputs, cards
│   │   ├── catalog/
│   │   ├── cart/
│   │   └── layout/
│   ├── lib/                     # Shared utilities, DB client
│   │   ├── db.ts                # Prisma client
│   │   └── auth.ts
│   ├── modules/                 # Domain logic (optional grouping)
│   │   ├── catalog/
│   │   ├── cart/
│   │   ├── orders/
│   │   └── auth/
│   └── types/                   # Shared types
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── package.json
├── tsconfig.json
└── next.config.js
```

---

## 6. Data Model (Core)

- **User:** id, email, passwordHash, name, role (e.g. `CUSTOMER` | `ADMIN`), createdAt
- **Product:** id, name, slug, description, price, imageUrl, categoryId, createdAt
- **Category:** id, name, slug
- **Cart / CartItem:** cart (id, userId/sessionId), cartItem (cartId, productId, quantity)
- **Order:** id, userId, status, total, shippingAddress, createdAt
- **OrderItem:** orderId, productId, quantity, priceAtOrder

Start with these; add indexes and fields (e.g. `updatedAt`) as needed.

---

## 7. API Surface (REST-style)

| Method | Path | Purpose |
|--------|------|---------|
| GET | /api/products | List products (optional ?category=) |
| GET | /api/products/[id] | Product detail |
| GET | /api/categories | List categories |
| GET | /api/cart | Get current cart |
| POST | /api/cart/items | Add item to cart |
| PATCH | /api/cart/items/[id] | Update quantity |
| DELETE | /api/cart/items/[id] | Remove item |
| POST | /api/checkout | Create order from cart |
| GET | /api/orders | List user orders |
| GET | /api/orders/[id] | Order detail |
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |

### Admin API (all require admin role)

| Method | Path | Purpose |
|--------|------|---------|
| GET | /api/admin/categories | List categories |
| POST | /api/admin/categories | Create category |
| GET | /api/admin/categories/[id] | Get category |
| PATCH | /api/admin/categories/[id] | Update category |
| DELETE | /api/admin/categories/[id] | Delete category |
| GET | /api/admin/products | List products (paginated/filtered) |
| POST | /api/admin/products | Create product |
| GET | /api/admin/products/[id] | Get product |
| PATCH | /api/admin/products/[id] | Update product |
| DELETE | /api/admin/products/[id] | Delete product |
| POST | /api/admin/orders | Create manual order (body: customer, items, address, etc.) |
| PATCH | /api/admin/orders/[id]/status | Change order status |
| GET | /api/admin/orders | List all orders (optional filters) |

---

## 8. Security & Operations

- **Auth:** Passwords hashed (e.g. bcrypt); session or JWT in httpOnly cookie.
- **API:** Protect `/api/orders`, `/api/checkout`, `/api/cart` (authenticated or session-scoped). Protect `/api/admin/*` (authenticated + admin role).
- **Input:** Validate and sanitize all inputs; use Prisma to avoid raw SQL injection.
- **Env:** Secrets and DB URL in `.env`; never commit `.env`.
- **DB:** Run migrations via Prisma; backup DB before schema changes.

---

## 9. Next Steps

1. Initialize Next.js + TypeScript + Prisma in the repo.
2. Define Prisma schema (User, Product, Category, Cart, Order, OrderItem).
3. Implement Catalog (list product, product page).
4. Implement Cart (add/update/remove, persist by session or user).
5. Implement Checkout and Orders (place order, list orders).
6. Add simple auth (register/login) and wire protected routes.
7. Add minimal styling and responsive layout.
8. **Admin:** Role on User; admin layout/routes; category & product CRUD UI; create manual order; order list with status update.
9. (Later) Swap SQLite → PostgreSQL; add payment stub; optional admin features from [REQUIREMENT.md](./REQUIREMENT.md).

---

*Document version: 1.1 — MVP + Admin (category/product CRUD, manual order, order status).*
