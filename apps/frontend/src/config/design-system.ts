/**
 * Design System Configuration
 * Call for Investor/CoFounder - TypeScript Design Tokens
 * Version: 1.0.0
 */

export const designSystem = {
  colors: {
    primary: {
      teal: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a',
      },
      cyan: {
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
      },
      purple: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce',
        800: '#6b21a8',
        900: '#581c87',
      },
    },
    dark: {
      50: '#0a0a0f',
      100: '#111118',
      200: '#1a1a24',
      300: '#252532',
      400: '#3a3a4a',
      500: '#525266',
      600: '#6b6b82',
      700: '#8e8ea0',
      800: '#b4b4c4',
      900: '#e0e0e8',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  
  typography: {
    fontFamily: {
      sans: 'Poppins, sans-serif',
      display: 'Poppins, sans-serif',
      mono: "JetBrains Mono, 'Fira Code', monospace",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(20, 184, 166, 0.5)',
    'glow-lg': '0 0 40px rgba(20, 184, 166, 0.6)',
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
    secondary: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
    accent: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
    tealPurple: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #8b5cf6 100%)',
    modernDark: 'linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #1a1a24 100%)',
  },
  
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  components: {
    button: {
      height: {
        sm: '2rem',
        md: '2.75rem',
        lg: '3.5rem',
      },
    },
    input: {
      height: {
        sm: '2rem',
        md: '2.75rem',
        lg: '3.5rem',
      },
    },
    card: {
      padding: {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
    },
    navigation: {
      height: {
        sm: '3.5rem',
        md: '4rem',
        lg: '5rem',
      },
    },
  },
} as const;

// Type exports for TypeScript
export type DesignSystem = typeof designSystem;
export type ColorScale = keyof typeof designSystem.colors.primary;
export type ColorValue = typeof designSystem.colors.primary.teal[500];

// Helper functions
export const getColor = (scale: ColorScale, shade: keyof typeof designSystem.colors.primary.teal) => {
  return designSystem.colors.primary[scale][shade];
};

export const getSpacing = (size: keyof typeof designSystem.spacing) => {
  return designSystem.spacing[size];
};

export const getGradient = (name: keyof typeof designSystem.gradients) => {
  return designSystem.gradients[name];
};
