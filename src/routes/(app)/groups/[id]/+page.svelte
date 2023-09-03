<script lang="ts">
	export let data: PageData;

	import type { PageData } from './$types';

	import { i18n } from '$lib/i18n';
	import SessionOverview from '@components/SessionOverview.svelte';
	import Header from '@components/Header.svelte';
	import { mockedSessions } from '@data/sessions.mock';

	$: sessions = mockedSessions.filter((session) => session.group.id === data.group?.id);
</script>

<main class="space-y-4 pb-4">
	<Header title={data.group?.title} />
	<div class="flex justify-center gap-4 px-4">
		{#each data.group?.users || [] as user, index (user.id)}
			<div class="text-center text-sm">
				<img
					src={user.avatarUrl}
					alt={user.name}
					class="h-32 w-32 object-contain pb-2 drop-shadow-sm"
					class:border-primary-500={index === 0}
				/>
				<span>{user.name}</span>
			</div>
		{/each}
	</div>
	<p dir="auto" class="bg-white px-4 pb-4 pt-2 indent-4 shadow-sm first-letter:text-3xl">
		{data.group?.description}
	</p>
	<h2 dir="auto" class="ps-8 pt-4 font-light text-gray-600 drop-shadow-md">
		{$i18n.t('upcoming_sessions')}
	</h2>
	<div class="space-y-4 px-4">
		{#each sessions as session}
			<SessionOverview {session} shouldShowGroupOverview={false} />
		{/each}
	</div>
</main>
