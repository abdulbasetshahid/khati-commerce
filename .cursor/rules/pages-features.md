# Pages and Features

## Global Header
- Left: company name/logo
- Center: Home, Products, About navigation
- Right: dark mode toggle, cart button with count badge, login/logout
- Sticky behavior with subtle blur backdrop

## Homepage
- Hero with premium image and serif heading
- Best-selling products section
- Category banner section
- All products section
- Footer

## Product Listing Page (PLP)
- Product grid
- Filter controls (category, price, rating, tags)
- Sort controls
- Loading skeleton state
- Pagination or infinite scrolling

## Product Detail Page (PDP)
- Image gallery (main plus thumbnails)
- Product info: name, price, description
- Quantity selector
- Add-to-cart button
- Toast feedback after add-to-cart
- Related products section

## Cart
- Slide-over cart drawer from any page
- Full cart page with item update controls
- Order summary panel

## Checkout Flow (Current: 3 Steps)
Current implementation uses 3 steps:
1. Address
2. Delivery (includes order review and place order)
3. Order Confirmed

### Delivery Step Rules
Delivery options must be shown as radio cards:
- Inside Dhaka: BDT 60
- All over Bangladesh: BDT 120

Behavior:
- Selecting a delivery zone updates totals in real time
- Selected zone persists through confirmation
- Order review (item list, subtotal, delivery fee, total) shown inline
- "Place Order" button finalizes the order directly from this step

## Payment Step (Deferred — Implement in Future Version)
> **Status**: Removed from current build. Re-add as Step 3 between Delivery and Order Confirmed.

When implementing, restore the checkout flow to 4 steps:
1. Address
2. Delivery
3. **Payment** ← re-add this step
4. Order Confirmed

### Payment Step Requirements
- Add `"payment"` back to `CheckoutStep` type and `STEPS` array in `CheckoutContext.tsx`
- Create `src/components/checkout/PaymentStep.tsx`
- Payment methods to support (as radio cards, same UI pattern as delivery):
  - **Cash on Delivery** (COD) — "Pay when your order arrives"
  - **bKash / Nagad** — "Mobile financial services"
  - **Credit / Debit Card** — "Visa, Mastercard, AMEX"
- Show full order review: itemized list, subtotal, delivery fee, total
- Show shipping address summary
- "Place Order" button with simulated processing state
- Move order placement logic (generateOrderId, confirmOrder, clearCart) from DeliveryStep into PaymentStep
- Update DeliveryStep button text back to "Continue to Payment" and remove order placement logic
- Update `STEP_LABELS` in `Checkout.tsx` to include `{ key: "payment", label: "Payment" }`
- Re-import and render `<PaymentStep />` in `CheckoutContent`

## Order Confirmed Page
- Animated success checkmark
- Download Invoice PDF button

## Invoice PDF Content
- Brand logo and company name
- Order ID and order date
- Customer name, email, and delivery address
- Delivery zone
- Itemized list: product, quantity, unit price, line total
- Subtotal, delivery charge, grand total
- Thank-you note

## Account Page
- Profile and settings
- Order history with status indicators
- Saved addresses

## Admin Dashboard
- Stats cards: revenue, orders, customers, products
- Recent orders table
- Product management (create, update, delete)
- Order trend chart
