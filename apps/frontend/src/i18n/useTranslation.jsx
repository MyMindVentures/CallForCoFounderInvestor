import { useMemo } from 'react';
import { useLanguage } from './LanguageContext';

// Import translation files
import enTranslations from './translations/en.json';
import nlTranslations from './translations/nl.json';
import deTranslations from './translations/de.json';
import frTranslations from './translations/fr.json';
import esTranslations from './translations/es.json';

const translations = {
  EN: enTranslations,
  NL: nlTranslations,
  DE: deTranslations,
  FR: frTranslations,
  ES: esTranslations,
};

/**
 * Get nested value from object using dot notation
 * @param {object} obj - The object to search
 * @param {string} path - Dot notation path (e.g., 'nav.home')
 * @returns {string|undefined} - The value or undefined if not found
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Translation hook that provides access to translations based on current language
 * @returns {object} - Object with `t` function for translations
 */
export function useTranslation() {
  const { language } = useLanguage();

  const translation = useMemo(() => {
    return translations[language] || translations.EN;
  }, [language]);

  /**
   * Translation function
   * @param {string} key - Dot notation key (e.g., 'nav.home')
   * @param {object} fallback - Optional fallback value
   * @returns {string} - Translated string or fallback
   */
  const t = (key, fallback = null) => {
    const value = getNestedValue(translation, key);
    
    // If translation found, return it
    if (value !== undefined) {
      return value;
    }
    
    // Try English fallback
    if (language !== 'EN') {
      const enValue = getNestedValue(translations.EN, key);
      if (enValue !== undefined) {
        return enValue;
      }
    }
    
    // Return provided fallback or the key itself
    return fallback !== null ? fallback : key;
  };

  return { t, language };
}

export default useTranslation;
