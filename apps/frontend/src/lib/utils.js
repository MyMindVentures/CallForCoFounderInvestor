import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for merging Tailwind CSS classes with proper precedence.
 * Combines clsx for conditional classes with tailwind-merge for deduplication.
 * 
 * @param {...(string|undefined|null|boolean|object)} inputs - Class names or conditional objects
 * @returns {string} Merged and deduplicated class string
 * 
 * @example
 * cn('px-4 py-2', 'bg-blue-500', isActive && 'bg-blue-700')
 * cn('text-sm', { 'font-bold': isBold, 'text-red-500': hasError })
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Generate glassmorphism classes based on intensity level
 * @param {'sm' | 'md' | 'lg' | 'xl'} intensity - Blur intensity level
 * @returns {string} Tailwind classes for glass effect
 */
export function glassClasses(intensity = 'md') {
  const intensityMap = {
    sm: 'backdrop-blur-sm bg-dark-200/40 border-teal-500/10',
    md: 'backdrop-blur-md bg-dark-200/50 border-teal-500/15',
    lg: 'backdrop-blur-lg bg-dark-200/60 border-teal-500/20',
    xl: 'backdrop-blur-xl bg-dark-200/70 border-teal-500/25',
  };

  return cn(
    'border rounded-xl',
    intensityMap[intensity] || intensityMap.md,
    'shadow-lg shadow-teal-500/5'
  );
}

/**
 * Generate glow effect classes
 * @param {'teal' | 'purple' | 'cyan' | 'mixed'} color - Glow color
 * @param {'sm' | 'md' | 'lg'} size - Glow size
 * @returns {string} CSS class string for glow effect
 */
export function glowClasses(color = 'teal', size = 'md') {
  const colorMap = {
    teal: 'shadow-teal-500',
    purple: 'shadow-purple-500',
    cyan: 'shadow-cyan-500',
    mixed: 'shadow-teal-500',
  };

  const sizeMap = {
    sm: '/30',
    md: '/50',
    lg: '/70',
  };

  return `${colorMap[color]}${sizeMap[size]}`;
}
