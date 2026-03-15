# Application Architecture

## Tech Stack
- React 19
- Tailwind CSS v4
- React Router
- Framer Motion
- `@react-pdf/renderer`

## Folder Structure
```text
src/
  shared/
    ui/
    feedback/
    display/
    form/
  components/
    layout/
    product/
    checkout/
    invoice/
    admin/
  pages/
    Home.tsx
    Products.tsx
    Product.tsx
    Cart.tsx
    Checkout.tsx
    OrderConfirmed.tsx
    Account.tsx
    Admin.tsx
  styles/
    variables.css
  context/
  hooks/
```

## Shared Folder Convention
- `src/shared/*` contains reusable controls only.
- No business/domain-specific logic in shared controls.
- Shared controls must be portable and composable.
- Feature modules in `src/components/*` compose shared controls.

## Responsibility Split
- `shared/*`: generic primitives and helpers
- `components/*`: domain-specific composition blocks
- `pages/*`: route-level screens
- `context/*`: app-wide state providers
- `styles/*`: global design tokens

## Context Providers
- `CartContext`: cart state, quantities, totals
- `AuthContext`: login/logout/session state
- `ThemeContext`: light/dark mode persistence and root class updates

## Import Guidelines
- Prefer explicit, stable imports from shared modules.
- Example pattern: `@/shared/ui/Button`
- Keep import boundaries clear:
  - Shared modules should not import feature modules.
  - Feature modules can import shared modules.

## Scalability Notes
- Keep each feature folder cohesive around one domain.
- Move repeated page logic into components before duplication grows.
- Keep checkout, invoice, and admin separated to avoid coupling.
