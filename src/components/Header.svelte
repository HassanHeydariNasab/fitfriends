<script lang="ts">
	export let title: string | undefined;

	import ArrowLeft from '@icons/arrow-left.svelte';

	function goBack() {
		history.back();
	}
</script>

<h1
	class="sticky top-0 z-40 flex bg-white bg-gradient-to-tr from-orange-100 to-sky-300 py-4 text-center text-lg font-semibold text-gray-800 shadow-lg"
>
	<button class="text !p-0" on:click={goBack}>
		<ArrowLeft class="mx-4" />
	</button>
	<span dir="auto" class="me-auto ms-4">
		{title}
	</span>
</h1>
