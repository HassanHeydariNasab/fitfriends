<script lang="ts">
	export let title: string | undefined;
	export let onClickBack: () => void | undefined;

	import { i18n } from '$lib/i18n';
	import ArrowLeft from '@icons/arrow-left.svelte';

	function goBack() {
		history.back();
	}
</script>

<svelte:head><title>{$i18n.t('app_name')} | {title}</title></svelte:head>

<header
	class="sticky top-0 z-40 flex py-4 text-center text-lg font-semibold text-gray-800 shadow-lg backdrop-blur"
>
	<button class="text !p-0" on:click={onClickBack || goBack} title={$i18n.t('back')}>
		<ArrowLeft class="mx-4" />
	</button>
	<h1 dir="auto" class="me-auto ms-4">
		{title}
	</h1>
	<slot name="right" />
</header>
