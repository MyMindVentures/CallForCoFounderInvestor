import { motion } from 'framer-motion';
import { pageVariants, fadeVariants } from '@/lib/animations';

/**
 * Page Transition Wrapper
 * Wraps page content with smooth enter/exit animations
 */
export function PageTransition({ 
  children, 
  className = '',
  variant = 'default',
}) {
  const variants = variant === 'fade' ? fadeVariants : pageVariants;
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated container for staggered children
 */
export function StaggerContainer({ 
  children, 
  className = '',
  delay = 0.1,
  stagger = 0.1,
}) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
        exit: {
          transition: {
            staggerChildren: stagger / 2,
            staggerDirection: -1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated item for use inside StaggerContainer
 */
export function StaggerItem({ 
  children, 
  className = '',
}) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
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
          transition: { duration: 0.2 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fade in when element scrolls into view
 */
export function ScrollReveal({ 
  children, 
  className = '',
  once = true,
  amount = 0.3,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }}
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Motion-enabled Card with hover effects
 */
export function MotionCard({ 
  children, 
  className = '',
  whileHover = { scale: 1.02, y: -4 },
  whileTap = { scale: 0.98 },
  ...props
}) {
  return (
    <motion.div
      whileHover={whileHover}
      whileTap={whileTap}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
