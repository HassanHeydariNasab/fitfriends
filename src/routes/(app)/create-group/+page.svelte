<script lang="ts">
	//import { goto } from '$app/navigation';

	import { i18n } from '$lib/i18n';
	import Camera from '@components/icons/camera.svelte';

	let title = '';
	let description = '';
	let imageUrl = '';
	let imageFiles: FileList | null = null;
	let isLoading = false;

	$: isDisabled = !title.length || !description.length || !imageUrl.length || isLoading;
	$: imageUrl = imageFiles?.length ? URL.createObjectURL(imageFiles[0]) : '';

	function onSubmit() {
		alert('TODO: create group');
		// goto('/')
	}
</script>

<form
	class="m-4 grid max-w-full items-center justify-items-center gap-6 rounded-3xl bg-white p-4 pt-8 text-center drop-shadow-md transition-[filter] duration-500 focus-within:drop-shadow-2xl"
	on:submit={onSubmit}
>
	<label class="w-full">
		<div class="label">{$i18n.t('title')}</div>
		<input dir="auto" bind:value={title} class="w-full" />
	</label>
	<label class="w-full">
		<div class="label">{$i18n.t('description')}</div>
		<textarea dir="auto" bind:value={description} rows="3" />
	</label>
	<label class="flex w-full flex-col">
		<div class="label">{$i18n.t('image')}</div>
		<div
			class="flex aspect-video max-h-[50vh] w-full cursor-pointer items-center justify-center self-center rounded-md border-[1px] border-gray-200 transition-opacity hover:opacity-70"
		>
			{#if imageUrl}
				<img src={imageUrl} alt="Group Banner" class="h-full w-full rounded-md object-cover" />
			{:else}
				<Camera />
			{/if}
		</div>
		<input type="file" accept="image/*" hidden bind:files={imageFiles} />
	</label>
	<button disabled={isDisabled}>{$i18n.t('create_group')}</button>
</form>
