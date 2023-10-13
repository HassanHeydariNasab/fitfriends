import i18next from 'i18next';
import { createI18nStore } from 'svelte-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const supportedLanguages = ['en', 'fa'];

i18next
	.use(HttpBackend)
	.use(LanguageDetector)
	.init({
		detection: {
			order: ['querystring', 'localStorage', 'navigator'],
			caches: ['localStorage'],
			lookupQuerystring: 'lng',
			lookupLocalStorage: 'locale',
			convertDetectedLanguage: (lng) => {
				const result = lng.split('-')[0];
				if (supportedLanguages.includes(result)) return result;
				return 'en';
			}
		},
		fallbackLng: 'en',
		ns: 'common',
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json'
		},
		interpolation: {
			escapeValue: false // not needed for svelte as it escapes by default
		}
	});

export const i18n = createI18nStore(i18next);
