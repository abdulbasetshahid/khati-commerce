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

## Checkout Flow
Use 4 steps in this exact sequence:
1. Address
2. Delivery
3. Payment
4. Order Confirmed

### Delivery Step Rules
Delivery options must be shown as radio cards:
- Inside Dhaka: BDT 60
- All over Bangladesh: BDT 120

Behavior:
- Selecting a delivery zone updates totals in real time
- Selected zone persists through payment and confirmation

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
