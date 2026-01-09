import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Shield, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { cn } from '@/lib/utils';
import { mobileMenuVariants, staggerItem } from '@/lib/animations';
import { assets } from '@/utils/assets';
import { Button } from '@/components/ui/button';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  const navItems = [
    { path: '/', label: 'Home', iconSrc: assets.icons.home },
    { path: '/storytelling', label: 'Story', iconSrc: assets.icons.book },
    { path: '/what-i-look-for', label: 'What I Look For', iconSrc: assets.icons.users },
    { path: '/developer-help', label: 'Developer Help', iconSrc: assets.icons.code },
    { path: '/financial-help', label: 'Financial Help', iconSrc: assets.icons.dollar },
    { path: '/support', label: 'Support', iconSrc: assets.icons.message },
    { path: '/adhd-aries', label: 'ADHD + Aries', iconSrc: assets.icons.sparkles }
  ];

  return (
    <nav className="backdrop-blur-xl bg-dark-200/70 shadow-lg shadow-teal-500/10 sticky top-0 z-50 border-b border-teal-500/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Main Navigation Bar */}
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
          {/* Logo/Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 flex-shrink-0 group min-h-[44px]"
            aria-label="Home"
          >
            <motion.img
              src={assets.logoMark}
              alt="CallForCoFounder"
              className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            />
            <motion.h1 
              className="text-sm sm:text-base md:text-lg lg:text-xl font-display font-extrabold gradient-text-animated tracking-tight whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Call for Investor/CoFounder
            </motion.h1>
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-shrink-0">
            {navItems.map((item) => {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMenu();
                  }}
                  aria-label={item.label}
                >
                  <motion.div
                    className={cn(
                      'relative inline-flex items-center justify-center min-h-[40px] px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg font-semibold text-[11px] xl:text-xs whitespace-nowrap cursor-pointer',
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 text-white shadow-md shadow-teal-500/40'
                        : 'text-gray-300 hover:text-teal-400'
                    )}
                    whileHover={{ 
                      scale: isActive(item.path) ? 1 : 1.05,
                      backgroundColor: isActive(item.path) ? undefined : 'rgba(20, 184, 166, 0.1)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={item.iconSrc}
                      alt=""
                      className="w-3.5 h-3.5 mr-1"
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                    {isActive(item.path) && (
                      <motion.span 
                        className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full pointer-events-none"
                        layoutId="activeIndicator"
                        style={{ x: '-50%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        aria-hidden="true"
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <DarkModeToggle />
            <Button
              asChild
              size="sm"
              variant={isAdminRoute ? 'purple' : 'outline'}
              className="hidden md:inline-flex"
            >
              <Link
                to="/admin/login"
                onClick={(e) => {
                  e.stopPropagation();
                  closeMenu();
                }}
                aria-label="Admin login"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Login
              </Link>
            </Button>
            {/* Mobile Menu Toggle Button */}
            <motion.button
              type="button"
              onClick={toggleMenu}
              className="lg:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-gray-300 hover:bg-dark-300/50 active:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-dark-200 border border-teal-500/10 hover:border-teal-500/20"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-teal-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-teal-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="lg:hidden overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              aria-hidden={!isOpen}
            >
              <motion.div 
                className="pt-2 pb-4 space-y-1.5 sm:space-y-2"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.1,
                    },
                  },
                  exit: {
                    transition: {
                      staggerChildren: 0.03,
                      staggerDirection: -1,
                    },
                  },
                }}
              >
                {navItems.map((item) => {
                  return (
                    <motion.div key={item.path} variants={staggerItem}>
                      <Link
                        to={item.path}
                        onClick={(e) => {
                          e.stopPropagation();
                          closeMenu();
                        }}
                        className={cn(
                          'flex items-center space-x-3 min-h-[44px] px-4 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base cursor-pointer transition-colors duration-200',
                          isActive(item.path)
                            ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 text-white shadow-lg shadow-teal-500/50'
                            : 'text-gray-300 hover:text-teal-400 hover:bg-teal-500/10 active:bg-dark-300/50'
                        )}
                        aria-label={item.label}
                      >
                        <img
                          src={item.iconSrc}
                          alt=""
                          className="w-5 h-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="flex-1">{item.label}</span>
                        {isActive(item.path) && (
                          <motion.span 
                            className="w-2 h-2 bg-white rounded-full pointer-events-none flex-shrink-0"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div variants={staggerItem} className="pt-2">
                  <Button
                    asChild
                    size="lg"
                    variant={isAdminRoute ? 'purple' : 'outline'}
                    className="w-full justify-center"
                  >
                    <Link
                      to="/admin/login"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeMenu();
                      }}
                      aria-label="Admin login"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Admin Login
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navigation;
