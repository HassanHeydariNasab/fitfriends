<script lang="ts">
	export let group: Group | undefined = undefined;
	export let session: Session | undefined = undefined;
	export let submitButtonLabel: string = 'create_session';
	export let onSubmit: FormEventHandler<HTMLFormElement>;

	import type { FormEventHandler } from 'svelte/elements';
	import { i18n } from '$lib/i18n';
	import type { Session } from '@type/session';
	import Map from '@components/Map.svelte';
	import type { Group } from '@type/group';

	let mapComponent: Map;
	let isLoading = false;

	const recurrenceOptions = ['once', 'weekly'] as const;
	const weekDays = [
		'saturday',
		'sunday',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday'
	] as const;

	const currentDateString = new Date().toISOString().split('T')[0];

	$: address = session?.address ?? '';
	$: description = session?.description ?? '';
	$: latitude = session?.latitude ?? 35.8;
	$: longitude = session?.longitude ?? 51.44;
	let date = currentDateString;
	let startDate = currentDateString;
	let endDate = new Date(new Date().valueOf() + 30 * 24 * 3_600_000).toISOString().split('T')[0];
	let startTime = '09:00';
	let endTime = '10:00';
	let recurrence = 'once' as (typeof recurrenceOptions)[number];
	let selectedWeekDays = [] as (typeof weekDays)[number][];

	$: isDisabled = !address.length || !description.length || isLoading;

	$: {
		if (session?.latitude && session?.longitude) {
			mapComponent.setCenter(session.latitude, session.longitude);
		}
	}

	const onMapClick = (event: CustomEvent<{ lat: number; lng: number }>) => {
		const { lat, lng } = event.detail;
		if (lat && lng) {
			latitude = lat;
			longitude = lng;
		}
	};
</script>

<form
	class="grid max-w-full items-center justify-items-center gap-6 rounded-3xl bg-white p-4 pt-8 text-center drop-shadow-md transition-[filter] duration-500 focus-within:drop-shadow-2xl [&>label]:w-full"
	on:submit={onSubmit}
>
	<label>
		<div class="label">{$i18n.t('address')}</div>
		<input name="address" dir="auto" bind:value={address} />
	</label>

	<div class="map-container relative h-[40dvh] w-full overflow-hidden rounded-2xl">
		<Map
			bind:this={mapComponent}
			isInDynamicMarkerMode
			dynamicMarkerName={group?.title ?? ''}
			dynamicMarkerLat={latitude}
			dynamicMarkerLng={longitude}
			on:click={onMapClick}
		/>
	</div>
	<input type="hidden" name="latitude" bind:value={latitude} />
	<input type="hidden" name="longitude" bind:value={longitude} />

	<div dir="auto" class="flex w-full justify-evenly">
		{#each recurrenceOptions as recurrenceOption}
			<label class="radio cursor-pointer text-start transition-opacity hover:opacity-80">
				<input name="recurrence" bind:group={recurrence} type="radio" value={recurrenceOption} />
				<span class="text-sm opacity-60">{$i18n.t(recurrenceOption)}</span>
			</label>
		{/each}
	</div>

	{#if recurrence === 'weekly'}
		<div dir="auto" class="flex w-full flex-wrap justify-evenly gap-4">
			{#each weekDays as weekDay}
				<label class="checkbox text-start transition-opacity hover:opacity-80">
					<input name="weekDays" bind:group={selectedWeekDays} type="checkbox" value={weekDay} />
					<span class="text-sm opacity-60">{$i18n.t(weekDay)}</span>
				</label>
			{/each}
		</div>
	{/if}

	{#if recurrence === 'once'}
		<label>
			<div class="label">{$i18n.t('date')}</div>
			<input name="date" dir="auto" type="date" bind:value={date} min={currentDateString} />
		</label>
	{:else if recurrence === 'weekly'}
		<label>
			<div class="label">{$i18n.t('start_date')}</div>
			<input
				name="startDate"
				dir="auto"
				type="date"
				bind:value={startDate}
				min={currentDateString}
			/>
		</label>
		<label>
			<div class="label">{$i18n.t('end_date')}</div>
			<input name="endDate" dir="auto" type="date" bind:value={endDate} min={currentDateString} />
		</label>
	{/if}
	<label>
		<div class="label">{$i18n.t('start_time')}</div>
		<input name="startTime" dir="auto" type="time" bind:value={startTime} />
	</label>
	<label>
		<div class="label">{$i18n.t('end_time')}</div>
		<input name="endTime" dir="auto" type="time" bind:value={endTime} />
	</label>
	<label>
		<div class="label">{$i18n.t('description')}</div>
		<textarea name="description" dir="auto" bind:value={description} rows="3" />
	</label>
	<button disabled={isDisabled}>{$i18n.t(submitButtonLabel)}</button>
</form>

<style>
	.map-container :global(.mapboxgl-canvas-container.mapboxgl-interactive) {
		cursor: crosshair !important;
	}
</style>
