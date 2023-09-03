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
	class="absolute bottom-0 z-10 flex max-h-[100%] w-full flex-col overflow-y-auto rounded-t-3xl bg-gradient-to-tr from-pink-200 to-violet-200"
	in:slide
	out:slide
>
	<button class="m-1 mb-0 cursor-pointer self-end border-none !bg-transparent" on:click={close}>
		<CloseCircle class="text-gray-700 transition-colors hover:text-gray-900" />
	</button>
	<div class="p-4">
		<slot />
	</div>
</div>
