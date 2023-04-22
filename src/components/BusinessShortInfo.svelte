<script lang="ts">
	export let business: Business;

	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';

	// import { formattedDistance } from '$lib/format';
	import type { Business } from '@type/business';
	import { token } from '@stores/auth';
	// import Location from '@icons/location.svelte';
	import Stars from '@components/Stars.svelte';

	function onClickBooking() {
		if ($token) {
			// TODO
		} else {
			goto('/request-otp');
		}
	}
</script>

<article
	class="m-4 grid grid-flow-col grid-cols-[1fr_minmax(128px,auto)] justify-items-end gap-x-4 gap-y-4 rounded-3xl bg-white p-4 drop-shadow-sm"
>
	<h2 class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold" dir="auto">
		{business.name}
	</h2>
	<Stars value={3.5} />

	<!-- <div>{formattedDistance(+(business?.dist || 0))}<Location class="inline text-primary-500" /></div> -->
	<!-- <address>{business.phone}</address> -->
	<button on:click={onClickBooking}>{$_('booking')}</button>
	<img src="/business.webp" alt="" class="row-span-3 aspect-square h-32 rounded-3xl object-cover" />
</article>
