<script lang="ts">
	export let session: Session;

	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';

	// import { formattedDistance } from '$lib/format';
	import type { Session } from '@type/session';
	import { token } from '@stores/auth';
	import Stars from '@components/Stars.svelte';
	import BrushOutline from '@icons/brush-outline.svelte';
	import CalendarOutline from '@icons/calendar-outline.svelte';
	import LocationOutline from '@icons/location-outline.svelte';

	function onClickShowDetails() {
		if ($token) {
			// TODO
		} else {
			goto('/request-otp');
		}
	}
</script>

<article
	class="relative grid grid-flow-col auto-rows-min grid-cols-[1fr_minmax(128px,auto)] justify-items-end gap-x-4 gap-y-4 rounded-3xl bg-white p-4 drop-shadow-sm"
>
	<h2 class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold" dir="auto">
		{session.title}
	</h2>
	<Stars value={3.5} />

	<!-- <div>{formattedDistance(+(session?.dist || 0))}<Location class="inline text-primary-500" /></div> -->
	<!-- <address>{session.phone}</address> -->
	<button on:click={onClickShowDetails}>{$_('show_details')}</button>
	<img src="/running.jpg" alt="" class="row-span-3 aspect-square h-32 rounded-3xl object-cover" />
	<div
		class="col-span-full row-start-4 h-full w-full space-y-1 border-t-[1px] p-4 text-sm leading-7"
		dir="rtl"
	>
		<p dir="auto">
			{session.description}
		</p>
		<p>
			<CalendarOutline class="me-2 inline text-gray-500" />{new Date(
				session.startAt
			).toLocaleString(undefined, {
				dateStyle: 'long',
				timeStyle: 'short'
			})}
			{$_('to')}
			{new Date(session.endAt).toLocaleString(undefined, {
				timeStyle: 'short'
			})}
		</p>
		<p>
			<LocationOutline class="me-2 inline text-gray-500" />
		</p>
	</div>
</article>
