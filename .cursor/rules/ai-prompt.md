# Master Prompt for Fresh Start Build

Use this prompt in a new AI chat when you want to rebuild the full application from scratch.

```text
Act as a senior React architect and senior UI/UX web designer.
Build a production-grade ecommerce web application template for a luxury food and grocery brand in Bangladesh.

Core stack:
- React 19
- Tailwind CSS v4
- React Router
- Framer Motion
- @react-pdf/renderer

Brand direction:
- Style: luxury, minimal, editorial
- Audience: professionals (30-50)
- Currency: BDT
- Primary color mood: Ivory and Forest Green
- Typography: Playfair Display for headings, Inter for body

Critical theming rule:
- Create `src/styles/variables.css` as single source of truth for colors/tokens.
- Define both `:root` and `.dark` variables.
- Tailwind theme must map colors/radius/shadows using `var(...)`.
- No hardcoded color hex in components.

Architecture:
- `src/shared/` for common reusable controls (no business logic):
  - `shared/ui`: Button, Input, Select, Checkbox, Radio, Textarea, Label
  - `shared/feedback`: Toast, Modal, Spinner, Skeleton, AlertBanner
  - `shared/display`: Badge, Avatar, Card, Tooltip, Divider
  - `shared/form`: FormField and validation helpers
- `src/components/` for domain-specific components:
  - `layout`, `product`, `checkout`, `invoice`, `admin`
- `src/pages/`: Home, Products, Product, Cart, Checkout, OrderConfirmed, Account, Admin
- `src/context/`: CartContext, AuthContext, ThemeContext

Pages and features:
1) Header (sticky): logo, nav links, theme toggle, cart count, login/logout
2) Homepage: hero image, best sellers, all products, footer
3) PLP: filters, sort, responsive product grid, skeleton loading
4) PDP: gallery, quantity, add-to-cart with toast, related items
5) Cart: drawer plus full page summary
6) Checkout flow (4 steps): Address -> Delivery -> Payment -> Order Confirmed
7) Account: profile, order history, saved addresses
8) Admin dashboard: stats cards, order table, product management, chart

Checkout delivery logic:
- Delivery options as radio cards:
  - Inside Dhaka: BDT 60
  - All over Bangladesh: BDT 120
- Delivery selection must update totals in real time.
- Persist selected delivery zone to confirmation.

Order confirmation and invoice:
- Confirmation page must include animated success checkmark.
- Include Download Invoice PDF button.
- Invoice PDF includes:
  - brand logo and company info
  - order id/date
  - customer info and delivery address
  - delivery zone
  - itemized rows with quantities and prices
  - subtotal, delivery fee, grand total
  - thank-you note

UX requirements:
- Mobile-first responsive design
- Dark mode persistence
- Framer Motion micro-interactions
- Skeleton loading states
- Toast notifications for key actions

Execution requirements:
- Build in small, verifiable steps
- Keep code modular and scalable
- Prefer reusable components over duplication
- After each milestone, run lint/build checks and report status
```
