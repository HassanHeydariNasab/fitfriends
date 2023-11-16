<script>
	import { page } from '$app/stores';

	import { i18n } from '$lib/i18n';
	import '@src/app.css';
</script>

<main class="grid h-full w-full place-content-center gap-4 text-center">
	<h1 class="text-2xl">{$i18n.t($page.error?.message || 'an_error_occurred')}</h1>
	<p>{$page.status}</p>
	<a href="/" class="font-bold">{$i18n.t('go_home')}</a>
</main>
