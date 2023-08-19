<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';

	import Location from './icons/location.svelte';
	import Person from './icons/person.svelte';
	import ListBox from './icons/list-box.svelte';

	const links = [
		{ label: $_('my_sessions'), href: '/my-sessions', icon: ListBox },
		{ label: $_('explore'), href: '/', icon: Location },
		{ label: $_('profile'), href: '/profile', icon: Person }
	];
</script>

<nav
	class="drop-shadow-3xl z-20 flex justify-around bg-gradient-to-t from-gray-900 to-gray-700 p-4"
>
	{#each links as link}
		<a
			href={link.href}
			class:active={$page.url.pathname === '/' && link.href === '/'
				? true
				: link.href !== '/' && $page.url.pathname.startsWith(link.href)}
			class="flex flex-1 flex-col items-center gap-2 text-sm font-bold text-gray-500"
		>
			<svelte:component this={link.icon} />
			{link.label}
		</a>
	{/each}
</nav>

<style lang="postcss">
	.active {
		@apply text-primary-500;
	}
</style>
