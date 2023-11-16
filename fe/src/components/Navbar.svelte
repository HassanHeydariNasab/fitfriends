<script lang="ts">
	import { page } from '$app/stores';
	import { i18n } from '$lib/i18n';

	import Location from './icons/location.svelte';
	import Person from './icons/person.svelte';
	import ListBox from './icons/list-box.svelte';

	$: links = [
		{ label: $i18n.t('my_sessions'), href: '/my-sessions', icon: ListBox },
		{ label: $i18n.t('explore'), href: '/', icon: Location },
		{ label: $i18n.t('profile'), href: '/profile', icon: Person }
	];
</script>

<nav
	class="sticky bottom-0 z-20 mt-auto flex justify-around bg-gradient-to-t from-gray-900 to-gray-700 p-4"
>
	{#each links as link}
		<a
			href={link.href}
			data-sveltekit-replacestate
			class:active={$page.url.pathname === '/' && link.href === '/'
				? true
				: link.href !== '/' && $page.url.pathname.startsWith(link.href)}
			class="flex flex-1 flex-col items-center gap-2 text-center text-sm font-semibold text-gray-500 focus-visible:outline-dashed"
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
