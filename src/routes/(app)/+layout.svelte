<script>
	import '@src/app.css';
	import Navbar from '@components/Navbar.svelte';
</script>

<div class="flex h-full flex-col">
	<div class="relative flex-1 overflow-y-auto">
		<slot />
	</div>
	<Navbar />
</div>
