<script lang="ts">
	export let data: LayoutData;

	import { goto } from '$app/navigation';
	import type { MouseEventHandler } from 'svelte/elements';

	import Header from '@components/Header.svelte';
	import ArrowLeft from '@components/icons/arrow-left.svelte';
	import { i18n } from '$lib/i18n';
	import type { LayoutData } from './$types';

	function onClickBack() {
		goto('/', { replaceState: true });
	}

	const onClickStart: MouseEventHandler<HTMLButtonElement> = () => {
		document?.getElementById('user-0')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};

	const onClickPresent: MouseEventHandler<HTMLButtonElement> = (event) => {
		const index = +(event.currentTarget.dataset.index || '0');
		document
			?.getElementById(`user-${index + 1}`)
			?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		// TODO: submit data
	};

	const onClickAbsent: MouseEventHandler<HTMLButtonElement> = (event) => {
		const index = +(event.currentTarget.dataset.index || '0');
		document
			?.getElementById(`user-${index + 1}`)
			?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		// TODO: submit data
	};
</script>

<svelte:head>
	<style>
		html {
			scroll-snap-type: y proximity;
		}
	</style>
</svelte:head>

<Header title={data.session.group.title} {onClickBack} />
<div
	class="mx-4 flex max-h-[500px] flex-[0_0_60vh] snap-center flex-col items-center justify-center gap-4"
>
	<p dir="auto">{$i18n.t('confirmation_description')}</p>
	<button class="icon" on:click={onClickStart}><ArrowLeft class="rotate-[-90deg]" /></button>
</div>
{#each [...data.session.users, ...data.session.users] as user, index}
	<div
		class="mx-4 flex max-h-[500px] flex-[0_0_60vh] snap-center flex-col items-center justify-center gap-4"
		id={`user-${index}`}
	>
		<img
			src={user.avatarUrl}
			alt={user.name}
			class="h-32 w-32 rounded-full border-primary-400 bg-white object-cover drop-shadow-xl"
		/>
		<span>{user.name}</span>
		<div dir="rtl" class="flex flex-wrap items-center justify-center gap-4">
			<button on:click={onClickPresent} data-index={index}>{$i18n.t('present')}</button>
			<button class="outlined" on:click={onClickAbsent} data-index={index}>
				{$i18n.t('absent')}
			</button>
		</div>
	</div>
{/each}
