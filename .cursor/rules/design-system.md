# Design System

## Theme Source of Truth
All theme tokens must be defined in `src/styles/variables.css`.
Changing this one file should re-theme the full application.

## CSS Variable Tokens
Use this baseline structure:

```css
:root {
  --color-bg-primary: #F9F6F0;
  --color-bg-secondary: #EDE8DF;
  --color-brand: #2D5016;
  --color-brand-hover: #4A7A2A;
  --color-text-primary: #1C1C1C;
  --color-text-secondary: #6B6B5E;
  --color-text-inverse: #F9F6F0;
  --color-border: #D6D0C4;
  --color-border-focus: #2D5016;
  --color-success: #2D7A3A;
  --color-error: #B91C1C;
  --color-warning: #D97706;
  --color-info: #2563EB;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.12);
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}

.dark {
  --color-bg-primary: #0F1A0A;
  --color-bg-secondary: #1A2A12;
  --color-brand: #A8C97F;
  --color-brand-hover: #C4E0A0;
  --color-text-primary: #E8E4DC;
  --color-text-secondary: #9A9A8A;
  --color-text-inverse: #0F1A0A;
  --color-border: #2A3A1E;
  --color-border-focus: #A8C97F;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.4);
}
```

## Tailwind Mapping Rules
- Tailwind color, radius, and shadow config should reference `var(...)`.
- Do not hardcode hex values in components.
- Prefer semantic utility names:
  - `bg-bg-primary`, `bg-bg-secondary`
  - `text-text-primary`, `text-text-secondary`
  - `bg-brand`, `hover:bg-brand-hover`
  - `border-border`, `focus:border-border-focus`

## Typography
- **Heading font**: Playfair Display
- **Body/UI font**: Inter
- Headings should feel editorial and premium; body copy should remain highly readable.

## Layout and Rhythm
- Max content width: `1280px`
- Base spacing rhythm: `8px`
- Breakpoints:
  - `sm`: 640
  - `md`: 768
  - `lg`: 1024
  - `xl`: 1280

## Dark Mode Behavior
- Theme toggle sets or removes `.dark` on root HTML element.
- Dark mode should primarily switch through CSS variables, not duplicated class variants.
