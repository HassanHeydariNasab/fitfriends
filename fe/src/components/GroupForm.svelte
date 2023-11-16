<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';

	import { i18n } from '$lib/i18n';
	import Camera from '@components/icons/camera.svelte';
	import type { Group } from '@type/group';

	export let onSubmit: FormEventHandler<HTMLFormElement>;
	export let group: Group | undefined = undefined;
	export let submitButtonLabel: string = 'create_group';

	let imageFiles: FileList | null = null;
	let isLoading = false;

	$: title = group?.title ?? '';
	$: description = group?.description ?? '';
	$: imageUrl = imageFiles?.length ? URL.createObjectURL(imageFiles[0]) : group?.imageUrl ?? '';

	$: isDisabled = !title.length || !description.length || !imageUrl.length || isLoading;
</script>

<form
	class="grid max-w-full items-center justify-items-center gap-6 rounded-3xl bg-white p-4 pt-8 text-center drop-shadow-md transition-[filter] duration-500 focus-within:drop-shadow-2xl"
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
	<button disabled={isDisabled}>{$i18n.t(submitButtonLabel)}</button>
</form>
