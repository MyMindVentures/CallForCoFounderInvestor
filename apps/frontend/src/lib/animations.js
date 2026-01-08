/**
 * Framer Motion Animation Variants
 * Glassmorphism-optimized animations with smooth, professional feel
 */

// ============================================
// PAGE TRANSITIONS
// ============================================

/**
 * Fade and slide up animation for page transitions
 */
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.55, 0.055, 0.675, 0.19], // easeInQuad
    },
  },
};

/**
 * Fade only page transition (subtle)
 */
export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' }
  },
};

/**
 * Scale and fade for modal/dialog animations
 */
export const scaleVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.95,
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1], // spring-like
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    transition: {
      duration: 0.15,
      ease: 'easeIn'
    }
  },
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

/**
 * Container for staggered children animations
 */
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

/**
 * Fast stagger for lists
 */
export const staggerContainerFast = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

/**
 * Child item for stagger animations
 */
export const staggerItem = {
  initial: { 
    opacity: 0, 
    y: 20,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    }
  },
};

/**
 * Scale up stagger item
 */
export const staggerItemScale = {
  initial: { 
    opacity: 0, 
    scale: 0.9,
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    }
  },
};

// ============================================
// CARD ANIMATIONS
// ============================================

/**
 * Card hover with lift and glow
 */
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 8px 32px 0 rgba(20, 184, 166, 0.1)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: '0 16px 48px 0 rgba(20, 184, 166, 0.2)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

/**
 * Subtle card hover (less dramatic)
 */
export const cardHoverSubtle = {
  rest: {
    scale: 1,
    transition: { duration: 0.2 },
  },
  hover: {
    scale: 1.01,
    transition: { duration: 0.2 },
  },
};

/**
 * Glass card entrance animation
 */
export const glassCardVariants = {
  initial: {
    opacity: 0,
    y: 30,
    backdropFilter: 'blur(0px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    backdropFilter: 'blur(16px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ============================================
// BUTTON ANIMATIONS
// ============================================

/**
 * Button tap/click animation
 */
export const buttonTap = {
  scale: 0.95,
  transition: { duration: 0.1 },
};

/**
 * Button hover with glow effect
 */
export const buttonHover = {
  scale: 1.05,
  transition: { 
    duration: 0.2,
    ease: 'easeOut',
  },
};

/**
 * Button spring animation
 */
export const buttonSpring = {
  type: 'spring',
  stiffness: 400,
  damping: 17,
};

// ============================================
// NAVIGATION ANIMATIONS
// ============================================

/**
 * Mobile menu slide animation
 */
export const mobileMenuVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: 'easeInOut' },
      opacity: { duration: 0.2 },
    },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: 'easeInOut' },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

/**
 * Nav item hover underline
 */
export const navItemVariants = {
  rest: {
    width: 0,
  },
  hover: {
    width: '100%',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

/**
 * Hamburger menu icon animation
 */
export const hamburgerLine = {
  closed: { rotate: 0, y: 0 },
  open: (custom) => ({
    rotate: custom.rotate,
    y: custom.y,
    transition: { duration: 0.3, ease: 'easeInOut' },
  }),
};

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Fade in when scrolling into view
 */
export const scrollFadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  },
  viewport: { once: true, margin: '-100px' },
};

/**
 * Scale up when scrolling into view
 */
export const scrollScaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  viewport: { once: true, margin: '-50px' },
};

// ============================================
// MICRO INTERACTIONS
// ============================================

/**
 * Pulse animation for attention
 */
export const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Float animation (subtle up and down)
 */
export const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Shimmer effect for loading states
 */
export const shimmerVariants = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Glow pulse for buttons/elements
 */
export const glowPulse = {
  initial: { 
    boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)' 
  },
  animate: {
    boxShadow: [
      '0 0 20px rgba(20, 184, 166, 0.3)',
      '0 0 40px rgba(20, 184, 166, 0.6)',
      '0 0 20px rgba(20, 184, 166, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================
// LAYOUT ANIMATIONS
// ============================================

/**
 * Shared layout transition settings
 */
export const layoutTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

/**
 * Accordion/collapse animation
 */
export const collapseVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Create custom spring animation
 * @param {number} stiffness - Spring stiffness (default: 300)
 * @param {number} damping - Spring damping (default: 30)
 * @returns {object} Spring transition config
 */
export const createSpring = (stiffness = 300, damping = 30) => ({
  type: 'spring',
  stiffness,
  damping,
});

/**
 * Create custom ease transition
 * @param {number} duration - Duration in seconds
 * @param {string|array} ease - Easing function
 * @returns {object} Transition config
 */
export const createEase = (duration = 0.3, ease = 'easeOut') => ({
  duration,
  ease,
});

/**
 * Delay wrapper for animations
 * @param {number} delay - Delay in seconds
 * @returns {object} Transition with delay
 */
export const withDelay = (delay) => ({
  delay,
});
