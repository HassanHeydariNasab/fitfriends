import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'fa-IR';

register('en', () => import('./locales/en.json'));
register('fa-IR', () => import('./locales/fa.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale
});
