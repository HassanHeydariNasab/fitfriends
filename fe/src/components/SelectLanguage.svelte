<script lang="ts">
	export let buttonClass: string = '';
	export let containerClass: string = '';

	import { i18n } from '$lib/i18n';
	import Select from '@components/Select.svelte';

	const options = [
		{ value: 'en', label: 'English' },
		{ value: 'fa', label: 'فارسی' }
	];

	const onChangeLanguage = (event: CustomEvent<{ selected: unknown }>) => {
		const language = event.detail.selected;
		$i18n.changeLanguage(language as string);
	};
</script>

<Select
	{options}
	value={$i18n.language}
	on:select={onChangeLanguage}
	{buttonClass}
	{containerClass}
/>
