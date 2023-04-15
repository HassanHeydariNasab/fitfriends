<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();
	function close() {
		dispatch('close');
	}
</script>

<div
	class="w-full max-h-[60vh] bg-gray-200 rounded-t-3xl absolute bottom-0 z-10 flex flex-col"
	in:slide
	out:slide
>
	<div class="self-end m-4 cursor-pointer hover:opacity-50 transition-opacity" on:click={close}>
		x
	</div>
	<slot />
</div>
