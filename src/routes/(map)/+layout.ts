import { browser } from '$app/environment';
import i18next from 'i18next';

if (browser) {
	i18next.on('languageChanged', (language) => {
		document.getElementsByTagName('html')[0].setAttribute('lang', language);
	});
}
