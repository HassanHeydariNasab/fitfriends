<script lang="ts">
	export let business: Business;
	export let booking: Booking | undefined;

	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';

	// import { formattedDistance } from '$lib/format';
	import type { Business } from '@type/business';
	import type { Booking } from '@type/booking';
	import { token } from '@stores/auth';
	import Stars from '@components/Stars.svelte';
	import BrushOutline from '@icons/brush-outline.svelte';
	import CalendarOutline from '@icons/calendar-outline.svelte';
	import LocationOutline from '@icons/location-outline.svelte';

	function onClickBooking() {
		if ($token) {
			// TODO
		} else {
			goto('/request-otp');
		}
	}

	function onClickCancelBooking() {
		if ($token) {
			// TODO
		} else {
			goto('/request-otp');
		}
	}
</script>

<article
	class="grid grid-flow-col auto-rows-min grid-cols-[1fr_minmax(128px,auto)] justify-items-end gap-x-4 gap-y-4 rounded-3xl bg-white p-4 drop-shadow-sm"
>
	<h2 class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold" dir="auto">
		{business.name}
	</h2>
	<Stars value={3.5} />

	<!-- <div>{formattedDistance(+(business?.dist || 0))}<Location class="inline text-primary-500" /></div> -->
	<!-- <address>{business.phone}</address> -->
	{#if booking}
		<button on:click={onClickCancelBooking} class="red">{$_('cancel_booking')}</button>
	{:else}
		<button on:click={onClickBooking}>{$_('booking')}</button>
	{/if}
	<img src="/business.webp" alt="" class="row-span-3 aspect-square h-32 rounded-3xl object-cover" />
	{#if booking}
		<div
			class="col-span-full row-start-4 h-full w-full space-y-1 border-t-[1px] p-4 text-sm leading-7"
			dir="rtl"
		>
			<p>
				<BrushOutline class="me-2 inline text-gray-500" />{booking.description}
			</p>
			<p>
				<CalendarOutline class="me-2 inline text-gray-500" />{new Date(
					booking.startAt
				).toLocaleString(undefined, {
					dateStyle: 'long',
					timeStyle: 'short'
				})}
				{$_('to')}
				{new Date(booking.endAt).toLocaleString(undefined, {
					timeStyle: 'short'
				})}
			</p>
			<p>
				<LocationOutline class="me-2 inline text-gray-500" />{business.address}
			</p>
		</div>
	{/if}
</article>
