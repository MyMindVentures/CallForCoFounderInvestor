import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-200 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        // Primary gradient button with glow
        default:
          'bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 text-white shadow-lg shadow-teal-500/50 hover:from-teal-400 hover:via-cyan-400 hover:to-teal-500 hover:shadow-teal-500/70 hover:scale-105 focus-visible:ring-teal-500',
        
        // Purple gradient variant
        purple:
          'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-purple-500/50 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-400 hover:shadow-purple-500/70 hover:scale-105 focus-visible:ring-purple-500',
        
        // Glassmorphism button
        glass:
          'backdrop-blur-lg bg-dark-200/60 border border-teal-500/20 text-gray-100 shadow-lg shadow-teal-500/10 hover:bg-dark-200/80 hover:border-teal-500/40 hover:shadow-teal-500/20 focus-visible:ring-teal-500',
        
        // Frosted glass with glow on hover
        glassFrost:
          'backdrop-blur-xl bg-white/10 border border-white/20 text-white shadow-lg hover:bg-white/20 hover:shadow-glow focus-visible:ring-white/50',
        
        // Outline/ghost variant
        outline:
          'border-2 border-teal-500/50 text-teal-400 bg-transparent hover:bg-teal-500/10 hover:border-teal-400 focus-visible:ring-teal-500',
        
        // Ghost variant - minimal
        ghost:
          'text-gray-300 hover:text-teal-400 hover:bg-teal-500/10 focus-visible:ring-teal-500',
        
        // Destructive/danger
        destructive:
          'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/50 hover:from-red-500 hover:to-red-400 focus-visible:ring-red-500',
        
        // Success variant
        success:
          'bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-lg shadow-emerald-500/50 hover:from-emerald-500 hover:to-green-400 focus-visible:ring-emerald-500',
        
        // Warning/donation variant
        warning:
          'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/50 hover:from-yellow-400 hover:to-orange-400 focus-visible:ring-yellow-500',
        
        // Link style
        link:
          'text-teal-400 underline-offset-4 hover:underline hover:text-teal-300 focus-visible:ring-teal-500',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        xl: 'h-14 rounded-2xl px-10 text-lg',
        icon: 'h-11 w-11',
        iconSm: 'h-9 w-9 rounded-lg',
        iconLg: 'h-12 w-12',
      },
      glow: {
        none: '',
        pulse: 'animate-glow',
        static: 'shadow-glow',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      glow: 'none',
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, glow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, glow, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
