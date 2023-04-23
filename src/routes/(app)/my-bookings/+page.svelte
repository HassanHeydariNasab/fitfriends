<script>
	import { _ } from 'svelte-i18n';

	import BusinessShortInfo from '@components/BusinessShortInfo.svelte';
	import { mockedBookings } from '@data/bookings.mock';

	let bookings = mockedBookings;
</script>

<main class="flex min-h-full flex-col gap-4 p-4">
	{#each bookings as booking}
		<BusinessShortInfo business={booking.business} {booking} />
	{/each}
</main>
