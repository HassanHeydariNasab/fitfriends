<script>
	import '@src/app.css';
	import Navbar from '@components/Navbar.svelte';
</script>

<div class="flex h-full flex-col">
	<div class="relative flex-1">
		<slot />
	</div>
	<Navbar />
</div>

<style lang="postcss">
	:global(html, body) {
		background-color: theme(colors.white);
		height: 100%;
	}
</style>
