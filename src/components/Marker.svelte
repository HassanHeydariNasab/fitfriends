<script lang="ts">
	export let name: string;
</script>

<button
	class="h-12 w-12 bg-yellow-500 rounded-full p-2 relative hover:drop-shadow-lg transition-all duration-300"
	on:click
>
	<div
		class="h-5 max-w-xs whitespace-nowrap overflow-hidden text-center font-bold bg-yellow-500 rounded-md mb-1 absolute top-[-1.5rem] right-[-60%] px-1"
	>
		{name}
	</div>
	<img src="/favicon.svg" alt="" />
	<div class="w-4 h-4 rotate-45 bg-yellow-500 absolute bottom-[-0.3rem] right-4 z-[-1]" />
</button>
