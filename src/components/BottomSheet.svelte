<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	import CloseCircle from '@icons/close-circle.svelte';

	const dispatch = createEventDispatcher();
	function close() {
		dispatch('close');
	}
</script>

<div
	class="absolute bottom-0 z-10 flex max-h-[100%] w-full flex-col overflow-y-auto rounded-t-3xl bg-gray-100"
	in:slide
	out:slide
>
	<div class="m-4 cursor-pointer self-end" on:click={close}>
		<CloseCircle class="text-gray-700 transition-colors hover:text-gray-900" />
	</div>
	<slot />
</div>
