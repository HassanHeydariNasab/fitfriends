<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { currentUser } from '@stores/auth';
	import Profile from '@components/Profile.svelte';
	import SelectLanguage from '@components/SelectLanguage.svelte';
</script>

<h2 dir="auto">{$i18n.t('hello')} {$currentUser?.name}</h2>

<main class="flex min-h-full flex-col gap-4 p-4">
	{#if $currentUser}
		<Profile user={$currentUser} />
	{/if}
	<SelectLanguage />
</main>
