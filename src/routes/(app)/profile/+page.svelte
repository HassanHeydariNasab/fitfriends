<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { currentUser } from '@stores/auth';
	import { mockedGroups } from '@data/groups.mock';
	import Profile from '@components/Profile.svelte';
	import SelectLanguage from '@components/SelectLanguage.svelte';
	import GroupOverview from '@components/GroupOverview.svelte';
	import Plus from '@components/icons/plus.svelte';

	const groups = [...mockedGroups, ...mockedGroups, ...mockedGroups];
</script>

<svelte:head><title>{$i18n.t('app_name')} | {$i18n.t('profile')}</title></svelte:head>

<main class="flex flex-col gap-4 pt-4">
	{#if $currentUser}
		<div class="px-4">
			<Profile user={$currentUser} isMyUser />
		</div>
	{/if}
	<SelectLanguage containerClass="self-center" />
	<div class="grid snap-x auto-cols-min grid-flow-col gap-4 overflow-x-auto py-4">
		<span />
		<a
			href="/create-group"
			class="grid w-64 select-none place-content-center justify-items-center rounded-3xl bg-primary-500 text-center text-lg font-semibold text-primary-700 shadow-md outline-offset-2 transition-[box-shadow] hover:opacity-100 hover:shadow-lg"
			draggable="false"
		>
			<Plus class="block" />
			{$i18n.t('create_group')}
		</a>
		{#each groups as group}
			<GroupOverview {group} />
		{/each}
		<span />
	</div>
</main>
