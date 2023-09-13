<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { currentUser } from '@stores/auth';
	import Profile from '@components/Profile.svelte';
	import Select from '@components/Select.svelte';

	const onChangeLanguage = (event: CustomEvent<{ selected: unknown }>) => {
		const language = event.detail.selected;
		$i18n.changeLanguage(language as string);
	};
</script>

<h2 dir="auto">{$i18n.t('hello')} {$currentUser?.name}</h2>

<main class="flex min-h-full flex-col gap-4 p-4">
	{#if $currentUser}
		<Profile user={$currentUser} />
	{/if}
	<Select
		options={[
			{ value: 'en-US', label: 'English' },
			{ value: 'fa-IR', label: 'فارسی' }
		]}
		value={$i18n.language}
		on:select={onChangeLanguage}
	/>
</main>
