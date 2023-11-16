<script lang="ts">
	import Star from '@icons/star.svelte';
	import StarHalf from '@icons/star-half.svelte';

	export let value = 0;
	const maxStars = 5;
	$: value = value > 5 ? 5 : value;
	$: value = value < 0 ? 0 : value;
</script>

<div class="flex text-primary-600">
	{#each Array(Math.floor(value)).fill(0) as _}
		<Star />
	{/each}
	{#if value - Math.floor(value)}
		<StarHalf />
	{/if}
	{#each Array(maxStars - Math.ceil(value)).fill(0) as _}
		<Star class="text-gray-400" />
	{/each}
</div>
