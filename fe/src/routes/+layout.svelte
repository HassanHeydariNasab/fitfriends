<script lang="ts">
	import { onMount } from 'svelte';
	import i18next from 'i18next';
	import { browser } from '$app/environment';

	import '@src/app.css';

	onMount(() => {
		if (browser) {
			const language = i18next.language;
			document.getElementsByTagName('html')[0].setAttribute('lang', language);
			i18next.on('languageChanged', (language) => {
				document.getElementsByTagName('html')[0].setAttribute('lang', language);
			});
		}
	});
</script>

<slot />
