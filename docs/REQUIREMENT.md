# Khati Commerce — Requirements

## Customer (Shop) Features

1. Browse product catalog with categories.
2. View product detail (name, description, price, image, category).
3. Add/remove items in cart and change quantity.
4. Proceed to checkout with shipping/payment info (simplified).
5. Place order and view order history with status.
6. Register and log in to place orders.

---

## Admin Features

### Core admin capabilities

10. **Category & product CRUD** — As an admin, I can add, edit, and delete categories and products (full CRUD).
11. **Manual order** — As an admin, I can create an order manually (e.g. for phone/offline orders) without going through the customer cart/checkout flow.
12. **Order status** — As an admin, I can change the status of any order (e.g. Pending → Confirmed → Shipped → Delivered).

### Suggested additional admin features

13. **Suggested admin features** (pick as needed for your roadmap):

    | # | Feature | Description |
    |---|--------|-------------|
    | A | **Dashboard** | Summary: total orders, revenue, low-stock products, recent orders. |
    | B | **User management** | List users, view orders per user, optionally disable/ban or assign admin role. |
    | C | **Order list & filters** | List all orders with filters by status, date range, customer; search by order ID or email. |
    | D | **Inventory / stock** | Optional stock field on products; low-stock alerts; prevent checkout when out of stock. |
    | E | **Bulk actions** | Bulk update order status, bulk export orders (CSV), bulk product enable/disable. |
    | F | **Product visibility** | Draft vs published; hide products from catalog without deleting. |
    | G | **Audit log** | Log who changed what (e.g. order status, product price) and when. |
    | H | **Reports** | Sales by period, by category, top products; simple charts or export. |
    | I | **Shipping / fulfillment** | Optional tracking number per order; mark as shipped with date. |
    | J | **Discounts / coupons** | Optional: create coupon codes, percentage or fixed discount; apply at checkout. |

---

*Document version: 1.0 — Includes admin scope and suggested features.*
