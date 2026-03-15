# UI Patterns and Interaction Rules

## Dark Mode
- Use `ThemeContext` to toggle theme.
- Persist preference in local storage.
- Apply `.dark` class at root level.
- Let CSS variables in `src/styles/variables.css` drive visual switching.

## Motion and Micro-Interactions
- Use Framer Motion for:
  - Page transitions
  - Hero entrance animation
  - Product card hover feedback
  - Order success checkmark animation
- Keep timing smooth and unobtrusive.

## Loading UX
- Use skeleton placeholders for:
  - Product grid load
  - Product detail content load
  - Any delayed checkout data
- Avoid empty screens during loading.

## Notification UX
- Use toast notifications in top-right region.
- Support variants:
  - success
  - error
  - info
- Typical triggers:
  - Added to cart
  - Checkout success
  - Validation or payment failure

## Responsive Behavior
- Mobile-first implementation
- Header collapses into hamburger navigation on small viewports
- Product filters become drawer/sheet on mobile
- Checkout and delivery cards stack cleanly on narrow screens

## Checkout UX Rules
- Delivery options are clearly selectable cards
- Total updates immediately after delivery change
- Confirmation page highlights success state before next actions

## Invoice UX Rules
- PDF generation happens client-side via `@react-pdf/renderer`
- Download action is available on order confirmation
- Invoice style follows the same brand token system where possible
