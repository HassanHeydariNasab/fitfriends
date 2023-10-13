<script>
	import SelectLanguage from '@components/SelectLanguage.svelte';
</script>

<div class="flex-1" />
<slot />
<SelectLanguage buttonClass="text opacity-60" containerClass="self-center" />
<div class="flex-1" />
