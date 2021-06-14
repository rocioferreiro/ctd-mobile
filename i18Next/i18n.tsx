import i18n from 'i18next';
import { initReactI18next } from 'react-native-i18n';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
/*        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default*/

    /*    },
        resources: {
            en: {
                translation: {
                    description: {
                        part1: 'Edit src/App.js and save to reload.',

                    }
                }
            },
            de: {
                translation: {
                    description: {
                        part1: 'Ändere src/App.js und speichere um neu zu laden.',

                    }
                }
            }
        }*/

        fallbackLng: 'es',

        // Have a common namespace used around the full app
        ns: ['translations', 'forms', 'errors'],
        defaultNS: 'translations',

        debug: false,
        preload: false,

        // Supported languages
        whitelist: ['es','en'],
        nonExplicitWhitelist: false,

        interpolation: {
            escapeValue: false,
        },

        react: {
            wait: true,
            nsMode: 'fallback'
        }

    });

export default i18n;