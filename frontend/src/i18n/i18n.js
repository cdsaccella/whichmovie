import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.js';
import en from './locales/en.js';
import de from './locales/de.js';
import fr from './locales/fr.js';
import it from './locales/it.js';
import zh from './locales/zh.js';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  de: {
    translation: de,
  },
  fr: {
    translation: fr,
  },
  it: {
    translation: it,
  },
  zh: {
    translation: zh,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
