# Styling System

This document describes the styling system architecture for the Call for Investor/CoFounder application.

## 📁 File Structure

```
apps/frontend/
├── design-tokens.json              # JSON design tokens (W3C format)
├── src/
│   ├── styles/
│   │   └── design-system.css      # CSS custom properties
│   ├── config/
│   │   └── design-system.ts       # TypeScript design tokens
│   └── index.css                   # Main stylesheet (imports design-system.css)
└── DESIGN_SYSTEM_README.md         # Complete usage guide
```

## ✅ Current Styling System

### Design Tokens (3 Formats)

1. **JSON** (`design-tokens.json`)
   - W3C Design Tokens format
   - Tool-agnostic, can be used by design tools
   - Source of truth for all design values

2. **CSS Variables** (`src/styles/design-system.css`)
   - CSS custom properties
   - Available globally via `var(--variable-name)`
   - Automatically imported in `index.css`

3. **TypeScript** (`src/config/design-system.ts`)
   - Type-safe design tokens
   - Helper functions for easy access
   - IntelliSense support

### Main Stylesheet

- **`src/index.css`**
  - Imports design system CSS variables
  - Tailwind CSS directives
  - Custom component classes
  - Global styles

## 🎨 Usage

### CSS Variables
```css
.my-component {
  background: var(--color-dark-200);
  color: var(--color-teal-400);
  padding: var(--spacing-lg);
  border-radius: var(--radius-xl);
}
```

### TypeScript Config
```typescript
import { designSystem, getColor } from './config/design-system';
const primaryColor = getColor('teal', 500);
```

### Tailwind Classes
All Tailwind utilities work as normal, enhanced by design tokens in `tailwind.config.js`.

## 📚 Documentation

- **DESIGN_SYSTEM_README.md** - Complete guide with examples
- **STYLING_SYSTEM.md** - This file (overview)

## 🗑️ Removed Files

The following old styling files have been removed:
- ❌ `src/App.css`
- ❌ `src/components/Navigation.css`
- ❌ `src/components/DonationButton.css`
- ❌ `src/components/MessageForm.css`
- ❌ `src/pages/Landing.css`
- ❌ `src/pages/Page.css`
- ❌ `src/pages/Admin/Admin.css`
- ❌ Old markdown styling guides (replaced by DESIGN_SYSTEM_README.md)

All styling is now handled through:
- ✅ Design tokens (JSON, CSS, TypeScript)
- ✅ Tailwind CSS utility classes
- ✅ Custom component classes in `index.css`

## 🚀 Getting Started

1. Use CSS variables for custom styles
2. Use Tailwind classes for rapid development
3. Import TypeScript config for type-safe tokens
4. Refer to `DESIGN_SYSTEM_README.md` for detailed examples
