<script lang="ts">
	export let buttonClass: string = '';
	export let containerClass: string = '';

	import { i18n } from '$lib/i18n';
	import Select from '@components/Select.svelte';

	const onChangeLanguage = (event: CustomEvent<{ selected: unknown }>) => {
		const language = event.detail.selected;
		$i18n.changeLanguage(language as string);
	};
</script>

<Select
	options={[
		{ value: 'en-US', label: 'English' },
		{ value: 'fa-IR', label: 'فارسی' }
	]}
	value={$i18n.language}
	on:select={onChangeLanguage}
	{buttonClass}
	{containerClass}
/>
