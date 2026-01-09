import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

export const languageOptions = [
  { code: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'NL', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
  { code: 'ES', label: 'Español', flag: '🇪🇸' }
];

const resolveStoredLanguage = () => {
  if (typeof window === 'undefined') return 'EN';
  const stored = window.localStorage.getItem('language');
  return languageOptions.some(option => option.code === stored) ? stored : 'EN';
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(resolveStoredLanguage);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language.toLowerCase());
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    languageOptions
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
