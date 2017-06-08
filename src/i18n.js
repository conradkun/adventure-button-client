import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import frLocale from './locales/fr.json';


i18n
  .use(LanguageDetector)
  .init({
    fallbackLng: 'fr',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    resources: {
      fr: frLocale
    },
    // react i18next special options (optional)
    react: {
      wait: false, // set to true if you like to wait for loaded in every translated hoc
      nsMode: 'default' // set it to fallback to let passed namespaces to translated hoc act as fallbacks
    }
  });


export default i18n;
