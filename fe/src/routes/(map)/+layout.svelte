<script>
	import Navbar from '@components/Navbar.svelte';
</script>

<svelte:head>
	<style>
		html,
		body {
			height: 100%;
		}
	</style>
</svelte:head>

<div class="flex h-full flex-col">
	<div class="relative flex-1">
		<slot />
	</div>
	<Navbar />
</div>
