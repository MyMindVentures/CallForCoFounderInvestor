import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  // Base input styles with glassmorphism
  'flex w-full rounded-xl border text-sm transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        // Default glass input
        default:
          'backdrop-blur-md bg-dark-200/60 border-teal-500/20 text-gray-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 focus:bg-dark-200/80',
        
        // Frosted glass input
        frosted:
          'backdrop-blur-xl bg-white/5 border-white/20 text-white focus:border-white/40 focus:ring-2 focus:ring-white/10',
        
        // Solid dark input
        solid:
          'bg-dark-300 border-dark-400 text-gray-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
        
        // Glow effect on focus
        glow:
          'backdrop-blur-md bg-dark-200/60 border-teal-500/20 text-gray-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/30 focus:shadow-glow',
        
        // Error state
        error:
          'backdrop-blur-md bg-dark-200/60 border-red-500/50 text-gray-100 focus:border-red-400 focus:ring-2 focus:ring-red-500/20',
        
        // Success state
        success:
          'backdrop-blur-md bg-dark-200/60 border-emerald-500/50 text-gray-100 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        default: 'h-11 px-4 py-2.5',
        lg: 'h-12 px-5 text-base',
        xl: 'h-14 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Input = React.forwardRef(
  ({ className, variant, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

// Textarea with same styling
const textareaVariants = cva(
  'flex min-h-[120px] w-full rounded-xl border text-sm transition-all duration-300 placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none',
  {
    variants: {
      variant: {
        default:
          'backdrop-blur-md bg-dark-200/60 border-teal-500/20 text-gray-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 focus:bg-dark-200/80',
        frosted:
          'backdrop-blur-xl bg-white/5 border-white/20 text-white focus:border-white/40 focus:ring-2 focus:ring-white/10',
        solid:
          'bg-dark-300 border-dark-400 text-gray-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
        glow:
          'backdrop-blur-md bg-dark-200/60 border-teal-500/20 text-gray-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/30 focus:shadow-glow',
        error:
          'backdrop-blur-md bg-dark-200/60 border-red-500/50 text-gray-100 focus:border-red-400 focus:ring-2 focus:ring-red-500/20',
        success:
          'backdrop-blur-md bg-dark-200/60 border-emerald-500/50 text-gray-100 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20',
      },
      size: {
        sm: 'px-3 py-2 text-xs min-h-[80px]',
        default: 'px-4 py-3 min-h-[120px]',
        lg: 'px-5 py-4 text-base min-h-[150px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Textarea = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Input, Textarea, inputVariants, textareaVariants };
