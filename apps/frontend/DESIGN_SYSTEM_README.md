# Design System Files

This directory contains the official design system files in proper formats.

## 📁 File Structure

```
apps/frontend/
├── design-tokens.json          # JSON format design tokens (W3C Design Tokens format)
├── src/
│   ├── styles/
│   │   └── design-system.css   # CSS custom properties (CSS variables)
│   └── config/
│       └── design-system.ts    # TypeScript configuration
└── DESIGN_SYSTEM_README.md     # This file
```

## 📄 File Formats

### 1. `design-tokens.json`
**Format**: JSON (W3C Design Tokens format)
**Purpose**: Standard design tokens format, tool-agnostic
**Usage**: Can be imported by design tools, Style Dictionary, or other token processors

**Example Usage**:
```javascript
import tokens from './design-tokens.json';
const primaryColor = tokens.colors.primary.teal[500];
```

### 2. `src/styles/design-system.css`
**Format**: CSS with Custom Properties (CSS Variables)
**Purpose**: Direct CSS usage, accessible via `var(--variable-name)`
**Usage**: Imported in `index.css`, available throughout the app

**Example Usage**:
```css
.my-button {
  background: var(--gradient-primary);
  color: white;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-lg);
}
```

### 3. `src/config/design-system.ts`
**Format**: TypeScript
**Purpose**: Type-safe design tokens for TypeScript/JavaScript
**Usage**: Import in TypeScript/JavaScript files for type safety

**Example Usage**:
```typescript
import { designSystem, getColor, getGradient } from './config/design-system';

// Direct access
const primaryColor = designSystem.colors.primary.teal[500];

// Using helper functions
const teal500 = getColor('teal', 500);
const primaryGradient = getGradient('primary');
```

## 🎨 Available Design Tokens

### Colors
- **Primary**: Teal, Cyan, Purple scales (50-900)
- **Dark Theme**: Dark scale (50-900)
- **Semantic**: Success, Warning, Error, Info

### Typography
- **Font Families**: Sans, Display, Mono
- **Font Sizes**: xs, sm, base, lg, xl, 2xl-6xl
- **Font Weights**: light, normal, medium, semibold, bold, extrabold
- **Line Heights**: tight, normal, relaxed

### Spacing
- xs, sm, md, lg, xl, 2xl, 3xl

### Border Radius
- sm, md, lg, xl, 2xl, full

### Shadows
- sm, md, lg, xl, glow, glow-lg

### Gradients
- primary, secondary, accent, tealPurple, modernDark

### Breakpoints
- xs, sm, md, lg, xl, 2xl

### Z-Index
- base, dropdown, sticky, fixed, modalBackdrop, modal, popover, tooltip

### Transitions
- Duration: fast, normal, slow
- Easing: easeIn, easeOut, easeInOut

## 🚀 Usage Examples

### Using CSS Variables
```css
.my-component {
  background: var(--color-dark-200);
  color: var(--color-dark-900);
  padding: var(--spacing-lg);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-duration-normal) var(--transition-easing-ease-in-out);
}
```

### Using TypeScript Config
```typescript
import { designSystem } from './config/design-system';

const Button = () => {
  const primaryColor = designSystem.colors.primary.teal[500];
  const spacing = designSystem.spacing.lg;
  
  return (
    <button style={{
      backgroundColor: primaryColor,
      padding: spacing,
    }}>
      Click Me
    </button>
  );
};
```

### Using JSON Tokens
```javascript
import tokens from '../design-tokens.json';

// Access tokens
const teal500 = tokens.colors.primary.teal[500].value;
const primaryGradient = tokens.gradients.primary.value;
```

## 🔧 Integration

### CSS Variables (Recommended for CSS/Tailwind)
The CSS file is automatically imported in `index.css`:
```css
@import './styles/design-system.css';
```

All CSS variables are available globally:
```css
.my-element {
  color: var(--color-teal-500);
  background: var(--gradient-primary);
}
```

### TypeScript Config (Recommended for TypeScript)
```typescript
import { designSystem, getColor } from './config/design-system';

// Type-safe access
const color = getColor('teal', 500); // Returns '#14b8a6'
```

### JSON Tokens (For Tools/Processors)
```javascript
import tokens from './design-tokens.json';

// Process tokens for your needs
Object.entries(tokens.colors.primary.teal).forEach(([shade, token]) => {
  console.log(`${shade}: ${token.value}`);
});
```

## 📚 Documentation

- **UI_DESIGN_SYSTEM.md**: Complete design system documentation
- **COMPONENT_SHOWCASE.md**: Visual component examples
- **MODERN_DARK_THEME.md**: Dark theme guidelines

## 🎯 Best Practices

1. **Use CSS Variables** for styling in CSS/Tailwind classes
2. **Use TypeScript Config** for type-safe JavaScript/TypeScript code
3. **Use JSON Tokens** for design tool integration or token processors
4. **Maintain Consistency** - always use design tokens, never hardcode values
5. **Update All Formats** - when changing tokens, update all three files

## 🔄 Updating Design Tokens

When updating design tokens:

1. Update `design-tokens.json` (source of truth)
2. Update `src/styles/design-system.css` (CSS variables)
3. Update `src/config/design-system.ts` (TypeScript config)
4. Update documentation if needed

## ✅ Validation

All files follow standard formats:
- ✅ JSON: Valid JSON with W3C Design Tokens structure
- ✅ CSS: Valid CSS with CSS Custom Properties
- ✅ TypeScript: Type-safe with `as const` assertions

## 📖 References

- [W3C Design Tokens Format](https://tr.designtokens.org/format/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [TypeScript Const Assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
