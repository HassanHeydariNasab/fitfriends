<script lang="ts">
	import { page } from '$app/stores';

	const links = [
		{ label: 'Explore', href: '/' },
		{ label: 'Profile', href: '/profile' }
	];
</script>

<nav class="flex justify-around bg-pink-400 p-4">
	{#each links as link}
		<a
			href={link.href}
			class:active={$page.url.pathname === link.href}
			class="flex flex-col items-center"
		>
			<img src={'/icons/person.svg'} alt="" class="text-pink-900" width="24" height="24" />
			{link.label}
		</a>
	{/each}
</nav>

<style lang="postcss">
	.active {
		@apply font-bold;
		@apply underline;
	}
</style>
