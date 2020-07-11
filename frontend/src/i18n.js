import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      'Try it!': 'Try it!',
      'Restart game': 'Restart game',
      'Game over': 'You lost!',
      Loading: 'Loading',
    },
  },
  es: {
    translation: {
      'Try it!': 'Inténtalo!',
      'Restart game': 'Jugar de nuevo',
      'Game over': 'Perdiste!',
      Loading: 'Cargando',
    },
  },
  de: {
    translation: {
      'Try it!': 'Versuch es',
      'Restart game': 'Neustart',
      'Game over': 'Das spiel ist aus',
      Loading: 'Wird geladen',
    },
  },
  fr: {
    translation: {
      'Try it!': 'Essayez-le!',
      'Restart game': 'Recommencer le jeu',
      'Game over': 'Jeu terminé',
      Loading: 'Chargement',
    },
  },
  it: {
    translation: {
      'Try it!': 'Provalo',
      'Restart game': 'Riprova',
      'Game over': 'Gioco finito',
      Loading: 'Caricamento in corso',
    },
  },
  zh: {
    translation: {
      'Try it!': '试试吧',
      'Restart game': '重新开始游戏',
      'Game over': '游戏结束',
      Loading: '装货',
    },
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
