<script lang="ts">
	import { _ } from 'svelte-i18n';

	import { formattedDistance } from '$lib/format';
	import type { Business } from '@type/business';
	import Button from './Button.svelte';

	export let business: Business;
</script>

<article class="text-center p-4" dir="rtl">
	<h2 class="font-bold text-lg">
		{business.name}
	</h2>
	<div>{formattedDistance(+(business?.dist || 0))}</div>
	<address>{business.phone}</address>
	<Button>{$_('booking')}</Button>
</article>
