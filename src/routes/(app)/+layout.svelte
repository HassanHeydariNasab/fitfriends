<script>
	import '@src/app.css';
	import Navbar from '@components/Navbar.svelte';
</script>

<div class="h-full flex flex-col">
	<div class="flex-1 relative">
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
