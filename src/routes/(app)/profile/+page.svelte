<script lang="ts">
	//import { i18n } from '$lib/i18n';
	import { currentUser } from '@stores/auth';
	import Profile from '@components/Profile.svelte';
	import SelectLanguage from '@components/SelectLanguage.svelte';
	import { mockedGroups } from '@data/groups.mock';
	import GroupOverview from '@components/GroupOverview.svelte';

	const groups = [...mockedGroups, ...mockedGroups, ...mockedGroups];
</script>

<main class="flex min-h-full flex-col gap-4 py-4">
	{#if $currentUser}
		<div class="px-4">
			<Profile user={$currentUser} isMyUser />
		</div>
	{/if}
	<SelectLanguage containerClass="self-center" />
	<div class="grid snap-x auto-cols-min grid-flow-col gap-4 overflow-x-auto py-4">
		<span />
		{#each groups as group}
			<GroupOverview {group} />
		{/each}
		<span />
	</div>
</main>
