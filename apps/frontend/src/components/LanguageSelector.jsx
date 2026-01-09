import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function LanguageSelector() {
  const [language, setLanguage] = useState('EN');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('language') || 'EN';
    setLanguage(savedLanguage);
    // Apply language to document
    document.documentElement.setAttribute('lang', savedLanguage.toLowerCase());
  }, []);

  // Handle Escape key to close dropdown
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const languages = [
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'NL', label: 'Nederlands', flag: '🇳🇱' }
  ];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
    localStorage.setItem('language', langCode);
    document.documentElement.setAttribute('lang', langCode.toLowerCase());
    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: langCode } }));
  };

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="h-6 w-16 rounded bg-dark-300/50 animate-pulse" />
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1 rounded-lg backdrop-blur-md bg-dark-300/50 border border-teal-500/20 text-gray-300 hover:text-teal-300 hover:bg-dark-300/70 hover:border-teal-400/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-dark-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Current language: ${currentLanguage.label}. Click to change language`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-3 h-3" />
        <span className="text-xs font-medium">{currentLanguage.code}</span>
        <ChevronDown 
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              className="absolute right-0 mt-2 z-20 min-w-[140px] rounded-lg backdrop-blur-md bg-dark-200/95 border border-teal-500/20 shadow-lg shadow-dark-50/50 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              role="menu"
              aria-orientation="vertical"
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                    language === lang.code
                      ? 'bg-teal-500/20 text-teal-300'
                      : 'text-gray-300 hover:bg-dark-300/50 hover:text-teal-300'
                  }`}
                  role="menuitem"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="flex-1">{lang.label}</span>
                  {language === lang.code && (
                    <motion.span
                      className="text-teal-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSelector;
