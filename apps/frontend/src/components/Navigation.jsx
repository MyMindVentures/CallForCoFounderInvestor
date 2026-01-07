import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

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

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/storytelling', label: 'Story', icon: '📖' },
    { path: '/what-i-look-for', label: 'What I Look For', icon: '🤝' },
    { path: '/developer-help', label: 'Developer Help', icon: '💻' },
    { path: '/financial-help', label: 'Financial Help', icon: '💰' },
    { path: '/support', label: 'Support', icon: '💬' },
    { path: '/adhd-aries', label: 'ADHD + Aries', icon: '✨' }
  ];

  return (
    <nav className="glass-effect shadow-lg dark:shadow-dark-900/50 sticky top-0 z-50 border-b border-gray-200/50 dark:border-dark-300/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navigation Bar */}
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo/Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center flex-shrink-0 group"
          >
            <h1 className="text-lg sm:text-xl lg:text-2xl font-display font-extrabold gradient-text-animated group-hover:scale-105 transition-all duration-300 tracking-tight whitespace-nowrap">
              Call for Investor/CoFounder
            </h1>
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-shrink-0">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => {
                  e.stopPropagation();
                  closeMenu();
                }}
                className={`relative inline-flex items-center justify-center px-3 xl:px-4 py-2 xl:py-2.5 rounded-xl font-semibold text-xs xl:text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive(item.path)
                    ? 'btn-gradient shadow-glow scale-105'
                    : 'text-gray-700 dark:text-dark-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-dark-200 dark:hover:to-dark-300'
                }`}
                aria-label={item.label}
              >
                <span className="mr-1.5 text-sm xl:text-base" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <span 
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full pointer-events-none"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <DarkModeToggle />
            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="lg:hidden p-2.5 rounded-xl text-gray-700 dark:text-dark-600 hover:bg-gray-100 dark:hover:bg-dark-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
            <div className="relative w-6 h-6">
              <span
                className={`absolute top-0 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isOpen ? 'rotate-45 top-2.5' : ''
                }`}
                aria-hidden="true"
              />
              <span
                className={`absolute top-2.5 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
                aria-hidden="true"
              />
              <span
                className={`absolute top-5 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isOpen ? '-rotate-45 top-2.5' : ''
                }`}
                aria-hidden="true"
              />
            </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[600px] opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isOpen}
        >
          <div className="pt-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => {
                  e.stopPropagation();
                  closeMenu();
                }}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 cursor-pointer ${
                  isActive(item.path)
                    ? 'btn-gradient shadow-glow'
                    : 'text-gray-700 dark:text-dark-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-dark-200 dark:hover:to-dark-300 active:bg-gray-100 dark:active:bg-dark-200'
                }`}
                aria-label={item.label}
              >
                <span className="text-xl" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <span 
                    className="ml-auto w-2 h-2 bg-white rounded-full pointer-events-none"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
