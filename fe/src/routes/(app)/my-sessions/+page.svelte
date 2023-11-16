<script>
	import { i18n } from '$lib/i18n';
	import SessionOverview from '@components/SessionOverview.svelte';
	import { mockedSessions } from '@data/sessions.mock';

	let sessions = mockedSessions;
</script>

<svelte:head><title>{$i18n.t('app_name')} | {$i18n.t('my_sessions')}</title></svelte:head>

<main class="flex flex-col gap-4 p-4">
	{#each sessions as session}
		<SessionOverview {session} />
	{/each}
</main>
