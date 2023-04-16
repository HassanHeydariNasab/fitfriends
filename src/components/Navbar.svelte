<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';

	import Location from './icons/location.svelte';
	import Person from './icons/person.svelte';

	const links = [
		{ label: $_('explore'), href: '/', icon: Location },
		{ label: $_('profile'), href: '/profile', icon: Person }
	];
</script>

<nav class="flex justify-around bg-white p-4 drop-shadow-2xl">
	{#each links as link}
		<a
			href={link.href}
			class:active={$page.url.pathname === link.href}
			class="flex flex-col items-center text-sm gap-2 font-bold text-gray-400"
		>
			<svelte:component this={link.icon} />
			{link.label}
		</a>
	{/each}
</nav>

<style lang="postcss">
	.active {
		@apply text-amber-500;
	}
</style>
