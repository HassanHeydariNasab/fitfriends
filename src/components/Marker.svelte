<script lang="ts">
	export let name: string;
</script>

<button
	class="mapbox relative h-12 w-12 rounded-full bg-yellow-500 p-2 transition-all duration-300 hover:bg-yellow-500 hover:drop-shadow-lg"
	on:click
>
	<div
		dir="auto"
		class="absolute left-[-100%] right-[-100%] top-[-1.5rem] mb-1 h-5 overflow-hidden text-ellipsis whitespace-nowrap rounded-md"
	>
		<span class="max-w-[max-content] rounded-md bg-yellow-500 px-1 font-bold">
			{name}
		</span>
	</div>
	<img src="/favicon.svg" alt="" />
	<div class="absolute bottom-[-0.3rem] right-4 z-[-1] h-4 w-4 rotate-45 bg-yellow-500" />
</button>
