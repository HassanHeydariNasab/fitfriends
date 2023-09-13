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
	<img
		src={data.group.avatarUrl}
		alt="Group Banner"
		class="!mt-0 aspect-video max-h-[50vh] w-full object-cover shadow-md"
	/>
	<div class="flex justify-center gap-4 px-4">
		{#each data.group?.users || [] as user, index (user.id)}
			<div class="space-y-4 text-center text-sm">
				<img
					src={user.avatarUrl}
					alt={user.name}
					class="h-24 w-24 rounded-full border-2 bg-white object-contain drop-shadow-md"
					class:border-yellow-500={index === 0}
					class:border-gray-500={index === 1}
					class:border-orange-500={index === 2}
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
