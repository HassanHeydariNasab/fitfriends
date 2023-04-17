<script>
	import '@src/app.css';
</script>

<div class="h-full flex flex-col">
	<div class="flex-1 relative">
		<slot />
	</div>
</div>

<style lang="postcss">
	:global(html, body) {
		background-color: theme(colors.white);
		height: 100%;
	}
</style>
