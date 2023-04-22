<script>
	import '@src/app.css';
</script>

<div class="relative flex h-full flex-col">
	<slot />
</div>

<style lang="postcss">
	:global(html, body) {
		background-color: theme(colors.white);
		height: 100%;
	}
</style>
