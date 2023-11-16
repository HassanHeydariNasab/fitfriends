<script lang="ts">
	import Map from '@components/Map.svelte';
	import { i18n } from '$lib/i18n';
</script>

<svelte:head><title>{$i18n.t('app_name')} | {$i18n.t('explore')}</title></svelte:head>

<Map />
