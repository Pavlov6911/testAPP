import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import bgTranslations from './locales/bg.json';
import enTranslations from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      bg: {
        translation: bgTranslations
      },
      en: {
        translation: enTranslations
      }
    },
    lng: 'bg', // Set Bulgarian as the default language
    fallbackLng: 'bg', // Set Bulgarian as fallback language
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

// Force Bulgarian language on initialization
i18n.changeLanguage('bg');

export default i18n;
