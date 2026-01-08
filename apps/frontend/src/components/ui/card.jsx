import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  // Base styles - glassmorphism foundation
  'rounded-2xl border transition-all duration-300',
  {
    variants: {
      variant: {
        // Default glass card
        default:
          'backdrop-blur-xl bg-dark-200/60 border-teal-500/20 shadow-lg shadow-teal-500/10',
        
        // Enhanced glass with stronger blur
        glass:
          'backdrop-blur-2xl bg-dark-200/50 border-teal-500/15 shadow-xl shadow-teal-500/5',
        
        // Frosted glass - lighter, more visible blur
        frosted:
          'backdrop-blur-2xl bg-white/5 border-white/10 shadow-xl',
        
        // Gradient border card
        gradient:
          'backdrop-blur-xl bg-dark-200/60 border-0 shadow-xl relative before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-teal-500/50 before:via-cyan-500/30 before:to-purple-500/50 before:-z-10',
        
        // Elevated card with stronger shadow
        elevated:
          'backdrop-blur-xl bg-dark-200/70 border-teal-500/25 shadow-2xl shadow-dark-50/50',
        
        // Interactive card - for clickable items
        interactive:
          'backdrop-blur-xl bg-dark-200/60 border-teal-500/20 shadow-lg shadow-teal-500/10 cursor-pointer hover:bg-dark-200/80 hover:border-teal-500/40 hover:shadow-teal-500/20 hover:-translate-y-1 hover:scale-[1.02]',
        
        // Solid dark card
        solid:
          'bg-dark-200 border-dark-400/50 shadow-lg',
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      glow: {
        none: '',
        teal: 'shadow-glow',
        purple: 'shadow-glow-purple',
        subtle: 'shadow-teal-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      glow: 'none',
    },
  }
);

const Card = React.forwardRef(
  ({ className, variant, size, glow, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, glow, className }))}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-xl sm:text-2xl font-display font-bold text-gray-100 tracking-tight',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-400', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
};
