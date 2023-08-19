<script>
	import { _ } from 'svelte-i18n';

	import SessionOverview from '@components/SessionOverview.svelte';
	import { mockedSessions } from '@data/sessions.mock';

	let sessions = mockedSessions;
</script>

<main class="flex min-h-full flex-col gap-4 p-4">
	{#each sessions as session}
		<SessionOverview {session} />
	{/each}
</main>
