<script>
	import '@src/app.css';
	import SelectLanguage from '@components/SelectLanguage.svelte';
</script>

<div class="relative flex min-h-full flex-col items-center overflow-y-auto">
	<div class="flex-1" />
	<slot />
	<SelectLanguage buttonClass="text opacity-60" />
	<div class="flex-1" />
</div>
