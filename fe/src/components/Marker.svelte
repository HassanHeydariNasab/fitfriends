<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	export let name: string;
	export let isAlternative: boolean = false;
	export let onClick: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
</script>

<button
	class="reset relative h-12 w-12 rounded-full bg-primary-500 p-2 transition-all duration-300 hover:bg-primary-500"
	class:hover:drop-shadow-lg={onClick}
	class:bg-red-500={isAlternative}
	class:hover:bg-red-500={isAlternative}
	class:!cursor-crosshair={isAlternative || !onClick}
	type="button"
	on:click={onClick}
>
	<div
		dir="auto"
		class="absolute left-[-100%] right-[-100%] top-[-1.5rem] mb-1 h-5 overflow-hidden text-ellipsis whitespace-nowrap rounded-md"
	>
		<span class="max-w-[max-content] rounded-md bg-primary-400 px-1 font-bold">
			{name}
		</span>
	</div>
	<img src="/favicon.svg" alt="" />
	<!--<div class="h-full w-full rounded-full bg-primary-600" />-->
	<div
		class:bg-red-500={isAlternative}
		class="absolute bottom-[-0.3rem] right-4 z-[-1] h-4 w-4 rotate-45 bg-primary-500"
	/>
</button>
