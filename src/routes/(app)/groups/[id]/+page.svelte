<script lang="ts">
	export let data: PageData;

	import type { PageData } from './$types';

	import { i18n } from '$lib/i18n';
	import SessionOverview from '@components/SessionOverview.svelte';
	import Header from '@components/Header.svelte';
	import { mockedSessions } from '@data/sessions.mock';
	import Pencil from '@components/icons/pencil.svelte';
	import Plus from '@components/icons/plus.svelte';

	const administratedGroupsIds = ['1'];

	$: isAdmin = administratedGroupsIds.includes(data.group?.id);

	$: sessions = mockedSessions.filter((session) => session.group.id === data.group?.id);
</script>

<Header title={data.group?.title}>
	<a
		slot="right"
		class="text me-4 !p-0"
		class:!hidden={!isAdmin}
		href="/edit-group/{data.group?.id}"
	>
		<Pencil width="1rem" />
	</a>
</Header>

<main class="flex flex-col gap-4">
	<img
		src={data.group.imageUrl}
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
	<p
		dir="auto"
		class="break-words bg-white px-4 pb-4 pt-2 indent-4 shadow-sm first-letter:text-3xl"
	>
		{data.group?.description}
	</p>
	<div class="flex flex-wrap items-center justify-between gap-4 px-8 pt-4" dir="auto">
		<h2 dir="auto" class="text-sm font-semibold text-gray-700 drop-shadow-md">
			{$i18n.t('upcoming_sessions')}
		</h2>
		{#if isAdmin}
			<a href="/create-session">
				<button class="outlined !py-1 !pe-4 !ps-3">
					<Plus class="me-1 w-[1em]" />
					{$i18n.t('create_session')}
				</button>
			</a>
		{/if}
	</div>
	<div class="space-y-4 px-4">
		{#each sessions as session}
			<SessionOverview {session} shouldShowGroupOverview={false} />
		{/each}
	</div>
</main>
