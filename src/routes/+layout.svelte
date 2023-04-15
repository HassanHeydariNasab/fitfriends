<script>
	import '../app.css';
	import Navbar from '@components/navbar.svelte';
</script>

<div class="h-full flex flex-col">
	<div class="flex-1">
		<slot />
	</div>
	<Navbar />
</div>

<style lang="postcss">
	:global(html, body) {
		background-color: theme(colors.pink.100);
		height: 100%;
	}
</style>
