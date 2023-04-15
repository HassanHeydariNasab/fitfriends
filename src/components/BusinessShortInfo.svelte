<script lang="ts">
	import { formattedDistance } from '$lib/format';
	import type { Business } from '@type/business';

	export let business: Business;
</script>

<article class="text-center" dir="rtl">
	<h2 class="font-bold text-lg">
		{business.name}
	</h2>
	<div>{formattedDistance(+(business?.dist || 0))}</div>
	<address>{business.phone}</address>
</article>
