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
      'Your score is': 'Your score is',
      Continue: 'Continue',
      'Game settings': 'Game settings',
      'Choose the mode you want to play': 'Choose the mode you want to play',
      'Classic Mode': 'Classic Mode',
      'Try to hit the best you can without losing': 'Try to hit the best you can without losing',
      'Time Trial Mode': 'Time Trial Mode',
      'Try to hit the best you can in the given time': 'Try to hit the best you can in the given time',
    },
  },
  es: {
    translation: {
      'Try it!': 'Inténtalo!',
      'Restart game': 'Jugar de nuevo',
      'Game over': 'Perdiste!',
      Loading: 'Cargando',
      'Your score is': 'Tu puntaje es',
      Continue: 'Continuar',
      'Game settings': 'Configuración',
      'Choose the mode you want to play': 'Elige el modo que quieres jugar',
      'Classic Mode': 'Modo Clásico',
      'Try to hit the best you can without losing': 'Intenta adivinar lo máximo que puedas sin perder',
      'Time Trial Mode': 'Modo Contrarreloj',
      'Try to hit the best you can in the given time': 'Intenta adivinar lo máximo que puedas en el tiempo dado',
    },
  },
  de: {
    translation: {
      'Try it!': 'Versuch es',
      'Restart game': 'Neustart',
      'Game over': 'Das spiel ist aus',
      Loading: 'Wird geladen',
      'Your score is': 'Dein Ergebnis ist',
      Continue: 'Fortsetzen',
      'Game settings': 'Spieleinstellungen',
      'Choose the mode you want to play': 'Wählen Sie den Modus, den Sie spielen möchten',
      'Classic Mode': 'Klassischer Modus',
      'Try to hit the best you can without losing': 'Versuchen Sie, das Beste zu geben, ohne zu verlieren',
      'Time Trial Mode': 'Zeitfahrmodus',
      'Try to hit the best you can in the given time': 'Versuchen Sie, das Beste zu erreichen, was Sie in der vorgegebenen Zeit können',
    },
  },
  fr: {
    translation: {
      'Try it!': 'Essayez-le!',
      'Restart game': 'Recommencer le jeu',
      'Game over': 'Jeu terminé',
      Loading: 'Chargement',
      'Your score is': 'Votre score est',
      Continue: 'Continuer',
      'Game settings': 'Paramètres de jeu',
      'Choose the mode you want to play': 'Choisissez le mode auquel vous souhaitez jouer',
      'Classic Mode': 'Mode classique',
      'Try to hit the best you can without losing': 'Essayez de frapper du mieux que vous pouvez sans perdre',
      'Time Trial Mode': 'Mode contre la montre',
      'Try to hit the best you can in the given time': 'Essayez de frapper le mieux possible dans le temps imparti',
    },
  },
  it: {
    translation: {
      'Try it!': 'Provalo',
      'Restart game': 'Riprova',
      'Game over': 'Gioco finito',
      Loading: 'Caricamento in corso',
      'Your score is': 'Il tuo punteggio è',
      Continue: 'Continua',
      'Game settings': 'Impostazioni',
      'Choose the mode you want to play': 'Scegli la modalità che desideri giocare',
      'Classic Mode': 'Modalità classica',
      'Try to hit the best you can without losing': 'Cerca di colpire il meglio che puoi senza perdere',
      'Time Trial Mode': 'Modalità prova a tempo',
      'Try to hit the best you can in the given time': 'Cerca di fare il meglio che puoi in un determinato momento',
    },
  },
  zh: {
    translation: {
      'Try it!': '试试吧',
      'Restart game': '重新开始游戏',
      'Game over': '游戏结束',
      Loading: '装货',
      'Your score is': '你的分数是',
      Continue: '继续',
      'Game settings': '游戏设置',
      'Choose the mode you want to play': '选择您要播放的模式',
      'Classic Mode': '经典模式',
      'Try to hit the best you can without losing': '尝试在不损失的情况下尽力而为',
      'Time Trial Mode': '计时赛模式',
      'Try to hit the best you can in the given time': '尝试在给定的时间内达到最佳状态',
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
