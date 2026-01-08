import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300',
  {
    variants: {
      variant: {
        // Default glass badge
        default:
          'backdrop-blur-md bg-dark-200/60 border border-teal-500/30 text-teal-300 shadow-sm',
        
        // Gradient badges
        teal:
          'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30',
        
        purple:
          'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30',
        
        mixed:
          'bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-500 text-white shadow-lg',
        
        // Semantic badges
        success:
          'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300',
        
        warning:
          'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300',
        
        error:
          'bg-red-500/20 border border-red-500/30 text-red-300',
        
        info:
          'bg-blue-500/20 border border-blue-500/30 text-blue-300',
        
        // Outline variant
        outline:
          'border-2 border-teal-500/50 text-teal-400 bg-transparent',
        
        // Glass glow
        glow:
          'backdrop-blur-md bg-teal-500/20 border border-teal-400/40 text-teal-200 shadow-glow',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        default: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Badge = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
